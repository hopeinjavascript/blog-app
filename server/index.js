// import dotenv from 'dotenv';
// dotenv.config({});
import 'dotenv/config';

import express from 'express';
const app = express();

import cors from 'cors';
import fileUpload from 'express-fileupload';
import { Server } from 'socket.io';

import authRouter from './routes/auth.js';
import usersRouter from './routes/users.js';
import articlesRouter from './routes/articles.js';
import commentsRouter from './routes/comments.js';

import responseHandler from './middlewares/responseHandler.js';
import errorHandler from './middlewares/errorHandler.js';
import requestLogger from './middlewares/requestLogger.js';
import auth from './middlewares/auth.js';

import initDB from './connections/mongoose.js';

// test route
app.get('/', (req, res) => {
  res.status(200).json({ msg: 'home route' });
});

app.use(cors());
app.use(express.json());
app.use(fileUpload());
app.use(express.static('images')); //http://localhost:5000/default/avatar.jpg
app.use(requestLogger);
app.use('/auth', authRouter);
app.use('/users', usersRouter);
app.use(process.env.BASE_ROUTE, articlesRouter);
app.use(process.env.BASE_ROUTE, commentsRouter);
app.use(responseHandler);
app.use(errorHandler);

let server;
function startServer(app) {
  const PORT = process.env.PORT || 5000;
  server = app.listen(PORT, () =>
    console.log(`Server is listening on http://localhost:${PORT}`)
  );
}

function initSocket() {
  const io = new Server(server, {
    cors: {
      origin: process.env.BLOG_APP_FRONTEND_URL, // we have to explicitly specify cors option for socket server to connect/work. Since Socket.IO v3, you need to explicitly enable Cross-Origin Resource Sharing (CORS).
    },
  });

  // wrapper for below
  const socketMiddlewareWrapper = (expressMiddleware) => (socket, next) =>
    expressMiddleware(socket.request, {}, next);
  // io.use((socket, next) => auth(socket.request, {}, next)); // TODO: check this if data inside this is getting accessed in socket io
  // io.use(socketMiddlewareWrapper(auth)); // TODO: check this if data inside this is getting accessed in socket io
  let connectedUsers = [];

  //helpers
  const addUser = (newUser) => {
    const user = connectedUsers.find(
      (connectedUser) => connectedUser.user?._id === newUser.user?._id
    );
    !user ? connectedUsers.push(newUser) : connectedUsers;
  };

  const removeUser = (socketId) => {
    connectedUsers = connectedUsers.filter(
      (connectedUser) => connectedUser.socketId !== socketId
    );
  };

  const getUserBySocketId = (socketId) => {
    return connectedUsers.find((connectedUser) => {
      console.log(
        connectedUser?.socketId,
        socketId,
        connectedUser?.socketId === socketId
      );
      return connectedUser?.socketId === socketId;
    });
  };
  const getUserByUserId = (userId) => {
    return connectedUsers.find((connectedUser) => {
      console.log(
        connectedUser?.user?._id,
        userId,
        connectedUser?.user?._id === userId
      );
      return connectedUser?.user?._id === userId;
    });
  };

  io.on('connection', (socket) => {
    // console.log('A user connected - ', socket.connected, socket.id);

    // socket.emit('connected', {
    //   msg: `Welcome ${socket.id} - ${socket.connected}`,
    // });

    socket.on('welcome', (data) => {
      addUser({
        socketId: socket.id,
        isConnected: socket.connected,
        user: data?.loggedInUser,
        notifications: [],
      });

      console.log(
        'connectedUsers.length welcome - ',
        connectedUsers.map((u) => u.user?.name)
      );
    });

    // keep track of connected users
    socket.on('like', (data) => {
      // find respective socketId of authorId
      // let u = connectedUsers.find((connectedUser) => {
      //   return connectedUser.user?._id === data.authorId;
      // });

      let u = {};

      const msg = `${data?.loggedInUser?.name} liked your article.`;

      const newNotification = {
        msg,
        isRead: false,
        sender: '',
        receiver: '',
        socketId: data?.socketId,
      };

      connectedUsers = connectedUsers.map((connectedUser) => {
        if (connectedUser.user?._id === data.authorId) {
          u.socketId = connectedUser.socketId;
          return {
            ...connectedUser,
            notifications: [...connectedUser?.notifications, newNotification],
          };
        }

        return connectedUser;
      });

      //send data to show on frontend
      io.sockets
        .in(u?.socketId)
        .emit('like', { msg, socketId: data?.socketId });
    });

    socket.on('notify', (data) => {
      if (!Object.keys(data?.loggedInUser).length) return;
      let u = connectedUsers.find((connectedUser) => {
        return connectedUser.user?._id === data.loggedInUser?._id;
      });

      // * using "data?.socketId" solved the issue
      // io.sockets.in(u?.socketId).emit('notify', {
      io.sockets.in(data?.socketId).emit('notify', {
        notifications: u?.notifications?.length ? u?.notifications : [], //notifications array
      });
    });

    socket.on('disconnect', () => {
      // removeUser(socket.id); // ! this is causing the issue where it is removing the user with socketId of the user on page refresh
      console.log(
        'connectedUsers.length disconnect - ',
        connectedUsers.map((u) => u.user?.name)
      );
    });
  });
}

initDB(() => {
  startServer(app); // will start server as well once database is connected!
  initSocket();
});

// Using a single function to handle multiple signals
function handle(signal) {
  console.info(`[SIGNAL] Received ${signal}`);
}

process.on('unhandledRejection', (e) => {
  console.log('unhandledRejection - ', e);
});

process.on('uncaughtException', handle);

process.on('SIGINT', handle);
process.on('SIGTERM', handle);

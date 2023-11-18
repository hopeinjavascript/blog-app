import { io } from 'socket.io-client';

// "undefined" means the URL will be computed from the `window.location` object
const URL =
  process.env.NODE_ENV === 'production'
    ? undefined
    : `${process.env.REACT_APP_BLOG_APP_BACKEND_URL}`;

// TIP - By default, the Socket.IO client opens a connection to the server right away.
// You can prevent this behavior with the autoConnect option
// In that case, you will need to call socket.connect() to make the Socket.IO client connect.
// This can be useful for example when the user must provide some kind of credentials before connecting.
export const socket = io(URL, {
  //   autoConnect: false, // THIS OPTION 🤬 bohot time kha gaya! 😩
  //   reconnection: true,
});

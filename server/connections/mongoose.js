import mongoose from 'mongoose';

export default function initDB(cb) {
  // https://stackoverflow.com/questions/59578927/mongoose-connect-not-throwing-any-error-when-mongodb-is-not-running
  mongoose
    .connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      console.log('Auth service:: MongoDB connected');
      cb();
    });
  // .catch(console.error);
}

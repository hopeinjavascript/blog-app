import mongoose from 'mongoose';

const UserSchema = mongoose.Schema(
  {
    name: {
      type: 'string',
      required: ['true', 'name is required!'],
    },
    email: {
      type: 'string',
      required: ['true', 'email is required!'],
      unique: true,
    },
    username: {
      type: 'string',
      required: ['true', 'username is required!'],
    },
    plainTextPassword: {
      type: 'string',
      required: ['true', 'plain text password is required!'],
      minLength: 8,
    },
    password: {
      type: 'string',
      required: ['true', 'password is required!'],
      minLength: 8,
    },
    profilePicture: {
      type: String,
      default: 'http://localhost:5000/default/avatar.jpg', //path/link to avatar image
    },
    isAdmin: {
      type: 'boolean',
      default: false,
    },
    roleId: {
      type: Number,
      default: 3, // 3 = others, 2 = admin, 1 = owner
    },
  },
  {
    timestamps: true,
  }
);

const UserModel = mongoose.model('user', UserSchema);
export default UserModel;

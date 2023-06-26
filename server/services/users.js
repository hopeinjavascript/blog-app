import { setResponse, throwError } from '../helpers/generic.js';
import UserModel from '../models/user.js';
import ArticleModel from '../models/articles.js';
import HTTP_STATUS_CODES from '../constants/httpStatusCodes.js';

const getAllUsers = async (_, res) => {
  const users = await UserModel.find({});

  if (!users.length)
    setResponse(res)(HTTP_STATUS_CODES.SUCCESS, 'No users to display');

  setResponse(res)(HTTP_STATUS_CODES.SUCCESS, 'All users', users);
};

//get articles by user id
// TODO: fetch saved articles by an user in this endpoint only
const getAllArticlesByUserId = async (req, res) => {
  const { id } = req.params;

  const articles = await ArticleModel.find({ user: id }).populate(
    'user',
    'name username email isAdmin'
  );

  if (!articles.length)
    setResponse(res)(HTTP_STATUS_CODES.SUCCESS, 'No articles to display');

  setResponse(res)(
    HTTP_STATUS_CODES.SUCCESS,
    `All articles for user id - ${id}`,
    articles
  );
};

const getSingleUser = async (req, res) => {
  const { id } = req.params;

  const singleUser = await UserModel.findById({ _id: id });

  // this won't even reach if ObjectId is incorrect, BUT let's keep for extra guard
  if (!singleUser)
    setResponse(res)(
      HTTP_STATUS_CODES.BAD_REQUEST,
      `No user with the id - ${id}`,
      singleUser
    );

  setResponse(res)(
    HTTP_STATUS_CODES.SUCCESS,
    `Single user - ${id}`,
    singleUser
  );
};

const deleteUser = async (req, res) => {
  const { id } = req.params;

  const deletedUser = await UserModel.findByIdAndDelete({ _id: id });

  if (!deletedUser)
    setResponse(res)(
      HTTP_STATUS_CODES.BAD_REQUEST,
      `No user with the id - ${id}`,
      deletedUser
    );

  setResponse(res)(
    HTTP_STATUS_CODES.SUCCESS,
    `User deleted - ${id}`,
    deletedUser
  );
};

const updateUser = async (req, res) => {
  const { id } = req.params;

  const updatedUser = await UserModel.findByIdAndUpdate(
    { _id: id },
    { title, coverImage, content },
    { new: true }
  );

  setResponse(res)(
    HTTP_STATUS_CODES.SUCCESS,
    `User updated - ${id}`,
    updatedUser
  );
};

export default {
  getAllUsers,
  getAllArticlesByUserId,
  getSingleUser,
  deleteUser,
  updateUser,
};

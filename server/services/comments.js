import { setResponse, throwError } from '../helpers/generic.js';
import CommentModel from '../models/comments.js';
import HTTP_STATUS_CODES from '../constants/httpStatusCodes.js';

const collection = 'user',
  populate = 'name username email isAdmin roleId';

// just to keep cross checking... not using anywhere
const getAllComments = async (_, res) => {
  const comments = await CommentModel.find({})
    .populate(collection, populate)
    .sort('-createdAt'); // (desc) - latest

  if (!comments.length)
    setResponse(res)(HTTP_STATUS_CODES.SUCCESS, 'No comments to display');

  setResponse(res)(HTTP_STATUS_CODES.SUCCESS, 'All comments', comments);
};

// comment on a particular article
const createComment = async (req, res) => {
  const { id } = req.params;

  const newComment = new CommentModel({
    user: req.user.id,
    article: id,
    ...req.body,
  });

  // save comment in comment model itself
  let savedComment = await newComment.save();
  savedComment = await savedComment.populate(collection, populate);
  console.log(savedComment);

  //save comment in article model
  // const article = await ArticleModel.findById({ _id: id });
  // article.comments.push(savedComment._id);
  // await article.save();

  if (!savedComment)
    throwError(
      `Error while creating comment`,
      HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR
    );

  setResponse(res)(
    HTTP_STATUS_CODES.CREATED,
    'Comment added successfully',
    savedComment
  );
};

const getCommentsByArticle = async (req, res) => {
  const { id } = req.params;

  const comments = await CommentModel.find({ article: id }).populate(
    collection,
    populate
  );

  if (!comments)
    setResponse(res)(
      HTTP_STATUS_CODES.BAD_REQUEST,
      `No comments with the article id - ${id}`,
      singleComment
    );

  setResponse(res)(
    HTTP_STATUS_CODES.SUCCESS,
    `Comments with the article id - ${id}`,
    comments
  );
};

const getCommentsByUser = async (req, res) => {
  const { id } = req.params;

  const comments = await CommentModel.find({ user: req.user.id }).populate(
    collection,
    populate
  );

  if (!comments)
    setResponse(res)(
      HTTP_STATUS_CODES.BAD_REQUEST,
      `No comments with the article id - ${id}`,
      singleComment
    );

  setResponse(res)(
    HTTP_STATUS_CODES.SUCCESS,
    `Comments with the article id - ${id}`,
    comments
  );
};

const deleteComment = async (req, res) => {
  const { id } = req.params;

  // ! Since we are storing article Id in comments models so we can fetch comments based on article id..
  // ! an additional network call will be needed to fetch comments but managing data has become faiRly easy!
  // const article = await ArticleModel.find({ comments: { $in: id } });
  // article[0].comments = article[0].comments.filter(
  //   (comment) =>
  //     id !== comment.toString() // to compare -> https://stackoverflow.com/questions/11637353/comparing-mongoose-id-and-strings
  // );
  // console.log(article);
  // await article[0].save();

  // if root comment is requested for delete then we have to delete all the child comments as well...
  const deletedRootComment = await CommentModel.findByIdAndDelete({ _id: id });
  if (!deletedRootComment)
    setResponse(res)(
      HTTP_STATUS_CODES.BAD_REQUEST,
      `No comment with the id - ${id}`,
      deletedRootComment
    );

  if (deletedRootComment.parentId === null) {
    // delete all children comments associated with this root comment
    const deletedChildComments = await CommentModel.deleteMany({
      parentId: deletedRootComment._id,
    });
    console.log({ deletedChildComments });
  }

  setResponse(res)(
    HTTP_STATUS_CODES.SUCCESS,
    `Comment deleted - ${id}`,
    deletedRootComment
  );
};

const updateComment = async (req, res) => {
  const { id } = req.params;
  const { action } = req.body;

  const filter = {
    _id: id,
  };
  const options = {
    new: true,
  };

  let updatedComment;

  if (action === 'like') {
    updatedComment = await CommentModel.findByIdAndUpdate(
      filter,
      {
        $push: { likes: req.user.id },
      },
      options
    );
  }

  if (action === 'unlike') {
    updatedComment = await CommentModel.findByIdAndUpdate(
      filter,
      {
        $pull: { likes: req.user.id },
      },
      options
    );
  }

  if (action === 'edit') {
    const { content } = req.body;

    updatedComment = await CommentModel.findByIdAndUpdate(
      filter,
      { content, $inc: { editCount: 1 } },
      options
    );
    // updatedComment.editCount = updatedComment.editCount + 1;
  }

  updatedComment = await updatedComment.populate(collection, populate);

  setResponse(res)(
    HTTP_STATUS_CODES.SUCCESS,
    `Comment updated - ${id}`,
    updatedComment
  );
};

export default {
  getAllComments,
  createComment,
  getCommentsByArticle,
  getCommentsByUser,
  deleteComment,
  updateComment,
};

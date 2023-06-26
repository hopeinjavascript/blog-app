import { setResponse, throwError } from '../helpers/generic.js';
import ArticleModel from '../models/articles.js';
import HTTP_STATUS_CODES from '../constants/httpStatusCodes.js';

const collection = 'user',
  populate = 'name username email isAdmin roleId';

const getAllArticles = async (_, res) => {
  const articles = await ArticleModel.find({})
    .populate(collection, populate)
    .sort('-createdAt'); // (desc) - latest

  if (!articles.length)
    throwError('No articles to display', HTTP_STATUS_CODES.SUCCESS);

  setResponse(res)(HTTP_STATUS_CODES.SUCCESS, 'All articles', articles);
};

const createArticle = async (req, res) => {
  const newArticle = new ArticleModel({
    user: req.user.id,
    ...req.body,
  });

  let savedArticle = await newArticle.save();

  savedArticle = await savedArticle.populate(collection, populate);

  if (!savedArticle)
    throwError(
      `Error while creating article`,
      HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR
    );

  setResponse(res)(
    HTTP_STATUS_CODES.CREATED,
    'Article added successfully',
    savedArticle
  );
};

// get by Id
const getSingleArticle = async (req, res) => {
  const { id } = req.params;

  const singleArticle = await ArticleModel.findById({ _id: id }).populate(
    collection,
    populate
  );

  // this won't even reach if ObjectId is incorrect, BUT let's keep for extra guard
  if (!singleArticle)
    setResponse(res)(
      HTTP_STATUS_CODES.BAD_REQUEST,
      `No article with the id - ${id}`,
      singleArticle
    );

  setResponse(res)(
    HTTP_STATUS_CODES.SUCCESS,
    `Single article - ${id}`,
    singleArticle
  );
};

const deleteArticle = async (req, res) => {
  const { id } = req.params;

  const deletedArticle = await ArticleModel.findByIdAndDelete({ _id: id });

  if (!deletedArticle)
    setResponse(res)(
      HTTP_STATUS_CODES.BAD_REQUEST,
      `No article with the id - ${id}`,
      deletedArticle
    );

  setResponse(res)(
    HTTP_STATUS_CODES.SUCCESS,
    `Article deleted - ${id}`,
    deletedArticle
  );
};

const updateArticle = async (req, res) => {
  const { id } = req.params;
  const { action } = req.body;

  const filter = {
    _id: id,
  };
  const options = {
    new: true,
  };

  let updatedArticle;
  if (action === 'publish') {
    // callback way
    // updatedArticle = await ArticleModel.findById(filter).then(
    //   async (article) => {
    //     // if (err) throwError(`Error while publishing article - ${id}`);
    //     // to invert the value you need to findById and then update..findByIdAndUpdate doesn't work or lets us invert the value directly
    //     article.isPublish = !article.isPublish;
    //     return await article.save();
    //   }
    // );

    // async-await way
    let foundArticle = await ArticleModel.findById(filter);
    foundArticle.isPublish = !foundArticle.isPublish;
    updatedArticle = await foundArticle.save();
  }

  if (action === 'like') {
    updatedArticle = await ArticleModel.findByIdAndUpdate(
      filter,
      {
        $push: { likes: req.user.id },
      },
      options
    );
  }

  if (action === 'unlike') {
    updatedArticle = await ArticleModel.findByIdAndUpdate(
      filter,
      {
        $pull: { likes: req.user.id },
      },
      options
    );
  }

  if (action === 'edit') {
    const { title, coverImage, content } = req.body;

    updatedArticle = await ArticleModel.findByIdAndUpdate(
      filter,
      { title, coverImage, content },
      options
    );
  }

  updatedArticle = await updatedArticle.populate(collection, populate);

  setResponse(res)(
    HTTP_STATUS_CODES.SUCCESS,
    `Article updated - ${id}`,
    updatedArticle
  );
};

export default {
  getAllArticles,
  createArticle,
  getSingleArticle,
  deleteArticle,
  updateArticle,
};

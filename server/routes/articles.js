import express from 'express';
const router = express.Router();

import articlesControllers from '../controllers/articles.js';
import articlesValidations from '../validations/articles.js';
import auth from '../middlewares/auth.js';

router
  .route('/articles')
  .get(articlesControllers.getAllArticles)
  .post(
    auth,
    articlesValidations.createArticle,
    articlesControllers.createArticle
  );

router
  .route('/articles/:id')
  .get(
    articlesValidations.getSingleArticle,
    articlesControllers.getSingleArticle
  )
  .delete(
    auth,
    articlesValidations.deleteArticle,
    articlesControllers.deleteArticle
  )
  .patch(
    auth,
    articlesValidations.updateArticle,
    articlesControllers.updateArticle
  );

// router.route('/:topic/:title').get(articlesControllers.getSingleArticle);

export default router;

import express from 'express';
const router = express.Router();

import commentsControllers from '../controllers/comments.js';
import commentsValidations from '../validations/comments.js';
import auth from '../middlewares/auth.js';

router.route('/comments').get(commentsControllers.getAllComments);

router
  .route('/articles/:id/comments')
  .post(
    auth,
    commentsValidations.createComment,
    commentsControllers.createComment
  )
  .get(commentsControllers.getCommentsByArticle);

// router
//   .route('/articles/:id/comments')
//   .get(commentsControllers.getCommentsByUser);

router
  .route('/comments/:id')
  .delete(
    auth,
    commentsValidations.deleteComment,
    commentsControllers.deleteComment
  )
  .patch(
    auth,
    commentsValidations.updateComment,
    commentsControllers.updateComment
  );

export default router;

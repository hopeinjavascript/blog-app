import express from 'express';
const router = express.Router();

import usersControllers from '../controllers/users.js';
import usersValidations from '../validations/users.js';
import auth from '../middlewares/auth.js';

router.route('/').get(usersControllers.getAllUsers);

router
  .route('/:id/articles')
  .get(
    usersValidations.getAllArticlesByUserId,
    usersControllers.getAllArticlesByUserId
  );

router.route('/upload-file').post(usersControllers.uploadFile);

router
  .route('/:id')
  .get(usersValidations.getSingleUser, usersControllers.getSingleUser)
  .delete(auth, usersValidations.deleteUser, usersControllers.deleteUser)
  .patch(auth, usersValidations.updateUser, usersControllers.updateUser);

// router.route('/:topic/:title').get(usersControllers.getSingleUser);

export default router;

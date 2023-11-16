import express from 'express';
const router = express.Router();

import authControllers from '../controllers/auth.js';
import authValidations from '../validations/auth.js';

router.route('/login').post(authValidations.login, authControllers.login);
router.route('/signup').post(authValidations.signup, authControllers.signup);
router
  .route('/forgot-password')
  .post(authValidations.forgotPassword, authControllers.forgotPassword);
router
  .route('/reset-password/:token')
  .post(authValidations.resetPassword, authControllers.resetPassword);

export default router;

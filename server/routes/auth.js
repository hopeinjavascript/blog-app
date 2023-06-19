import express from 'express';
const router = express.Router();

import authControllers from '../controllers/auth.js';
import authValidations from '../validations/auth.js';

router.route('/login').post(authValidations.login, authControllers.login);
router.route('/signup').post(authValidations.signup, authControllers.signup);

export default router;

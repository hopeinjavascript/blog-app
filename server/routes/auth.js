import express from 'express';
const router = express.Router();

import authControllers from '../controllers/auth.js';

router.route('/login').post(authControllers.login);
router.route('/signup').post(authControllers.signup);

export default router;

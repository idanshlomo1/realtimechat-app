import express from 'express';
import { signUp, signIn, logout } from '../controllers/auth.controller.js'; // Adjust the path if necessary

const router = express.Router();

router.post('/sign-up', signUp); // POST route for signing up
router.post('/sign-in', signIn); // POST route for signing in
router.post('/logout', logout);  // POST route for logging out

export default router;

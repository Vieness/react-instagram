import {Router} from 'express';
import loginmiddleware from '../../middleware'

import {LoginController, RegisterController, LoggedUserController,GetUserController} from './controller'
const route = Router();

export default mainRoute => {
    // Prefix  /auth
    mainRoute.use('/auth', route);


    // @route   POST  /auth/register
    // @desc    Register User / Return JWT Token
    // @access  Public
    route.post('/register', RegisterController);

    // @route   GET  /auth/login
    // @desc    Login User / Return JWT Token
    // @access  Public
    route.post('/login', LoginController);

    // @route   GET  /auth/login
    // @desc    Login User / Return JWT Token
    // @access  Public
    route.get('/getuser', loginmiddleware, GetUserController);
    /**
     * @route GET /auth/user
     * @desc Get logged User
     * @acces Private
     */
    route.get('/user',loginmiddleware, LoggedUserController)
};

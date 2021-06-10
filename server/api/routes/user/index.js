import {Router} from 'express';

import {SingleUserController, FollowController, UnfollowController, SuggestionController} from './controller'
import loginmiddleware from '../../middleware'

const route = Router();

export default mainRoute => {
    // Prefix  /user
    mainRoute.use('/user', route);
   
    /**
     * @route   GET  /user/:userID
     * @desc    Return single User
     * @access  Private
     */
    route.get('/suggestions/', loginmiddleware, SuggestionController);
    
    /**
     * @route   GET  /user/:userID
     * @desc    Return single User
     * @access  Private
     */
    route.get('/:userID/',loginmiddleware, SingleUserController);

     /**
     * @route   patch  /user/follow
     * @desc    Follow the user / 
     * @access  Private
     */
    route.patch('/follow/', loginmiddleware, FollowController);

     /**
     * @route   patch  /user/unfollow
     * @desc    Follow the user / 
     * @access  Private
     */
    route.patch('/unfollow/', loginmiddleware, UnfollowController);

     
};

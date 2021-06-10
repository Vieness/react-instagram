import {Router} from "express";
import {SubPostsController, CreatePostController, UpdatePostController, DeletePostController, LikePostController, UnlikeController, AllPostsController, SinglePostController, CommentController} from './controller';
import loginmiddleware from '../../middleware'
const route = Router();

export default mainRoute => {
    mainRoute.use('/posts', route);

    
    /**
     * @route   GET  /posts/
     * @desc    Return all posts
     * @access  Private
     */
    route.get('/', loginmiddleware, AllPostsController);

    /**
     * @route   GET  /posts/subposts
     * @desc    Return all posts
     * @access  Private
     * 
     */
    route.get('/subposts', loginmiddleware, SubPostsController);

     /**
     * @route   GET  /posts/:postId
     * @desc    Post id / Return Single post
     * @access  Private
     * @param {id}
     * 
    */
   route.get('/single/:postId', loginmiddleware, SinglePostController);

    /**
     * @route   GET  /posts/single/:postID
     * @desc    Return  post
     * @access  Private
     * 
     */
    route.get('/:postID', loginmiddleware, SinglePostController);

    /**
     * @route   PATCH  /posts/comment
     * @desc    Return  post
     * @access  Private
     * 
     */
    route.patch('/comment', loginmiddleware, CommentController);

    /**
     * @route   POST  /posts/craete
     * @desc    Post body / Return created post
     * @access  Private
     * @param {title}  
     * @param {body}
     * @param {photo}
     * 
     */
    route.post('/craete', loginmiddleware, CreatePostController);

    /**
     * @route   PUT  /posts/:postId
     * @desc    Post body / Return updated post
     * @access  Private
     * @ignore
    */
    route.put('/:postId', loginmiddleware, UpdatePostController);

    /**
     * @route   DELETE  /posts/:postId
     * @desc    Delete selected post
     * @access  Private
     * @ignore
     *  
    */ 
    route.delete('/:postId', loginmiddleware, DeletePostController);
    
    /** 
     * @route   PUT  /posts/like
     * @desc    Like selected post
     * @access  Private
     * @param {postId} Post ID
     * @param {userId} User ID
    */
    route.patch('/like', loginmiddleware, LikePostController);
    
    /**
     * @description Unlike selected post
     * @rote PUT  /posts/unlike
     * @access Private
     * @param {postId} Post ID
     * @param {userId} User ID
    */
  
    route.patch('/unlike', loginmiddleware, UnlikeController);


};
import { PostMapper } from "../../mappers";
import PostService from "../../services/PostService";
import StatusService from "../../services/StatusService";
import cloudinary from '../../../utils/cloudinary'



export const SubPostsController = async (request, response) => {
  try {
    const {following} = request.body;
    const result = await new PostService().getSubPosts({following});
    response
    .status(200)
    .json(
      StatusService.buildResponse(
      true,
      Array.isArray(result) ? result.map(item => PostMapper.purePost(item)) : []
    ))
  } catch (error) {
    response.json(StatusService.buildError(error.message, error.status))
  }
};

export const AllPostsController = async ( request, response) => {
  try {
    const result = await new PostService().getAllPosts();
    response
    .status(200)
    .json(
      StatusService.buildResponse(
      true,
      Array.isArray(result) ? result.map(item => PostMapper.purePost(item)) : []
    ))
  } catch (error) {
    response.json(StatusService.buildError(error.message, error.status))
  }
};

export const CreatePostController = async ( request, response) => {
  try {
    const {title,body, photo} = request.body;
    const {id} = request.user

    if ( !title || !body || !photo) {
        throw new Error("Please submit all the required fields")
    }
    const {secure_url} = await cloudinary.uploader.upload(photo)

    const createdPost = await new PostService().createPost(title, body, secure_url, id);
    const post = await new PostService().getSinglePost(createdPost.id)
      response
      .status(201)
      .json( StatusService.buildResponse(
        true,
        PostMapper.purePost(post)
      ))
  } catch (error) {
    response.json(StatusService.buildError(error.message, error.status))
  }
};

export const SinglePostController = async (request, response) => {
  try {
    const {postId} = request.params;
    if (!postId) {
     throw new Error("Expected an ID but the parameter is undefined")
    }
    const post = await new PostService().getSinglePost(postId);
      response
      .status(200)
      .json( StatusService.buildResponse(
        true,
        post
      ))
  } catch (error) {
    response.json(StatusService.buildError(error.message, error.status))
  }
}

export const UpdatePostController = ( request, response) => {
  response
  .status(201)
  .json({
    status: true,
  })
};

export const DeletePostController = async (request, response) => {
  const {postId, user} = request.params;

  try {
    const result = await new PostService().deletePost({postId, user})
    response
    .status(201)
    .json( StatusService.buildResponse(
      true,
      result
    ))
  } catch (error) {
    response.json(StatusService.buildError(error.message, error.status))
  }

  response
  .status(201)
  .json({
    status: true,
  })
};

export const LikePostController = async (request, response) => {
  const {postId} = request.body;
  const {id} = request.user;
  try {
    const result = await new PostService().likePost(postId, id)
    response
    .status(201)
    .json( StatusService.buildResponse(
      true,
      PostMapper.purePost(result)
    ))
  } catch (error) {
    response.json(StatusService.buildError(error.message, error.status))
  }
};

export const CommentController = async (request, response) => {
  const {postId, text} = request.body;
  const {id} = request.user;
  try {
    const result = await new PostService().commentPost(postId, text, id)
    response
    .status(201)
    .json( StatusService.buildResponse(
      true,
      PostMapper.purePost(result)
    ))
  } catch (error) {
    response.json(StatusService.buildError(error.message, error.status))
  }
};

export const UnlikeController = async (request, response)=> {
  const {postId} = request.body;
  const {id} = request.user;

  try {
    const result = await  new PostService().unlikePost(postId, id)
    response
    .status(201)
    .json( StatusService.buildResponse(
      true,
      PostMapper.purePost(result)
    ))
  } catch (error) {
    response.json(StatusService.buildError(error.message, error.status))
  }
}

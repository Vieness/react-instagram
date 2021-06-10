import { request, response } from "express";
import { PostMapper } from "../../mappers";
import UserService from "../../services/UserService";
import StatusService from "../../services/StatusService";
import { Error } from "mongoose";

export const SingleUserController = async (request, response) => {
  const {userID} = request.params;
  try {
    const result = await new UserService().getSinglePost(userID);
    const {user, posts} = result
    response
    .status(200)
    .json(
      StatusService.buildResponse(
      true,
      {user, posts: Array.isArray(posts) ? posts.map(item => PostMapper.purePost(item)) : []}
      
    ))  
  } catch (error) {
    response.json(StatusService.buildError(error.message, error.status))
  }
}

export const FollowController = async (request, response)=> {
  try {
    const {followId} = request.body;
    const {id} = request.user;
    if (!followId || !id) {
      throw new Error("followId or id is undefined")
    }
    const result = await new UserService().follow(followId, id)
    response
    .status(201)
    .json(
      StatusService.buildResponse(
      true,
      result
    ))  
  } catch (error) {
    response.json(StatusService.buildError(error.message, error.status))
  }
}

export const UnfollowController = async (request, response)=> {
  try {
    const {followId} = request.body;
    const {id} = request.user;
    if (!followId || !id) {
      throw new Error("followId or id is undefined")
    }
    const result = await new UserService().unFollow(followId, id)
    response
    .status(201)
    .json(
      StatusService.buildResponse(
      true,
      result
    ))  
  } catch (error) {
    response.json(StatusService.buildError(error.message, error.status))
  }
}



export const SuggestionController = async (request, response)=> {
  try{
    const {id} = request.user;
    const result = await new UserService().getSuggestion(id);
    response
    .status(200)
    .json(
      StatusService.buildResponse(
      true,
      result
    ))  
  } catch (error) {
    response.json(StatusService.buildError(error.message, error.status))
  }
}
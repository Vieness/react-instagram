import { UserMapper } from "../../mappers";
import AuthService from "../../services/AuthService";
import {UserModel} from '../../database/models'
import StatusService from "../../services/StatusService";
import cloudinary from '../../../utils/cloudinary'

export const RegisterController = async (request, response) => {
  const {name, email, firstName, lastName, password, photo} = request.body;
  try{
    if (await UserModel.findOne({ email })) {
      throw new Error("Already exist")
    }
    const uploadedResponse = await cloudinary.uploader.upload(photo)
    const {user, token} = await new AuthService().registerUser(name, email, firstName, lastName, password, uploadedResponse)
    response
      .status(201)
      .json(
        StatusService.buildResponse(
          true,
          {user: UserMapper.createdUser(user), token})
      )
  }
  catch(err){
    response.json(StatusService.buildError(err.message, err.status))
  }
};

export const LoginController = async (request, response) => {
  const {email, password} = request.body;
  try {
    if (!email || !password) {
      throw new Error("email or password in undefined")
    }
    const {user, token, error} = await new AuthService().loginUser({email, password})
    if (error) {
      throw new Error(error)
    } 
      response
      .status(201)
      .json(
        StatusService.buildResponse(
          true,
          {user: UserMapper.loginUser(user), token})
      )
    
  } catch (error) {
    response.json(StatusService.buildError(error.message, error.status))
  }
}

export const GetUserController = async (request, response) => {
  const {email} = request.user;
  try {
    if (!email) {
      throw new Error("email or password in undefined")
    }
    const user = await new AuthService().getUser(email)
      response
      .status(200)
      .json(
        StatusService.buildResponse(
          true,
          {user})
      )
    
  } catch (error) {
    response.json(StatusService.buildError(error.message, error.status))
  }
}

export const LoggedUserController = async (request, response) =>{
  const {token} = request.user;
  
}
import {UserModel} from '../database/models/'
import PostService from './PostService'

export default class UserService{
  /**
   * @description Single User
   * @param {string} id
   */
  async getSinglePost(id){
    const user = await UserModel.findById(id)
    .populate("following", "id name photo")
    .populate("followers", "id name photo")
    return {user, posts: await new PostService().getUsersPosts(id)};
  }
  async follow(followId, userID){
    const follow = await UserModel.findByIdAndUpdate(followId, {$push: {followers: userID}}, {new: true})
    const following = await UserModel.findByIdAndUpdate(userID,{$push: {following: followId}}, {new: true})
    return {follow, following}
  }

  async unFollow(followId, userID){
    const follow = await UserModel.findByIdAndUpdate(followId, {$pull: {followers: userID}}, {new: true})
    const following = await UserModel.findByIdAndUpdate(userID,{$pull: {following: followId}}, {new: true})
    return {follow, following}
  }
  
  

  async getSuggestion(userID){
    const {id, following} = await UserModel.findById(userID).populate("following", "id")
    const allUsers = await UserModel.find({});
    const followArr = following.map(item => item.id);
    return allUsers.filter(user=>  followArr.indexOf(user.id) === -1 && user.id !== id)
  }
}
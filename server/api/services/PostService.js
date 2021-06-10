import {PostModel, UserModel} from '../database/models/'

export default class PostService{
  /**
   * @description Create new post
   * @param {title,body,photo} 
   */
  async createPost(title,body, photo, userId){

    const user = await UserModel.findById(userId)
    return PostModel.create({
      title,
      body,
      photo,
      postedBy: user.id
    })
  }
  
  /**
   * @description Sub Posts
   * @param {object} params 
   */
  async getSubPosts({params = {}}){
    return PostModel.find({ postedBy: { $in: params } })
    .populate("postedBy", "_id name")
    .populate("comments.postedBy", "_id name")
    .populate("likes", "_id name")
    .sort("-createdAt")
  }

  async getUsersPosts(id) {
    return PostModel.find({postedBy: id})
    .populate("postedBy", "_id name")
  }
  
   /**
   * @description All Posts
   * @param {object} 
   */
  async getAllPosts(){
    return PostModel.find({})
    .populate("postedBy", "_id name photo")
    .populate("comments.postedBy", "_id name, text")
    .populate("likes", "_id name photo")
    .sort("-createdAt")
  }

  async getSinglePost(id){
    return PostModel.findById(id)
    .populate("postedBy", "_id name photo")
    .populate("comments.postedBy", "_id name photo text")
    .populate("likes", "_id name")
  }
  
  async commentPost(postId, text, id){
    return PostModel.findByIdAndUpdate(postId,{$push: {comments: { text,postedBy: id}}},{new: true})
    .populate("comments.postedBy", "_id name photo")
    .populate("postedBy", "_id name photo")
  }

  /**
   * @description likePost
   * @param {string} postId 
   * @param {string} userId 
   */
  async likePost(postId, userId){

    return PostModel
      .findByIdAndUpdate(postId, {$push: {likes: userId}},{ new: true })
      .populate("postedBy", "_id name")
		  .populate("comments.postedBy", "_id name photo")
  }

  /**
   * @description unlikePost
   * @param {object} params 
   */
  async unlikePost(postId, userId){
    return PostModel
    .findByIdAndUpdate(postId, {$pull: {likes: userId}},{ new: true })
      .populate("postedBy", "_id name")
      .populate("comments.postedBy", "_id name photo")
  }

  /**
   * @description Sub Posts
   * @param {object} params 
   */
  async deletePost({postId, user}){
    const findPost = await Post.findOne({ _id: postId })
    .populate("postedBy", "_id")
    return findPost.exec((err, post) => {
			if (err || !post) return err
			if (post.postedBy._id.toString() === user._id.toString()) {
				post.remove()
					.then((result) => {
						return result._id;
					})
					.catch((err) => console.log(err));
			}
		});
  }
}


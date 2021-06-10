export default class PostMapper{
  static purePost(post){
    return {
      id: post.id,
      title: post.title,
      body: post.body,
      photo: post.photo,
      postedBy: post.postedBy,
      likes: post.likes,
      createdAt: post.createdAt,
      comments: post.comments
    }
  }
  
}
export default class UserMapper{
  static createdUser(user){
    return {
      id: user._id,
      name: user.name,
      email: user.email,
      photo: user.photo,
      firstName: user.firstName,
      lastName: user.lastName
    }
  }
  static loginUser(user){
    return {
      id: user._id,
      name: user.name,
      email: user.email,
      photo: user.photo,
      firstName: user.firstName,
      lastName: user.lastName,
      followers: user.followers,
      following: user.following

    }
  }
}
import { UserModel } from "../database/models";
import gravatar from 'gravatar';
import {randomBytes} from 'crypto'
import argon2 from 'argon2'
import jwt from "jsonwebtoken";
import config from "../../config"

export default class AuthService{

  /**
   * @description LOGIN USER / RETURN USER AND TOKEN
   */
  async loginUser({email, password}){
    const user = await UserModel.findOne({email})
    .populate("following", "id name photo")
    .populate("followers", "id name photo")
   if (!user) {
    throw new Error("Cant find user")
     
   }
      if (await argon2.verify(user.password, password)) {
        // Create JWT Payload
        return {
          user: user, 
          token: this.generateToken(user._id)
        }
      } else {
       throw new Error("password did not match")
      }
  }

  /**
   * @description GET USER / RETURN USER
   */
  async getUser(email){
    return await UserModel.findOne({email})
    .populate("following", "id name photo")
    .populate("followers", "id name photo")
  }



  /**
   * @description Register a new user. Create item in UserCollection and save a picture
   */
  async registerUser(name, email, firstName, lastName, password, photo){
  
    const salt = randomBytes(12);
    const pswd = await argon2.hash(password, {salt})
    let avatar = ''
    if (!photo) {
      avatar = gravatar.url(email, {
        s: '200', // Size
        r: 'pg', // Rating
        d: 'mm' // Default
      });
    } else{
      avatar = photo.secure_url
    }

      const user = await UserModel.create({
        name,
        email,
        firstName,
        lastName,
        password: pswd,
        photo: avatar
      })
      
      return {
        user, 
        token: this.generateToken(user._id)
      }
    
    
  };

  /**
   * @description Generate JWT TOKEN
   * @param {string} userID 
   */
  generateToken(userId) {
		const today = new Date();
		const exp = new Date(today);
		exp.setDate(today.getDate() + 60);

		return jwt.sign(
			{
				id: userId,
				exp: exp.getTime() / 1000,
			},
			config.JWT_SECRET,
		);
	}

}
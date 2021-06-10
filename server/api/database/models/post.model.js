import mongoose from 'mongoose';
const { ObjectId } = mongoose.Schema.Types;


const Post = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  body: {
    type: String,
    required: true,
  },
  photo: {
    type: String,
    default: "no photo",
  },
  postedBy: {
    type: ObjectId,
    ref: "User",
  },
  createdAt: {
		type: Date,
		default: new Date()
	},
	updatedAt: {
		type: Date,
		default: new Date()
	},
  likes: [{ type: ObjectId, ref: "User" }],
  comments: [
    {
      text: String,
      postedBy: {
        type: ObjectId,
        ref: "User",
      },
    },
  ],
});

export default mongoose.model('Post', Post);
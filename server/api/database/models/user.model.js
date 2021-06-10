import mongoose from 'mongoose';
const { ObjectId } = mongoose.Schema.Types;

const User = new mongoose.Schema({
  name: {
		type: String,
		required: true,
		index: true,
		unique: true
	},
	email: {
		type: String,
		required: true,
		unique: true
	},
	firstName: {
		type: String,
		required: true,
	},
	lastName: {
		type: String,
		required: true
	},
	password: {
		type: String,
		required: true,
	},
	photo: {
		type: String,
	},
	
  followers: [{ type: ObjectId, ref: "User" }],
  following: [{ type: ObjectId, ref: "User" }],
});

export default mongoose.model('User', User);
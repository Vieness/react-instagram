import jwt from 'jsonwebtoken'
import config from '../../config'
import {UserModel} from '../database/models'

export default function(request, response, next){
  const { authorization } = request.headers;
	if (!authorization) {
		return response.status(401).json({ error: "You must be logged In" });
	}
	const token = authorization.replace("Bearer ", "");
	jwt.verify(token, config.JWT_SECRET, (err, payload) => {
		if (err) {
			return response.status(401).json({ error: "You must be logged In" });
		}
		const { id } = payload;
		UserModel.findById(id).then((userdata) => {
			// We make user data accessible
			request.user = userdata;
			next();
		});
	});
}
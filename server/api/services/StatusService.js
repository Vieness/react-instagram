export default class StatusService {
	/**
	 * @desc Построение ответа сервера
	 * @return {Object}
	 **/
	static buildResponse(success, payload, status = undefined, error = undefined) {
		return {
			error,
			status,
			success: !!success,
			data: payload
		};
	}

	/**
	 * @desc
	 * @param {String} message
	 * @param {Number} status
	 * @return {Object}
	 **/
	static buildError(message, status = 500) {
		return StatusService.buildResponse(
			false,
			undefined,
			status,
			message
		);
	}
}

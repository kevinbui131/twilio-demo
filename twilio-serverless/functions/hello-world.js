exports.handler = function (context, event, callback) {
	// const response = new Twilio.Response();
	// response.appendHeader('Access-Control-Allow-Origin', '*');

	const twiml = new Twilio.twiml.VoiceResponse();
	console.log("changs");
	console.log("change 2");
	console.log("change 2");

	callback(null, twiml);
};

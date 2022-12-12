// If you do not want to pay for other people using your Twilio service for their benefit,
// generate user and password pairs different from what is presented here
let users = {
	user00: "helloWorld",
};

let response = new Twilio.Response();
let headers = {
	"Access-Control-Allow-Origin": "*",
};

exports.handler = function (context, event, callback) {
	console.log("check here", context);
	response.appendHeader("Access-Control-Allow-Origin", "*");
	// if (!event.identity || !event.password) {
	// 	response.setStatusCode(401);
	// 	response.setBody("No credentials");
	// 	callback(null, response);
	// 	return;
	// }

	// if (users[event.identity] != event.password) {
	// 	response.setStatusCode(401);
	// 	response.setBody("Wrong credentials");
	// 	callback(null, response);
	// 	return;
	// }

	try {
		let AccessToken = Twilio.jwt.AccessToken;
		let token = new AccessToken(
			context.ACCOUNT_SID,
			context.TWILIO_API_KEY_SID,
			context.TWILIO_API_KEY_SECRET,
			{
				identity: event.identity,
				//time to live
				ttl: 3600,
			}
		);
		console.log("accessToken", AccessToken);
		let grant = new AccessToken.ChatGrant({ serviceSid: context.SERVICE_SID });
		console.log("grant", grant);
		if (context.PUSH_CREDENTIAL_SID) {
			// Optional: without it, no push notifications will be sent
			grant.pushCredentialSid = context.PUSH_CREDENTIAL_SID;
		}
		token.addGrant(grant);
		response.setStatusCode(200);
		response.setBody(token.toJwt());
	} catch (error) {
		throw new Error(error, "unable to generate token");
	}

	callback(null, response);
};

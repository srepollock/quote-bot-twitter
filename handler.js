'use-strict';
const https = require('https');
const request = require('request');
const rfdc = require('rfdc')();
const logger = require('de-loggingsystem');
const OAuth2 = require('oauth').OAuth2;
const twit = require('twit');
module.exports.hello = async event => {
    let dataString = '';
    let config = {
        consumer_key: process.env.CONSUMER_KEY,
        consumer_secret: process.env.CONSUMER_SECRET,
        access_token: process.env.ACCESS_TOKEN,
        access_token_secret: process.env.ACCESS_TOKEN_SECRET
    };
    
    const Twitter = new twit(config);

    const response = await new Promise((resolve, reject) => {
        request("https://quotes.rest/qod.json", function(err, res, body) {
            logger.log(logger.LogLevel.debug, `Response: ${res}. Body: ${body}`);
            let data = JSON.parse(body);
            logger.log(logger.LogLevel.debug, `Parsed rfdc object: ${data.contents.quotes[0].quote}`);
            var tags = "";
            for (const [key, value] of Object.entries(data.contents.quotes[0].tags)) {
                let tag = value.split("-").join("");
                tags += `#${tag} `;
            };
            var tweet = `"${data.contents.quotes[0].quote}" - ${data.contents.quotes[0].author}\n\n\n${tags}`;

            logger.log(logger.LogLevel.debug, tweet);

            Twitter.post('statuses/update', { status: tweet }, function(err, data, response) {
            if (err) {
                logger.log(logger.LogLevel.error, `Tweet was not posted. Errorcode: ${err}`, logger.ErrorCode.Error);
            } else {
                logger.log(logger.LogLevel.info, `Tweet posted`);
            }
            });
        });
    });
    
    return response;
};

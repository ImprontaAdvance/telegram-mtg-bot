const crypto = require('crypto');

const OAUTH_VERSION = '1.0';
const SIGNATURE_METHOD = 'HMAC-SHA1';

const APP_TOKEN = process.env.MKM_APP_TOKEN;
const APP_SECRET = process.env.MKM_APP_SECRET;
const ACCESS_TOKEN = process.env.MKM_ACCESS_TOKEN;
const ACCESS_SECRET = process.env.MKM_ACCESS_SECRET;

var nonce = Math.random();
var timestamp = Date.now();

function generateAuthHeader(method, url) {
    var authSignatures = {
        realm: url,
        oauth_consumer_key: APP_TOKEN,
        oauth_token: ACCESS_TOKEN,
        oauth_nonce: nonce,
        oauth_timestamp: timestamp,
        oauth_version: OAUTH_VERSION,
        oauth_signature_method: SIGNATURE_METHOD,
    };


    var paramString = Object.keys(authSignatures)
        .filter(el => el !== 'realm')
        .sort()
        .map(el => `${el}=${authSignatures[el]}`)
        .join('&');

    var uriString = `${method}&${encodeURIComponent(url)}&`;
    var encodedParamString = encodeURIComponent(paramString);
    var baseString = uriString + encodedParamString;

    var signingKey = `${encodeURIComponent(APP_SECRET)}&${encodeURIComponent(ACCESS_SECRET)}`;
    var hmac = crypto.createHmac('sha1', signingKey);
    hmac.update(baseString);

    authSignatures.oauth_signature = hmac.digest('base64');

    var authParams = Object.keys(authSignatures)
        .map(el => `${el}="${authSignatures[el]}"`)
        .join(',');

    var header = `OAuth ${authParams}`;

    return header;
}

module.exports = {
    generateAuthHeader,
};

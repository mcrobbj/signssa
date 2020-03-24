'use strict';
const fs = require('fs');
const jwt = require('jsonwebtoken');
const uuid4 = require('uuid4');
var privateKEY  = fs.readFileSync('./../certs/privateKeySigning.key', 'utf8');
var publicKEY  = fs.readFileSync('./../certs/publicKeySigning.pem', 'utf8');
/*
 ====================   JWT Signing =====================
*/
var id = uuid4();
var jwt_iat = Date.now();
var jwt_exp = jwt_iat + 3600 // Token exoires in an hour
var claims = {
 "token_endpoint_auth_signing_alg": "RS256",
 "jti": id,
 "token_endpoint_auth_signing_alg": "PS256",
 "request_object_encryption_alg": "RSA-OAEP-256",
 "grant_types": '["authorization_code", "refresh_token", "client_credentials"]',
 "subject_type": "public",
 "application_type": "web",
 "redirect_uris": '["https://app.getpostman.com/oauth2/callback"]',
 "token_endpoint_auth_method": "private_key_jwt",
 "scope": "openid accounts",
 "request_object_signing_alg": "PS256",
 "iat": jwt_iat,
 "request_object_encryption_enc": "A128CBC-HS256",
 "response_types": '["code", "code id_token"]',
 "id_token_signed_response_alg": "PS256",
 "software_statement": ""
};
var header  = {"alg":"RS256", "typ":"JWT", "kid":"5FZT6gTLM5wEoSGn3eW0Q8zCPsQ"};
var issuer  = 'software_statement_id';   
var subject  = 'ClientId';   
var audience  = 'https://tsob.sainsburysbank.co.uk:443/sso/oauth2/realms/root/realms/general';
var signOptions = {
 issuer:  issuer,
 header:  header,
 subject:  subject,
 audience:  audience,
 expiresIn:  "1h"
};

var token = jwt.sign(claims, privateKEY, signOptions);

console.log("Token :" + token);
/*
 ====================   JWT Verify =====================
*/
var verifyOptions = {
 issuer:  issuer,
 subject:  subject,
 audience:  audience,
 expiresIn:  jwt_exp,
 algorithm:  ["RS256"]
};
var legit = jwt.verify(token, publicKEY, verifyOptions);
console.log("\nJWT verification result: " + JSON.stringify(legit));

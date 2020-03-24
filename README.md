# Sign the Request for a registration
It will need to be changed but currently it signs a JWT that is used to request a a client Id

## Setup
At the same level as this project you should have a directory named certs with:
- privateKeySigning.key
- publicKeySigning.pem

You will need to modify the code to have:
- the key as your key currently "kid":"5FZT6gTLM5wEoSGn3eW0Q8zCPsQ"
- ClientId as the clinetId you got from registration

## Run
node signreg.js

## To Do
Pull configinfrom a file
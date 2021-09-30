const b64 = require('base64-js')
const encryptionSdk = require('@aws-crypto/client-node')
const mailgun = require("mailgun-js");

const { decrypt } = encryptionSdk.buildClient(encryptionSdk.CommitmentPolicy.REQUIRE_ENCRYPT_ALLOW_DECRYPT)
const keyIds = [process.env.KEY_ID];
const keyring = new encryptionSdk.KmsKeyringNode({ keyIds })

const DOMAIN = process.env.MAILGUN_DOMAIN;
const HOST = process.env.MAILGUN_HOST;
const API_KEY = process.env.MAILGUN_API_KEY
const mg = mailgun({apiKey: API_KEY, domain: DOMAIN, host:HOST});

exports.handler = async(event) => {
   
    let plainTextCode
    if (event.request.code) {
        const { plaintext, messageHeader } = await decrypt(keyring, b64.toByteArray(event.request.code))
        plainTextCode = plaintext
    }

    const data = {
        from: 'from@example.com',
        to: event.request.userAttributes.email,
        subject: 'AWS Cognito Code',
        text: `Your code is ${plainTextCode.toString()} `
    };

    await mg.messages().send(data)

    if (event.triggerSource == 'CustomEmailSender_SignUp') {
    }
    else if (event.triggerSource == 'CustomEmailSender_ResendCode') {
    }
    else if (event.triggerSource == 'CustomEmailSender_ForgotPassword') {
    }
    else if (event.triggerSource == 'CustomEmailSender_UpdateUserAttribute') {
    }
    else if (event.triggerSource == 'CustomEmailSender_VerifyUserAttribute') {
    }
    else if (event.triggerSource == 'CustomEmailSender_AdminCreateUser') {
    }
    else if (event.triggerSource == 'CustomEmailSender_AccountTakeOverNotification') {
    }
}



            
           
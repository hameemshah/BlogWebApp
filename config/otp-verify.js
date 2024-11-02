import sgMail from "@sendgrid/mail"
import env from "dotenv"

env.config();

var code = String(Math.floor(Math.random() * 9000) + 1000);

sgMail.setApiKey(process.env.SENDGRID_API_KEY);
const msg = {
    from: 'hameem3@proton.me', 
    subject: 'Knowledge Gate OTP',
    html:  code +' is your one time password for logging in to the account',
};

const send = async (userEmail) => {
    msg.to = userEmail;
    try {
        await sgMail.send(msg);
    } catch (error) {
        console.error(error);
        if (error.response) {
            console.error(error.response.body)
        }
    }
}

export default {
    code,
    send
}
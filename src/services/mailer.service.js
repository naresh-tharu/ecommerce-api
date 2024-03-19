const nodemailer = require('nodemailer')
const dotenv = require('dotenv')
dotenv.config();

class SendMail {
    _transport;

    constructor() {
        this.serverConnect()
    }

    // Nodejs ====> SMTP SERVER ==============> Queue build ==============> gmail.com

    serverConnect = () => {
        try {
            this._transport = nodemailer.createTransport({
                host: process.env.SMTP_HOST ?? "live.smtp.mailtrap.io",
                port: process.env.SMTP_PORT ?? 587,
                secure: false, // upgrade later with STARTTLS
                auth: {
                    user: process.env.SMTP_USER ?? "api",
                    pass: process.env.SMTP_PWD ?? "4796765a6cfbb87c8ba3a3813175c3f3",
                },
            })
        } catch (err) {
            console.log("Mail server connection problem...", err)
        }
    }

    sendEmail = async (to, sub, message, attachements = null, cc = null, bcc = null) => {
        try {
            let response = await this._transport.sendMail({
                from: "no-reply@sandeshbhattarai.com.np",
                to: to,
                subject: sub,
                // text: "Plaintext version of the message",
                html: message,
                // attachements: attachements,
                // cc: cc,
                // bcc: bcc
            })

            console.log({ response })
        } catch (error) {
            console.log("Email send failed: ", error);
        }
    }
}


const emailObj = new SendMail;
module.exports = emailObj;
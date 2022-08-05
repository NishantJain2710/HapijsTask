const nodemailer = require('nodemailer');

class MailNodemailer {
    #transporter;
    #transportOption;

    constructor() {
        this.#transportOption = {
            host:'smtp.gmail.com',
            port: 465,
            secure: true,
            auth: {
                user: process.env.MAILID,
                pass: process.env.MAILPASS,
            }
        }

        this.#transporter = nodemailer.createTransport(this.#transportOption);
    }

    async sendEmail(message) {
        const result = await this.#transporter.sendMail({
            to:message.to,
            from: message.from,
            cc:message.cc,
            subject: message.subject,
            text: message.text,
            html: message.html,
            attachments: message.attachments,
        })

        return result;
    }
}

module.exports = MailNodemailer;
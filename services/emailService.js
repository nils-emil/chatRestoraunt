var nodemailer = require('nodemailer');

module.exports = class EmailService {

    async sendEmail(to, subject, content) {
        var transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_USERNAME,
                pass: process.envEMAIL_PASSWORD
            }
        });

        var mailOptions = {
            from: process.env.EMAIL_USERNAME,
            to: to,
            subject: subject,
            html: content
        };

        transporter.sendMail(mailOptions, function(error, info){
            if (error) {
                console.log(error);
            } else {
                console.log('Email sent: ' + info.response);
            }
        });
    }


}

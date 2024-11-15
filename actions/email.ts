import { projectTitle } from '@/lib/constants';
import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
    host: 'smtp-relay.brevo.com',
    port: 587,
    auth: {
        // TODO: replace `user` and `pass` values from <https://forwardemail.net>
        user: process.env.EMAIL_USER,

        // Always use SMTP Key on Brevo
        pass: process.env.SMTP_KEY,
    },
});

// async..await is not allowed in global scope, must use a wrapper
export async function verificationMail(link: any, user: any) {
    // send mail with defined transport object
    const info = await transporter.sendMail({
        from: `"Creator Of ${projectTitle} 👻" <${projectTitle}@TS.com>`, // sender address
        to: user, // list of receivers
        subject: 'Email Verification', // Subject line
        // text: "Test", // plain text body
        html: `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Email Verification</title>
<style>
    body {
        font-family: Arial, sans-serif;
        margin: 0;
        padding: 0;
        background-color: #f4f4f4;
    }
    .container {
        max-width: 600px;
        margin: 20px auto;
        padding: 20px;
        background-color: #fff;
        border-radius: 8px;
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    }
    h1 {
        color: #333;
        text-align: center;
    }
    p {
        color: #666;
        line-height: 1.6;
    }
    .footer {
        margin-top: 20px;
        text-align: center;
        color: #999;
        font-size: 0.8em;
    }
    .btn {
        display: inline-block;
        padding: 10px 20px;
        background-color: #007bff;
        color: #fff;
        text-decoration: none;
        border-radius: 4px;
    }
</style>
</head>
<body>
<div class="container">
    <h1>Email Verification</h1>
    <p>Hello,</p>
    <p>${user}</p>
    <p>To verify your email, please click the following link: </p>
    <p><a href=${link} class="btn">Verify Email</a></p>
    <p>If you didn't request this, you can safely ignore this email.</p>
    <p>Best regards,<br>Creator of  ${projectTitle} 👻</p>
</div>
<div class="footer">
<p>This verification token will expire in 5mins.</p>
    <p>This email was sent by ${projectTitle}@JS.com</p>
    
</div>
</body>
</html>, // html body
    `,
    });

    console.log('Message sent: %s', info.messageId);
    // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

    //
    // NOTE: You can go to https://forwardemail.net/my-account/emails to see your email delivery status and preview
    //       Or you can use the "preview-email" npm package to preview emails locally in browsers and iOS Simulator
    //       <https://github.com/forwardemail/preview-email>
    //
}

export async function sendResetPasswordEmail(email: string, resetLink: string) {
    // send mail with defined transport object
    const info = await transporter.sendMail({
        from: `"${projectTitle} Support" <${projectTitle}@TS.com>`, // sender address
        to: email, // recipient
        subject: 'Reset Your Password', // Subject line
        html: `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Password Reset</title>
<style>
    body {
        font-family: Arial, sans-serif;
        margin: 0;
        padding: 0;
        background-color: #f4f4f4;
    }
    .container {
        max-width: 600px;
        margin: 20px auto;
        padding: 20px;
        background-color: #fff;
        border-radius: 8px;
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    }
    h1 {
        color: #333;
        text-align: center;
    }
    p {
        color: #666;
        line-height: 1.6;
    }
    .footer {
        margin-top: 20px;
        text-align: center;
        color: #999;
        font-size: 0.8em;
    }
    .btn {
        display: inline-block;
        padding: 10px 20px;
        background-color: #007bff;
        color: #fff;
        text-decoration: none;
        border-radius: 4px;
    }
</style>
</head>
<body>
<div class="container">
    <h1>Password Reset</h1>
    <p>Hello,</p>
    <p>We received a request to reset the password associated with this email address.</p>
    <p>If you did not make this request, you can safely ignore this email.</p>
    <p>To reset your password, please click the following link:</p>
    <p><a href="${resetLink}" class="btn">Reset Password</a></p>
    <p>This link will expire in 15 minutes for security reasons.</p>
    <p>If you're having trouble clicking the "Reset Password" button, copy and paste the URL below into your web browser:</p>
    <p>${resetLink}</p>
    <p>Best regards,<br>${projectTitle} Support</p>
</div>
<div class="footer">
    <p>This email was sent by ${projectTitle}@JS.com</p>
</div>
</body>
</html>`,
    });

    console.log('Message sent: %s', info.messageId);
}

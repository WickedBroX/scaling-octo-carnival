const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    secure: process.env.EMAIL_SECURE === 'true', // true for 465, false for other ports
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
});

const sendEmail = async ({ to, subject, html }) => {
    if (!process.env.EMAIL_HOST) {
        console.log('Mock Email Sent:', { to, subject });
        return;
    }

    try {
        const info = await transporter.sendMail({
            from: process.env.EMAIL_FROM || '"QuoteFlow" <noreply@wetalk.to>',
            to,
            subject,
            html,
        });
        console.log('Message sent: %s', info.messageId);
    } catch (error) {
        console.error('Error sending email:', error);
    }
};

const sendWelcomeEmail = async (email) => {
    await sendEmail({
        to: email,
        subject: 'Welcome to QuoteFlow!',
        html: `
            <h1>Welcome to QuoteFlow!</h1>
            <p>We are excited to have you on board. Start creating and sharing beautiful quotes today.</p>
            <p>Best,<br>The QuoteFlow Team</p>
        `
    });
};

module.exports = { sendEmail, sendWelcomeEmail };

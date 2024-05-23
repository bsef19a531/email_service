const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: {
        user: 'quatech.official@gmail.com',
        pass: 'pass'  // Replace with your Gmail app password
    }
});

app.post('/', async (req, res) => {
    const { name, email, phone, service, message } = req.body;

    if (!name || !email || !message) {
        return res.status(422).json({ error: 'Name, email, and message are required fields.' });
    }

    const mailOptions = {
        from: email,
        to: 'quatech.official@gmail.com',
        subject: `Contact Form Submission from ${name}`,
        text: `
        Name: ${name}
        Email: ${email}
        Phone: ${phone}
        Service: ${service}
        Message: ${message}
        `
    };

    const mailOptionsForClient = {
        from: 'quatech.official@gmail.com',
        to: email,
        subject: `Thank you for contacting Quatechnologies, ${name}!`,
        text: `
        Hi ${name},
        
        Thank you for contacting Quatechnologies! We have received your message and will get back to you as soon as possible.
        
        Best regards,
        Quatechnologies Team
        `
    };

    try {
        const infoForCompany = await transporter.sendMail(mailOptions);
        const infoForClient = await transporter.sendMail(mailOptionsForClient);
        console.log(`Email sent successfully to company: ${infoForCompany.response}`);
        console.log(`Email sent successfully to client: ${infoForClient.response}`);
        res.status(200).json({ message: 'Emails sent successfully' });
    } catch (error) {
        console.error('Error sending email:', error);
        res.status(500).json({ error: `An error occurred while sending the email --> ${error}` });
    }
});

module.exports = app;

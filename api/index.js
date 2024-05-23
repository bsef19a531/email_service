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
        pass: 'rdwxwspqfyaxfhbf'
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

    try {
        const info = await transporter.sendMail(mailOptions);
        console.log(`Email sent successfully: ${info.response}`);
        res.status(200).json({ message: 'Email sent successfully' });
    } catch (error) {
        console.error('Error sending email:', error);
        res.status(500).json({ error: `An error occurred while sending the email ${error}` });
    }
});

module.exports = app;

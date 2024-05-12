const nodemailer = require('nodemailer');
const env = require('dotenv').config();

// Configure Hostinger SMTP settings (replace with your credentials)
const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,  // Adjust if required based on Hostinger's configuration
    secure: true, // Adjust based on Hostinger's authentication method (TLS/STARTTLS)
    auth: {
        user: 'quatech.official@gmail.com',
        pass: '$Fantastic4'
    }
});

export default async function handler(req, res) {
    if (req.method === 'POST') {
        const { name, email, phone, service, message } = req.body;
        if (!name || !email || !message) {
            return res.status(422).json({ error: 'All fields are required' });
        }
        try {
            await sendEmail(name, email, phone, service, message);
            return res.status(200).json({ message: 'Email sent successfully' });
        } catch (error) {
            return res.status(500).json({ error: 'An error occurred while sending the email' });
        }
    } else {
        return res.status(405).json({ error: 'Method not allowed' });
    }

}

// Function to send email
async function sendEmail(name, email, phone, service, message) {
    const mailOptions = {
        from: email, // Sender email
        to: 'quatech.official@gmail.com',  // Recipient email (replace with actual address)
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
    } catch (error) {
        console.error('Error sending email:', error);
    }
}

// Example usage (assuming form data is retrieved elsewhere)
const name = 'John Doe';
const email = 'john.doe@example.com';
const phone = '123-456-7890';
const service = 'Web Development';
const message = 'This is a test message';

sendEmail(name, email, phone, service, message);

// functions/form-handler.js (Vercel Functions)
import nodemailer from 'nodemailer';

export default async function handler(req, res) {
    if (req.method === 'POST') {
        const { name, email, phone, service, message } = req.body;

        // Configure email sending (replace with your credentials)
        const transporter = nodemailer.createTransport({
            host: 'smtp.example.com',
            port: 587,
            secure: false, // Adjust based on your SMTP server configuration
            auth: {
                user: 'your_email@example.com',
                pass: 'your_password'
            }
        });

        // Create email content
        const emailContent = `
      Name: ${name}
      Email: ${email}
      Phone: ${phone}
      Service: ${service}
      Message: ${message}
    `;

        // Send the email
        const emailOptions = {
            from: 'your_email@example.com',
            to: 'recipient_email@example.com',
            subject: 'Contact Form Submission',
            text: emailContent
        };

        try {
            await transporter.sendMail(emailOptions);
            res.status(200).json({ message: 'Form submitted successfully!' });
        } catch (error) {
            console.error('Error sending email:', error);
            res.status(500).json({ message: 'Error submitting form' });
        }
    } else {
        res.status(405).json({ message: 'Method not allowed' });
    }
}

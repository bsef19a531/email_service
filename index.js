const nodemailer = require('nodemailer');
const sendEmail = require('./sendEmail');
const cors = require('cors');

// Configure CORS
const corsMiddleware = cors({
    methods: ['POST'],
    origin: '*',
});
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
    await corsMiddleware(req, res);
    if (req.method === 'POST') {
        const { name, email, phone, service, message } = req.body;
        if (!name || !email || !message) {
            return res.status(422).json({ error: 'All fields are required' });
        }
        try {
            await sendEmail(name, email, phone, service, message);
            return res.status(200).json({ message: 'Email sent successfully' });
        } catch (error) {
            return res.status(500).json({ error: `An error occurred while sending the email ${error}` });
        }
    } else {
        return res.status(405).json({ error: 'Method not allowed' });
    }
}

// Configure Hostinger SMTP settings (replace with your credentials)

// export default async function handler(req, res) {
//     if (req.method === 'POST') {
//         const { name, email, phone, service, message } = req.body;
//         if (!name || !email || !message) {
//             return res.status(422).json({ error: 'All fields are required' });
//         }
//         try {
//             await sendEmail(name, email, phone, service, message);
//             return res.status(200).json({ message: 'Email sent successfully' });
//         } catch (error) {
//             return res.status(500).json({ error: 'An error occurred while sending the email' });
//         }
//     } else {
//         return res.status(405).json({ error: 'Method not allowed' });
//     }

// }


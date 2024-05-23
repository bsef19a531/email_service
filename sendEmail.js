// Function to send email
async function sendEmail(name, email, phone, service, message, transporter) {

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

export default sendEmail;
const nodemailer = require('nodemailer');

const handleContact = async (req, res) => {
  const { name, email, message } = req.fields; // ✅ Use .fields for form-data

  if (!name || !email || !message) {
    return res.status(400).json({ error: 'All fields (name, email, message) are required.' });
  }

  try {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      }
    });

    const mailOptions = {
      from: email,
      to: process.env.EMAIL_USER,
      subject: `Message from ${name}`,
      text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`
    };

    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: 'Message sent successfully.' });

  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).json({ error: 'Something went wrong. Try again later.' });
  }
};

module.exports = { handleContact };

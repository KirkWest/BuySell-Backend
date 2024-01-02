const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER, // create an a gmail account for the app
    pass: process.env.EMAIL_PASSWORD
  }
});

const sendEmail = async (emailOptions) => {
  try {
    await transporter.sendMail(emailOptions);
    console.log('Email sent successfully');
  } catch (error) {
    console.error('Error whilst sending email:', error);
  }
};

module.exports = { sendEmail };
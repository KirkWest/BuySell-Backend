const { sendEmail } = require('../functions/emailService');

exports.sendGuestEmail = async (req, res) => {
  const { name, email, message, eventType, date } = req.body;

  if (!name || !email || !message || !eventType) {
    return res.status(400).json({
      message: "Please input all fields"
    });
  }

  // to auto fill subject with buy day or sell day depending on what button
  const subject = eventType == 'buy' ? "Buy Day" : "Sell Day";
  const emailBody = `Name: ${name}\nEmail: ${email}\nDate: ${date}\nMessage: ${message}`;

  const emailOptions = {
    from: "no-reply@tempemail.com", // add in my app email once set up
    to: process.env.ADMIN_EMAIL,
    subject,
    text: emailBody, // guest to infill the required information
    replyTo: email // Users email
  };

  try {
    await sendEmail(emailOptions);
    res.status(200).json({
      message: "Email sent successfully"
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: 
      "Error when sending your email"
    });
  }
};
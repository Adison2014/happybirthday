const express = require('express');
const path = require('path');
const nodemailer = require('nodemailer');

const app = express();

app.use(express.json()); // Middleware to parse JSON request bodies
app.use(express.static(path.join(__dirname, 'public'))); // Serve static files

// Serve the email.html file when accessing /email
app.get('/email', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'html', 'email.html')); // Path to email.html
});

// Serve the index.html file when the root URL is accessed
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'html', 'index.html')); // Path to index.html
});

// Configure Nodemailer transporter
const transporter = nodemailer.createTransport({
    service: 'Gmail', // Replace with your email service provider
    auth: {
        user: 'adisoncheruiyot55@gmail.com', // Replace with your email
        pass: 'siwkmdubcoqojgua' // Replace with your email password or app-specific password
    }
});

// Endpoint to trigger email notification for birthday wishes
app.post('/send-email', async (req, res) => {
  const { senderEmail } = req.body; // Expecting senderEmail in the request body

  // Predefined message
  const message = 'I just sent you a message! I want my gift'; // Customize your message

  // Email options
  const mailOptions = {
      from: senderEmail, // Sender's email address
      to: 'adisoncheruiyot55@gmail.com', // Replace with the recipient's email address
      subject: 'Notification from Happy Birthday Website',
      text: message // The predefined message content
  };

  try {
      await transporter.sendMail(mailOptions); // Send the email
      res.sendStatus(200); // Respond with a 200 OK status
  } catch (error) {
      console.error('Error sending email:', error);
      res.status(500).send('Failed to send email');
  }
});


// Endpoint to trigger email notification for birthday wishes
app.post('/send-gift', async (req, res) => {
    const { email } = req.body;

    const mailOptions = {
        from: 'adisoncheruiyot55@gmail.com', // Replace with your email
        to: email, // Recipient's email
        subject: 'Happy Birthday Gift!',
        text: 'You have received a special birthday gift! 🎁'
    };

    try {
        await transporter.sendMail(mailOptions); // Send email
        res.sendStatus(200); // Respond with a 200 OK status
    } catch (error) {
        console.error('Error sending gift email:', error);
        res.status(500).send('Failed to send gift notification');
    }
});


// Start the server
app.listen(3000, () => {
    console.log('Listening on port 3000');
});

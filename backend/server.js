// backend/server.js
require('dotenv').config(); // Load environment variables from .env file
const express = require('express');
const cors = require('cors');
const nodemailer = require('nodemailer');

const app = express();
const port = 3000; // You can use any port number you prefer

app.use(cors());
app.use(express.json());

// Replace these with your actual Gmail credentials (not recommended for production)
const email = 'ikoning@gmail.com';
const password = process.env.EMAIL_PASSWORD; // Access the environment variable


// Create a Nodemailer transporter using your Gmail account
const transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: email,
    pass: password,
  },
});

// API endpoint to place an order and send a secure email
app.post('/place-order', async (req, res) => {
  try {
    const orderData = req.body;
    console.log('Received orderData:', orderData); // Add this line for debugging

    const { items, totalOrderPrice } = orderData;

    // Create the email content
    const emailContent = `
      <h2>New Order</h2>
      <p>Order Items:</p>
      <ul>
        ${items.map(item => `<li>${item.name}: $${item.price}</li>`).join('')}
      </ul>
      <p>Total Price: $${totalOrderPrice}</p>
    `;

    // Set up the email options
    const mailOptions = {
      from: email,
      to: 'izzikoning@me.com', // Replace with the business owner's email
      subject: 'New Order Received',
      html: emailContent,
    };

    // Send the email
    await transporter.sendMail(mailOptions);
    console.log('mail sent');

    // Respond to the frontend with a success message
    res.json({ message: 'Order placed successfully!' });
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).json({ error: 'Error sending email' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

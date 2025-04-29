const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const twilio = require('twilio');
require('dotenv').config();

const app = express();
const PORT = 9000;

app.use(cors());
app.use(bodyParser.json());
app.use(express.static('public'));

const client = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);

app.post('/send-alert', async (req, res) => {
  console.log("Incoming POST:", req.body);
  const { fuel, vehicle } = req.body;

  const msg = ` Low Fuel Alert!\nVehicle: ${vehicle}\nRemaining Fuel: ${fuel}L`;

  try {
    const message = await client.messages.create({
      body: msg,
      from: process.env.TWILIO_FROM_NUMBER,
      to: process.env.TO_NUMBER
    });
    res.json({ message: 'Alert sent successfully!' });
  } catch (error) {
    console.error('SMS failed:', error.message);
    res.status(500).json({ message: 'Failed to send SMS' });
  }
});

app.listen(PORT, () => {
  console.log(` Server running at http://localhost:${PORT}`);
});

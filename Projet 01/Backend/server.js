const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
require('dotenv').config();
const cors = require('cors');
const app = express();
const port = 2000;

app.use(cors());
app.use(bodyParser.json());

const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com', 
    port:25,
    secure: false, 
    auth: {
        user: 'mengueeliel712@gmail.com', 
        pass: process.env.GMAIL_PASS
    }
});

app.post('/contact', (req, res) => {
    const { nom, prenom, adresse, object, message } = req.body;

    const mailOptions = {
        from: adresse, 
        to: 'mengueeliel712@gmail.com', 
        subject: object, 
        text: `Nom: ${nom}\nPrenom: ${prenom}\nAdresse: ${adresse}\nMessage: ${message}`
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return res.status(500).send({ error: 'Failed to send email.' });
        }
        res.send({ success: 'Email sent successfully!' + info.response});
    });
});

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});

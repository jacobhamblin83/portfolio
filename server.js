const express = require('express');
const app = express();
const bodyParser = require('body-parser');
app.use(bodyParser.json());
const config = require('./config.js');
const EMAIL_ACCOUNT_USER = config.email;
const EMAIL_ACCOUNT_PASSWORD = config.password;
const YOUR_NAME = config.name;

app.use(express.static(__dirname));

var message;
var count = 0;

const nodemailer = require('nodemailer');

// create reusable transporter object using the default SMTP transport

var smtpTransport = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: EMAIL_ACCOUNT_USER,
    pass: EMAIL_ACCOUNT_PASSWORD
  }
});

app.post('/api/contact', function(req, res, next) {
  var phoneNumber = req.body.phone;
  var numberArray = [];
  var numberMaker = function(num) {
    numberArray.push(num.toString().slice(0,3));
    numberArray.push(num.toString().slice(3,6));
    numberArray.push(num.toString().slice(6,10));
    return numberArray.join('-');
  }
  smtpTransport.sendMail({
    from: `${YOUR_NAME} ${EMAIL_ACCOUNT_USER}`,
    to: 'jacobhamblin83@gmail.com',
    subject: 'Message from Portfolio Site',
    text: `From: ${req.body.name} at ${req.body.email}. ${req.body.message}, and their phone number is ${numberMaker(phoneNumber)}`
  }, function(error, response) {
    if (error) {
      console.log(error);
      res.sendStatus(204);
    } else {
      res.sendStatus(200);
    }
    smtpTransport.close();
  });
});

app.listen(8080);
const express = require('express');
const router = express.Router();
const app = express();
const http = require('http');
const path = require('path');
const fs = require('fs');
const rateLimit = require("express-rate-limit");

require("dotenv").config();

app.use(express.static(path.join(__dirname, 'client', 'public')));
// app.use(express.static(path.join(__dirname, 'client', 'assets')));
app.use('/assets', express.static(path.join(__dirname, 'client', 'assets')));
app.use('/assets', express.static(path.join(__dirname, 'client', 'assets')));

const nodeMailer = require("nodemailer");
const host = "0.0.0.0";
const server = http.createServer(app);

server.listen(8081, host, () => {
   console.log("Server is listening on ", 8081);
});
app.use('/', router);
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
   res.sendFile(path.join(__dirname, 'client', 'index.html'));
});

const createAccountLimiter = rateLimit({
   windowMs: 60 * 60 * 1000, // 1 hour window
   max: 5, // start blocking after 5 requests
   message: "Too many emails sent from this IP, please try again after an hour"
});

app.post('/contact', createAccountLimiter, (req, res) => {
   const { name, email, subject, message } = req.body;
   console.log(name, email, subject, message)

   let transporter = nodeMailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false,
      requireTLS: true,
      auth: {
         user: process.env.EMAIL_ADDRESS,
         pass: process.env.EMAIL_PASSWORD
      }
   });

   let info = transporter.sendMail({
      from: process.env.EMAIL_ADDRESS,
      to: process.env.EMAIL_ADDRESS,
      subject: "来自" + name + "<" + email + "> 的消息: " + subject,
      text: message, // plain text body
      html: "<b>" + message +"</b>" // html body
   });

   res.send({});
});
const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const User = mongoose.model("UserData");
const crypto = require('crypto')
const Jwt = require("jsonwebtoken");
const { JWTTOKENS } = require("../config/key");
const Hash = require("bcryptjs");
const requirelogin = require("../middleware/protected");
const nodemailer = require("nodemailer");
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'leaf.madebywe@gmail.com',
    pass: 'nezk kvtc mdcc mpvn'
  }
});

router.get("/protected", requirelogin, (req, res) => {
  res.send("hello there");
});



router.post('/newuserdetails/:token', (req, res) => {
  const token = req.params.token;
  const { name, favouriteGenre } = req.body;

  const favouriteGenreTitles = favouriteGenre.map(item => item.title);

  User.findOne({ resetToken: token, expireToken: { $gt: Date.now() } })
    .then(user => {
      if (!user) {
        return res.status(422).json({ error: 'Session has expired or invalid token.' });
      }

      // Update user details
      user.name = name;
      user.favouriteGenre = favouriteGenreTitles;
      user.resetToken = undefined;
      user.expireToken = undefined;

      user.save().then((savedUser) => {
        const jwtToken = Jwt.sign({ _id: savedUser._id }, JWTTOKENS);
        res.json({
          token: jwtToken,
          user: { _id: savedUser._id, email: savedUser.email, pic: savedUser.pic, favourite: savedUser.favourite, favouriteGenre: savedUser.favouriteGenre , name:savedUser.name },
        });
      })
      .catch(err => {
        console.log(err);
        res.status(500).json({ error: 'An error occurred while saving user details.' });
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ error: 'An error occurred while verifying token.' });
    });
});

router.post('/signin', (req, res) => {
  const { email, password } = req.body;
  
  if (!email || !password) {
    return res.status(422).json({ error: "Please add email and password." });
  }

  User.findOne({ email }).then((savedUser) => {
    if (!savedUser) {
      // Register new user
      Hash.hash(password, 12).then((hashedPassword) => {
        const newUser = new User({
          email,
          password: hashedPassword,
        });

        newUser.save()
          .then((user) => {
            // Generate a token for email verification
            crypto.randomBytes(32, (err, buffer) => {
              if (err) {
                console.log(err);
                return res.status(500).json({ error: 'An error occurred while generating verification token.' });
              }
              
              const token = buffer.toString('hex');
              user.resetToken = token;
              user.expireToken = Date.now() + 1800000; // 30 minutes
              
              user.save().then(() => {
                // Send verification email
                transporter.sendMail({
                  to: user.email,
                  from: 'no-reply@flicksee.com',
                  subject: 'Email Verification',
                  html: `
                    <h2>Welcome to World of Vast Collection of Movies and TV shows !</h2>
                    <p>Click <a href='http://localhost:3000/newuserdetail/${token}'>here</a> to verify your account.</p>
                  `,
                });

                // Respond with success
                res.json({ message: "Verification email has been sent successfully." });
              })
              .catch(err => {
                console.log(err);
                res.status(500).json({ error: 'An error occurred while saving user data.' });
              });
            });
          })
          .catch(err => {
            console.log(err);
            res.status(500).json({ error: 'An error occurred while saving new user.' });
          });
      })
      .catch(err => {
        console.log(err);
        res.status(500).json({ error: 'An error occurred while hashing password.' });
      });
    } else {
      // User exists, check password
      Hash.compare(password, savedUser.password)
        .then((doMatch) => {
          if (doMatch) {
            const token = Jwt.sign({ _id: savedUser._id }, JWTTOKENS);
            const { _id, email, pic,favourite } = savedUser;
            res.json({
              token,
              user: { _id, email, pic , favourite},
            });
          } else {
            res.status(422).json({ error: "Invalid email or password." });
          }
        })
        .catch(err => {
          console.log(err);
          res.status(500).json({ error: 'An error occurred please try again after some time.' });
        });
    }
  })
  .catch(err => {
    console.log(err);
    res.status(500).json({ error: 'An error occurred while finding user.' });
  });
});

module.exports = router;

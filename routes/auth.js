const router = require('express').Router();
const bcrypt = require('bcryptjs');
const User = require('../models/User.model');
const Profile = require('../models/Profile.model');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const {isAuthenticated} = require('./../middleware/jwt.js');

const saltRounds = 10;

let mailTransporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL,
        pass: process.env.EMAIL_PASSWORD
    }
});

router.post('/signup', (req, res, next) => {
    const {email, password, username} = req.body;
    if (email === '' || password === '' || username === '') {
        res.status(400).json({message: "email, password and name are required."});
        return;
    }

    const regex_email = /^\S+@\S+\.\S+$/;
    if (!regex_email.test(email)) {
        res.status(400).json({message: 'email is not valid.'});
        return;
    }

    const regex = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/;
    if (!regex.test(password)) {
        res.status(400).json({message: 'Password needs to have at least 6 chars and must contain at least one number, one lowercase and one uppercase letter.'});
        return;
    }

    User.findOne({email})
        .then((foundUser) => {

            if (foundUser) {
                res.status(400).json({message: "User already exists."});
                return;
            }

            const salt = bcrypt.genSaltSync(saltRounds);
            const password_hash = bcrypt.hashSync(password, salt);
            const verification_hash = bcrypt.hashSync(email + username, salt).replace(/\//g, "");

            User.create({email, password_hash, username, verification_hash})
                .then((createdUser) => {
                    res.status(201).json(createdUser)
                    Profile
                        .create({username: createdUser.username, email: createdUser.email})
                        .then(profile => {
                            User.findByIdAndUpdate(createdUser._id, {$push: {profile: profile._id}}, {new: true})
                                .then(() => {
                                    const {email, username, verification_hash} = createdUser;
                                    let mailDetails = {
                                        from: process.env.EMAIL,
                                        to: email,
                                        subject: 'E-Mail verification',
                                        text: `Dear ${username},\nYou're almost ready to get started.\nPlease click the link below to verify your email address and be part of Ironslack!\n\n${process.env.ORIGIN}verification/${verification_hash}\n\nCheers,\nIronslack`
                                    };

                                    mailTransporter.sendMail(mailDetails, function (err, data) {
                                        if (err) {
                                            console.log('Error Occurs while sending the email');
                                        } else {
                                            console.log('Email sent successfully');
                                        }
                                    });
                                })
                        })
                        .catch(err => res.status(500).json({message: "Internal Server Error."}))
                })
                .catch(err => res.status(500).json({message: "Internal Server Error."}))

        })
        .catch(err => {
            console.log(err);
            res.status(500).json({message: "Internal Server Error."})
        });
});

router.post('/login', (req, res, next) => {
    const {email, password} = req.body

    if (email === '' || password === '') {
        res.status(400).json({message: "email and password are required."});
        return;
    }

    User.findOne({email})
        .then(foundUser => {
            if (!foundUser) {
                res.status(400).json({message: "Credentials are not correct."});
                return;
            }
            const passwordCorrect = bcrypt.compareSync(password, foundUser.password_hash)
            if (passwordCorrect) {
                const {_id, email, username} = foundUser
                const payload = {_id, email, username}

                const authToken = jwt.sign(
                    payload,
                    process.env.TOKEN_SECRET,
                    {algorithm: 'HS256', expiresIn: '12h'}
                )
                res.status(200).json({authToken: authToken})
            } else {
                res.status(401).json({message: "Credentials are not correct."});

            }
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({message: "Internal Server Error."})
        })
});

router.get('/verification/:hash', (req, res, next) => {
    User.findOneAndUpdate({verification_hash: req.params.hash}, {is_verified: true})
        .populate('profile')
        .then(foundUser => {
            Profile.findByIdAndUpdate(foundUser.profile._id, {is_verified: true}, {new: true})
                .then(profile => console.log(profile))
            console.log('user is verified', foundUser);
            res.status(200).json({message: `Dear ${foundUser.username}, you have verified your email successfully.`})
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({message: "Internal Server Error."})
        })
});

router.get('/verify', isAuthenticated, (req, res, next) => {
    res.status(200).json(req.payload)
});

module.exports = router;
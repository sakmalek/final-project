const router = require('express').Router();
const bcrypt = require('bcryptjs');
const User = require('../models/User.model');
const jwt = require('jsonwebtoken');
const {isAuthenticated} = require('./../middleware/jwt.js');

const saltRounds = 10;

router.post('/signup', (req, res, next) => {
    const {email, password, username} = req.body;

    if (email === '' || password === '' || username === '') {
        res.status(400).json({message: "email, password and name are required."});
        return;
    }

    const emailValid = email.includes('@')
    if (!emailValid) {
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
            const verification_hash = bcrypt.hashSync(email + username, salt).replace('/', '');

            return User.create({email, password_hash, username, verification_hash});
        })
        .then((createdUser) => {

            const {email, username, _id} = createdUser;
            const user = {email, username, _id};

            res.status(201).json({user: user});
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
                res.status(400).json({message: "User not found."});
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
                res.status(401).json({message: "Unable to authenticate user."});

            }
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({message: "Internal Server Error."})
        })
});

router.get('/verification/:hash', (req, res, next) => {
    User.findOneAndUpdate({verification_hash: req.params.hash}, {is_verified: true})
        .then(foundUser => {
            console.log(foundUser)
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
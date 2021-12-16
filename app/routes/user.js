const router = require("express").Router();
const User = require("../models/User.model")

router.get("/", (req, res, next) => {

    User.find()
        .populate('profile')
        .then(users => {
            res.status(200).json(users);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({message: "Internal Server Error."})
        })
});

router.get("/:id", (req, res, next) => {

    User.findById(req.params.id)
        .populate('profile')
        .then(user => {
            res.status(200).json(user);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({message: "Internal Server Error."})
        })
});

module.exports = router;

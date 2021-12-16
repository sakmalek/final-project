const router = require("express").Router();
const Profile = require("../models/Profile.model")

router.get("/", (req, res, next) => {

    Profile.find()
        .then(profiles => {
            res.status(200).json(profiles);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({message: "Internal Server Error."})
        })
});

router.get("/:id", (req, res, next) => {

    Profile.findById(req.params.id)
        .then(profile => {
            res.status(200).json(profile);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({message: "Internal Server Error."})
        })
});

router.put("/", (req, res, next) => {

    const {
        firstname,
        lastname,
        username,
        email,
        birthday,
        bio,
        interests,
        image_url,
        is_verified,
    } = req.body;

    Profile.create({
        firstname,
        lastname,
        username,
        email,
        birthday,
        bio,
        interests,
        image_url,
        is_verified,
    })
        .then(profile => {
            res.status(200).json({message: "profile successfully created."});
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({message: "Internal Server Error."})
        })
});

router.post("/:id", (req, res, next) => {

    const {
        firstname,
        lastname,
        username,
        email,
        birthday,
        bio,
        interests,
        image_url,
        is_verified,
    } = req.body;

    Profile.findOneAndUpdate(req.params.id, {
        firstname,
        lastname,
        username,
        email,
        birthday,
        bio,
        interests,
        image_url,
        is_verified,
    })
        .then(profile => {
            res.status(200).json({message: "profile successfully updated."});
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({message: "Internal Server Error."})
        })
});

router.delete("/:id", (req, res, next) => {

    Profile.findOneAndDelete(req.params.id)
        .then(profile => {
            res.status(200).json({message: "profile successfully deleted."});
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({message: "Internal Server Error."})
        })
});

module.exports = router;

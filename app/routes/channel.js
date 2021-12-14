const router = require("express").Router();
const Channel = require("../models/Channel.model")

router.get("/", (req, res, next) => {

    Channel.find()
        .then(channels => {
            res.status(200).json(channels);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({message: "Internal Server Error."})
        })
});

router.get("/:id", (req, res, next) => {

    Channel.findById(req.params.id)
        .then(channel => {
            res.status(200).json(channel);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({message: "Internal Server Error."})
        })
});

router.put("/", (req, res, next) => {

    const {name, description, owner_id} = req.body;
    Channel.create({name, description})
        .then(channel => {
            res.status(200).json({message: "channel successfully created."});
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({message: "Internal Server Error."})
        })
});

router.post("/:id", (req, res, next) => {

    const {name, description} = req.body;
    Channel.findOneAndUpdate(req.params.id, {name, description})
        .then(channel => {
            res.status(200).json({message: "channel successfully updated."});
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({message: "Internal Server Error."})
        })
});

router.delete("/:id", (req, res, next) => {

    Channel.findOneAndDelete(req.params.id)
        .then(channel => {
            res.status(200).json({message: "channel successfully deleted."});
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({message: "Internal Server Error."})
        })
});


module.exports = router;

const router = require("express").Router();
const Message = require("../models/Message.model");
const Channel = require("../models/Channel.model");

router.get("/:id/channel", (req, res, next) => {
    Message.find({channel_id: req.params.id})
        .then(messages => {
            res.status(200).json(messages);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({message: "Internal Server Error."})
        })
});

router.get("/:id/sender", (req, res, next) => {

    Message.find({sender_id: req.params.id})
        .then(messages => {
            res.status(200).json(messages);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({message: "Internal Server Error."})
        })
});

router.get("/:id/receiver", (req, res, next) => {

    Message.find({conversation_id: req.params.id})
        .then(messages => {
            res.status(200).json(messages);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({message: "Internal Server Error."})
        })
});
module.exports = router;

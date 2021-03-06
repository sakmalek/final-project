const User = require("../models/User.model");
const router = require("express").Router();
const Message = require("../models/Message.model")

router.get("/", (req, res, next) => {

    Message.find()
        .then(messages => {
            res.status(200).json(messages);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({message: "Internal Server Error."})
        })
});

router.get("/:id/channel", (req, res, next) => {

    Message.find({channel_id: req.params.id})
        .populate('sender_id')
        .populate('channel_id')
        .then(messages => {
            res.status(200).json(messages);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({message: "Internal Server Error."})
        })
});
router.get("/:id/conversation", (req, res, next) => {

    Message.find({conversation_id: req.params.id})
        .populate('sender_id')
        .populate('channel_id')
        .then(messages => {
            res.status(200).json(messages);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({message: "Internal Server Error."})
        })
});
router.put("/", (req, res, next) => {

    const {sender_id, conversation_id, channel_id, type, source} = req.body;
    Message.create({sender_id, conversation_id, channel_id, type, source})
        .then(channel => {
            res.status(200).json({message: "channel successfully created."});
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({message: "Internal Server Error."})
        })
});

router.post("/:id", (req, res, next) => {

    const {sender_id, conversation_id, channel_id, type, source} = req.body;
    Message.findOneAndUpdate(req.params.id, {sender_id, conversation_id, channel_id, type, source})
        .then(channel => {
            res.status(200).json({message: "channel successfully updated."});
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({message: "Internal Server Error."})
        })
});

router.delete("/:id", (req, res, next) => {

    Message.findOneAndDelete(req.params.id)
        .then(channel => {
            res.status(200).json({message: "channel successfully deleted."});
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({message: "Internal Server Error."})
        })
});


module.exports = router;

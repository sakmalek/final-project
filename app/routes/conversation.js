const router = require("express").Router();
const Conversation = require("../models/Conversation")

router.get("/", (req, res, next) => {

    Conversation.find().populate("receiver_id")
        .then(conversations => {
            res.status(200).json(conversations);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({message: "Internal Server Error."})
        })
});

router.put("/", (req, res, next) => {

    const {owner_id, receiver_id} = req.body;
    Conversation.create({owner_id, receiver_id})
        .then(channel => {
            res.status(200).json({message: "channel successfully created."});
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({message: "Internal Server Error."})
        })
});

router.delete("/:id", (req, res, next) => {

    Conversation.findOneAndDelete(req.params.id)
        .then(channel => {
            res.status(200).json({message: "conversation successfully deleted."});
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({message: "Internal Server Error."})
        })
});


module.exports = router;

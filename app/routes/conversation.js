const router = require("express").Router();
const Conversation = require("../models/Conversation")

router.get("/:id", (req, res, next) => {

    Conversation.find({$or: [{user_1_id: req.params.id}, {user_2_id: req.params.id}]})
        .populate("user_1_id")
        .populate("user_2_id")
        .then(conversations => {
            res.status(200).json(conversations);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({message: "Internal Server Error."})
        })
});

router.put("/", (req, res, next) => {

    const {user_1_id, user_2_id} = req.body;
    Conversation.create({user_1_id, user_2_id})
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

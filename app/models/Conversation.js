const {Schema, model} = require("mongoose");

const conversationSchema = new Schema(
        {
            owner_id: {
                type: Schema.Types.ObjectId,
                ref: 'User',
            },
            receiver_id: {
                type: Schema.Types.ObjectId,
                ref: 'User',
            },
        },
        {
            timestamps: true,
        }
    );

const Conversation = model("Conversation", conversationSchema);

module.exports = Conversation;

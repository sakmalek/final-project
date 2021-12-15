const {Schema, model} = require("mongoose");

const conversationSchema = new Schema(
    {
        user_1_id: {
            type: Schema.Types.ObjectId,
            ref: 'User',
        },
        user_2_id: {
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

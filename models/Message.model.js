const {Schema, model} = require("mongoose");

const messageSchema = new Schema(
        {
            sender_id: {
                type: Schema.Types.ObjectId,
                ref: 'User',
            },
            conversation_id: {
                type: Schema.Types.ObjectId,
                ref: 'Conversation',
            },
            channel_id: {
                type: Schema.Types.ObjectId,
                ref: 'Channel',
            },
            type: {
                type: String,
                enum: ["text", "image", "video", "audio", "code"],
            },
            source: {
                type: String,
            }
        },
        {
            timestamps: true,
        }
    )
;

const Message = model("Message", messageSchema);

module.exports = Message;

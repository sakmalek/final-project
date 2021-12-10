const {Schema, model} = require("mongoose");

const channelSchema = new Schema(
        {
            name: {
                type: String,
                required: true,
                trim: true,
            },
            description: {
                type: String,
                trim: true,
            },
            owner_id: {
                type: Schema.Types.ObjectId,
                ref: 'User',
            },
            follower_ids: {
                type: [Schema.Types.ObjectId],
                ref: 'User',
            },
        },
        {
            timestamps: true,
        }
    )
;

const Channel = model("Channel", channelSchema);

module.exports = Channel;

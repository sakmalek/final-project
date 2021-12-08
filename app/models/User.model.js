const {Schema, model} = require("mongoose");

const userSchema = new Schema(
        {
            email: {
                type: String,
                required: [true, "Email is required."],
                match: [/^\S+@\S+\.\S+$/, "Please use a valid email address."],
                unique: true,
                lowercase: true,
                trim: true
            },
            username: {
                type: String,
                required: [true, "Username is required."],
            },
            password_hash: {
                type: String,
                required: [true, "Password is required."]
            },
            image_url: {
                type: String,
            },
            is_verified: {
                type: Boolean,
                default: false,
            },
            verification_hash: {
                type: String,
            },
            last_seen: {
                type: String
            },
            is_online: {
                type: Boolean,
                default: false,
            },
            profile: {
                type: Schema.Types.ObjectId,
                ref: 'Profile',
            }
        },
        {
            timestamps: true,
        }
    )
;

const User = model("User", userSchema);

module.exports = User;

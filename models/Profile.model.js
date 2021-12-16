const {Schema, model} = require("mongoose");

const profileSchema = new Schema(
        {
            firstname: {
                type: String,
                trim: true,
            },
            lastname: {
                type: String,
                trim: true,
            },
            username: {
                type: String,
                required: [true, "Username is required."],
                trim: true,
            },
            email: {
                type: String,
                required: [true, "Email is required."],
                match: [/^\S+@\S+\.\S+$/, "Please use a valid email address."],
                lowercase: true,
                trim: true
            },
            birthday: {
                type: Date,
            },
            bio: {
                type: String,
                max: 100,
                trim: true,
            },
            interests: {
                type: [String],
                trim: true,
            },
            follower_ids: {
                type: [Schema.Types.ObjectId],
                ref: 'User',
            },
            image_url: {
                type: String,
                default: "https://lh3.googleusercontent.com/KMS53aCaUNmCbZXPEAxko9kpg0t8ylgFiM1hTgfLHmEbzk0yHvpLavdoJyLes8plfWlEfwCnYxKTDm3EQk-EAj1GEyV7tLeHTpUD=s0"
            },
            github_username: {
                type: String,
                trim: true,
            },
            is_verified: {
                type: Boolean,
                default: false
            },
        },
        {
            timestamps: true,
        }
    )
;

const Profile = model("Profile", profileSchema);

module.exports = Profile;

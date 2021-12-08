const {Schema, model} = require("mongoose");

const profileSchemaSchema = new Schema(
        {
            firstname: {
                type: String,
            },
            lastname: {
                type: String,
            },
            username: {
                type: String,
                required: [true, "Username is required."],
            },
            email: {
                type: String,
                required: [true, "Email is required."],
                match: [/^\S+@\S+\.\S+$/, "Please use a valid email address."],
                lowercase: true,
                trim: true
            },
            birthday: {
                type: Date(),
            },
            image_url: {
                type: String,
            },
            github_username: {
                type: String,
            }
        },
        {
            timestamps: true,
        }
    )
;

const Profile = model("Profile", profileSchema);

module.exports = Profile;

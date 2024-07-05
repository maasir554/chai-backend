import { Model, Schema } from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const userSchema = new Schema(
    {
        username: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,
            index: true
        },

        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,
        },

        fullname: {
            type: String,
            required: true,
            lowercase: true,
            trim: true,
        },

        avatar: {
            type: String,  //url from some cloud service
            required: true,
        },

        coverImage: {
            type: String, // URL from some cloud service
            required: false // false ki jagha yeh property nahi hii likhte toh bhii chalta 
        },

        watchHistory: [
            {
                type: Schema.Types.ObjectId,
                ref: "Video"
            }
        ],

        password: {
            type: String,
            required: [true, "Password is required."]
        },

        refreshToken: {
            type: String
        }
    },
    {
        timestamps: true
    }
);
// encrypt password before saving object
userSchema.pre("save", async function (next) {
    if (this.isModified("password")) this.password = await bcrypt.hash(this.password, 10); // but only change this if password is changed
    next();
});

//add a method that checks if the given password is same as the encrypted, saved pasword in database
userSchema.methods.isPasswordCorrect = async function (password) {

    return await bcrypt.compare(password, this.password)
}

/** method for generating access token */
userSchema.methods.generateAccessToken = function () {
    return jwt.sign(
        {
            _id: this._id,
            username: this, username,
            email: this, enail,
            fullname: this.fullname
        },
        
        process.env.ACCESS_TOKEN_SECRET,
        
        {
            expiresIn: process.env.ACCESS_TOKEN_EXPIRY
        }
    )
}
/** method for generating refresh tooken */
userSchema.methods.generateRefreshToken = function () {
    return jwt.sign(
        {
            _id: this._id
        },
        
        process.env.REFRESH_TOKEN_SECRET,
        
        {
            expiresIn: process.env.REFRESH_TOKEN_EXPIRY
        }
    )
}

export const Users = Model("User", userSchema);

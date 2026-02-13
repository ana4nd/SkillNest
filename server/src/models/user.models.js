import { Schema } from "mongoose";
import mongoose from "mongoose";
import bcrypt from "bcrypt";
import crypto from "crypto";
import jwt from "jsonwebtoken";

const userSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    fullName: {
      type: String,
      trim: true,
    },
    password: {
      type: String,
      required: [true, "Password is required"],
    },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
    enrolledCourses:[
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Course",
      }
    ],
    refreshToken: {
      type: String,
    },
  },
  {
    timestamps: true,
  },
);

userSchema.pre("save", async function(){
    if(!this.isModified("password")) return;
    this.password = await bcrypt.hash(this.password, 10);
});

userSchema.methods.isPasswordCorrect = async function(password){
    return await bcrypt.compare(password, this.password);
}

userSchema.methods.generateAccessToken = function(){
    return jwt.sign(
        {
            _id: this._id,
            email: this.email,
            role: this.role,
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn: process.env.ACCESS_TOKEN_EXPIRY
        },
    );
};


userSchema.methods.generateRefreshToken = function (){
    return jwt.sign(
        {
            _id: this._id,
            role: this.role,
        },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn: process.env.REFRESH_TOKEN_EXPIRY
        },
    );
};

/*-----Method for generating tokens for email Verification, password reset etc ------*/

userSchema.methods.generateTemporaryToken = function (){
    // for email verification unHashedToken should go into the user's mail
    const unHashedToken = crypto.randomBytes(20).toString("hex");

    // This should stay in the DB to compare at the time of verification

    const hashedToken = crypto
        .createHash("sha256")
        .update(unHashedToken)
        .digest("hex");
    
    // This is the expiry time for the token (20 minutes)

    const tokenExpiry = Date.now() + (20*60*1000); // 20 minutes

    return { unHashedToken, hashedToken, tokenExpiry};
};



export const User = mongoose.model("User", userSchema);




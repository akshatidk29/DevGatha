import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    fullName: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
    },
    achievements: [
      {
        title: String,
        description: String,
        date: {
          type: Date,
          default: Date.now,
        },
      },
    ],
    recentActivities: [
      {
        title: String,       
        description: String,
        date: {
          type: Date,
          default: Date.now,  
        },
      },
    ],
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

export default User;

import mongoose from "mongoose";
import { randomUUID } from "crypto";
const chatsSchema = new mongoose.Schema({
  id: {
    type: String,
    default: randomUUID(),
  },
  role: {
    type: String,
    require: true,
  },
  content: {
    type: String,
    required: true,
  },
});
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  otp:{
    type:String,
  },
  otpexpiry:{
    type:Date,
  },
  chats: [chatsSchema],
});

export default mongoose.model("usersModel",userSchema)
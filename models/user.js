import mongoose from "mongoose";

const userSchema = new mongoose.Schema({

  fullName:{
    type:String,
    required:true
  },

  email:{
    type:String,
    required:true,
    unique:true
  },

  password:{
    type:String,
    required:true
  },

  role:{
    type:String,
    default:"user"
  },

  profileImage:{
    type:String,
    default:"/public/images/Default.avif"
  }

},{timestamps:true});

export default mongoose.model("User",userSchema);
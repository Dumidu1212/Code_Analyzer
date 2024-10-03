import mongoose from "mongoose"


const userSchema = new mongoose.Schema({

    userName:{type:String,unique:true},
    email:{type:String, required:true,unique:true},
    password:{type:String},
    mobileNumber:{type:String},
    role:{type:String, default:"user"},
    profileImg:{type:String},
    occupation :{type:String},
    status:{type:String,default:"Active"}

},{timestamps:true})

const User = mongoose.model("User",userSchema);

export default User;
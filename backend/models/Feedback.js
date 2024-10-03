import mongoose from "mongoose"


const feedbackSchema = new mongoose.Schema({

    title:{type:String},
    description:{type:String},
    userId :{type:String},

},{timestamps:true})

const Feedback = mongoose.model("Feedback",feedbackSchema);

export default Feedback;
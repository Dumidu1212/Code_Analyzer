import express from "express";
import FeedBack from "../models/Feedback.js";

const router = express.Router(); 

router.post("/saveFeedback", async (req, res) => {
    const {title,description,userId} = req.body;
  
    console.log(req.body);

    const newFeedback = new FeedBack({
     title,
     description,
     userId
    });
  
    await newFeedback.save();
    return res.json({ status: true, message: "Feedback Added successfully" });
  });

  router.get("/feedbacks", (req, res) => {
    FeedBack.find({})
      .then((feedbacks) => {
        res.json(feedbacks);
      })
      .catch((err) => {
        res.json(err);
      });
  });


  router.delete("/deleteFeedback/:id", async (req, res) => {
    const { id } = req.params;
  
    try {
  
      const feedback = await FeedBack.findById(id);
      if (!feedback) {
        return res.status(404).json({ status: false, message: "feedback not found" });
      }
  
  
      await FeedBack.findByIdAndDelete(id);
      return res.json({ status: true, message: "Feedback deleted successfully" });
    } catch (error) {
      console.error("Error deleting feedback:", error);
      return res
        .status(500)
        .json({ status: false, message: "Internal server error" });
    }
  });

  router.post('/updateFeedback/:id', async (req, res) => {

    const {id} = req.params
    const {title,description,userId}=req.body;
    try{
      await FeedBack.findByIdAndUpdate({_id:id},{title:title,description:description,userId:userId})
      return res.json({status:true,message:'Feedback updated successfully'});
  
    }
    catch(error){
      console.log(error);
    }
  
  
  })
  router.get("/getFeedbackById/:id", async (req, res) => {
    const id = req.params.id; // Extract the id properly
    console.log(`Received ID: ${id}`); // Log the ID for debugging
  
    try {
      const feedback = await FeedBack.findById(id); // Correct findById usage
      if (!feedback) {
        return res.status(404).json({ error: "Feedback not found" });
      }
      res.json({
        title: feedback.title,
        description: feedback.description,
        userId: feedback.userId,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal server error" });
    }
  });
  

  export default router;

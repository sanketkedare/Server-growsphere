const express = require("express");
const Invester = require("../Model/invester");

const investerRouter = express.Router();

const mongoose = require("mongoose");

investerRouter.get('/', async(req,res)=>{
  try 
  {
    const data = await Invester.find({},{password: 0})
    res.status(200).json(data);
    
  } 
  catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
})

investerRouter.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    // Validate ID format
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid ID format" });
    }

    // Fetch data from the database
    const data = await Invester.findOne({_id : id});

    // Check if data exists
    if (!data) {
      return res.status(404).json({ message: "Investor not found" });
    }

    // Respond with the fetched data
    res.status(200).json(data);
  } catch (error) {
    // Handle errors (e.g., invalid ID format, server issues)
    res.status(500).json({ message: "Server error", error: error.message });
  }
});


module.exports = investerRouter;

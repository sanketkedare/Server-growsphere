const express = require("express");
const Employee = require("../Model/employee");

const employeeRouter = express.Router();

employeeRouter.get("/",async(req,res)=>{
    try 
    {
      const data = await Employee.find({},{password: 0})
      res.status(200).json(data);
      
    } 
    catch (error) {
      res.status(500).json({ message: "Server error", error: error.message });
    }
  })


module.exports = employeeRouter;
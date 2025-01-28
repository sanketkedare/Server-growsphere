const express = require('express');
const mongoose = require('mongoose');
const Employee = require('../Model/employee');
const Company = require('../Model/company');
const Invester = require('../Model/invester');
const { INVESTER, COMPANY, EMPLOYEE } = require('../Utils/constants');

const communityRouter = express.Router();

communityRouter.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { body, userType } = req.body;

  try {
    // Validate the ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ success: false, message: 'Invalid ID format' });
    }

    const objectId = new mongoose.Types.ObjectId(id);

    // Determine the model based on userType
    let Model;
    if (userType === INVESTER) Model = Invester;
    else if (userType === COMPANY) Model = Company;
    else if (userType === EMPLOYEE) Model = Employee;
    else {
      return res.status(400).json({ success: false, message: 'Invalid userType' });
    }

    // Fetch the specific document
    const data = await Model.findById(objectId);
    if (!data) {
      return res.status(404).json({ success: false, message: 'Data not found' });
    }

    // Update the connections field
    data.connections = body; // Assuming body contains the connections
    await data.save();

    res.status(200).json({ success: true, message: 'Updated successfully' });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

module.exports = communityRouter;

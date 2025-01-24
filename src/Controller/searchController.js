const mongoose = require('mongoose'); // Import mongoose
const Employee = require("../Model/employee");
const Company = require("../Model/company");
const Invester = require("../Model/invester");

// Helper functions to fetch data
const getInvesters = async () => await Invester.find();
const getCompanys = async () => await Company.find();
const getEmployees = async () => await Employee.find();

const suggestionByName = async (req, res) => {
  try {
    // Fetch fresh data dynamically
    const investers = await getInvesters();
    const company = await getCompanys();
    const employee = await getEmployees();

    const { name } = req.body;
    console.log(name)

    // Initialize the response structure
    const suggestion = { investers: [], company: [], employee: [] };

    if (name && name.length > 0) {
      const searchText = name.toLowerCase();

      // Filter data based on the name (case-insensitive comparison)
      suggestion.investers = investers.filter((i) =>  i.name.toLowerCase().startsWith(searchText.toLowerCase()));
      suggestion.company = company.filter((i) =>  i.name.toLowerCase().startsWith(searchText.toLowerCase()));
      suggestion.employee = employee.filter((i) =>  i.name.toLowerCase().startsWith(searchText.toLowerCase()));
    }

    res.status(200).json({ success: true, data: suggestion });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const suggestionByEmail = async (req, res) => 
{
  const { email } = req.body;
  try {
     // Fetch fresh data dynamically
     const investers = await getInvesters();
     const company = await getCompanys();
     const employee = await getEmployees();

    // Initialize the response structure
    const suggestion = { investers: [], company: [], employee: [] };

    // Filter data based on the name (case-insensitive comparison)
    suggestion.investers = investers.filter((i) => i.email.toLowerCase() === email.toLowerCase());
    suggestion.company = company.filter((i) => i.email.toLowerCase() === email.toLowerCase());
    suggestion.employee = employee.filter((i) => i.email.toLowerCase() === email.toLowerCase());
    
    res.status(200).json({ success: true, data: suggestion });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const suggectionByLocation = async(req,res)=>{
    const { location } = req.body;
    try {
       // Fetch fresh data dynamically
       const investers = await getInvesters();
       const company = await getCompanys();
  
      // Initialize the response structure
      const suggestion = { investers: [], company: []};
  
      // Filter data based on the name (case-insensitive comparison)
      suggestion.investers = investers.filter((i) => i.contactDetails.location.toLowerCase() === location.toLowerCase());
      suggestion.company = company.filter((i) => i.location.toLowerCase() === location.toLowerCase());
      
      res.status(200).json({ success: true, data: suggestion });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
}


const suggestionById = async (req, res) => {
  const { id } = req.params;

  try {
    // Convert the id from params to ObjectId
    const objectId = new mongoose.Types.ObjectId(id);

    // Fetch all data concurrently
    const [investers, companies, employees] = await Promise.all([
      getInvesters(),
      getCompanys(),
      getEmployees(),
    ]);

    // Find the matching data (compare ObjectId)
    const data =
      investers.find((i) => i._id.equals(objectId)) ||
      companies.find((i) => i._id.equals(objectId)) ||
      employees.find((i) => i._id.equals(objectId));

    // If no data is found, return early
    if (!data) {
      return res.status(200).json({ success: false, message: "No data found" });
    }

    // If data is found, return it
    return res.status(200).json({ success: true, data });
  } catch (error) {
    // Handle invalid ObjectId or other errors
    return res.status(500).json({ success: false, error: error.message });
  }
};



module.exports = { suggestionByName, suggestionByEmail, suggectionByLocation , suggestionById};

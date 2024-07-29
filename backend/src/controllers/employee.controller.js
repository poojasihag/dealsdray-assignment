import { Employee } from "../models/employee.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import {generateEmployeeId } from "../utils/genereateEmployeeId.js";

// Create a new employee
export const createEmployee = asyncHandler(async (req, res) => {
    try {
        console.log(req.body);
      const { name, email, mobile, designation, gender, course, active } = req.body;
  
      if (!name || !email || !mobile || !designation || !gender || !course) {
        throw new ApiError(400, "All fields are required!");
      }
  
      const existedUser = await Employee.findOne({
        $or: [{ mobile }, { email }],
      });
      if (existedUser) throw new ApiError(409, "Employee already exists!");

      let image;
      if (
          req.files &&
          Array.isArray(req.files.image) &&
          req.files.image.length > 0
        ) {
            image = req.files.image[0].path;
        }
        
        if (!image) throw new ApiError(400, "User image is required!");
        
        console.log("hvbv");
      const userImage = await uploadOnCloudinary(image);
      if (!userImage) throw new ApiError(400, "Image file is required");
  
      const employeeId = await generateEmployeeId();
  
      const newEmployee = await Employee.create({
        employeeId,
        image: userImage.url,
        name,
        email,
        mobile,
        designation,
        gender,
        course,
        active: active !== undefined ? active : true, // Set to true if not provided
      });
  
      res.status(201).json({
        success: true,
        data: newEmployee,
      });
    } catch (error) {
      if (error.name === 'ValidationError') {
        res.status(400).json({ success: false, message: error.message });
      } else {
        res.status(500).json({ success: false, message: error.message });
      }
    }
  });
  
  

// Get all employees
export const getEmployees = asyncHandler(async (req, res) => {
  const employees = await Employee.find();
  res.status(200).json({
    success: true,
    data: employees,
  });
});

// Get a single employee by ID
export const getEmployee = asyncHandler(async (req, res) => {
  const employee = await Employee.findById(req.params.id);
  if (!employee) {
    throw new ApiError(404, "Employee not found");
  }
  res.status(200).json({
    success: true,
    data: employee,
  });
});

// Update an employee
// Update an employee
export const updateEmployee = asyncHandler(async (req, res) => {
    try {
        console.log(req);
      const updateFields = req.body;
  
      // Check if a new image is provided
      if (req.files && Array.isArray(req.files.image) && req.files.image.length > 0) {
        const image = req.files.image[0].path;
  
        // Upload the new image to Cloudinary or another storage
        const userImage = await uploadOnCloudinary(image);
        if (!userImage) throw new ApiError(400, "Failed to upload image");
  
        // Update the image URL in the updateFields
        updateFields.image = userImage.url;
      }
  
      const updatedEmployee = await Employee.findByIdAndUpdate(
        req.params.id,
        updateFields,
        {
          new: true,
          runValidators: true,
        }
      );
  
      if (!updatedEmployee) {
        throw new ApiError(404, "Employee not found");
      }
  
      res.status(200).json({
        success: true,
        data: updatedEmployee,
      });
    } catch (error) {
      if (error.name === 'ValidationError') {
        res.status(400).json({ success: false, message: error.message });
      } else {
        res.status(500).json({ success: false, message: error.message });
      }
    }
  });
  

// Delete an employee
export const deleteEmployee = asyncHandler(async (req, res) => {
  const deletedEmployee = await Employee.findByIdAndDelete(req.params.id);

  if (!deletedEmployee) {
    throw new ApiError(404, "Employee not found");
  }

  res.status(200).json({
    success: true,
    data: {},
  });
});

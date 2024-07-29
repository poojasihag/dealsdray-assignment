import { nanoid } from "nanoid";
import { Employee } from "../models/employee.model.js";

// Function to generate unique employee ID
export const generateEmployeeId = async () => {
  let id;
  let unique = false;
  while (!unique) {
    // Generate a random ID (e.g., 3 digits)
    id = `EMP${Math.floor(100 + Math.random() * 900)}`;

    // Check if ID already exists
    const existingEmployee = await Employee.findOne({ employeeId: id });
    if (!existingEmployee) {
      unique = true;
    }
  }
  return id;
};

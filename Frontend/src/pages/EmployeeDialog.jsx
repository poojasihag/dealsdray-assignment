/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React from "react";
import { useState, useEffect } from "react";
import axios from "@/lib/axiosConfig"; // Adjust the import path as necessary
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogClose,
  DialogFooter,
} from "@/components/ui/dialog"; // Adjust the import path as necessary
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"; // Adjust the import path as necessary
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"; // Adjust the import path as necessary
import { Label } from "@/components/ui/label"; // Adjust the import path as necessary
import { CloudUpload } from "lucide-react";

const EmployeeDialog = ({
  isDialogOpen,
  setIsDialogOpen,
  employeeToEdit,
  setEmployeeToEdit,
  fetchData,
}) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [designation, setDesignation] = useState("");
  const [gender, setGender] = useState("");
  const [course, setCourse] = useState("");
  const [active, setActive] = useState(true);
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState("");

  useEffect(() => {
    if (isDialogOpen && !employeeToEdit) {
      resetForm();
    }
  }, [isDialogOpen]);

  useEffect(() => {
    if (employeeToEdit) {
      setName(employeeToEdit.name);
      setEmail(employeeToEdit.email);
      setMobile(employeeToEdit.mobile);
      setDesignation(employeeToEdit.designation);
      setGender(employeeToEdit.gender);
      setCourse(employeeToEdit.course);
      setActive(employeeToEdit.active);
      setImagePreview(employeeToEdit.image);
      setImage(employeeToEdit.image); // Set existing image
    } else {
      resetForm();
    }
  }, [employeeToEdit]);

  const resetForm = () => {
    setName("");
    setEmail("");
    setMobile("");
    setDesignation("");
    setGender("");
    setCourse("");
    setActive(true);
    setImage(null);
    setImagePreview("");
  };

  const handleDialogClose = () => {
    setIsDialogOpen(false);
    setEmployeeToEdit(null);
    resetForm();
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    let errors = [];
    // Basic validations
    if (!name) errors.push("Name is required.");
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
      errors.push("Invalid email address.");
    if (!mobile || !/^\+?\d+$/.test(mobile))
      errors.push("Invalid mobile number.");
    if (!designation) errors.push("Designation is required.");
    if (!gender || !["Male", "Female", "Other"].includes(gender))
      errors.push("Invalid gender.");
    if (!course) errors.push("Course is required.");

    if (errors.length > 0) {
      alert(errors.join("\n"));
      return;
    }

    const formData = new FormData();
    formData.append("name", name);
    formData.append("email", email);
    formData.append("mobile", mobile);
    formData.append("designation", designation);
    formData.append("gender", gender);
    formData.append("course", course);
    formData.append("active", active);
    if (image) formData.append("image", image); // Append the file

    try {
      if (employeeToEdit) {
        await axios.put(`/employees/${employeeToEdit._id}`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
      } else {
        await axios.post("/employees", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
      }
      fetchData();
      handleDialogClose();
    } catch (error) {
      console.error(error);
      alert(
        "Failed to save employee: " +
          (error.response?.data?.message || "Unknown error")
      );
    }
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setImage(file); // Store the file object directly
      setImagePreview(URL.createObjectURL(file)); // For preview
    }
  };

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger />
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-auto p-6 bg-white rounded-lg shadow-lg">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold">
            {employeeToEdit ? "Edit Employee" : "Add Employee"}
          </DialogTitle>
          <DialogDescription className="text-sm text-gray-600">
            {employeeToEdit
              ? "Edit the details of the employee."
              : "Fill in the details to add a new employee."}
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              name="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Name"
              required
              className="w-full"
            />
          </div>
          <div>
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              name="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              required
              className="w-full"
            />
          </div>
          <div>
            <Label htmlFor="mobile">Mobile</Label>
            <Input
              id="mobile"
              name="mobile"
              value={mobile}
              onChange={(e) => setMobile(e.target.value)}
              placeholder="Mobile"
              required
              className="w-full"
            />
          </div>
          <div>
            <Label htmlFor="designation">Designation</Label>
            <Input
              id="designation"
              name="designation"
              value={designation}
              onChange={(e) => setDesignation(e.target.value)}
              placeholder="Designation"
              required
              className="w-full"
            />
          </div>
          <div>
            <Label htmlFor="gender">Gender</Label>
            <Select
              id="gender"
              name="gender"
              value={gender}
              onValueChange={setGender}
              placeholder="Select Gender"
              className="w-full"
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select Gender" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Male">Male</SelectItem>
                <SelectItem value="Female">Female</SelectItem>
                <SelectItem value="Other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="course">Course</Label>
            <Input
              id="course"
              name="course"
              value={course}
              onChange={(e) => setCourse(e.target.value)}
              placeholder="Course"
              required
              className="w-full"
            />
          </div>
          <div className="relative">
            <Label htmlFor="image">Image</Label>
            <label htmlFor="file" className="labelFile">
              {imagePreview && (
                <div className="mt-2">
                  <img
                    src={imagePreview}
                    alt="Image Preview"
                    className="object-cover w-32 h-32 rounded-md shadow-md"
                  />
                </div>
              )}

              {!imagePreview && (
                <span>
                  <CloudUpload />
                </span>
              )}

              <input
                id="file"
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
              />
            </label>
          </div>
          <RadioGroup value={active ? "true" : "false"} onValueChange={(value) => setActive(value === "true")}>
  <div className="flex items-center space-x-2">
    <RadioGroupItem value="true" id="active-yes" />
    <Label htmlFor="active-yes">Active</Label>
  </div>
  <div className="flex items-center space-x-2">
    <RadioGroupItem value="false" id="active-no" />
    <Label htmlFor="active-no">Inactive</Label>
  </div>
</RadioGroup>


          <DialogFooter>
            <Button
              type="submit"
              className="w-full mt-4 text-white bg-blue-600 rounded-lg"
            >
              {employeeToEdit ? "Update Employee" : "Add Employee"}
            </Button>
          </DialogFooter>
        </form>
        <DialogClose />
      </DialogContent>
    </Dialog>
  );
};

export default EmployeeDialog;

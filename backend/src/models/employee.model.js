import mongoose, { Schema } from "mongoose";

const employeeSchema = new Schema(
  {
    employeeId: {
      type: String,
      required: [true, "Employee ID is required"],
      unique: true,
      trim: true,
    },
    image: {
      type: String, // URL to the image
      required: [true, "Image URL is required"],
    },
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
      trim: true,
      validate: {
        validator: function (v) {
          return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
        },
        message: (props) => `${props.value} is not a valid email address!`,
      },
    },
    mobile: {
      type: String,
      required: [true, "Mobile number is required"],
      unique: true,
      trim: true,
      validate: {
        validator: function (v) {
          return /^\+?\d+$/.test(v);
        },
        message: (props) => `${props.value} is not a valid mobile number!`,
      },
    },
    designation: {
      type: String,
      required: [true, "Designation is required"],
      trim: true,
    },
    gender: {
      type: String,
      required: [true, "Gender is required"],
      trim: true,
      enum: {
        values: ["Male", "Female", "Other"],
        message: "{VALUE} is not a valid gender",
      },
    },
    course: {
      type: String,
      required: [true, "Course is required"],
      trim: true,
    },
    createdate: {
      type: Date,
      default: Date.now,
    },
    active: {
      type: Boolean,
      default: true, // Assuming new employees are active by default
    },
  },
  { timestamps: true }
);

export const Employee = mongoose.model("Employee", employeeSchema);

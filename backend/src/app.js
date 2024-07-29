import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";



const app = express();
app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  })
);
app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true ,limit: "16kb"}));
app.use(express.static("public"))
app.use(cookieParser())


// Routes Import
import userRouter from './routes/user.routes.js'
import employeeRoutes from './routes/employee.routes.js'


// routes decleration
app.use("/api/v1/users",userRouter)

app.use('/api/v1/employees', employeeRoutes);


export { app };

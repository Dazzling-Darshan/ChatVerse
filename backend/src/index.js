import express from "express";
import cors from "cors";
import "dotenv/config" 
import connectDB from "./lib/db.js";
import { clerkMiddleware } from '@clerk/express'

const app = express();
const PORT = process.env.PORT || 3000;
const FRONTEND_URL = process.send.FRONTEND_URL;

app.use(express.json());
app.use(cors({
    origin : FRONTEND_URL,
    credentials :true
}));
app.use(clerkMiddleware());

app.listen(3000, ()=>{
    connectDB();
    console.log(`Server is running on PORT ${PORT}`);
})
import { config } from 'dotenv';
import {v2 as cloudinary} from 'cloudinary';
import express from 'express';
import cors from 'cors';

import authRoutes from './routes/authRoutes.js';
import postRoutes from './routes/postRoutes.js';
import userRoutes from './routes/userRoutes.js';
config();

const app = express();

//This is a middleware
app.use(express.json());

//This is also a middleware
app.use(cors({
    origin: [process.env.FRONTEND_URL, "https://dailybits-mu.vercel.app"],
    credentials: true,
}));

// app.use("/", (req, res)=>{
//   res.status(200).json({message: "Backend reached successfully"});
// });

app.use("/api/auth", authRoutes);

app.use("/api/me/stories", postRoutes);

app.use("/api/user", userRoutes);

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
})
app.get('/api/sign-cloudinary', (req, res) => {
    console.log("Backend function reached and executing...");
  const timestamp = Math.round(new Date().getTime() / 1000)
  
  // Generate a signature valid only for this timestamp
  const signature = cloudinary.utils.api_sign_request(
    { timestamp },
    process.env.CLOUDINARY_API_SECRET
  );
  // console.log("Backend data:", signature, timestamp, process.env.CLOUDINARY_API_KEY, process.env.CLOUDINARY_CLOUD_NAME);

  res.status(200).json({ 
    signature, 
    timestamp, 
    apiKey: process.env.CLOUDINARY_API_KEY,
    cloudName: process.env.CLOUDINARY_CLOUD_NAME 
  })
});


const PORT = process.env.PORT;

app.listen(PORT, ()=>{
    console.log(`Backend running on PORT: ${PORT}`);
});

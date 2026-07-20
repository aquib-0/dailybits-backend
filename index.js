require("dotenv").config();
const cloudinary = require('cloudinary').v2;
const express = require("express");
const cors = require("cors");

const authRoutes = require("./routes/authRoutes");
const postRoutes = require("./routes/postRoutes");

const app = express();

//This is a middleware
app.use(express.json());

//This is also a middleware
app.use(cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
}));

app.use("/api/auth", authRoutes);

app.use("/api/me/stories", postRoutes);

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
  console.log("Backend data:", signature, timestamp, process.env.CLOUDINARY_API_KEY, process.env.CLOUDINARY_CLOUD_NAME);

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

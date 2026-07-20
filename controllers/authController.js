const bcrypt = require('bcryptjs');
const generateToken = require('../utils/generateTokens');
const User = require("../models/User");

const register = async(req, res)=>{
    try{
        const {username, email, password} = req.body;

        // const [existingUsers] = await pool.query(
        //     "SELECT * FROM users WHERE email = ?",
        //     [email]
        // );
        const existingUsers = await User.findByEmail(email);

        if(existingUsers.length > 0)
        {
            return res.status(400).json({message: "Email already exists"});
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        // const [result] = await pool.query(
        //     "INSERT INTO users (username, email, password) VALUES (?, ?, ?)",
        //     [username, email, hashedPassword]
        // );
        const result = await User.createUser(username, email, hashedPassword);
        res.status(201).json({message: "User registered successfully", userId: result.insertId});
    } catch(e){
        console.log(e);

        res.status(500).json({message: "Server error"});
    }
};


const login = async(req, res)=> {
    console.log("Login function reached")
    try{
    const {email, password} = req.body;
    
    const users = await User.findByEmail(email);

    if(users.length === 0)
    {
        return res.status(404).json({message: "Invalid credentials"});
    }

    const user = users[0];
    // console.log(users);
    // console.log(users[0]);
    // console.log(password);
    const isMatch = await bcrypt.compare(password, user.password);
    if(!isMatch)
    {
        return res.status(401).json({message: "Invalid credentials"});
    }

    const token = generateToken(user);

    res.status(200).json({message: "User logged-in successfully", token, user: {
        id: user.id,
        username: user.username,
        email: user.email,
        user_avatar: user.user_avatar,
    }});
    } catch(error)
    {
        console.log(error);

        res.status(500).json({message: "Server error while login"});
    }
}


module.exports = {register, login};
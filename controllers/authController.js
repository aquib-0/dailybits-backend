import prisma from '../config/db.js';
import bcrypt from 'bcryptjs';
import generateToken from '../utils/generateTokens.js';
// import User from '../models/User.js';

const register = async(req, res)=>{
    try{
        const {username, email, password} = req.body;
        
        // const existingUsers = await prisma.user.findByEmail(email);
        const existingUsers = await prisma.users.findUnique({where: {email}});
        // if(existingUsers.length > 0)
        // {
        //     return res.status(400).json({message: "Email already exists"});
        // }
        if(existingUsers)
        {
            return res.status(400).json({message: "Email already exists"});
        }

        const hashedPassword = await bcrypt.hash(password, 10);


        // const result = await User.createUser(username, email, hashedPassword);
        const newUser = await prisma.users.create({
            data: {
                username: username,
                email: email,
                password: hashedPassword
            }
        });
        res.status(201).json({message: "User registered successfully", user: [newUser.username, newUser.email]});
        // res.status(201).json({message: "User registered successfully", userId: newUser.insertId});
    } catch(e){
        console.log("Error while registering the  user!!",e);

        res.status(500).json({message: "Server error"});
    }
};


const login = async(req, res)=> {
    console.log("Login function reached in backend")
    try{
    const {email, password} = req.body;
    
    // const users = await User.findByEmail(email);
    const user = await prisma.users.findUnique({where: {email: email}});

    // if(users.length === 0)
    // {
    //     return res.status(404).json({message: "Invalid credentials"});
    // }
    if(!user)
    {
        return res.status(404).json({message: "Invalid credentials"});
    }

    // const user = users[0];
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


// module.exports = {register, login};
export {register, login}
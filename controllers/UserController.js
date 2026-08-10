// import prisma from "../config/db";
import prisma from "../config/db.js";

const getUserPosts = async(req, res)=>{
    const {user_id} = req.query;
    const num_id = parseInt(user_id, 10);
    // console.log("User id recieved: ", num_id);
    // console.log("User id type recieved: ", typeof(num_id));
    try{
        const userPosts = await prisma.posts.findMany({where: {user_id: num_id}});
        if(userPosts.length > 0)
        {
            res.status(200).json({message: "Retrieved user details successfully", userPosts: userPosts});
        }
        else{
            res.status(201).json({message: "There are no posts made by the user", userPosts: userPosts});
        }
    }
    catch(err)
    {
        res.status(500).json({message: "An error occurred in the backend"});
        console.log(err);
    }
};
export {getUserPosts}
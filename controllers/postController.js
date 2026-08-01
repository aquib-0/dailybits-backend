// import pool from "../config/db.js";
import prisma from "../config/db.js";
// import Post from '../models/Post.js';

const fypPosts = async(req, res)=>{
    try{
        const user_id = req.user.id;
        // const posts = await Post.getFypPosts(user_id);
        const posts = await prisma.posts.findMany({where: {user_id: {not: user_id}}});
        if(!posts)
        {
            res.status(200).json({message: "No available posts", fyp_posts: posts});
        }
        // if(posts.length === 0)
        // {
        //     res.status(200).json({message: "No posts available", fyp_posts: posts});
        // }
        else{
            res.status(200).json({message: "Successfull In constructing you fyp", fyp_posts: posts});
        }
    } catch(error)
    {
        console.log(error);
        res.status(500).json({message: "Error occurred in the server while constructing your fyp"});
    }
};

const myPosts = async(req, res)=>{
    try{
    const user_id = req.user.id;
    // const posts = await Post.getMyPosts(user_id);
    const posts = await prisma.posts.findMany({where: {user_id: user_id}});
    if(!posts)
    {
        res.status(201).json({message: "You have no posts", your_posts: posts});
    }
    // if(posts.length === 0)
    // {
    //     res.status(201).json({message: "You have no posts.", your_posts: posts});
    // }
    else{
        res.status(200).json({message: "Posts fetched successfully", your_posts: posts});
    }
    } catch(error)
    {
        console.log(error);
        res.status(500).json({message: "Server error while fetching posts"});
    }
};

const createPost = async(req, res)=>{
    try{
        // console.log("Data recieved from frontend: ", req.body);
        const {id, user_id, content, username, user_avatar, upload_date} = req.body;
        // const result = await Post.createPost(id, user_id, content, username, user_avatar, upload_date);
        const result = await prisma.posts.create({data: {id, user_id, content, username, user_avatar, upload_data}});
        res.status(200).json({message: "Story published successfully", post_id: result.id});

    } catch(error)
    {
        console.log(error);
        res.status(500).json({message: "Server error while referencing POST model"});
    }
}

export {myPosts, createPost, fypPosts};
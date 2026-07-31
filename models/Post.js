// const pool = require("../config/db");
import pool from "../config/db.js";

const createPost = async(id, user_id, content, username, user_avatar, upload_date)=>{
        console.log("In the Post model data recieved:", id, user_id, content);
        const [result] = await pool.query(
            "INSERT INTO posts(id, user_id, content, username, user_avatar, upload_date) VALUES(?, ?, ?, ?, ?, ?)",
            [id, user_id, content, username, user_avatar, upload_date]
        );
        return result;
}

const getMyPosts = async(user_id)=>{
        const [posts] = await pool.query(
            "SELECT * FROM posts WHERE user_id = ? order by upload_date DESC",
            [user_id]
        );

        return posts;
};

const getFypPosts = async(user_id)=>{
    const [posts] = await pool.query(
        "SELECT * FROM posts WHERE user_id != ?",
        [user_id]
    );
    return posts;
}

const Post = {getMyPosts, createPost, getFypPosts};

export default Post;
// module.exports = {getMyPosts, createPost, getFypPosts};
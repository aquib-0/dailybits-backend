// const pool = require("../config/db");
import pool from "../config/db.js";

const findByEmail = async(email)=>{
    const [users] = await pool.query(
        "SELECT * FROM users WHERE email = ?",
        [email]
    );
    return users;
};

const findById = async(id)=>{
    const [user] = await pool.query(
        "SELECT * FROM users WHERE id=?",
        [id]
    );
    return user;
}

const createUser = async(username, email, password)=>{
    const [result] = await pool.query(
        "INSERT INTO users(username, email, password) VALUES(?, ?, ?)",
        [username, email, password]
    );

    return result;
}
const User = {findByEmail, createUser, findById};
export default User;
// export {findByEmail, createUser, findById};
import jwt from 'jsonwebtoken';

const generateToken = (user)=>{
    return jwt.sign(
        {
            id: user.id,
            email: user.email,
            username: user.username,
            user_avatar: user.user_avatar,
        },
        process.env.JWT_SECRET,
        {
            expiresIn: '24h'
        }
    );
};

export default generateToken;
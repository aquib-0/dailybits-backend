import { config } from 'dotenv';
import { PrismaClient } from '../src/generated/prisma/client/index.js';
import { PrismaMariaDb } from '@prisma/adapter-mariadb';
// import mysql from 'mysql2/promise';
config();

// const connection = mysql.createPool({
//     uri: process.env.DATABASE_URL,
// });

// const adapter = new PrismaMariaDb(connection);
const adapter = new PrismaMariaDb({
    host: process.env.DB_HOST,
    // port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    // connectionLimit: 10,
    
});

const prisma = new PrismaClient({adapter});

export default prisma;

// const pool = mysql.createPool({
//     host: process.env.DB_HOST,
//     user: process.env.DB_USER,
//     password: process.env.DB_PASSWORD,
//     database: process.env.DB_NAME
// });

// export default pool;
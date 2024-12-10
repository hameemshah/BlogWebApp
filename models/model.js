import pg from "pg";
import env from "dotenv";

env.config();

const db = new pg.Client({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB,
    ssl: {
        rejectUnauthorized: false, // Use true for production with a valid certificate
    },
});

try {
    db.connect();
} catch (err) {
    console.log(err);
    res.send("Failed to connect to the database.");
}

export default db;
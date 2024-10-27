import express from "express";
import bodyParser from "body-parser";
import env from "dotenv";
import router from "./routes/routes.js";

env.config();

const hostname = process.env.HOST;
const port = process.env.PORT;

// Express app
const app = express();

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(router);


// Create server
app.listen(port, hostname, () => {
    console.log(`Server started at http://${hostname}:${port}`);
})

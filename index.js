import express from "express";
import bodyParser from "body-parser";
import pg from "pg";
import env from "dotenv";

env.config();
const hostname = process.env.HOST;
const port = process.env.PORT;
const app = express();

// Post
const db = new pg.Client({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB,
});

try {
    db.connect();
} catch (err) {
    console.log(err);
    res.send("Failed to connect to the database.");
}
const posts = [];

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

// Routes
app.get("/", async (req, res) => {
    try {
        const result = await db.query("SELECT * FROM posts");
        const posts = result.rows;
        res.render("index.ejs", { posts: posts });
    } catch (err) {
        console.log(err);
        res.send("Error retreiving posts.");
    }
})

app.get("/about", (req, res) => {
    res.render("about.ejs")
})

app.get("/post/:post_id", async (req, res) => {
    const postId = req.params.post_id;
    try {
        const result = await db.query("SELECT * FROM posts WHERE id = $1", [postId]);
        const post = result.rows;
        res.render("post.ejs", { post: post[0] });
    } catch (err) {
        console.log(err);
        res.send("Cannot retreive the post.");
    }
});

app.get("/create", (req, res) => {
    const post = { id: Math.floor(Math.random() * 100), author: "", title: "", subtitle: "", content: "" };
    res.render("create.ejs", { post: post, id: 0 });
})

app.get("/delete/:post_id", async (req, res) => {
    const Id = req.params.post_id;
    // Find the index of the post with the given ID
    try {
        const result = await db.query("SELECT * FROM posts WHERE id = $1", [Id]);
        const found = result.rows;
        if (found.length === 0) {
            // No post found
            res.status(404).send("No post with this id found.");
        } else {
            // If a post with the given ID is found, remove it
            try {
                db.query("DELETE FROM posts WHERE id = $1", [Id]);
                res.redirect("/");
            } catch (err) {
                console.log(err);
                res.status(501).send("Error deleting post");
            }
        }
    } catch (err) {
        console.log(err);
        res.status(501).send("Error finding the post.");
    }
})

app.get("/edit/:post_id", async (req, res) => {
    const Id = req.params.post_id;
    try {
        const result = await db.query("SELECT * FROM posts WHERE id = $1", [Id]);
        const found = result.rows;
        if (found.length === 0) {
            // No post found
            res.status(404).send("Post not found.");
        } else {
            // If a post with the given ID is found, get the post details from database
            const post = {
                id: found[0].id,
                title: found[0].title,
                subtitle: found[0].subtitle,
                author: found[0].author,
                content: found[0].content,
                day: found[0].day,
                month: found[0].month,
                year: found[0].year,
                link: found[0].link,
                imageurl: found[0].imageurl,
            }
            res.render("create.ejs", { post: post, id: Id });
        }
    } catch (err) {
        console.log(err);
        res.status(500).send("Error deleting the post.");
    }
})

app.post("/create", async (req, res) => {
    const today = new Date();
    const day = today.getDate();
    const monthNames = [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];
    const month = monthNames[today.getMonth()];
    const year = today.getFullYear();

    if (req.body.id === null) {
        try {

            const result = await db.query("INSERT INTO posts (title, subtitle, author, content, day, month, year, link, imageurl) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9 )", [req.body.title, req.body.subtitle, req.body.name, req.body.content, day, month, year, req.body.link, req.body.url]);
        } catch (err) {
            if (err.code === "23505") {
                res.status(409).send("Post already exists with the same unique value.");
            } else {
                console.log(err);
                res.status(500).send("Error inserting values into the database.");
            }
        }
    } else {
        try {
            // Update the record if id is defined
            const result1 = await db.query("DELETE FROM posts WHERE id = $1", [req.body.id]);
            const result = await db.query("INSERT INTO posts (id, title, subtitle, author, content, day, month, year, link, imageurl) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10 )", [req.body.id, req.body.title, req.body.subtitle, req.body.name, req.body.content, day, month, year, req.body.link, req.body.url]);
        } catch (err) {
            console.log(err);
            res.send("Error occurred");
        }
    }
    res.redirect("/");
})

app.get("/contact", (req, res) => {
    res.render("contact.ejs");
})

app.post("/contact", async (req, res) => {
    try {
        const info = [req.body.name, req.body.email, req.body.phone, req.body.message];
        const result = await db.query("INSERT INTO contact (name, email, phone, message) VALUES ($1, $2, $3, $4)", info);
        res.redirect("/");
    } catch (err) {
        console.log(err);
        res.send("Failed to contact.");
    }
})

// Create server
app.listen(port, hostname, () => {
    console.log(`Server started at http://${hostname}:${port}`);
})

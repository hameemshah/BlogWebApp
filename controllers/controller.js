import db from "../models/model.js";
// index,  about,  post, create, del, edit, create_post, contact, contact_post

const index = async (req, res) => {
    try {
        const result = await db.query(`
            SELECT posts.id, posts.title, posts.subtitle, posts.author, posts.content, posts.imageurl, posts.user_id,
                   EXTRACT(YEAR FROM posts.created_at) AS year,
                   EXTRACT(MONTH FROM posts.created_at) AS month,
                   EXTRACT(DAY FROM posts.created_at) AS day,
                   users.thumbnail
            FROM posts 
            JOIN users ON posts.user_id = users.id
             WHERE users.flag = true 
             ORDER BY posts.id DESC
          `);
        const posts = result.rows;
        res.render("index.ejs", { posts: posts, user: req.user });
    } catch (err) {
        console.log(err);
        res.send("Error retreiving posts.");
    }
}

const about = (req, res) => {
    res.render("about.ejs", { user: req.user })
}

const post = async (req, res) => {
    const postId = req.params.post_id;
    try {
        const result = await db.query("SELECT * FROM posts WHERE id = $1", [postId]);

        const likes = await db.query(`
            SELECT u.username, u.thumbnail
            FROM likes l 
            JOIN users u ON l.user_id = u.id 
            WHERE l.post_id = $1
        `, [postId]);
        const counts = await db.query(`
            SELECT 
                (SELECT COUNT(*) FROM likes WHERE post_id = $1) AS like_count,
                (SELECT COUNT(*) FROM comments WHERE post_id = $1) AS comment_count
        `, [postId]);
        // Fetch comments with usernames and thumbnails
        const comments = await db.query(`
                        SELECT u.username, u.thumbnail, c.content, c.created_at,
                    EXTRACT(YEAR FROM c.created_at) AS year,
                   EXTRACT(MONTH FROM c.created_at) AS month,
                   EXTRACT(DAY FROM c.created_at) AS day
                        FROM comments c 
                        JOIN users u ON c.user_id = u.id 
                        WHERE c.post_id = $1
                    `, [postId]);
        const post = result.rows;
        if (post.length === 0)
            res.send("No such blog exisists.");
        else
            res.render("post.ejs", { post: post[0], 
                                    likes: likes.rows,
                                    like_count: counts.rows[0].like_count,
                                    comment_count: counts.rows[0].comment_count,
                                    comments: comments.rows, 
                                    user: req.user || null 
                                });
    } catch (err) {
        console.log(err);
        res.status(500).send("Error retreiving the post.");
    }
}

const create = (req, res) => {
    const post = { id: 0, author: "", title: "", subtitle: "", content: "" };
    res.render("create.ejs", { post: post, user: req.user });
}

const del = async (req, res) => {
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
            if (req.user.id === found[0].user_id) {
                try {
                    db.query("DELETE FROM posts WHERE id = $1", [Id]);
                    res.redirect("/");
                } catch (err) {
                    console.log(err);
                    res.status(501).send("Error deleting post");
                }
            } else {
                res.status(500).send("UnAuthorized User");
            }
        }
    } catch (err) {
        console.log(err);
        res.status(501).send("Error finding the post.");
    }
}

const edit = async (req, res) => {
    const Id = req.params.post_id;
    try {
        const result = await db.query("SELECT * FROM posts WHERE id = $1", [Id]);
        const found = result.rows;
        if (found.length === 0) {
            // No post found
            res.status(404).send("Post not found.");
        } else {
            // If a post with the given ID is found, get the post details from database
            if (req.user.id === found[0].user_id) {
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
                res.render("create.ejs", { post: post, user: req.user });
            } else {
                res.status(500).send("UnAuthorized User");
            }
        }
    } catch (err) {
        console.log(err);
        res.status(500).send("Error deleting the post.");
    }
}

const create_post = async (req, res) => {
    if (req.body.id == 0) {
        try {
            await db.query("INSERT INTO posts (title, subtitle, author, content, imageurl, user_id) VALUES ($1, $2, $3, $4, $5, $6)", [req.body.title, req.body.subtitle, req.user.username, req.body.content, req.body.url, req.user.id]);
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
            await db.query("UPDATE posts SET title = $1, subtitle = $2, author = $3, content = $4, imageurl = $5, user_id = $6 WHERE id = $7", [req.body.title, req.body.subtitle, req.user.username, req.body.content, req.body.url, req.user.id, req.body.id]);
        } catch (err) {
            console.log(err);
            res.send("Error occurred whilst updating.");
        }
    }
    res.redirect("/");
}

const contact = (req, res) => {
    res.render("contact.ejs", { user: req.user });
}

const contact_post = async (req, res) => {
    try {
        const info = [req.body.name, req.body.email, req.body.phone, req.body.message];
        const result = await db.query("INSERT INTO contact (name, email, phone, message) VALUES ($1, $2, $3, $4)", info);
        res.redirect("/");
    } catch (err) {
        console.log(err);
        res.send("Failed to contact.");
    }
}

const like = async (req, res) => {
    const { postId } = req.params;
    const userId = req.user.id;

    try {
        await db.query('INSERT INTO likes (user_id, post_id) VALUES ($1, $2)', [userId, postId]);
        res.json({ success: true, message: 'Post liked!' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: 'Error liking post.' });
    }
}

const comment = async (req, res) => {
    const { postId } = req.params;
    const userId = req.user.id;
    const { comment } = req.body;

    try {
        await db.query('INSERT INTO comments (user_id, post_id, content) VALUES ($1, $2, $3)', [userId, postId, comment]);
        res.json({ success: true, message: 'Comment added!' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: 'Error adding comment.' });
    }
}

export default {
    index,
    about,
    post,
    create,
    del,
    edit,
    create_post,
    contact,
    contact_post,
    like,
    comment
};
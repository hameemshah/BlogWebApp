import express from "express";
import controller from "../controllers/controller.js";

const router = express.Router();

const authCheck = (req, res, next) => {
    if (!req.isAuthenticated()) {
        // If the user is authenticated, redirect to the root route
        res.redirect('/auth/login');
    } else
    // If the user is not authenticated, proceed to the login route
    next();
}

router.get("/", controller.index);
router.get("/about", controller.about);
router.get("/post/:post_id", controller.post);
router.get("/create", authCheck, controller.create);
router.get("/delete/:post_id", authCheck, controller.del);
router.get("/edit/:post_id", authCheck, controller.edit);
router.post("/create", authCheck, controller.create_post);
router.get("/contact", controller.contact);
router.post("/contact", controller.contact_post);

export default router;
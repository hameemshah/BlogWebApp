import express from "express";
import controller from "../controllers/controller.js";

const router = express.Router();

router.get("/", controller.index);
router.get("/about", controller.about);
router.get("/post/:post_id", controller.post);
router.get("/create", controller.create);
router.get("/delete/:post_id", controller.del);
router.get("/edit/:post_id", controller.edit);
router.post("/create", controller.create_post);
router.get("/contact", controller.contact);
router.post("/contact", controller.contact_post);

export default router;
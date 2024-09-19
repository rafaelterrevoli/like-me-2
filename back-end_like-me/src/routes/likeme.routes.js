import { Router } from "express";
import { controller } from "../constrollers/likeme.controller.js";

const router = Router();

router.get("/posts", controller.getAllPosts);

router.post("/posts", controller.addPost);

router.put("/posts/like/:id", controller.putLike);

router.delete("/posts/:id", controller.deletePost);

export default router;

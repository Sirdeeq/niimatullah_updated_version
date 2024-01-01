import express from "express";
import { createChat, sendMessage } from "../controllers/chat.controller.js";

const router = express.Router();

router.post("/create", createChat);
router.post("/sendMessage", sendMessage);

export default router;

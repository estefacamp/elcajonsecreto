/*
 * Copyright (c) 2025 Your Company Name
 * All rights reserved.
 */
import { Router } from "express";
import { register, login } from "../controllers/auth.controller.js";

const router = Router();

router.post("/register", register);
router.post("/login", login);

export default router;


import express from "express";
import { createOrder } from "../controller/orders.controller.js";

const router = express.Router();


router.post("/create",createOrder)
export default router;

import express from "express";
import {
  getAllCoffee,
  createCoffee,
  getSingleCoffee,
} from "../controller/coffee.controller.js";
import { upload } from "../middlewares/multer.middlewares.js";

const router = express.Router();

router.get("/all", getAllCoffee);
router.get("/:id", getSingleCoffee);

router.post(
  "/create",
  upload.fields([
    {
      name: "avatar",
      maxCount: 1,
    },
    {
      name: "coverImage",
      maxCount: 1,
    },
  ]),
  createCoffee
);

export default router;

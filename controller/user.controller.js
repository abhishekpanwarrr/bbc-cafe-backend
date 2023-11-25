import { User } from "../models/user.model.js";
import jwt from "jsonwebtoken";
import bcrypt, { hash } from "bcrypt";

export const createUser = async (req, res) => {
  console.log("req", req);
  const { name, email, phone, password } = req.body;
  console.log("name, email, phone, password", name, email, phone, password);
  try {
    const userExists = await User.find({ email });
    if (userExists?.length > 0) {
      return res.status(400).json("User already exists");
    }
    if (!password) {
      return res.status(400).json("Password is required");
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({
      name,
      email,
      phone,
      password: hashedPassword,
    });
    if (newUser) {
      return res.status(201).json(newUser);
    }
    return res.status(400).json("Something went wrong 400");
  } catch (error) {
    console.log("error", error);
    res.status(500).json("Something went wrong 500");
  }
};

// Login user
export const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const userExists = await User.findOne({ email });
    if (!userExists) {
      return res.status(400).json("User doesn't exists");
    }
    const checkPassword = await bcrypt.compare(password, userExists.password);
    if (checkPassword) {
      const token = jwt.sign(
        {
          userId: userExists._id,
          email: userExists.email,
          name: userExists.name,
        },
        process.env.JWT_SECRET_KEY,
        {
          expiresIn: "30d",
        }
      );
      return res.status(200).json({
        token,
        fullName: userExists.name,
        email: userExists.email,
        phone: userExists.phone,
        isAdmin: userExists.isAdmin,
        _id: userExists._id,
      });
    } else {
      return res.status(400).json("Invalid password");
    }
  } catch (error) {
    console.log("error", error);
    res.status(500).json("Something went wrong");
  }
};

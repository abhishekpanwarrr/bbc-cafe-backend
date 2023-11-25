import { Coffee } from "../models/coffee.model.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";

// Get all coffee
export const getAllCoffee = async (req, res) => {
  try {
    const allCoffee = await Coffee.find();
    res.status(200).json(allCoffee);
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
};

export const createCoffee = async (req, res) => {
  const {
    name,
    description,
    size,
    price,
    roasted,
    ingredients,
    special_ingredient,
  } = req.body;
  console.log("req.files", req.files);
  try {
    const avatarLocalPath = req.files?.avatar[0]?.path;

    let coverImageLocalPath;
    if (
      req.files &&
      Array.isArray(req.files.coverImage) &&
      req.files.coverImage.length > 0
    ) {
      coverImageLocalPath = req.files.coverImage[0].path;
    }

    if (!avatarLocalPath) {
      return res.status(400).json("Avatar is required");
    }

    const avatar = await uploadOnCloudinary(avatarLocalPath);
    const coverImage = await uploadOnCloudinary(coverImageLocalPath);
    console.log("avatar", avatar);
    console.log("coverImage", coverImage);
    if (!avatar) {
      return res.status(400).json("Avatar is required after upload");
    }
    const images = [avatar?.secure_url, coverImage?.secure_url || ""];
    const result = await Coffee.create({
      name,
      description,
      roasted,
      ingredients,
      special_ingredient,
      size,
      price,
      imagelink_square: images,
    });
    return res.status(201).json(result);
  } catch (error) {
    console.log("error", error);
    res.status(500).json({ message: "Something went wrong" });
  }
};

// Get single coffee
export const getSingleCoffee = async (req, res) => {
  const id = req.params.id;
  try {
    const result = await Coffee.findOne({ _id: id });
    if (result) {
      res.status(200).json(result);
    } else {
      res.status(400).json("Not found");
    }
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
};

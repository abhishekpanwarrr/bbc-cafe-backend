import mongoose, { Schema } from "mongoose";

const beansSchema = new Schema(
  {
    name: String,
    description: String,
    roasted: String,
    imagelink_square: {
      type: String,
      default: "",
    },
    imagelink_portrait: {
      type: String,
      default: "",
    },
    ingredients: String,
    special_ingredient: String,
    price: [],
    size:[],
    average_rating: Number,
    ratings_count: String,
    favourite: Boolean,
    type: String,
    index: Number,
  },
  {
    timestamps: true,
  }
);

export const Beans = mongoose.model("Beans", beansSchema);

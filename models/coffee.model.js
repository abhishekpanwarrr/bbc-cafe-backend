import mongoose, { Schema } from "mongoose";

const coffeeSchema = new Schema(
  {
    name: String,
    description: String,
    roasted: String,
    imagelink_square: [],
    ingredients: String,
    special_ingredient: String,
    size: String,
    price: String,
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

export const Coffee = mongoose.model("Coffee", coffeeSchema);

import mongoose, { Schema } from "mongoose";

const PropertySchema = new Schema(
  {
    image: String,
    title: String,
    description: String,
    category: String,
    location: String,
    price: Number,
    vacancies: Number,
    totalCapacity: String,
    contact: Number,
  },
  { timestamps: true }
);

export default mongoose.model("Property", PropertySchema);

import mongoose from "mongoose"

const eventSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  date: { type: String, required: true },
  time: { type: String },
  location: { type: String },
  imageUrl: { type: String },
  category: { type: String, default: "General" },
  isActive: { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now }
})

export default mongoose.model("Event", eventSchema)
import mongoose from "mongoose"

const blogSchema = new mongoose.Schema({
  title: { type: String, required: true },
  excerpt: { type: String, required: true },
  content: { type: String, required: true },
  category: { type: String, required: true },
  author: { type: String, default: "Admin" },
  imageUrl: { type: String },
  readTime: { type: String, default: "3 min read" },
  isPublished: { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now }
})

export default mongoose.model("Blog", blogSchema)
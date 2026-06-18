import dotenv from "dotenv"
import path from "path"
import { fileURLToPath } from "url"
import mongoose from "mongoose"
import app from "./app.js"

// Get the current directory (backend/src)
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// Try to load .env file
const envPath = path.join(__dirname, "../.env")
console.log('Looking for .env at:', envPath)

// Check if .env file exists
import fs from 'fs'
if (fs.existsSync(envPath)) {
    console.log('.env file found!')
    const envContent = fs.readFileSync(envPath, 'utf8')
    console.log('.env content:', envContent)
} else {
    console.log('.env file NOT found!')
}

// Load .env
dotenv.config({ path: envPath })

// Debug - show what's loaded
console.log('MONGODB_URI from env:', process.env.MONGODB_URI)
console.log('PORT from env:', process.env.PORT)

// Use hardcoded values if env variables are undefined
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/welfare'
const PORT = process.env.PORT || 5000

console.log('Using MONGODB_URI:', MONGODB_URI)
console.log('Using PORT:', PORT)

// MongoDB Connection
mongoose.connect(MONGODB_URI)
  .then(() => {
    console.log("MongoDB Connected")
    app.listen(PORT, '0.0.0.0', () => {
      console.log(`Server running on port ${PORT}`)
    })
  })
  .catch((error) => {
    console.log("MongoDB connection error:", error)
  })
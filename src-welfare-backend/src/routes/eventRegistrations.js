import express from "express"

const router = express.Router()

// Store registrations temporarily
let registrations = []

// POST - Register for event
router.post('/register', async (req, res) => {
  try {
    const { name, email, phone, age, city, message, eventId, eventTitle, eventDate, eventTime, eventLocation } = req.body
    
    if (!name || !email || !phone || !eventId) {
      return res.status(400).json({ 
        success: false, 
        message: "Name, Email, Phone and Event ID are required!" 
      })
    }
    
    const registration = {
      _id: Date.now().toString(),
      name,
      email,
      phone,
      age: age || "",
      city: city || "",
      message: message || "",
      eventId,
      eventTitle,
      eventDate,
      eventTime,
      eventLocation,
      registeredAt: new Date(),
      status: "confirmed"
    }
    
    registrations.push(registration)
    
    console.log(`✅ New registration for ${eventTitle} from ${name}`)
    
    res.json({ 
      success: true, 
      message: "Registration successful!", 
      registration 
    })
  } catch (error) {
    console.error("Registration error:", error)
    res.status(500).json({ 
      success: false, 
      message: "Server error. Please try again." 
    })
  }
})

// GET - Get all registrations
router.get('/all', async (req, res) => {
  try {
    res.json({ 
      success: true, 
      registrations,
      total: registrations.length 
    })
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      message: "Error fetching registrations" 
    })
  }
})

export default router
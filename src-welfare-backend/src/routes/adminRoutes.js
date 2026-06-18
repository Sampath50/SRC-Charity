import express from "express"
import Volunteer from "../models/Volunteer.js"
import Gallery from "../models/Gallery.js"
import Donation from "../models/Donation.js"
import Message from "../models/Message.js"
import Team from "../models/Team.js"
import Testimonial from "../models/Testimonial.js"
import Event from "../models/Event.js"
import Blog from "../models/Blog.js"
import SocialLink from "../models/SocialLink.js"

const router = express.Router()

// ============ VOLUNTEERS ============
router.get("/volunteers", async (req, res) => {
  try {
    const volunteers = await Volunteer.find().sort({ createdAt: -1 })
    res.json({ success: true, volunteers })
  } catch (error) {
    res.status(500).json({ success: false, message: error.message })
  }
})

router.post("/volunteers", async (req, res) => {
  try {
    const volunteer = new Volunteer(req.body)
    await volunteer.save()
    res.json({ success: true, message: "Volunteer application submitted" })
  } catch (error) {
    res.status(500).json({ success: false, message: error.message })
  }
})

router.put("/volunteers/:id", async (req, res) => {
  try {
    const { status } = req.body
    const volunteer = await Volunteer.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    )
    res.json({ success: true, volunteer })
  } catch (error) {
    res.status(500).json({ success: false, message: error.message })
  }
})

router.delete("/volunteers/:id", async (req, res) => {
  try {
    await Volunteer.findByIdAndDelete(req.params.id)
    res.json({ success: true, message: "Volunteer deleted" })
  } catch (error) {
    res.status(500).json({ success: false, message: error.message })
  }
})

// ============ GALLERY ============
router.get("/gallery", async (req, res) => {
  try {
    const images = await Gallery.find().sort({ createdAt: -1 })
    res.json({ success: true, images })
  } catch (error) {
    res.status(500).json({ success: false, message: error.message })
  }
})

router.post("/gallery", async (req, res) => {
  try {
    const { title, imageUrl, category } = req.body
    const image = new Gallery({ title, imageUrl, category })
    await image.save()
    res.json({ success: true, image })
  } catch (error) {
    res.status(500).json({ success: false, message: error.message })
  }
})

router.delete("/gallery/:id", async (req, res) => {
  try {
    await Gallery.findByIdAndDelete(req.params.id)
    res.json({ success: true, message: "Image deleted" })
  } catch (error) {
    res.status(500).json({ success: false, message: error.message })
  }
})

// ============ DONATIONS ============
router.get("/donations", async (req, res) => {
  try {
    const donations = await Donation.find().sort({ createdAt: -1 })
    res.json({ success: true, donations })
  } catch (error) {
    res.status(500).json({ success: false, message: error.message })
  }
})

router.post("/donations", async (req, res) => {
  try {
    const { name, email, amount, currency, paymentId } = req.body
    const donation = new Donation({ 
      name, 
      email, 
      amount, 
      currency: currency || "INR", 
      paymentId 
    })
    await donation.save()
    res.json({ success: true, message: "Donation saved" })
  } catch (error) {
    res.status(500).json({ success: false, message: error.message })
  }
})

// ============ MESSAGES ============
router.get("/messages", async (req, res) => {
  try {
    const messages = await Message.find().sort({ createdAt: -1 })
    res.json({ success: true, messages })
  } catch (error) {
    res.status(500).json({ success: false, message: error.message })
  }
})

router.delete("/messages/:id", async (req, res) => {
  try {
    await Message.findByIdAndDelete(req.params.id)
    res.json({ success: true, message: "Message deleted" })
  } catch (error) {
    res.status(500).json({ success: false, message: error.message })
  }
})

// ============ TEAM MEMBERS ============
router.get("/team", async (req, res) => {
  try {
    const team = await Team.find().sort({ order: 1, createdAt: -1 })
    res.json({ success: true, team })
  } catch (error) {
    res.status(500).json({ success: false, message: error.message })
  }
})

router.post("/team", async (req, res) => {
  try {
    const teamMember = new Team(req.body)
    await teamMember.save()
    res.json({ success: true, teamMember })
  } catch (error) {
    res.status(500).json({ success: false, message: error.message })
  }
})

router.put("/team/:id", async (req, res) => {
  try {
    const teamMember = await Team.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    )
    res.json({ success: true, teamMember })
  } catch (error) {
    res.status(500).json({ success: false, message: error.message })
  }
})

router.delete("/team/:id", async (req, res) => {
  try {
    await Team.findByIdAndDelete(req.params.id)
    res.json({ success: true, message: "Team member deleted" })
  } catch (error) {
    res.status(500).json({ success: false, message: error.message })
  }
})

// ============ TESTIMONIALS ============
router.get("/testimonials", async (req, res) => {
  try {
    const testimonials = await Testimonial.find().sort({ order: 1, createdAt: -1 })
    res.json({ success: true, testimonials })
  } catch (error) {
    res.status(500).json({ success: false, message: error.message })
  }
})

router.post("/testimonials", async (req, res) => {
  try {
    const testimonial = new Testimonial(req.body)
    await testimonial.save()
    res.json({ success: true, testimonial })
  } catch (error) {
    res.status(500).json({ success: false, message: error.message })
  }
})

router.put("/testimonials/:id", async (req, res) => {
  try {
    const testimonial = await Testimonial.findByIdAndUpdate(req.params.id, req.body, { new: true })
    res.json({ success: true, testimonial })
  } catch (error) {
    res.status(500).json({ success: false, message: error.message })
  }
})

router.delete("/testimonials/:id", async (req, res) => {
  try {
    await Testimonial.findByIdAndDelete(req.params.id)
    res.json({ success: true, message: "Testimonial deleted" })
  } catch (error) {
    res.status(500).json({ success: false, message: error.message })
  }
})

// ============ EVENTS ============
router.get("/events", async (req, res) => {
  try {
    const events = await Event.find().sort({ date: 1 })
    res.json({ success: true, events })
  } catch (error) {
    res.status(500).json({ success: false, message: error.message })
  }
})

router.post("/events", async (req, res) => {
  try {
    const event = new Event(req.body)
    await event.save()
    res.json({ success: true, event })
  } catch (error) {
    res.status(500).json({ success: false, message: error.message })
  }
})

router.put("/events/:id", async (req, res) => {
  try {
    const event = await Event.findByIdAndUpdate(req.params.id, req.body, { new: true })
    res.json({ success: true, event })
  } catch (error) {
    res.status(500).json({ success: false, message: error.message })
  }
})

router.delete("/events/:id", async (req, res) => {
  try {
    await Event.findByIdAndDelete(req.params.id)
    res.json({ success: true, message: "Event deleted" })
  } catch (error) {
    res.status(500).json({ success: false, message: error.message })
  }
})

// ============ BLOGS ============
router.get("/blogs", async (req, res) => {
  try {
    const blogs = await Blog.find().sort({ createdAt: -1 })
    res.json({ success: true, blogs })
  } catch (error) {
    res.status(500).json({ success: false, message: error.message })
  }
})

router.post("/blogs", async (req, res) => {
  try {
    const blog = new Blog(req.body)
    await blog.save()
    res.json({ success: true, blog })
  } catch (error) {
    res.status(500).json({ success: false, message: error.message })
  }
})

router.put("/blogs/:id", async (req, res) => {
  try {
    const blog = await Blog.findByIdAndUpdate(req.params.id, req.body, { new: true })
    res.json({ success: true, blog })
  } catch (error) {
    res.status(500).json({ success: false, message: error.message })
  }
})

router.delete("/blogs/:id", async (req, res) => {
  try {
    await Blog.findByIdAndDelete(req.params.id)
    res.json({ success: true, message: "Blog deleted" })
  } catch (error) {
    res.status(500).json({ success: false, message: error.message })
  }
})

// ============ SOCIAL LINKS ============
router.get("/social-links", async (req, res) => {
  try {
    const socialLinks = await SocialLink.find().sort({ order: 1 })
    res.json({ success: true, socialLinks })
  } catch (error) {
    res.status(500).json({ success: false, message: error.message })
  }
})

router.post("/social-links", async (req, res) => {
  try {
    const socialLink = new SocialLink(req.body)
    await socialLink.save()
    res.json({ success: true, socialLink })
  } catch (error) {
    res.status(500).json({ success: false, message: error.message })
  }
})

router.put("/social-links/:id", async (req, res) => {
  try {
    const socialLink = await SocialLink.findByIdAndUpdate(req.params.id, req.body, { new: true })
    res.json({ success: true, socialLink })
  } catch (error) {
    res.status(500).json({ success: false, message: error.message })
  }
})

router.delete("/social-links/:id", async (req, res) => {
  try {
    await SocialLink.findByIdAndDelete(req.params.id)
    res.json({ success: true, message: "Social link deleted" })
  } catch (error) {
    res.status(500).json({ success: false, message: error.message })
  }
})

// ============ EXPORT DATA ============
router.get("/export-all", async (req, res) => {
  try {
    const messages = await Message.find()
    const volunteers = await Volunteer.find()
    const donations = await Donation.find()
    const testimonials = await Testimonial.find()
    const events = await Event.find()
    const blogs = await Blog.find()
    
    res.json({
      success: true,
      data: { messages, volunteers, donations, testimonials, events, blogs }
    })
  } catch (error) {
    res.status(500).json({ success: false, message: error.message })
  }
})

// ============ DONATION REPORT ============
router.get("/donation-report", async (req, res) => {
  try {
    const donations = await Donation.find()
    const totalAmount = donations.reduce((sum, d) => sum + d.amount, 0)
    const monthlyData = {}
    
    donations.forEach(d => {
      const month = new Date(d.createdAt).toLocaleString('default', { month: 'long', year: 'numeric' })
      monthlyData[month] = (monthlyData[month] || 0) + d.amount
    })
    
    res.json({
      success: true,
      report: {
        totalDonations: donations.length,
        totalAmount,
        averageAmount: totalAmount / (donations.length || 1),
        monthlyData,
        recentDonations: donations.slice(-10).reverse()
      }
    })
  } catch (error) {
    res.status(500).json({ success: false, message: error.message })
  }
})

export default router
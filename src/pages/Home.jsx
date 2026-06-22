import { useState, useEffect } from "react"

function Home() {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" })
  const [status, setStatus] = useState("")
  const [animate, setAnimate] = useState(false)
  
  // HERO TITLE IS HARDCODED - WILL NOT CHANGE
  const heroTitle = "SRC Charity"
  const heroSubtitle = "Together we can support education, healthcare, food drives, and social welfare programs."
  
  // Default content
  const [content, setContent] = useState({
    stats: [
      { number: "500+", label: "Families Helped" }, 
      { number: "1200+", label: "Students Supported" }, 
      { number: "50+", label: "Medical Camps" }, 
      { number: "100+", label: "Active Volunteers" }
    ],
    mission: { title: "Our Mission", text: "To empower underserved communities through education, healthcare, and social welfare programs." }
  })
  const [testimonials, setTestimonials] = useState([])
  const [contentLoaded, setContentLoaded] = useState(false)

  useEffect(() => {
    setAnimate(true)
    fetchContent()
    fetchTestimonials()
  }, [])

  const fetchContent = async () => {
    try {
      const response = await fetch("https://src-welfare-backend.onrender.com/api/content/home/all")
      const data = await response.json()
      if (data.success && data.contents) {
        const newContent = { ...content }
        data.contents.forEach(item => {
          if (item.section === "stats") newContent.stats = item.data
          if (item.section === "mission") newContent.mission = item.data
        })
        setContent(newContent)
      }
    } catch (error) {
      console.error("Error fetching content:", error)
    } finally {
      setContentLoaded(true)
    }
  }

  const fetchTestimonials = async () => {
    try {
      const response = await fetch("https://src-welfare-backend.onrender.com/api/admin/testimonials")
      const data = await response.json()
      if (data.success) {
        const cleanedTestimonials = data.testimonials.map(t => ({
          ...t,
          text: t.text.replace(/SRC Welfare Trust/g, "SRC Charity")
        }))
        setTestimonials(cleanedTestimonials)
      }
    } catch (error) {
      console.error("Error fetching testimonials:", error)
    }
  }

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setStatus("sending")
    
    try {
      const response = await fetch("https://src-welfare-backend.onrender.com/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      })
      
      const data = await response.json()
      
      if (data.success) {
        setStatus("success")
        setFormData({ name: "", email: "", message: "" })
        setTimeout(() => setStatus(""), 3000)
      } else {
        setStatus("error")
        setTimeout(() => setStatus(""), 3000)
      }
    } catch (error) {
      setStatus("error")
      setTimeout(() => setStatus(""), 3000)
    }
  }

  const stats = content.stats
  const impactNumbers = [
    { number: "10+", label: "Villages Covered" },
    { number: "25+", label: "Events Organized" },
    { number: "15+", label: "Partner Organizations" },
    { number: "200+", label: "Active Donors" }
  ]

  // Additional impact data
  const additionalImpact = [
    { number: "8+", label: "Years of Service" },
    { number: "50+", label: "Schools Supported" },
    { number: "30+", label: "Health Camps" },
    { number: "100+", label: "Women Empowered" }
  ]

  return (
    <div style={{ margin: 0, padding: 0 }}>
      {/* Hero Section - Full screen with overlay */}
      <div style={{
        height: "70vh",
        backgroundImage: "url('https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=1600')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        position: "relative",
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
      }}>
        <div style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: "rgba(0,0,0,0.6)"
        }}></div>
        
        <div style={{ 
          position: "relative", 
          textAlign: "center", 
          color: "white", 
          padding: "20px", 
          maxWidth: "800px", 
          animation: animate ? "fadeInUp 0.8s ease-out" : "none" 
        }}>
          <h1 style={{ 
            fontSize: "52px", 
            marginBottom: "16px", 
            fontWeight: "700",
            letterSpacing: "1px"
          }}>{heroTitle}</h1>
          <p style={{ 
            fontSize: "20px", 
            marginBottom: "30px", 
            lineHeight: "1.6", 
            opacity: 0.95,
            fontWeight: "300"
          }}>
            {heroSubtitle}
          </p>
          <div style={{ display: "flex", gap: "15px", justifyContent: "center", flexWrap: "wrap" }}>
            <a href="/donate">
              <button style={{
                backgroundColor: "#dc2626",
                color: "white",
                padding: "14px 36px",
                border: "none",
                borderRadius: "40px",
                fontSize: "16px",
                fontWeight: "600",
                cursor: "pointer",
                transition: "all 0.3s",
                boxShadow: "0 4px 15px rgba(220, 38, 38, 0.3)"
              }}
              onMouseEnter={(e) => {
                e.target.style.backgroundColor = "#b91c1c"
                e.target.style.transform = "translateY(-2px)"
              }}
              onMouseLeave={(e) => {
                e.target.style.backgroundColor = "#dc2626"
                e.target.style.transform = "translateY(0)"
              }}>
                Donate Now
              </button>
            </a>
            <a href="/programs">
              <button style={{
                backgroundColor: "transparent",
                color: "white",
                padding: "14px 36px",
                border: "2px solid white",
                borderRadius: "40px",
                fontSize: "16px",
                fontWeight: "600",
                cursor: "pointer",
                transition: "all 0.3s"
              }}
              onMouseEnter={(e) => {
                e.target.style.backgroundColor = "white"
                e.target.style.color = "#1f2937"
                e.target.style.transform = "translateY(-2px)"
              }}
              onMouseLeave={(e) => {
                e.target.style.backgroundColor = "transparent"
                e.target.style.color = "white"
                e.target.style.transform = "translateY(0)"
              }}>
                Our Programs
              </button>
            </a>
          </div>
        </div>
      </div>

      {/* Statistics Section */}
      <div style={{ padding: "80px 20px", backgroundColor: "#ffffff" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto", textAlign: "center" }}>
          <h2 style={{ 
            fontSize: "36px", 
            marginBottom: "8px", 
            fontWeight: "700",
            color: "#1a1a2e"
          }}>Our Impact in Numbers</h2>
          <p style={{ 
            fontSize: "18px", 
            color: "#6b7280", 
            marginBottom: "50px",
            fontWeight: "300"
          }}>Making a real difference in communities</p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "30px" }}>
            {stats.map((stat, index) => (
              <div key={index} style={{ 
                backgroundColor: "#f8f9fa", 
                padding: "35px 20px", 
                borderRadius: "12px",
                borderBottom: "4px solid #dc2626",
                transition: "transform 0.3s, box-shadow 0.3s"
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-8px)"
                e.currentTarget.style.boxShadow = "0 8px 25px rgba(0,0,0,0.08)"
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)"
                e.currentTarget.style.boxShadow = "none"
              }}>
                <h2 style={{ 
                  fontSize: "44px", 
                  color: "#dc2626", 
                  margin: "0", 
                  fontWeight: "700"
                }}>{stat.number}</h2>
                <p style={{ 
                  fontSize: "16px", 
                  color: "#4b5563", 
                  marginTop: "8px",
                  fontWeight: "500"
                }}>{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Additional Impact Section */}
      <div style={{ padding: "60px 20px", backgroundColor: "#f8f9fa" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto", textAlign: "center" }}>
          <h2 style={{ 
            fontSize: "32px", 
            marginBottom: "8px", 
            fontWeight: "700",
            color: "#1a1a2e"
          }}>Our Journey So Far</h2>
          <p style={{ 
            fontSize: "16px", 
            color: "#6b7280", 
            marginBottom: "40px",
            fontWeight: "300"
          }}>Milestones that define our commitment</p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: "25px" }}>
            {additionalImpact.map((item, index) => (
              <div key={index} style={{ 
                backgroundColor: "white", 
                padding: "30px 20px", 
                borderRadius: "12px",
                borderTop: "4px solid #dc2626",
                transition: "transform 0.3s, box-shadow 0.3s",
                boxShadow: "0 2px 10px rgba(0,0,0,0.04)"
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-5px)"
                e.currentTarget.style.boxShadow = "0 8px 25px rgba(0,0,0,0.08)"
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)"
                e.currentTarget.style.boxShadow = "0 2px 10px rgba(0,0,0,0.04)"
              }}>
                <h3 style={{ 
                  fontSize: "36px", 
                  color: "#dc2626", 
                  margin: "0", 
                  fontWeight: "700"
                }}>{item.number}</h3>
                <p style={{ 
                  fontSize: "14px", 
                  color: "#4b5563", 
                  marginTop: "8px",
                  fontWeight: "500"
                }}>{item.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Mission Section */}
      <div style={{ padding: "80px 20px", backgroundColor: "#ffffff" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto", textAlign: "center" }}>
          <h2 style={{ 
            fontSize: "36px", 
            marginBottom: "16px", 
            fontWeight: "700",
            color: "#1a1a2e"
          }}>{content.mission.title}</h2>
          <p style={{ 
            fontSize: "18px", 
            color: "#4b5563", 
            maxWidth: "800px", 
            margin: "0 auto 50px", 
            lineHeight: "1.8",
            fontWeight: "300"
          }}>
            {content.mission.text}
          </p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "30px" }}>
            <div style={{ 
              padding: "30px", 
              backgroundColor: "#f8f9fa", 
              borderRadius: "12px", 
              borderLeft: "4px solid #dc2626",
              transition: "transform 0.3s, box-shadow 0.3s",
              boxShadow: "0 2px 10px rgba(0,0,0,0.04)"
            }} 
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-5px)"
              e.currentTarget.style.boxShadow = "0 8px 30px rgba(0,0,0,0.08)"
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0)"
              e.currentTarget.style.boxShadow = "0 2px 10px rgba(0,0,0,0.04)"
            }}>
              <h3 style={{ fontSize: "22px", marginBottom: "10px", fontWeight: "600", color: "#1a1a2e" }}>Our Vision</h3>
              <p style={{ fontSize: "15px", color: "#6b7280", lineHeight: "1.6" }}>A world with equal opportunities for all, where every individual can reach their full potential regardless of their background.</p>
            </div>
            <div style={{ 
              padding: "30px", 
              backgroundColor: "#f8f9fa", 
              borderRadius: "12px", 
              borderLeft: "4px solid #dc2626",
              transition: "transform 0.3s, box-shadow 0.3s",
              boxShadow: "0 2px 10px rgba(0,0,0,0.04)"
            }} 
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-5px)"
              e.currentTarget.style.boxShadow = "0 8px 30px rgba(0,0,0,0.08)"
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0)"
              e.currentTarget.style.boxShadow = "0 2px 10px rgba(0,0,0,0.04)"
            }}>
              <h3 style={{ fontSize: "22px", marginBottom: "10px", fontWeight: "600", color: "#1a1a2e" }}>Our Impact</h3>
              <p style={{ fontSize: "15px", color: "#6b7280", lineHeight: "1.6" }}>Transforming lives through sustainable action, creating lasting change in communities across India.</p>
            </div>
            <div style={{ 
              padding: "30px", 
              backgroundColor: "#f8f9fa", 
              borderRadius: "12px", 
              borderLeft: "4px solid #dc2626",
              transition: "transform 0.3s, box-shadow 0.3s",
              boxShadow: "0 2px 10px rgba(0,0,0,0.04)"
            }} 
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-5px)"
              e.currentTarget.style.boxShadow = "0 8px 30px rgba(0,0,0,0.08)"
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0)"
              e.currentTarget.style.boxShadow = "0 2px 10px rgba(0,0,0,0.04)"
            }}>
              <h3 style={{ fontSize: "22px", marginBottom: "10px", fontWeight: "600", color: "#1a1a2e" }}>Our Promise</h3>
              <p style={{ fontSize: "15px", color: "#6b7280", lineHeight: "1.6" }}>100% transparency in all our activities, ensuring every contribution makes a meaningful difference.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Impact Overview - REDUCED BANNER */}
      <div style={{ 
        padding: "35px 20px", 
        backgroundColor: "#dc2626", 
        color: "white"
      }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto", textAlign: "center" }}>
          <h2 style={{ 
            fontSize: "28px", 
            marginBottom: "6px", 
            fontWeight: "700"
          }}>Quick Impact Overview</h2>
          <p style={{ 
            fontSize: "15px", 
            marginBottom: "30px", 
            opacity: 0.9,
            fontWeight: "300"
          }}>Our reach across communities</p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))", gap: "20px" }}>
            {impactNumbers.map((item, index) => (
              <div key={index} style={{
                padding: "12px",
                borderRadius: "8px",
                backgroundColor: "rgba(255,255,255,0.1)",
                transition: "transform 0.3s, backgroundColor 0.3s"
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "scale(1.05)"
                e.currentTarget.style.backgroundColor = "rgba(255,255,255,0.2)"
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "scale(1)"
                e.currentTarget.style.backgroundColor = "rgba(255,255,255,0.1)"
              }}>
                <h3 style={{ 
                  fontSize: "28px", 
                  fontWeight: "700", 
                  margin: "5px 0",
                  letterSpacing: "0.5px"
                }}>{item.number}</h3>
                <p style={{ 
                  fontSize: "13px", 
                  opacity: 0.9,
                  margin: 0,
                  fontWeight: "400"
                }}>{item.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Testimonials Section */}
      <div style={{ padding: "80px 20px", backgroundColor: "#ffffff" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <h2 style={{ 
            fontSize: "36px", 
            textAlign: "center", 
            marginBottom: "8px", 
            fontWeight: "700",
            color: "#1a1a2e"
          }}>What People Say</h2>
          <p style={{ 
            textAlign: "center", 
            fontSize: "18px", 
            color: "#6b7280", 
            marginBottom: "50px",
            fontWeight: "300"
          }}>Stories of hope and transformation</p>
          {testimonials.length === 0 ? (
            <p style={{ textAlign: "center", color: "#6b7280" }}>No testimonials yet.</p>
          ) : (
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: "30px" }}>
              {testimonials.map((testimonial) => (
                <div key={testimonial._id} style={{ 
                  backgroundColor: "#f8f9fa", 
                  padding: "30px", 
                  borderRadius: "12px",
                  borderLeft: "4px solid #dc2626",
                  transition: "transform 0.3s, box-shadow 0.3s",
                  boxShadow: "0 2px 10px rgba(0,0,0,0.04)"
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-5px)"
                  e.currentTarget.style.boxShadow = "0 8px 30px rgba(0,0,0,0.08)"
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0)"
                  e.currentTarget.style.boxShadow = "0 2px 10px rgba(0,0,0,0.04)"
                }}>
                  <div style={{ fontSize: "30px", marginBottom: "10px", color: "#dc2626" }}>"</div>
                  <p style={{ 
                    fontSize: "15px", 
                    lineHeight: "1.7", 
                    color: "#4b5563", 
                    marginBottom: "20px",
                    fontStyle: "italic"
                  }}>{testimonial.text}</p>
                  <div>
                    <h4 style={{ 
                      margin: "0", 
                      fontSize: "16px", 
                      fontWeight: "600",
                      color: "#1a1a2e"
                    }}>{testimonial.name}</h4>
                    <p style={{ 
                      margin: "4px 0 0", 
                      fontSize: "13px", 
                      color: "#dc2626",
                      fontWeight: "500"
                    }}>{testimonial.role}</p>
                    <div style={{ color: "#fbbf24", marginTop: "8px", fontSize: "16px" }}>
                      {"★".repeat(testimonial.rating || 5)}{"☆".repeat(5 - (testimonial.rating || 5))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Contact Form Section */}
      <div style={{ padding: "80px 20px", backgroundColor: "#f8f9fa" }}>
        <div style={{ maxWidth: "700px", margin: "0 auto", textAlign: "center" }}>
          <h2 style={{ 
            fontSize: "36px", 
            marginBottom: "8px", 
            fontWeight: "700",
            color: "#1a1a2e"
          }}>Get In Touch</h2>
          <p style={{ 
            fontSize: "18px", 
            color: "#6b7280", 
            marginBottom: "40px",
            fontWeight: "300"
          }}>Have questions? We'd love to hear from you.</p>

          {status === "success" && (
            <div style={{ 
              backgroundColor: "#d1fae5", 
              color: "#065f46", 
              padding: "15px", 
              borderRadius: "8px", 
              marginBottom: "20px",
              fontWeight: "500"
            }}>Message sent successfully!</div>
          )}
          {status === "error" && (
            <div style={{ 
              backgroundColor: "#fee2e2", 
              color: "#991b1b", 
              padding: "15px", 
              borderRadius: "8px", 
              marginBottom: "20px",
              fontWeight: "500"
            }}>Failed to send. Please try again.</div>
          )}
          {status === "sending" && (
            <div style={{ 
              backgroundColor: "#dbeafe", 
              color: "#1e40af", 
              padding: "15px", 
              borderRadius: "8px", 
              marginBottom: "20px",
              fontWeight: "500"
            }}>Sending...</div>
          )}

          <form onSubmit={handleSubmit} style={{ backgroundColor: "white", padding: "40px", borderRadius: "12px", boxShadow: "0 2px 15px rgba(0,0,0,0.05)" }}>
            <input 
              type="text" 
              name="name" 
              placeholder="Your Name" 
              value={formData.name} 
              onChange={handleChange} 
              required 
              style={{ 
                width: "100%", 
                padding: "14px 16px", 
                marginBottom: "15px", 
                border: "1px solid #e5e7eb", 
                borderRadius: "8px", 
                fontSize: "15px",
                boxSizing: "border-box",
                transition: "border-color 0.3s"
              }}
              onFocus={(e) => e.currentTarget.style.borderColor = "#dc2626"}
              onBlur={(e) => e.currentTarget.style.borderColor = "#e5e7eb"}
            />
            <input 
              type="email" 
              name="email" 
              placeholder="Your Email Address" 
              value={formData.email} 
              onChange={handleChange} 
              required 
              style={{ 
                width: "100%", 
                padding: "14px 16px", 
                marginBottom: "15px", 
                border: "1px solid #e5e7eb", 
                borderRadius: "8px", 
                fontSize: "15px",
                boxSizing: "border-box",
                transition: "border-color 0.3s"
              }}
              onFocus={(e) => e.currentTarget.style.borderColor = "#dc2626"}
              onBlur={(e) => e.currentTarget.style.borderColor = "#e5e7eb"}
            />
            <textarea 
              name="message" 
              placeholder="Your Message" 
              rows="5" 
              value={formData.message} 
              onChange={handleChange} 
              required 
              style={{ 
                width: "100%", 
                padding: "14px 16px", 
                marginBottom: "20px", 
                border: "1px solid #e5e7eb", 
                borderRadius: "8px", 
                fontSize: "15px", 
                fontFamily: "inherit",
                boxSizing: "border-box",
                resize: "vertical",
                transition: "border-color 0.3s"
              }}
              onFocus={(e) => e.currentTarget.style.borderColor = "#dc2626"}
              onBlur={(e) => e.currentTarget.style.borderColor = "#e5e7eb"}
            />
            <button 
              type="submit" 
              disabled={status === "sending"} 
              style={{ 
                width: "100%", 
                backgroundColor: "#dc2626", 
                color: "white", 
                padding: "15px", 
                border: "none", 
                borderRadius: "8px", 
                fontSize: "16px", 
                fontWeight: "600", 
                cursor: "pointer",
                transition: "background-color 0.3s, transform 0.2s",
                opacity: status === "sending" ? 0.7 : 1
              }}
              onMouseEnter={(e) => {
                if (status !== "sending") {
                  e.target.style.backgroundColor = "#b91c1c"
                  e.target.style.transform = "translateY(-2px)"
                }
              }}
              onMouseLeave={(e) => {
                if (status !== "sending") {
                  e.target.style.backgroundColor = "#dc2626"
                  e.target.style.transform = "translateY(0)"
                }
              }}>
              {status === "sending" ? "Sending..." : "Send Message"}
            </button>
          </form>
        </div>
      </div>

      <style>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  )
}

export default Home
import { useState } from "react"

function Volunteer() {
  const [formData, setFormData] = useState({
    name: "", email: "", phone: "", age: "", skills: "", availability: "", message: ""
  })
  const [status, setStatus] = useState("")

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setStatus("sending")
    
    try {
      const response = await fetch("https://src-welfare-backend.onrender.com/api/admin/volunteers", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      })
      
      const data = await response.json()
      
      if (data.success) {
        setStatus("success")
        setFormData({ name: "", email: "", phone: "", age: "", skills: "", availability: "", message: "" })
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

  const opportunities = [
    { title: "Teaching Assistant", description: "Help teach children in our education program", time: "Weekdays, 2-4 hours" },
    { title: "Medical Camp Support", description: "Assist doctors during health camps", time: "Weekends, flexible" },
    { title: "Event Coordinator", description: "Organize fundraising and awareness events", time: "Flexible hours" },
    { title: "Social Media Manager", description: "Manage our social media presence", time: "Remote, 5 hours/week" }
  ]

  return (
    <div>
      {/* Hero Section - THIN RED STRIP (same as all other pages) */}
      <div style={{ 
        backgroundColor: "#e74c3c", 
        color: "white", 
        padding: "12px 20px",
        textAlign: "center"
      }}>
        <h1 style={{ 
          fontSize: "24px",
          marginBottom: "2px",
          fontWeight: "700"
        }}>Become a Volunteer</h1>
        <p style={{ 
          fontSize: "14px",
          maxWidth: "600px", 
          margin: "0 auto",
          opacity: "0.9"
        }}>Join us in making a difference</p>
      </div>

      {/* Spacer to separate hero from content */}
      <div style={{ height: "20px" }}></div>

      <div style={{ padding: "0 20px 60px 20px", maxWidth: "1200px", margin: "0 auto" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(350px, 1fr))", gap: "40px" }}>
          
          {/* Left Column - Opportunities */}
          <div>
            <h2 style={{ 
              fontSize: "28px", 
              marginBottom: "24px",
              color: "#1a1a2e",
              fontWeight: "600"
            }}>Volunteer Opportunities</h2>
            {opportunities.map((opp, index) => (
              <div 
                key={index} 
                style={{ 
                  backgroundColor: "#f8f9fa", 
                  padding: "24px", 
                  borderRadius: "10px", 
                  marginBottom: "20px",
                  borderLeft: "4px solid #e74c3c",
                  transition: "transform 0.3s, box-shadow 0.3s"
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateX(5px)"
                  e.currentTarget.style.boxShadow = "0 4px 12px rgba(0,0,0,0.08)"
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateX(0)"
                  e.currentTarget.style.boxShadow = "none"
                }}
              >
                <h3 style={{ 
                  margin: "0 0 8px 0", 
                  color: "#e74c3c",
                  fontSize: "20px",
                  fontWeight: "600"
                }}>{opp.title}</h3>
                <p style={{ color: "#4a4a4a", lineHeight: "1.6", margin: "0 0 10px 0" }}>{opp.description}</p>
                <p style={{ margin: 0, fontSize: "14px", color: "#888" }}>⏰ {opp.time}</p>
              </div>
            ))}
          </div>

          {/* Right Column - Application Form */}
          <div>
            <h2 style={{ 
              fontSize: "28px", 
              marginBottom: "24px",
              color: "#1a1a2e",
              fontWeight: "600"
            }}>Volunteer Application</h2>
            
            {status === "success" && (
              <div style={{ 
                backgroundColor: "#d1fae5", 
                color: "#065f46", 
                padding: "15px 20px", 
                borderRadius: "8px", 
                marginBottom: "20px", 
                textAlign: "center",
                fontWeight: "500"
              }}>✅ Application submitted! We'll contact you soon.</div>
            )}
            {status === "error" && (
              <div style={{ 
                backgroundColor: "#fee2e2", 
                color: "#991b1b", 
                padding: "15px 20px", 
                borderRadius: "8px", 
                marginBottom: "20px", 
                textAlign: "center",
                fontWeight: "500"
              }}>❌ Failed to submit. Please try again.</div>
            )}
            {status === "sending" && (
              <div style={{ 
                backgroundColor: "#dbeafe", 
                color: "#1e40af", 
                padding: "15px 20px", 
                borderRadius: "8px", 
                marginBottom: "20px", 
                textAlign: "center",
                fontWeight: "500"
              }}>📧 Submitting...</div>
            )}
            
            <form onSubmit={handleSubmit}>
              <div style={{ marginBottom: "15px" }}>
                <input 
                  type="text" 
                  name="name" 
                  placeholder="Full Name *" 
                  value={formData.name} 
                  onChange={handleChange} 
                  required 
                  style={{ 
                    width: "100%", 
                    padding: "12px 15px", 
                    border: "1px solid #ddd", 
                    borderRadius: "8px",
                    fontSize: "14px",
                    boxSizing: "border-box"
                  }} 
                />
              </div>
              <div style={{ marginBottom: "15px" }}>
                <input 
                  type="email" 
                  name="email" 
                  placeholder="Email *" 
                  value={formData.email} 
                  onChange={handleChange} 
                  required 
                  style={{ 
                    width: "100%", 
                    padding: "12px 15px", 
                    border: "1px solid #ddd", 
                    borderRadius: "8px",
                    fontSize: "14px",
                    boxSizing: "border-box"
                  }} 
                />
              </div>
              <div style={{ marginBottom: "15px" }}>
                <input 
                  type="tel" 
                  name="phone" 
                  placeholder="Phone *" 
                  value={formData.phone} 
                  onChange={handleChange} 
                  required 
                  style={{ 
                    width: "100%", 
                    padding: "12px 15px", 
                    border: "1px solid #ddd", 
                    borderRadius: "8px",
                    fontSize: "14px",
                    boxSizing: "border-box"
                  }} 
                />
              </div>
              <div style={{ marginBottom: "15px" }}>
                <input 
                  type="number" 
                  name="age" 
                  placeholder="Age" 
                  value={formData.age} 
                  onChange={handleChange} 
                  style={{ 
                    width: "100%", 
                    padding: "12px 15px", 
                    border: "1px solid #ddd", 
                    borderRadius: "8px",
                    fontSize: "14px",
                    boxSizing: "border-box"
                  }} 
                />
              </div>
              <div style={{ marginBottom: "15px" }}>
                <textarea 
                  name="skills" 
                  placeholder="Skills/Experience" 
                  value={formData.skills} 
                  onChange={handleChange} 
                  rows="3" 
                  style={{ 
                    width: "100%", 
                    padding: "12px 15px", 
                    border: "1px solid #ddd", 
                    borderRadius: "8px",
                    fontSize: "14px",
                    boxSizing: "border-box",
                    fontFamily: "inherit",
                    resize: "vertical"
                  }}
                ></textarea>
              </div>
              <div style={{ marginBottom: "15px" }}>
                <select 
                  name="availability" 
                  value={formData.availability} 
                  onChange={handleChange} 
                  style={{ 
                    width: "100%", 
                    padding: "12px 15px", 
                    border: "1px solid #ddd", 
                    borderRadius: "8px",
                    fontSize: "14px",
                    boxSizing: "border-box",
                    backgroundColor: "white"
                  }}
                >
                  <option value="">Select Availability</option>
                  <option>Weekdays</option>
                  <option>Weekends</option>
                  <option>Evenings</option>
                  <option>Flexible</option>
                </select>
              </div>
              <div style={{ marginBottom: "20px" }}>
                <textarea 
                  name="message" 
                  placeholder="Why do you want to volunteer?" 
                  value={formData.message} 
                  onChange={handleChange} 
                  rows="3" 
                  style={{ 
                    width: "100%", 
                    padding: "12px 15px", 
                    border: "1px solid #ddd", 
                    borderRadius: "8px",
                    fontSize: "14px",
                    boxSizing: "border-box",
                    fontFamily: "inherit",
                    resize: "vertical"
                  }}
                ></textarea>
              </div>
              <button 
                type="submit" 
                disabled={status === "sending"} 
                style={{ 
                  width: "100%", 
                  backgroundColor: "#e74c3c", 
                  color: "white", 
                  padding: "14px", 
                  border: "none", 
                  borderRadius: "8px", 
                  fontSize: "16px", 
                  cursor: "pointer",
                  fontWeight: "600",
                  transition: "background-color 0.3s",
                  opacity: status === "sending" ? 0.7 : 1
                }}
                onMouseEnter={(e) => {
                  if (status !== "sending") e.currentTarget.style.backgroundColor = "#c0392b"
                }}
                onMouseLeave={(e) => {
                  if (status !== "sending") e.currentTarget.style.backgroundColor = "#e74c3c"
                }}
              >
                {status === "sending" ? "Submitting..." : "Submit Application"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Volunteer
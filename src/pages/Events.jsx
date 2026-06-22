import { useState } from "react"
import axios from "axios"

function Events() {
  const [selectedEvent, setSelectedEvent] = useState(null)
  const [showModal, setShowModal] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    age: "",
    city: "",
    message: ""
  })
  const [loading, setLoading] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const events = [
    {
      id: 1,
      title: "Annual Charity Run",
      date: "August 20, 2026",
      time: "7:00 AM - 10:00 AM",
      location: "Marina Beach, Chennai",
      description: "Join us for a 5K run to raise funds for education",
      image: "https://images.unsplash.com/photo-1530482817083-29ae4b92ff15?w=600"
    },
    {
      id: 2,
      title: "Free Health Checkup Camp",
      date: "September 25, 2026",
      time: "9:00 AM - 5:00 PM",
      location: "Community Hall, Velachery",
      description: "Free medical consultation and medicines",
      image: "https://images.unsplash.com/photo-1516574187841-cb9cc2ca948b?w=600"
    },
    {
      id: 3,
      title: "Education Awareness Workshop",
      date: "November 5, 2026",
      time: "10:00 AM - 3:00 PM",
      location: "Government School, Tambaram",
      description: "Workshop on importance of girl child education",
      image: "https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?w=600"
    }
  ]

  const handleRegisterClick = (event) => {
    setSelectedEvent(event)
    setShowModal(true)
    setSubmitted(false)
    setFormData({
      name: "",
      email: "",
      phone: "",
      age: "",
      city: "",
      message: ""
    })
  }

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    
    try {
      const response = await axios.post(
        "https://src-welfare-backend.onrender.com/api/events/register",
        {
          ...formData,
          eventId: selectedEvent.id,
          eventTitle: selectedEvent.title,
          eventDate: selectedEvent.date,
          eventTime: selectedEvent.time,
          eventLocation: selectedEvent.location
        }
      )
      
      if (response.data.success) {
        setSubmitted(true)
        setTimeout(() => {
          setShowModal(false)
          setSubmitted(false)
        }, 2000)
      } else {
        alert("Registration failed. Please try again.")
      }
    } catch (error) {
      console.error("Registration error:", error)
      alert("Something went wrong. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  const closeModal = () => {
    setShowModal(false)
    setSubmitted(false)
  }

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
        }}>Upcoming Events</h1>
        <p style={{ 
          fontSize: "14px",
          maxWidth: "600px", 
          margin: "0 auto",
          opacity: "0.9"
        }}>Join us and make a difference</p>
      </div>

      {/* Spacer to separate hero from content */}
      <div style={{ height: "20px" }}></div>

      {/* Events Grid */}
      <div style={{ padding: "0 20px 60px 20px", maxWidth: "1200px", margin: "0 auto" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(350px, 1fr))", gap: "30px" }}>
          {events.map(event => (
            <div 
              key={event.id} 
              style={{ 
                backgroundColor: "white", 
                borderRadius: "10px", 
                overflow: "hidden", 
                boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
                transition: "transform 0.3s, box-shadow 0.3s"
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-5px)"
                e.currentTarget.style.boxShadow = "0 8px 25px rgba(0,0,0,0.15)"
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)"
                e.currentTarget.style.boxShadow = "0 4px 6px rgba(0,0,0,0.1)"
              }}
            >
              <img src={event.image} alt={event.title} style={{ width: "100%", height: "200px", objectFit: "cover" }} />
              <div style={{ padding: "25px" }}>
                <h3 style={{ 
                  fontSize: "22px", 
                  marginBottom: "12px",
                  color: "#1a1a2e",
                  fontWeight: "600"
                }}>{event.title}</h3>
                <p style={{ margin: "6px 0", color: "#4a4a4a", fontSize: "15px" }}>📅 {event.date}</p>
                <p style={{ margin: "6px 0", color: "#4a4a4a", fontSize: "15px" }}>⏰ {event.time}</p>
                <p style={{ margin: "6px 0 12px 0", color: "#4a4a4a", fontSize: "15px" }}>📍 {event.location}</p>
                <p style={{ color: "#666", marginTop: "10px", fontSize: "15px", lineHeight: "1.6" }}>{event.description}</p>
                <button 
                  onClick={() => handleRegisterClick(event)}
                  style={{ 
                    marginTop: "18px", 
                    backgroundColor: "#e74c3c", 
                    color: "white", 
                    padding: "10px 28px", 
                    border: "none", 
                    borderRadius: "25px", 
                    cursor: "pointer",
                    fontWeight: "600",
                    fontSize: "14px",
                    transition: "background-color 0.3s"
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.backgroundColor = "#c0392b"}
                  onMouseLeave={(e) => e.currentTarget.style.backgroundColor = "#e74c3c"}
                >
                  Register Now
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Registration Modal */}
      {showModal && selectedEvent && (
        <div style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: "rgba(0,0,0,0.6)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          zIndex: 9999,
          padding: "20px"
        }} onClick={closeModal}>
          <div style={{
            backgroundColor: "white",
            padding: "35px",
            borderRadius: "10px",
            width: "500px",
            maxWidth: "100%",
            maxHeight: "90%",
            overflowY: "auto",
            position: "relative"
          }} onClick={(e) => e.stopPropagation()}>
            
            {!submitted ? (
              <>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
                  <h2 style={{ 
                    color: "#e74c3c", 
                    margin: 0,
                    fontSize: "24px",
                    fontWeight: "600"
                  }}>Register for Event</h2>
                  <button 
                    onClick={closeModal} 
                    style={{ 
                      background: "none", 
                      border: "none", 
                      fontSize: "24px", 
                      cursor: "pointer", 
                      color: "#666",
                      padding: "5px 10px"
                    }}
                  >
                    ✕
                  </button>
                </div>
                
                <div style={{ 
                  backgroundColor: "#fef2f2", 
                  padding: "15px", 
                  borderRadius: "8px", 
                  marginBottom: "20px",
                  borderLeft: "4px solid #e74c3c"
                }}>
                  <p style={{ 
                    fontWeight: "600", 
                    margin: "0 0 5px 0",
                    color: "#1a1a2e",
                    fontSize: "16px"
                  }}>{selectedEvent.title}</p>
                  <p style={{ margin: "5px 0", fontSize: "14px", color: "#666" }}>📅 {selectedEvent.date} | ⏰ {selectedEvent.time}</p>
                  <p style={{ margin: "5px 0", fontSize: "14px", color: "#666" }}>📍 {selectedEvent.location}</p>
                </div>
                
                <form onSubmit={handleSubmit}>
                  <input
                    type="text"
                    name="name"
                    placeholder="Full Name *"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    style={{ 
                      width: "100%", 
                      padding: "12px 15px", 
                      marginBottom: "15px", 
                      border: "1px solid #ddd", 
                      borderRadius: "8px", 
                      fontSize: "14px",
                      boxSizing: "border-box"
                    }}
                  />
                  
                  <input
                    type="email"
                    name="email"
                    placeholder="Email Address *"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    style={{ 
                      width: "100%", 
                      padding: "12px 15px", 
                      marginBottom: "15px", 
                      border: "1px solid #ddd", 
                      borderRadius: "8px", 
                      fontSize: "14px",
                      boxSizing: "border-box"
                    }}
                  />
                  
                  <input
                    type="tel"
                    name="phone"
                    placeholder="Phone Number *"
                    required
                    value={formData.phone}
                    onChange={handleChange}
                    style={{ 
                      width: "100%", 
                      padding: "12px 15px", 
                      marginBottom: "15px", 
                      border: "1px solid #ddd", 
                      borderRadius: "8px", 
                      fontSize: "14px",
                      boxSizing: "border-box"
                    }}
                  />
                  
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "15px", marginBottom: "15px" }}>
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
                    
                    <input
                      type="text"
                      name="city"
                      placeholder="City"
                      value={formData.city}
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
                  
                  <textarea
                    name="message"
                    placeholder="Any specific requirements or questions?"
                    rows="3"
                    value={formData.message}
                    onChange={handleChange}
                    style={{ 
                      width: "100%", 
                      padding: "12px 15px", 
                      marginBottom: "20px", 
                      border: "1px solid #ddd", 
                      borderRadius: "8px", 
                      fontSize: "14px", 
                      fontFamily: "inherit",
                      boxSizing: "border-box",
                      resize: "vertical"
                    }}
                  ></textarea>
                  
                  <div style={{ display: "flex", gap: "10px" }}>
                    <button
                      type="submit"
                      disabled={loading}
                      style={{
                        backgroundColor: "#e74c3c",
                        color: "white",
                        border: "none",
                        padding: "12px 24px",
                        borderRadius: "8px",
                        cursor: "pointer",
                        flex: 1,
                        opacity: loading ? 0.7 : 1,
                        fontWeight: "600",
                        fontSize: "15px",
                        transition: "background-color 0.3s"
                      }}
                      onMouseEnter={(e) => {
                        if (!loading) e.currentTarget.style.backgroundColor = "#c0392b"
                      }}
                      onMouseLeave={(e) => {
                        if (!loading) e.currentTarget.style.backgroundColor = "#e74c3c"
                      }}
                    >
                      {loading ? "Registering..." : "Confirm Registration"}
                    </button>
                    <button
                      type="button"
                      onClick={closeModal}
                      style={{
                        backgroundColor: "#95a5a6",
                        color: "white",
                        border: "none",
                        padding: "12px 24px",
                        borderRadius: "8px",
                        cursor: "pointer",
                        fontWeight: "600",
                        fontSize: "15px",
                        transition: "background-color 0.3s"
                      }}
                      onMouseEnter={(e) => e.currentTarget.style.backgroundColor = "#7f8c8d"}
                      onMouseLeave={(e) => e.currentTarget.style.backgroundColor = "#95a5a6"}
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              </>
            ) : (
              <div style={{ textAlign: "center", padding: "40px 20px" }}>
                <div style={{ 
                  fontSize: "60px", 
                  marginBottom: "20px",
                  backgroundColor: "#d5f5e3",
                  width: "80px",
                  height: "80px",
                  borderRadius: "50%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  margin: "0 auto 20px auto"
                }}>✅</div>
                <h3 style={{ 
                  color: "#27ae60", 
                  marginBottom: "10px",
                  fontSize: "24px",
                  fontWeight: "600"
                }}>Registration Successful!</h3>
                <p style={{ color: "#666", fontSize: "16px" }}>Thank you for registering! We will send you event details via email.</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

export default Events
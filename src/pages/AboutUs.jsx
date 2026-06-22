import { useState, useEffect } from "react"

function AboutUs() {
  const [team, setTeam] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchTeam()
  }, [])

  const fetchTeam = async () => {
    try {
      const response = await fetch("https://src-welfare-backend.onrender.com/api/admin/team")
      const data = await response.json()
      if (data.success) {
        setTeam(data.team)
      }
    } catch (error) {
      console.error("Error fetching team:", error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div>
      {/* Hero Section - THINNER RED STRIP */}
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
        }}>About Us</h1>
        <p style={{ 
          fontSize: "14px",
          maxWidth: "600px", 
          margin: "0 auto",
          opacity: "0.9"
        }}>Making a difference since 2016</p>
      </div>

      {/* Spacer to separate hero from content */}
      <div style={{ height: "20px" }}></div>
      
      <div style={{ padding: "0 20px 60px 20px", maxWidth: "1200px", margin: "0 auto" }}>
        
        {/* Our Story Section */}
        <div style={{ marginBottom: "60px" }}>
          <h2 style={{ 
            fontSize: "32px", 
            marginBottom: "20px", 
            color: "#1a1a2e",
            fontWeight: "600"
          }}>Our Story</h2>
          <p style={{ fontSize: "18px", lineHeight: "1.8", color: "#4a4a4a", marginBottom: "20px" }}>
            SRC Welfare Trust was founded in 2015 by a group of passionate individuals who believed in the power of collective action. What started as a small community initiative has grown into a trusted NGO serving thousands of families across Telangana.
          </p>
          <p style={{ fontSize: "18px", lineHeight: "1.8", color: "#4a4a4a" }}>
            Over the past 8 years, we have expanded our reach to over 50 villages, impacting more than 10,000 lives through our various programs in education, healthcare, and social welfare.
          </p>
        </div>

        {/* Mission & Vision Grid */}
        <div style={{ 
          display: "grid", 
          gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", 
          gap: "30px", 
          marginBottom: "60px" 
        }}>
          <div style={{ 
            backgroundColor: "#f8f9fa", 
            padding: "35px 30px", 
            borderRadius: "8px", 
            borderLeft: "4px solid #e74c3c"
          }}>
            <h3 style={{ 
              fontSize: "22px", 
              marginBottom: "15px", 
              color: "#1a1a2e",
              fontWeight: "600"
            }}>Our Mission</h3>
            <p style={{ fontSize: "16px", lineHeight: "1.7", color: "#4a4a4a" }}>
              To empower underserved communities through quality education, accessible healthcare, and sustainable social welfare programs.
            </p>
          </div>
          <div style={{ 
            backgroundColor: "#f8f9fa", 
            padding: "35px 30px", 
            borderRadius: "8px", 
            borderLeft: "4px solid #e74c3c"
          }}>
            <h3 style={{ 
              fontSize: "22px", 
              marginBottom: "15px", 
              color: "#1a1a2e",
              fontWeight: "600"
            }}>Our Vision</h3>
            <p style={{ fontSize: "16px", lineHeight: "1.7", color: "#4a4a4a" }}>
              A world where every individual has access to quality education, healthcare, and equal opportunities regardless of their economic background.
            </p>
          </div>
          <div style={{ 
            backgroundColor: "#f8f9fa", 
            padding: "35px 30px", 
            borderRadius: "8px", 
            borderLeft: "4px solid #e74c3c"
          }}>
            <h3 style={{ 
              fontSize: "22px", 
              marginBottom: "15px", 
              color: "#1a1a2e",
              fontWeight: "600"
            }}>Our Values</h3>
            <p style={{ fontSize: "16px", lineHeight: "1.7", color: "#4a4a4a" }}>
              Transparency, Compassion, Integrity, Inclusivity, and Sustainable Impact are the core values that guide all our actions.
            </p>
          </div>
        </div>

        {/* Key Achievements Section */}
        <div style={{ marginBottom: "60px" }}>
          <h2 style={{ 
            fontSize: "32px", 
            marginBottom: "30px", 
            textAlign: "center", 
            color: "#1a1a2e",
            fontWeight: "600"
          }}>Key Achievements</h2>
          <div style={{ 
            display: "grid", 
            gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", 
            gap: "25px" 
          }}>
            <div style={{ 
              textAlign: "center", 
              padding: "25px 20px",
              backgroundColor: "white",
              borderRadius: "8px",
              boxShadow: "0 2px 8px rgba(0,0,0,0.08)"
            }}>
              <div style={{ 
                fontSize: "28px", 
                color: "#e74c3c",
                marginBottom: "10px",
                fontWeight: "bold"
              }}>🏆</div>
              <h3 style={{ fontSize: "18px", marginBottom: "8px", color: "#1a1a2e" }}>Best NGO Award 2022</h3>
              <p style={{ fontSize: "14px", color: "#666", margin: 0 }}>Recognized for outstanding work in education</p>
            </div>
            <div style={{ 
              textAlign: "center", 
              padding: "25px 20px",
              backgroundColor: "white",
              borderRadius: "8px",
              boxShadow: "0 2px 8px rgba(0,0,0,0.08)"
            }}>
              <div style={{ 
                fontSize: "28px", 
                color: "#e74c3c",
                marginBottom: "10px",
                fontWeight: "bold"
              }}>⭐</div>
              <h3 style={{ fontSize: "18px", marginBottom: "8px", color: "#1a1a2e" }}>80G Certification</h3>
              <p style={{ fontSize: "14px", color: "#666", margin: 0 }}>Tax exemption for all donors</p>
            </div>
            <div style={{ 
              textAlign: "center", 
              padding: "25px 20px",
              backgroundColor: "white",
              borderRadius: "8px",
              boxShadow: "0 2px 8px rgba(0,0,0,0.08)"
            }}>
              <div style={{ 
                fontSize: "28px", 
                color: "#e74c3c",
                marginBottom: "10px",
                fontWeight: "bold"
              }}>🤝</div>
              <h3 style={{ fontSize: "18px", marginBottom: "8px", color: "#1a1a2e" }}>15+ Partners</h3>
              <p style={{ fontSize: "14px", color: "#666", margin: 0 }}>Collaborating with leading organizations</p>
            </div>
            <div style={{ 
              textAlign: "center", 
              padding: "25px 20px",
              backgroundColor: "white",
              borderRadius: "8px",
              boxShadow: "0 2px 8px rgba(0,0,0,0.08)"
            }}>
              <div style={{ 
                fontSize: "28px", 
                color: "#e74c3c",
                marginBottom: "10px",
                fontWeight: "bold"
              }}>🌍</div>
              <h3 style={{ fontSize: "18px", marginBottom: "8px", color: "#1a1a2e" }}>50+ Villages</h3>
              <p style={{ fontSize: "14px", color: "#666", margin: 0 }}>Reached across Telangana</p>
            </div>
          </div>
        </div>

        {/* Team Section - Dynamic from API */}
        <div style={{ marginBottom: "60px" }}>
          <h2 style={{ 
            fontSize: "32px", 
            marginBottom: "30px", 
            textAlign: "center", 
            color: "#1a1a2e",
            fontWeight: "600"
          }}>Our Leadership Team</h2>
          {loading ? (
            <p style={{ textAlign: "center", color: "#666" }}>Loading team members...</p>
          ) : team.length === 0 ? (
            <p style={{ textAlign: "center", color: "#666" }}>No team members added yet. Add them from Admin Panel.</p>
          ) : (
            <div style={{ 
              display: "grid", 
              gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", 
              gap: "30px" 
            }}>
              {team.map((member) => (
                <div key={member._id} style={{ 
                  textAlign: "center", 
                  backgroundColor: "white", 
                  padding: "30px 20px", 
                  borderRadius: "8px", 
                  boxShadow: "0 2px 12px rgba(0,0,0,0.08)"
                }}>
                  <div style={{ 
                    width: "100px", 
                    height: "100px", 
                    backgroundColor: "#f0f0f0", 
                    borderRadius: "50%", 
                    margin: "0 auto 15px",
                    display: "flex", 
                    alignItems: "center", 
                    justifyContent: "center", 
                    overflow: "hidden"
                  }}>
                    {member.imageUrl ? (
                      <img src={member.imageUrl} alt={member.name} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                    ) : (
                      <span style={{ fontSize: "40px", color: "#999" }}>👤</span>
                    )}
                  </div>
                  <h3 style={{ margin: "0 0 5px 0", fontSize: "20px", color: "#1a1a2e" }}>{member.name}</h3>
                  <p style={{ color: "#e74c3c", fontWeight: "600", fontSize: "15px", margin: "0 0 10px 0" }}>{member.role}</p>
                  {member.bio && <p style={{ fontSize: "14px", color: "#666", margin: 0 }}>{member.bio}</p>}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Impact Numbers Section */}
        <div style={{ 
          marginBottom: "60px", 
          backgroundColor: "#f8f9fa", 
          padding: "50px 40px", 
          borderRadius: "8px" 
        }}>
          <h2 style={{ 
            fontSize: "32px", 
            marginBottom: "30px", 
            textAlign: "center", 
            color: "#1a1a2e",
            fontWeight: "600"
          }}>Our Impact</h2>
          <div style={{ 
            display: "grid", 
            gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", 
            gap: "30px", 
            textAlign: "center" 
          }}>
            <div>
              <h3 style={{ fontSize: "36px", color: "#e74c3c", margin: "0 0 5px 0", fontWeight: "700" }}>8+</h3>
              <p style={{ fontSize: "16px", color: "#4a4a4a", margin: 0, fontWeight: "500" }}>Years of Service</p>
            </div>
            <div>
              <h3 style={{ fontSize: "36px", color: "#e74c3c", margin: "0 0 5px 0", fontWeight: "700" }}>10k+</h3>
              <p style={{ fontSize: "16px", color: "#4a4a4a", margin: 0, fontWeight: "500" }}>Lives Impacted</p>
            </div>
            <div>
              <h3 style={{ fontSize: "36px", color: "#e74c3c", margin: "0 0 5px 0", fontWeight: "700" }}>50+</h3>
              <p style={{ fontSize: "16px", color: "#4a4a4a", margin: 0, fontWeight: "500" }}>Villages Covered</p>
            </div>
            <div>
              <h3 style={{ fontSize: "36px", color: "#e74c3c", margin: "0 0 5px 0", fontWeight: "700" }}>100+</h3>
              <p style={{ fontSize: "16px", color: "#4a4a4a", margin: 0, fontWeight: "500" }}>Active Volunteers</p>
            </div>
          </div>
        </div>

        {/* Partners Section */}
        <div>
          <h2 style={{ 
            fontSize: "32px", 
            marginBottom: "30px", 
            textAlign: "center", 
            color: "#1a1a2e",
            fontWeight: "600"
          }}>Our Partners</h2>
          <div style={{ 
            display: "flex", 
            flexWrap: "wrap", 
            justifyContent: "center", 
            gap: "20px" 
          }}>
            <div style={{ 
              backgroundColor: "white", 
              padding: "18px 32px", 
              borderRadius: "6px", 
              boxShadow: "0 2px 6px rgba(0,0,0,0.06)",
              color: "#1a1a2e",
              fontWeight: "500"
            }}>ABC Foundation</div>
            <div style={{ 
              backgroundColor: "white", 
              padding: "18px 32px", 
              borderRadius: "6px", 
              boxShadow: "0 2px 6px rgba(0,0,0,0.06)",
              color: "#1a1a2e",
              fontWeight: "500"
            }}>XYZ Trust</div>
            <div style={{ 
              backgroundColor: "white", 
              padding: "18px 32px", 
              borderRadius: "6px", 
              boxShadow: "0 2px 6px rgba(0,0,0,0.06)",
              color: "#1a1a2e",
              fontWeight: "500"
            }}>Rotary Club</div>
            <div style={{ 
              backgroundColor: "white", 
              padding: "18px 32px", 
              borderRadius: "6px", 
              boxShadow: "0 2px 6px rgba(0,0,0,0.06)",
              color: "#1a1a2e",
              fontWeight: "500"
            }}>Lions Club</div>
            <div style={{ 
              backgroundColor: "white", 
              padding: "18px 32px", 
              borderRadius: "6px", 
              boxShadow: "0 2px 6px rgba(0,0,0,0.06)",
              color: "#1a1a2e",
              fontWeight: "500"
            }}>Local Government</div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AboutUs
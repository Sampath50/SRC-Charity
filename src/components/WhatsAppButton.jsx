import { useState } from "react"

function WhatsAppButton() {
  const [showOptions, setShowOptions] = useState(false)
  const phoneNumber = "918374848542"

  const contactOptions = [
    {
      label: "General Inquiry",
      message: "Hello! I have a general question about SRC Charity.",
      icon: "💬",
      color: "#25D366"
    },
    {
      label: "Donation Support",
      message: "Hi! I would like to donate to SRC Charity. Can you guide me?",
      icon: "❤️",
      color: "#E74C3C"
    },
    {
      label: "Volunteer Opportunities",
      message: "Hello! I'm interested in volunteering with SRC Charity.",
      icon: "🤝",
      color: "#3498DB"
    },
    {
      label: "Event Registration",
      message: "Hi! I would like to register for upcoming events.",
      icon: "📅",
      color: "#F39C12"
    },
    {
      label: "Partnership Inquiry",
      message: "Hello! I'm interested in partnering with SRC Charity.",
      icon: "🤝",
      color: "#8E44AD"
    },
    {
      label: "Feedback & Suggestions",
      message: "Hi! I'd like to share some feedback about SRC Charity.",
      icon: "✍️",
      color: "#1ABC9C"
    }
  ]

  const handleWhatsAppClick = (message) => {
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`
    window.open(whatsappUrl, "_blank")
    setShowOptions(false)
  }

  return (
    <>
      {/* WhatsApp Button with Options */}
      <div style={{
        position: "fixed",
        bottom: "20px",
        right: "20px",
        zIndex: 9999,
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-end",
        gap: "10px"
      }}>
        {/* Options Panel */}
        {showOptions && (
          <div style={{
            backgroundColor: "white",
            borderRadius: "12px",
            boxShadow: "0 10px 40px rgba(0,0,0,0.15)",
            padding: "10px 0",
            minWidth: "220px",
            maxWidth: "280px",
            animation: "slideUp 0.3s ease-out",
            marginBottom: "10px",
            border: "1px solid #f0f0f0"
          }}>
            {/* Header */}
            <div style={{
              padding: "12px 16px 8px 16px",
              borderBottom: "1px solid #f0f0f0",
              marginBottom: "4px"
            }}>
              <p style={{
                margin: 0,
                fontSize: "13px",
                fontWeight: "600",
                color: "#1a1a2e"
              }}>
                💬 Quick Contact
              </p>
              <p style={{
                margin: "2px 0 0 0",
                fontSize: "11px",
                color: "#999"
              }}>
                Choose an option below
              </p>
            </div>

            {/* Options */}
            {contactOptions.map((option, index) => (
              <button
                key={index}
                onClick={() => handleWhatsAppClick(option.message)}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "12px",
                  width: "100%",
                  padding: "10px 16px",
                  border: "none",
                  backgroundColor: "transparent",
                  cursor: "pointer",
                  transition: "background-color 0.2s",
                  fontSize: "13px",
                  color: "#333",
                  fontFamily: "inherit",
                  textAlign: "left",
                  borderLeft: `3px solid transparent`
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = "#f8f9fa"
                  e.currentTarget.style.borderLeftColor = option.color
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = "transparent"
                  e.currentTarget.style.borderLeftColor = "transparent"
                }}
              >
                <span style={{ fontSize: "18px" }}>{option.icon}</span>
                <span style={{ fontSize: "13px" }}>{option.label}</span>
              </button>
            ))}

            {/* Footer */}
            <div style={{
              padding: "8px 16px",
              borderTop: "1px solid #f0f0f0",
              marginTop: "4px"
            }}>
              <span style={{
                fontSize: "10px",
                color: "#999"
              }}>
                ⚡ Response within 24 hours
              </span>
            </div>
          </div>
        )}

        {/* Main WhatsApp Button */}
        <div style={{
          display: "flex",
          alignItems: "center",
          gap: "10px",
          position: "relative"
        }}>
          {/* Label - shows when not expanded */}
          {!showOptions && (
            <div style={{
              backgroundColor: "white",
              padding: "6px 14px",
              borderRadius: "20px",
              boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
              fontSize: "12px",
              fontWeight: "500",
              color: "#333",
              animation: "pulseText 2s infinite"
            }}>
              💬 Chat with us
            </div>
          )}

          <button
            onClick={() => setShowOptions(!showOptions)}
            style={{
              backgroundColor: showOptions ? "#1a1a2e" : "#25D366",
              borderRadius: "50%",
              width: "60px",
              height: "60px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              border: "none",
              boxShadow: showOptions 
                ? "0 4px 20px rgba(0,0,0,0.3)" 
                : "0 4px 20px rgba(37, 211, 102, 0.4)",
              cursor: "pointer",
              transition: "all 0.3s ease",
              transform: showOptions ? "rotate(45deg)" : "rotate(0deg)"
            }}
            onMouseEnter={(e) => {
              if (!showOptions) {
                e.currentTarget.style.transform = "scale(1.1)"
              }
            }}
            onMouseLeave={(e) => {
              if (!showOptions) {
                e.currentTarget.style.transform = "scale(1)"
              }
            }}
          >
            {showOptions ? (
              <span style={{ color: "white", fontSize: "24px", fontWeight: "300" }}>✕</span>
            ) : (
              <img
                src="https://img.icons8.com/color/48/000000/whatsapp--v1.png"
                alt="WhatsApp"
                style={{ width: "32px", height: "32px" }}
              />
            )}
          </button>
        </div>
      </div>

      <style>{`
        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(20px) scale(0.95);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }

        @keyframes pulseText {
          0%, 100% {
            opacity: 1;
          }
          50% {
            opacity: 0.7;
          }
        }
      `}</style>
    </>
  )
}

export default WhatsAppButton
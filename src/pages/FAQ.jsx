import { useState } from "react"

function FAQ() {
  const [openIndex, setOpenIndex] = useState(null)

  const faqs = [
    {
      question: "How can I donate to SRC Welfare Trust?",
      answer: "You can donate through our Donate page using credit/debit cards, UPI, or bank transfer. We also accept monthly donations."
    },
    {
      question: "Where does my donation go?",
      answer: "100% of your donation goes directly to our programs. We maintain complete transparency with detailed reports."
    },
    {
      question: "How can I become a volunteer?",
      answer: "Fill out the volunteer application form on our Volunteer page. We'll contact you within 3-5 business days."
    },
    {
      question: "Is my donation tax-deductible?",
      answer: "Yes, we are a registered NGO (80G certified). You will receive a tax receipt for your donation."
    },
    {
      question: "How can I sponsor a child's education?",
      answer: "Contact us directly at sponsorship@srcwelfare.org to learn about our child sponsorship program."
    }
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
        }}>Frequently Asked Questions</h1>
        <p style={{ 
          fontSize: "14px",
          maxWidth: "600px", 
          margin: "0 auto",
          opacity: "0.9"
        }}>Find answers to common questions</p>
      </div>

      {/* Spacer to separate hero from content */}
      <div style={{ height: "20px" }}></div>

      <div style={{ padding: "0 20px 60px 20px", maxWidth: "800px", margin: "0 auto" }}>
        {faqs.map((faq, index) => (
          <div 
            key={index} 
            style={{ 
              marginBottom: "16px", 
              border: "1px solid #e5e7eb", 
              borderRadius: "10px", 
              overflow: "hidden",
              boxShadow: "0 1px 3px rgba(0,0,0,0.06)",
              transition: "box-shadow 0.3s"
            }}
          >
            <button
              onClick={() => setOpenIndex(openIndex === index ? null : index)}
              style={{
                width: "100%",
                padding: "20px 24px",
                textAlign: "left",
                backgroundColor: "white",
                border: "none",
                cursor: "pointer",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                transition: "background-color 0.2s"
              }}
              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = "#fafafa"}
              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = "white"}
            >
              <span style={{ 
                fontSize: "17px", 
                fontWeight: "600",
                color: "#1a1a2e",
                paddingRight: "20px"
              }}>{faq.question}</span>
              <span style={{ 
                fontSize: "28px", 
                color: "#e74c3c",
                fontWeight: "300",
                flexShrink: 0,
                lineHeight: "1"
              }}>{openIndex === index ? "−" : "+"}</span>
            </button>
            {openIndex === index && (
              <div style={{ 
                padding: "20px 24px 24px 24px", 
                backgroundColor: "#fafafa", 
                borderTop: "1px solid #e5e7eb"
              }}>
                <p style={{ 
                  color: "#4a4a4a", 
                  lineHeight: "1.7",
                  margin: 0,
                  fontSize: "15px"
                }}>{faq.answer}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

export default FAQ
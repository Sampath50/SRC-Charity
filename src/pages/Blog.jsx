import { useState } from "react"
import { Link } from "react-router-dom"

function Blog() {
  const [selectedCategory, setSelectedCategory] = useState("All")
  
  const blogPosts = [
    {
      id: 1,
      title: "Annual Charity Event Raises ₹5 Lakhs",
      date: "March 15, 2024",
      category: "Events",
      excerpt: "Our annual fundraising event brought together 500+ supporters and raised funds for education programs.",
      image: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=600",
      author: "Sampath",
      readTime: "3 min read"
    },
    {
      id: 2,
      title: "New Medical Camp in Rural Village",
      date: "March 10, 2024",
      category: "Healthcare",
      excerpt: "Free health checkup camp served 300+ patients in remote areas with medicines and consultations.",
      image: "https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=600",
      author: "Dr. Priya",
      readTime: "4 min read"
    },
    {
      id: 3,
      title: "100 Students Receive Scholarships",
      date: "March 5, 2024",
      category: "Education",
      excerpt: "Thanks to our donors, 100 underprivileged students can continue their education this year.",
      image: "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=600",
      author: "Rajesh",
      readTime: "2 min read"
    },
    {
      id: 4,
      title: "Winter Clothing Drive Success",
      date: "February 20, 2024",
      category: "Community",
      excerpt: "Distributed 1000+ warm clothes to families in need during the harsh winter months.",
      image: "https://images.unsplash.com/photo-1518176258769-f227c798150e?w=600",
      author: "Meera",
      readTime: "3 min read"
    },
    {
      id: 5,
      title: "Women Empowerment Workshop",
      date: "February 15, 2024",
      category: "Women Empowerment",
      excerpt: "Skill development workshop trained 50 women in tailoring and small business management.",
      image: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=600",
      author: "Lakshmi",
      readTime: "5 min read"
    }
  ]

  const categories = ["All", "Events", "Healthcare", "Education", "Community", "Women Empowerment"]

  const filteredPosts = selectedCategory === "All" 
    ? blogPosts 
    : blogPosts.filter(post => post.category === selectedCategory)

  return (
    <div>
      {/* Hero Section - THIN RED STRIP (same as About page) */}
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
        }}>News & Updates</h1>
        <p style={{ 
          fontSize: "14px",
          maxWidth: "600px", 
          margin: "0 auto",
          opacity: "0.9"
        }}>Stories of hope and transformation</p>
      </div>

      {/* Spacer to separate hero from content */}
      <div style={{ height: "20px" }}></div>

      <div style={{ padding: "0 20px 60px 20px", maxWidth: "1200px", margin: "0 auto" }}>
        {/* Category Filter */}
        <div style={{ display: "flex", gap: "10px", justifyContent: "center", marginBottom: "40px", flexWrap: "wrap" }}>
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              style={{
                padding: "10px 20px",
                backgroundColor: selectedCategory === cat ? "#e74c3c" : "#f3f4f6",
                color: selectedCategory === cat ? "white" : "#333",
                border: "none",
                borderRadius: "25px",
                cursor: "pointer",
                transition: "all 0.3s",
                fontSize: "14px",
                fontWeight: "500"
              }}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Blog Grid */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(350px, 1fr))", gap: "30px" }}>
          {filteredPosts.map(post => (
            <div key={post.id} style={{ 
              backgroundColor: "white", 
              borderRadius: "10px", 
              overflow: "hidden", 
              boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
              transition: "transform 0.3s",
              cursor: "pointer"
            }}
            onMouseEnter={(e) => e.currentTarget.style.transform = "translateY(-5px)"}
            onMouseLeave={(e) => e.currentTarget.style.transform = "translateY(0)"}
            >
              <img src={post.image} alt={post.title} style={{ width: "100%", height: "200px", objectFit: "cover" }} />
              <div style={{ padding: "20px" }}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "10px" }}>
                  <span style={{ backgroundColor: "#e74c3c", color: "white", padding: "4px 12px", borderRadius: "20px", fontSize: "12px", fontWeight: "500" }}>{post.category}</span>
                  <span style={{ color: "#666", fontSize: "12px" }}>{post.date}</span>
                </div>
                <h3 style={{ fontSize: "20px", marginBottom: "10px", color: "#1a1a2e", fontWeight: "600" }}>{post.title}</h3>
                <p style={{ color: "#666", lineHeight: "1.6", marginBottom: "15px", fontSize: "15px" }}>{post.excerpt}</p>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <span style={{ fontSize: "12px", color: "#999" }}>By {post.author} • {post.readTime}</span>
                  <Link to={`/blog/${post.id}`} style={{ 
                    color: "#e74c3c", 
                    fontWeight: "600",
                    textDecoration: "none",
                    fontSize: "14px",
                    transition: "color 0.3s"
                  }}>
                    Read More →
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Blog
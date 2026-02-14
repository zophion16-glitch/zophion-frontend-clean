import React, { useState } from "react";

function Enquiry() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
    service: "",
    message: ""
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // DEV uses localhost, production uses deployed backend URL
      const baseUrl =
        process.env.NODE_ENV === "development"
          ? "http://localhost:5000"
          : "https://your-backend-domain.com"; // replace with your deployed backend URL

      const response = await fetch(`${baseUrl}/send-email`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      console.log("Response status:", response.status);
      console.log("Response data:", data);

      if (response.ok) {
        alert("Enquiry Sent Successfully ✅");
        setFormData({ name: "", email: "", mobile: "", service: "", message: "" });
      } else {
        alert(`Failed to send ❌\n${data.message || "Unknown error"}`);
      }
    } catch (error) {
      alert("Server not connected ❌");
      console.error("Fetch error:", error);
    }
  };

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <h2 style={styles.title}>Enquiry Form</h2>
        <p style={styles.subtitle}>
          Please fill the form below. We will contact you soon.
        </p>

        <form style={styles.form} onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            style={styles.input}
            value={formData.name}
            onChange={handleChange}
            required
          />

          <input
            type="email"
            name="email"
            placeholder="Email Address"
            style={styles.input}
            value={formData.email}
            onChange={handleChange}
            required
          />

          <input
            type="tel"
            name="mobile"
            placeholder="Mobile Number"
            style={styles.input}
            value={formData.mobile}
            onChange={handleChange}
            required
          />

          <select
            name="service"
            style={styles.input}
            value={formData.service}
            onChange={handleChange}
            required
          >
            <option value="">Select Service</option>
            <option>Export & Import</option>
            <option>Cosmetics</option>
            <option>Manpower</option>
            <option>Website Designing</option>
          </select>

          <textarea
            name="message"
            placeholder="Your Message"
            rows="4"
            style={styles.textarea}
            value={formData.message}
            onChange={handleChange}
            required
          />

          <button type="submit" style={styles.button}>
            Send Enquiry
          </button>
        </form>
      </div>
    </div>
  );
}

const styles = {
  page: { minHeight: "100vh", backgroundColor: "#fff9e6", display: "flex", justifyContent: "center", alignItems: "center", padding: "40px" },
  card: { backgroundColor: "#ffffff", padding: "40px", borderRadius: "16px", width: "100%", maxWidth: "500px", boxShadow: "0 10px 30px rgba(0,0,0,0.1)" },
  title: { textAlign: "center", marginBottom: "10px", fontSize: "26px" },
  subtitle: { textAlign: "center", marginBottom: "30px", color: "#555" },
  form: { display: "flex", flexDirection: "column", gap: "15px" },
  input: { padding: "12px", borderRadius: "8px", border: "1px solid #ccc", fontSize: "15px" },
  textarea: { padding: "12px", borderRadius: "8px", border: "1px solid #ccc", fontSize: "15px" },
  button: { marginTop: "10px", padding: "12px", backgroundColor: "#FFD700", border: "none", borderRadius: "25px", fontSize: "16px", fontWeight: "600", cursor: "pointer" }
};

export default Enquiry;

import React, { useState } from "react";
import emailjs from "emailjs-com";

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
      await emailjs.send(
        "service_2jhs0cv",
        "template_dag9wvk",
        formData,
        "QhTNwJZYC0UMciQ2G"
      );

      alert("Enquiry Sent Successfully ✅");

      setFormData({
        name: "",
        email: "",
        mobile: "",
        service: "",
        message: ""
      });

    } catch (error) {
      console.error("EmailJS error:", error);
      alert("Failed to send ❌");
    }
  };

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <h2 style={styles.title}>Enquiry Form</h2>

        <form style={styles.form} onSubmit={handleSubmit}>
          <input name="name" placeholder="Full Name" style={styles.input} value={formData.name} onChange={handleChange} required />
          <input name="email" type="email" placeholder="Email Address" style={styles.input} value={formData.email} onChange={handleChange} required />
          <input name="mobile" placeholder="Mobile Number" style={styles.input} value={formData.mobile} onChange={handleChange} required />

          <select name="service" style={styles.input} value={formData.service} onChange={handleChange} required>
            <option value="">Select Service</option>
            <option>Export & Import</option>
            <option>Cosmetics</option>
            <option>Manpower</option>
            <option>Website Designing</option>
          </select>

          <textarea name="message" rows="4" placeholder="Your Message" style={styles.textarea} value={formData.message} onChange={handleChange} required />

          <button type="submit" style={styles.button}>Send Enquiry</button>
        </form>
      </div>
    </div>
  );
}

const styles = {
  page: { minHeight: "100vh", display: "flex", justifyContent: "center", alignItems: "center" },
  card: { background: "#fff", padding: "40px", borderRadius: "16px", width: "400px" },
  form: { display: "flex", flexDirection: "column", gap: "12px" },
  input: { padding: "10px" },
  textarea: { padding: "10px" },
  button: { padding: "12px", background: "gold", border: "none", borderRadius: "20px" },
  title: { textAlign: "center" }
};

export default Enquiry;

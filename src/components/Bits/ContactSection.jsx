import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import emailjs from "emailjs-com";
import { Mail, Phone, MapPin, Send, Github, Linkedin, Instagram, Twitter } from "lucide-react";

export default function ContactSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [mounted, setMounted] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  useEffect(() => setMounted(true), []);

  const handleSubmit = (e) => {
    e.preventDefault();

    emailjs
      .send(
        "service_gypppne",
        "template_c77uui6",
        {
          from_name: formData.name,
          from_email: formData.email,
          subject: formData.subject,
          message: formData.message,
        },
        "PZ07evvrtv9VxPgwu"
      )
      .then(
        () => {
          alert("Message Sent!");
          setFormData({ name: "", email: "", subject: "", message: "" });
        },
        () => alert("Failed to send message")
      );
  };

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  return (
    <section className="py-20 relative text-center" id="contact">

      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 50 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8 }}
      >
        <h2 className="text-4xl font-bold mb-6 gradient-text">
          Get In Touch
        </h2>

        <p className="text-gray-300 max-w-2xl mx-auto mb-10">
          Ready to collaborate on your next project?
        </p>
      </motion.div>

      {/* CONTACT FORM */}
      <motion.div
        initial={{ opacity: 0, x: -50 }}
        animate={isInView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="glass p-8 rounded-2xl max-w-2xl mx-auto"
      >
        <form onSubmit={handleSubmit} className="space-y-6">

          <input type="text" name="name" onChange={handleChange}
            placeholder="Your Name" required className="input" />

          <input type="email" name="email" onChange={handleChange}
            placeholder="Email" required className="input" />

          <input type="text" name="subject" onChange={handleChange}
            placeholder="Subject" required className="input" />

          <textarea name="message" onChange={handleChange} rows="4"
            placeholder="Message..." required className="input" />

          <motion.button whileHover={{ scale: 1.05 }}
            className="btn-primary flex items-center justify-center gap-2">
            <Send className="w-5 h-5" />
            Send Message
          </motion.button>

        </form>
      </motion.div>
    </section>
  );
}

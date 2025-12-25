"use client";

import { motion } from "framer-motion";
import { Heart, Github, Linkedin, Instagram, Mail, Phone } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { name: "GitHub", href: "https://github.com/asurax1983", icon: Github },
    { name: "LinkedIn", href: "https://www.linkedin.com/in/habibi-s-4b7266377", icon: Linkedin },
    { name: "Instagram", href: "https://www.instagram.com/asurax_studios", icon: Instagram },
    { name: "Email", href: "mailto:asurax1983@gmail.com", icon: Mail },
    { name: "Phone", href: "tel:+918433365787", icon: Phone },
  ];

  return (
    <footer className="relative bg-gradient-to-t from-gray-900 to-black border-t border-gray-800 mt-20">
      <div className="absolute inset-0 cyber-grid opacity-5"></div>
      
      <div className="relative z-10 max-w-7xl mx-auto px-6 py-12">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-r from-green-400 to-blue-500 rounded-lg flex items-center justify-center">
              <span className="text-black font-bold">AS</span>
            </div>
            <span className="text-xl font-bold gradient-text">ASURAX Studios</span>
          </div>
          <div className="flex gap-4">
            {socialLinks.map((s) => {
              const Icon = s.icon;
              return (
                <a
                  key={s.name}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 rounded-full glass border border-gray-700 hover:border-green-400 hover:text-white transition"
                >
                  <Icon size={20} />
                </a>
              );
            })}
            {/* WhatsApp Link */}
            <a
              href="https://wa.me/918433365787"
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 rounded-full glass border border-gray-700 hover:border-green-400 hover:text-white transition"
            >
              <FaWhatsapp size={20} />
            </a>
          </div>
          <div className="text-gray-400 text-sm flex items-center gap-1">
            © {currentYear} ASURAX Studios — Made with <Heart className="w-4 h-4 text-red-400" />
          </div>
        </div>
      </div>
    </footer>
  );
}

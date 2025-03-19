"use client";
import React, { useState } from "react";
import { FaMapMarkerAlt, FaBuilding, FaPaperPlane, FaCheckCircle } from "react-icons/fa";
import emailjs from "@emailjs/browser";
import { useEmailSender } from "../hook/useEmailSender";

export default function ContactSection() {
  const [formData, setFormData] = useState({firstName: "",lastName: "",email: "",phone: "",
    message: ""
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { sendEmail, isLoading, statusMessage } = useEmailSender();

  const handleChange = (e) => {const { name, value } = e.target;
  setFormData((prevData) => ({ ...prevData, [name]: value }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const currentTime = new Date().toLocaleString();
    const dataToSend = { ...formData, time: currentTime };
    const result = await sendEmail(dataToSend);
    if (result.success) {
      setFormData({firstName: "",lastName: "",email: "",phone: "",message: ""
      });
      setIsModalOpen(true);
    }
  };
  return (
    <section className="bg-[var(--color-primary-light)] text-gray-200 py-16 px-4 md:px-8" id="contact">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12" data-aos="zoom-in" data-aos-delay="200">
          <h2 className="text-3xl font-bold mb-3">Contact Us</h2>
          <p className="max-w-2xl mx-auto text-gray-400">
            Have questions or need assistance? We're here to help!  
            Our team is dedicated to providing innovative solutions and personalized support.  
            Reach out to us, and let’s build something great together.
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2" data-aos="fade-up" data-aos-delay="300">
            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div data-aos="fade-up" data-aos-delay="350">
                  <label htmlFor="firstName" className="block text-sm mb-1">First Name</label>
                  <input 
                    type="text" 
                    id="firstName" 
                    name="firstName" 
                    value={formData.firstName} 
                    onChange={handleChange} 
                    placeholder="Bonnie" 
                    className="w-full p-2.5 bg-[var(--color-theme-dark-light)] border border-gray-700 rounded-md" 
                    required 
                  />
                </div>
                <div data-aos="fade-up" data-aos-delay="400">
                  <label htmlFor="lastName" className="block text-sm mb-1">Last Name</label>
                  <input 
                    type="text" 
                    id="lastName" 
                    name="lastName" 
                    value={formData.lastName} 
                    onChange={handleChange} 
                    placeholder="Green" 
                    className="w-full p-2.5 bg-[var(--color-theme-dark-light)] border border-gray-700 rounded-md" 
                    required 
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div data-aos="fade-up" data-aos-delay="450">
                  <label htmlFor="email" className="block text-sm mb-1">Your Email</label>
                  <input 
                    type="email" 
                    id="email" 
                    name="email" 
                    value={formData.email} 
                    onChange={handleChange} 
                    placeholder="name@example.com" 
                    className="w-full p-2.5 bg-[var(--color-theme-dark-light)] border border-gray-700 rounded-md" 
                    required 
                  />
                </div>
                <div data-aos="fade-up" data-aos-delay="500">
                  <label htmlFor="phone" className="block text-sm mb-1">Phone</label>
                  <input 
                    type="tel" 
                    id="phone" 
                    name="phone" 
                    value={formData.phone} 
                    onChange={handleChange} 
                    placeholder="+12 345 6789" 
                    className="w-full p-2.5 bg-[var(--color-theme-dark-light)] border border-gray-700 rounded-md" 
                  />
                </div>
              </div>

              <div className="mb-4" data-aos="fade-up" data-aos-delay="550">
                <label htmlFor="message" className="block text-sm mb-1">Your Message</label>
                <textarea 
                  id="message" 
                  name="message" 
                  value={formData.message} 
                  onChange={handleChange} 
                  rows={5} 
                  placeholder="Leave a comment..." 
                  className="w-full p-2.5 bg-[var(--color-theme-dark-light)] border border-gray-700 rounded-md" 
                  required
                ></textarea>
              </div>

              <div className="text-sm text-gray-400 mb-6" data-aos="fade-up" data-aos-delay="600">
                By submitting this form, you agree to our{" "}
                <a href="#" className="text-[var(--color-neon-green)] hover:underline">terms and conditions</a> and{" "}
                <a href="#" className="text-[var(--color-neon-green)] hover:underline">privacy policy</a>, which explain how we may collect, use, and disclose your personal information, including to third parties.
              </div>

              <button 
                type="submit" 
                className="bg-theme-magenta-blue hover:bg-primary text-white font-medium py-2.5 px-5 rounded-md flex items-center gap-2 cursor-pointer" 
                disabled={isLoading}
              > 
                <FaPaperPlane className="text-sm" />
                {isLoading ? "Sending..." : "Send Message"}
              </button>
            </form> 
            {statusMessage && (
              <p className="mt-4 text-sm text-center text-gray-400" data-aos="fade-up" data-aos-delay="700">
                {statusMessage}
              </p>
            )}
          </div>

          <div className="space-y-8" data-aos="fade-up" data-aos-delay="300">
            <div 
              className="bg-[var(--color-theme-dark-light)] p-6 rounded-md flex items-start gap-4" 
              data-aos="flip-left" 
              data-aos-delay="350"
            >
              <div className="bg-[var(--color-primary)] p-3 rounded-md text-gray-200">
                <FaBuilding className="text-xl" />
              </div>
              <div>
                <h3 className="font-semibold text-lg mb-1">Developer Info:</h3>
                <p className="text-gray-400">TechSolutions</p>
              </div>
            </div>

            <div 
              className="bg-[var(--color-theme-dark-light)] p-6 rounded-md flex items-start gap-4" 
              data-aos="flip-right" 
              data-aos-delay="400"
            >
              <div className="bg-[var(--color-primary)] p-3 rounded-md text-gray-200">
                <FaMapMarkerAlt className="text-xl" />
              </div>
              <div>
                <h3 className="font-semibold text-lg mb-1">Address:</h3>
                <p className="text-gray-400">PANAMÁ, PANAMÁ CITY, ARRAIJAN</p>
                <p className="text-gray-400">ZIP Code: 7002</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
          <div className="bg-white rounded-lg shadow-lg p-8 max-w-sm mx-auto text-center">
            <FaCheckCircle className="text-green-500 text-6xl mx-auto mb-4" />
            <h3 className="text-2xl font-bold mb-2 text-gray-700">Message Sent</h3>
            <p className="mb-4 text-green-700">Your message has been sent successfully</p>
            <button 
              onClick={() => setIsModalOpen(false)}
              className="bg-green-500 hover:bg-green-600 text-white font-medium py-2 px-4 rounded"
            >
              OK
            </button>
          </div>
        </div>
      )} 
    </section>
  );
}

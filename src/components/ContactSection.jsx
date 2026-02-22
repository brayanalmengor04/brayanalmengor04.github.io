import React, { useState } from "react";
import { FaPaperPlane } from "react-icons/fa";
import { ImSpinner8 } from "react-icons/im";
import useFormSubmit from "../hook/useFormSubmit";
import PhoneInput from "./PhoneInput";
import Swal from 'sweetalert2';

import { useTranslations } from "../i18n/utils";

export default function ContactSection({ lang = "es" }) {
  const t = useTranslations(lang);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    message: ""
  });
  const { submitForm, loading, error } = useFormSubmit();
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };
  const handleSubmit = async (event) => {
    event.preventDefault();

    // Client-side Rate Limiting
    const lastSubmission = localStorage.getItem('lastSubmissionTime');
    const COOLDOWN_TIME = 2 * 60 * 1000; // 2 minutes in ms

    if (lastSubmission) {
      const timePassed = Date.now() - parseInt(lastSubmission);
      if (timePassed < COOLDOWN_TIME) {
        const secondsLeft = Math.ceil((COOLDOWN_TIME - timePassed) / 1000);
        Swal.fire({
          icon: 'warning',
          title: t('contact.alert.wait.title'),
          text: t('contact.alert.wait.text').replace('{seconds}', secondsLeft),
          confirmButtonColor: 'var(--color-neon-green)'
        });
        return;
      }
    }

    try {
      await submitForm(formData);

      // Update local storage timestamp
      localStorage.setItem('lastSubmissionTime', Date.now().toString());

      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        message: ""
      });

      Swal.fire({
        icon: 'success',
        title: t('contact.alert.success.title'),
        text: t('contact.alert.success.text'),
        confirmButtonColor: '#10b981',
        background: '#fff',
        color: '#333'
      });

    } catch (err) {
      console.error("Error enviando el formulario:", err);
      Swal.fire({
        icon: 'error',
        title: t('contact.alert.error.title'),
        text: err.message || t('contact.alert.error.text'),
        confirmButtonColor: '#ef4444'
      });
    }
  };
  return (
    <section className="py-16 px-4 md:px-8" id="contact" style={{ background: 'var(--bg-secondary)', color: 'var(--text-secondary)' }}>
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12" data-aos="zoom-in" data-aos-delay="200">
          <h2 className="text-3xl font-bold mb-3">{t('contact.title')}</h2>
          <p className="max-w-2xl mx-auto" style={{ color: 'var(--text-muted)' }}>
            {t('contact.desc')}
          </p>
        </div>

        {/* Social Links Section */}
        <div className="max-w-3xl mx-auto mb-12" data-aos="fade-up" data-aos-delay="250">
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href="https://www.linkedin.com/in/brayan-antonio/"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-3 px-6 py-3 rounded-lg border transition-all duration-300 hover:scale-105 hover:shadow-lg"
              style={{
                background: 'var(--bg-card)',
                borderColor: 'var(--border-primary)',
                color: 'var(--text-primary)'
              }}
            >
              <svg className="w-6 h-6 transition-transform group-hover:scale-110" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
              </svg>
              <span className="font-medium">LinkedIn</span>
            </a>

            <a
              href="https://github.com/brayanalmengor04"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-3 px-6 py-3 rounded-lg border transition-all duration-300 hover:scale-105 hover:shadow-lg"
              style={{
                background: 'var(--bg-card)',
                borderColor: 'var(--border-primary)',
                color: 'var(--text-primary)'
              }}
            >
              <svg className="w-6 h-6 transition-transform group-hover:scale-110" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
              </svg>
              <span className="font-medium">GitHub</span>
            </a>
          </div>
        </div>

        <div className="max-w-3xl mx-auto">
          <div data-aos="fade-up" data-aos-delay="300">
            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div data-aos="fade-up" data-aos-delay="350">
                  <label htmlFor="firstName" className="block text-sm mb-1">
                    {t('contact.form.firstname')} <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    placeholder={t('contact.form.firstname.ph')}
                    className="w-full p-2.5 border rounded-md"
                    style={{ background: 'var(--bg-card)', borderColor: 'var(--border-primary)', color: 'var(--text-primary)' }}
                    required
                  />
                </div>
                <div data-aos="fade-up" data-aos-delay="400">
                  <label htmlFor="lastName" className="block text-sm mb-1">
                    {t('contact.form.lastname')} <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    placeholder={t('contact.form.lastname.ph')}
                    className="w-full p-2.5 border rounded-md"
                    style={{ background: 'var(--bg-card)', borderColor: 'var(--border-primary)', color: 'var(--text-primary)' }}
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div data-aos="fade-up" data-aos-delay="450">
                  <label htmlFor="email" className="block text-sm mb-1">
                    {t('contact.form.email')} <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder={t('contact.form.email.ph')}
                    className="w-full p-2.5 border rounded-md"
                    style={{ background: 'var(--bg-card)', borderColor: 'var(--border-primary)', color: 'var(--text-primary)' }}
                    required
                  />
                </div>
                <div data-aos="fade-up" data-aos-delay="500">
                  <div className="flex items-center justify-between mb-1">
                    <label htmlFor="phone" className="block text-sm">
                      {t('contact.form.phone')}
                    </label>
                    <span className="text-xs px-2 py-0.5 rounded-full bg-blue-500/10 text-blue-500 dark:bg-blue-400/10 dark:text-blue-400 border border-blue-500/20">
                      {t('contact.form.optional')}
                    </span>
                  </div>
                  <PhoneInput
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder={t('contact.form.phone.ph')}
                  />
                  <p className="text-xs text-muted-foreground mt-1.5 italic">
                    {t('contact.form.phone.hint')}
                  </p>
                </div>
              </div>

              <div className="mb-4" data-aos="fade-up" data-aos-delay="550">
                <label htmlFor="message" className="block text-sm mb-1">
                  {t('contact.form.message')} <span className="text-red-500">*</span>
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={5}
                  placeholder={t('contact.form.message.ph')}
                  className="w-full p-2.5 border rounded-md"
                  style={{ background: 'var(--bg-card)', borderColor: 'var(--border-primary)', color: 'var(--text-primary)' }}
                  required
                ></textarea>
              </div>



              <button
                type="submit"
                className={`font-medium py-2.5 px-5 rounded-md flex items-center gap-2 transition-all duration-300 ${loading
                  ? 'bg-gray-400 cursor-not-allowed opacity-70'
                  : 'bg-theme-magenta-blue hover:bg-primary text-white cursor-pointer hover:shadow-lg'
                  }`}
                disabled={loading}
              >
                {loading ? (
                  <>
                    <ImSpinner8 className="text-lg animate-spin" />
                    {t('contact.btn.sending')}
                  </>
                ) : (
                  <>
                    <FaPaperPlane className="text-sm" />
                    {t('contact.btn.send')}
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes spin {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
        .animate-spin {
          animation: spin 1s linear infinite;
        }
      `}</style>
    </section>
  );
}
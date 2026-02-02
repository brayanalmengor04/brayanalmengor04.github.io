import React, { useState } from "react";
import { FaPaperPlane } from "react-icons/fa";
import { ImSpinner8 } from "react-icons/im";
import useFormSubmit from "../hook/useFormSubmit";
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

        <div className="max-w-3xl mx-auto">
          <div data-aos="fade-up" data-aos-delay="300">
            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div data-aos="fade-up" data-aos-delay="350">
                  <label htmlFor="firstName" className="block text-sm mb-1">{t('contact.form.firstname')}</label>
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
                  <label htmlFor="lastName" className="block text-sm mb-1">{t('contact.form.lastname')}</label>
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
                  <label htmlFor="email" className="block text-sm mb-1">{t('contact.form.email')}</label>
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
                  <label htmlFor="phone" className="block text-sm mb-1">{t('contact.form.phone')}</label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder={t('contact.form.phone.ph')}
                    className="w-full p-2.5 border rounded-md"
                    style={{ background: 'var(--bg-card)', borderColor: 'var(--border-primary)', color: 'var(--text-primary)' }}
                  />
                </div>
              </div>

              <div className="mb-4" data-aos="fade-up" data-aos-delay="550">
                <label htmlFor="message" className="block text-sm mb-1">{t('contact.form.message')}</label>
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

      <style jsx>{`
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
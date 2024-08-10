import { useState } from "react";

export function FormContact() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    message: "",
  });
  const [errors, setErrors] = useState({});
  const [tooltip, setTooltip] = useState({ message: "", success: null });

  const validateForm = () => {
    const newErrors = {};
    if (!formData.firstName) newErrors.firstName = "First name is required";
    if (!formData.lastName) newErrors.lastName = "Last name is required";
    if (!formData.email) newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(formData.email))
      newErrors.email = "Email is invalid";
    if (!formData.message) newErrors.message = "Message is required";
    return newErrors;
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = validateForm();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    setErrors({});

    const whatsappMessage = `Hola, soy ${formData.firstName} ${formData.lastName} ,Aqui le proporciono gmail de contacto ${formData.email}
    Asunto del mensaje : ${formData.message} , Saludos desde la Web`;
    const whatsappUrl = `https://api.whatsapp.com/send?phone=50765425634&text=${encodeURIComponent(
      whatsappMessage
    )}`;

    window.open(whatsappUrl, "_blank");

    setTooltip({ message: "Message sent successfully!", success: true });
    setTimeout(() => setTooltip({ message: "", success: null }), 3000);
  };

  return (
    <footer id="contacts" className="container__footer-principal">
      <div className="container__footer__principal-title">
        <h5>Keep in Touch</h5>
      </div>
      <div
        data-aos-duration="1500"
        data-aos="fade-right"
        className="container__footer__principal-main"
      >
        <form
          id="contactForm"
          onSubmit={handleSubmit}
          className="container__footer__principal-formulario"
        >
          <div>
            <input
              type="text"
              id="firstName"
              placeholder="Name"
              value={formData.firstName}
              onChange={handleChange}
              className={errors.firstName ? "error" : ""}
            />
            {errors.firstName && <small>{errors.firstName}</small>}
            <input
              type="text"
              id="lastName"
              placeholder="LastName"
              value={formData.lastName}
              onChange={handleChange}
              className={errors.lastName ? "error" : ""}
            />
            {errors.lastName && <small>{errors.lastName}</small>}
          </div>

          <input
            type="email"
            id="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className={errors.email ? "error" : ""}
          />
          {errors.email && <small>{errors.email}</small>}
          <textarea
            id="message"
            cols="10"
            rows="10"
            placeholder="Comentary"
            value={formData.message}
            onChange={handleChange}
            className={errors.message ? "error" : ""}
          ></textarea>
          {errors.message && <small>{errors.message}</small>}
          <button type="submit">Send Now!</button>
        </form>

        <div
          data-aos="fade-left"
          data-aos-duration="1500"
          className="container__footer__principal-info"
        >
          <div className="container__footer__principal__info-icons">
            <i>
              <ion-icon name="location"></ion-icon>
            </i>
            <p>Panama, Panama City</p>
          </div>
          <div className="container__footer__principal__info-icons">
            <i>
              <ion-icon name="call"></ion-icon>
            </i>
            <p>+507 6542-5634</p>
          </div>
          <div className="container__footer__principal__info-icons">
            <i>
              <ion-icon name="mail"></ion-icon>
            </i>
            <p>brayanalmengor300@gmail.com</p>
          </div>
        </div>
      </div>
      <div className="container__footer__principal-more">
        <div className="container__footer__principal__more-icons">
          <ion-icon name="logo-github"></ion-icon>
          <ion-icon name="logo-discord"></ion-icon>
          <ion-icon name="logo-instagram"></ion-icon>
          <ion-icon name="logo-twitter"></ion-icon>
          <ion-icon name="logo-facebook"></ion-icon>
          <ion-icon name="logo-figma"></ion-icon>
        </div>
        <div>All Rights Reserved @2024 Brayan Almengor</div>
      </div>
      {tooltip.message && (
        <div
          className={`tooltip ${
            tooltip.success ? "success" : "error"
          }`}
        >
          {tooltip.message}
        </div>
      )}
    </footer>
  );
}

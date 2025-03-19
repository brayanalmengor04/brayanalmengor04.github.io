import { useState } from "react";
import axios from "axios";

export const useEmailSender = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [statusMessage, setStatusMessage] = useState("");

  const sendEmail = async (data) => {
    setIsLoading(true);
    setStatusMessage("");
    
    const formDataToSend = new FormData();
    for (const key in data) {
      formDataToSend.append(key, data[key]);
    }
    // Agregar los campos obligatorios de EmailJS
    formDataToSend.append("service_id", "service_tih7n3d");
    formDataToSend.append("template_id", "template_ybuhjd1");
    formDataToSend.append("user_id", "OVGze8PngAHdh0X9V");

    try {
      await axios.post(
        "https://api.emailjs.com/api/v1.0/email/send-form",
        formDataToSend,
        { headers: { "Content-Type": "multipart/form-data" } }
      );
      setStatusMessage("Your message has been sent successfully!");
      return { success: true };
    } catch (error) {
      console.error("Email sending error: ", error);
      setStatusMessage("Something went wrong. Please try again later.");
      return { success: false, error };
    } finally {
      setIsLoading(false);
    }
  };

  return { sendEmail, isLoading, statusMessage };
};

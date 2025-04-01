import { useState } from "react";

const useFormSubmit = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const submitForm = async (formData) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(
        "https://formsubmit.co/ajax/brayanalmengor300@gmail.com", // Reemplaza con tu correo
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(formData)
        }
      );
      if (!response.ok) {
        throw new Error("Error submitting form");
      }
      await response.json();
      setLoading(false);
    } catch (err) {
      setError(err);
      setLoading(false);
      throw err;
    }
  };

  return { submitForm, loading, error };
};

export default useFormSubmit;

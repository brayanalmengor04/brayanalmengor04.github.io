import { useState } from "react";

const useFormSubmit = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const submitForm = async (formData) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(
        "/api/send-email",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(formData)
        }
      );

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Error submitting form");
      }

      setLoading(false);
      return result;
    } catch (err) {
      setError(err);
      setLoading(false);
      throw err;
    }
  };

  return { submitForm, loading, error };
};

export default useFormSubmit;

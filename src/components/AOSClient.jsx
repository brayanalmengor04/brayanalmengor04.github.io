// components/AOSClient.jsx
import React, { useEffect } from 'react';
import AOS from 'aos/dist/aos.js';
import 'aos/dist/aos.css';

export default function AOSClient() {
  useEffect(() => {
    AOS.init({
      duration: 800,
      easing: 'ease-out-back'
    });
  }, []);

  return null;
}

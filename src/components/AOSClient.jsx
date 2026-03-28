// components/AOSClient.jsx
import React, { useEffect } from 'react';
// import 'aos/dist/aos.css';

export default function AOSClient() {
  useEffect(() => {
    import('aos').then((AOS) => {
      AOS.default.init({
        duration: 800,
        easing: 'ease-out-back'
      });
    });
  }, []);

  return null;
}

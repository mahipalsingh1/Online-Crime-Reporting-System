import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './Home.css';
import AboutUs from '../components/AboutUs';
import ContactUs from '../components/ContactUs';
import Footer from '../components/Footer';

const images = [
  'image1.jpg',
  'image2.jpeg',
  'image3.jpg'
];

function Home() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % images.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="home">
      <div
        className="slider-background"
        style={{
          backgroundImage: `url(${images[index]})`
        }}
      >
        <div className="slider-overlay">
          <h1>Welcome to CRIMSAFE</h1>
          <p>"Report crime anytime, from anywhere — your safety is just a click away."</p>
        </div>
      </div>

      <section className="info">
        <h2 className="section-title">
          <span role="img" aria-label="rights">🧾</span> Human Rights
        </h2>

        <div className="rights-grid">
          <div className="right-card right-equality">
            <img src="https://cdn-icons-png.flaticon.com/512/9958/9958740.png" alt="Equality Icon" />
            <h3>Child Safety</h3>
            <p>Learn about laws and measures to protect children.</p>
            <Link to="/child-safety">Read More →</Link>
          </div>

          <div className="right-card right-freedom">
            <img src="https://cdn-icons-png.flaticon.com/512/15583/15583440.png" alt="Freedom Icon" />
            <h3>Women Safety</h3>
            <p>Explore legal rights and safety tips for women.</p>
            <Link to="/women-safety">Read More →</Link>
          </div>

          <div className="right-card right-remedy">
            <img src="https://cdn-icons-png.flaticon.com/512/5145/5145934.png" alt="Remedy Icon" />
            <h3>Cyber Security</h3>
            <p>Understand cyber laws and how to stay safe online.</p>
            <Link to="/cyber-security">Read More →</Link>
          </div>

          <div className="right-card right-section">
            <img src="https://cdn-icons-png.flaticon.com/512/1040/1040230.png" alt="IPC Icon" />
            <h3>IPC Section</h3>
            <p>Know legal actions available under Indian Penal Code.</p>
            <Link to="/ipc-section">Read More →</Link>
          </div>
        </div>
      </section>

      <AboutUs />
      <ContactUs />
      <Footer />
    </div>
  );
}

export default Home;

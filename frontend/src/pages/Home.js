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
          <p>Report crimes confidently. Know your rights. Stay protected.</p>
        </div>
      </div>

      <section className="info">
        <h2 className="section-title">
          <span role="img" aria-label="rights">🧾</span> Human Rights
        </h2>

        <div className="rights-grid">
          <div className="right-card right-equality">
            <img src="https://cdn-icons-png.flaticon.com/512/1040/1040230.png" alt="Equality Icon" />
            <h3>Right to Equality</h3>
            <p>Equal treatment under the law, without discrimination.</p>
            <Link to="/right-to-equality">Read More →</Link>
          </div>

          <div className="right-card right-freedom">
            <img src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png" alt="Freedom Icon" />
            <h3>Right to Freedom</h3>
            <p>Freedom of speech, expression, movement, and profession.</p>
            <Link to="/right-to-freedom">Read More →</Link>
          </div>

          <div className="right-card right-remedy">
            <img src="https://cdn-icons-png.flaticon.com/512/1828/1828940.png" alt="Remedy Icon" />
            <h3>Right to Remedies</h3>
            <p>Access to court if fundamental rights are violated.</p>
            <Link to="/right-to-remedy">Read More →</Link>
          </div>

          <div className="right-card right-section">
            <img src="https://cdn-icons-png.flaticon.com/512/1828/1828940.png" alt="IPC Icon" />
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

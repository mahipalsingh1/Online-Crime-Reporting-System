import React from 'react';

function CyberSecurity() {
  const containerStyle = {
    fontFamily: 'Segoe UI, sans-serif',
    padding: '30px',
    background: 'linear-gradient(135deg, #e3f2fd, #fce4ec, #e8f5e9, #fff8e1)',
    color: '#333',
    lineHeight: '1.6',
    animation: 'fadeIn 1s ease-in-out',
  };

  const headingStyle = {
    textAlign: 'center',
    fontSize: '2.2rem',
    color: '#1565c0',
    marginBottom: '20px',
    textShadow: '1px 1px 2px rgba(0,0,0,0.1)',
  };

  const sectionStyle = {
    backgroundColor: '#fff',
    padding: '20px',
    borderRadius: '12px',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
    marginBottom: '25px',
    transition: 'transform 0.3s ease',
  };

  const lawListStyle = {
    listStyleType: 'disc',
    paddingLeft: '20px',
  };

  const fadeInStyle = `
    @keyframes fadeIn {
      from { opacity: 0; transform: translateY(10px); }
      to { opacity: 1; transform: translateY(0); }
    }
  `;

  return (
    <div style={containerStyle}>
      <style>{fadeInStyle}</style>

      <h1 style={headingStyle}>Cyber Safety and Digital Protection</h1>

      <div style={sectionStyle}>
        <h2>Why Cyber Security Matters</h2>
        <p>
          As digital technology becomes integral to our lives, protecting data, privacy, and personal security online
          is essential. Cybersecurity protects individuals and organizations from online threats such as hacking,
          phishing, identity theft, and cyberbullying.
        </p>
      </div>

      <div style={sectionStyle}>
        <h2>Key Cyber Laws in India</h2>
        <ul style={lawListStyle}>
          <li><strong>Information Technology Act (2000):</strong> Governs cyber crimes and electronic commerce.</li>
          <li><strong>Section 66C of IT Act:</strong> Deals with identity theft and impersonation using digital resources.</li>
          <li><strong>Section 66E:</strong> Punishes violation of privacy by capturing, publishing images without consent.</li>
          <li><strong>Section 67:</strong> Penalizes publishing obscene material online.</li>
          <li><strong>Indian Penal Code (Section 354D):</strong> Addresses cyberstalking and online harassment.</li>
        </ul>
      </div>

      <div style={sectionStyle}>
        <h2>Important Cybercrime Helplines</h2>
        <ul style={lawListStyle}>
          <li><strong>Cybercrime Helpline (1930):</strong> Report financial frauds like UPI or card scams.</li>
          <li><strong>Cyber Cell:</strong> Reach local cybercrime units through <a href="https://cybercrime.gov.in" target="_blank" rel="noopener noreferrer">cybercrime.gov.in</a>.</li>
          <li><strong>112:</strong> General emergency helpline across India.</li>
        </ul>
      </div>

      <div style={sectionStyle}>
        <h2>Tips to Stay Safe Online</h2>
        <ul style={lawListStyle}>
          <li>Use strong, unique passwords and enable two-factor authentication.</li>
          <li>Never share OTPs or sensitive information over calls or emails.</li>
          <li>Verify links and sources before clicking; avoid suspicious emails and websites.</li>
          <li>Update your software and antivirus regularly.</li>
          <li>Use secure, official platforms for financial transactions.</li>
        </ul>
      </div>
    </div>
  );
}

export default CyberSecurity;

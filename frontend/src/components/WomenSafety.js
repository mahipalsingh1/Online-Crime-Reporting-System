import React from 'react';

function WomenSafety() {
  const containerStyle = {
    fontFamily: 'Segoe UI, sans-serif',
    padding: '30px',
    background: 'linear-gradient(135deg, #fcefee, #fdf6e3, #e0f7fa, #f3e5f5)',
    color: '#333',
    lineHeight: '1.6',
    animation: 'fadeIn 1s ease-in-out',
  };

  const headingStyle = {
    textAlign: 'center',
    fontSize: '2.2rem',
    color: '#d12d71',
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

      <h1 style={headingStyle}>Women's Safety and Empowerment</h1>

      <div style={sectionStyle}>
        <h2>Why Women's Safety Matters</h2>
        <p>
          Ensuring the safety and empowerment of women is essential for a just and inclusive society.
          Women must be protected from domestic violence, harassment, trafficking, and other forms of abuse,
          and empowered through legal rights, education, and economic opportunities.
        </p>
      </div>

      <div style={sectionStyle}>
        <h2>Important Women Protection Laws in India</h2>
        <ul style={lawListStyle}>
          <li><strong>Protection of Women from Domestic Violence Act (2005):</strong> Offers protection from domestic abuse.</li>
          <li><strong>Sexual Harassment of Women at Workplace Act (2013):</strong> Ensures safe work environments.</li>
          <li><strong>Dowry Prohibition Act (1961):</strong> Penalizes giving or taking of dowry.</li>
          <li><strong>Section 498A of IPC:</strong> Protects married women from cruelty by husband or relatives.</li>
          <li><strong>POCSO Act (2012):</strong> Also applicable to girls under 18 for protection from sexual offences.</li>
        </ul>
      </div>

      <div style={sectionStyle}>
        <h2>Toll-Free Helpline Numbers for Women</h2>
        <ul style={lawListStyle}>
          <li><strong>1091:</strong> Women's helpline number.</li>
          <li><strong>181:</strong> All-women helpline for support and counseling.</li>
          <li><strong>112:</strong> Emergency number for police, fire, and ambulance.</li>
        </ul>
      </div>

      <div style={sectionStyle}>
        <h2>Government Schemes for Women Empowerment</h2>
        <ul style={lawListStyle}>
          <li><strong>Beti Bachao Beti Padhao:</strong> Promotes education and protection of the girl child.</li>
          <li><strong>One Stop Centre Scheme:</strong> Provides integrated support to women affected by violence.</li>
          <li><strong>Mahila E-Haat:</strong> Online marketing platform for women entrepreneurs.</li>
          <li><strong>SWADHAR Greh Scheme:</strong> Rehabilitation of women in difficult circumstances.</li>
          <li><strong>UJJAWALA Scheme:</strong> Prevents trafficking and assists rescued victims.</li>
        </ul>
      </div>
    </div>
  );
}

export default WomenSafety;

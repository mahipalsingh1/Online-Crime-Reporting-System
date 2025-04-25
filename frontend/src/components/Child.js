import React from 'react';

function Child() {
  const containerStyle = {
    fontFamily: 'Segoe UI, sans-serif',
    padding: '30px',
    backgroundColor: '#f2f6ff',
    color: '#333',
    lineHeight: '1.6',
    animation: 'fadeIn 1s ease-in-out',
  };

  const headingStyle = {
    textAlign: 'center',
    fontSize: '2.2rem',
    color: '#2e6dd8',
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

  const sectionHover = {
    ...sectionStyle,
    ':hover': {
      transform: 'translateY(-5px)',
    },
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

      <h1 style={headingStyle}>Child Safety and Protection</h1>

      <div style={sectionStyle}>
        <h2>Why Child Safety is Important</h2>
        <p>
          Children are vulnerable and need special care, protection, and support from family,
          community, and government. Child safety includes protection from abuse, neglect,
          exploitation, and violence—offline and online.
        </p>
      </div>

      <div style={sectionStyle}>
        <h2>Important Child Protection Laws in India</h2>
        <ul style={lawListStyle}>
          <li><strong>POCSO Act (2012):</strong> Protection of Children from Sexual Offences.</li>
          <li><strong>Child Labour (Prohibition & Regulation) Act (1986):</strong> Prevents employment of children below 14.</li>
          <li><strong>Juvenile Justice (Care & Protection of Children) Act (2015):</strong> Protection, treatment, and rehabilitation of children in conflict with the law.</li>
          <li><strong>Right to Education Act (2009):</strong> Provides free and compulsory education to children aged 6–14.</li>
        </ul>
      </div>

      <div style={sectionStyle}>
        <h2>Toll-Free Helpline Numbers for Children</h2>
        <ul style={lawListStyle}>
          <li><strong>Childline (1098):</strong> 24/7 helpline for children in distress.</li>
          <li><strong>1091:</strong> Police helpline for women and children safety.</li>
          <li><strong>1099:</strong> Anti-human trafficking helpline.</li>
        </ul>
      </div>

      <div style={sectionStyle}>
        <h2>Government Schemes for Child Welfare</h2>
        <ul style={lawListStyle}>
          <li><strong>Integrated Child Protection Scheme (ICPS):</strong> Strengthens child protection systems.</li>
          <li><strong>Mid-Day Meal Scheme:</strong> Provides nutritious meals to school children.</li>
          <li><strong>Bal Swachhta Abhiyan:</strong> Promotes hygiene and sanitation among children.</li>
          <li><strong>National Crèche Scheme:</strong> Daycare for children of working mothers.</li>
          <li><strong>Mission Vatsalya:</strong> Focuses on child rights and protection across India.</li>
        </ul>
      </div>
    </div>
  );
}

export default Child;

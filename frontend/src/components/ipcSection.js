// ipcSection.js
import React from 'react';
import './ipcSection.css';
import { Link } from 'react-router-dom';

const ipcSections = [
  {
    crime: 'Murder',
    section: 'IPC Section 302',
    description: 'Causing death of another person intentionally.',
    penalty: 'Death or life imprisonment and fine.'
  },
  {
    crime: 'Theft',
    section: 'IPC Section 378',
    description: 'Dishonestly taking someone’s movable property without consent.',
    penalty: 'Imprisonment up to 3 years, or fine, or both.'
  },
  {
    crime: 'Robbery',
    section: 'IPC Section 392',
    description: 'Taking property from a person using fear or force.',
    penalty: 'Rigorous imprisonment up to 10 years and fine.'
  },
  {
    crime: 'Rape',
    section: 'IPC Section 376',
    description: 'Non-consensual sexual intercourse with a woman.',
    penalty: 'Minimum 10 years to life imprisonment and fine.'
  },
  {
    crime: 'Kidnapping',
    section: 'IPC Section 363',
    description: 'Taking or enticing away a person against their will.',
    penalty: 'Imprisonment up to 7 years and fine.'
  },
  {
    crime: 'Criminal Breach of Trust',
    section: 'IPC Section 405',
    description: 'Misappropriation of entrusted property.',
    penalty: 'Imprisonment up to 3 years, or fine, or both.'
  },
  {
    crime: 'Cheating',
    section: 'IPC Section 415',
    description: 'Deceiving someone fraudulently or dishonestly.',
    penalty: 'Imprisonment up to 1 year, or fine, or both.'
  },
  {
    crime: 'Assault',
    section: 'IPC Section 351',
    description: 'Threat or attempt to cause physical harm.',
    penalty: 'Imprisonment up to 3 months, or fine, or both.'
  },
  {
    crime: 'Defamation',
    section: 'IPC Section 499',
    description: 'Harming someone’s reputation through false statements.',
    penalty: 'Imprisonment up to 2 years, or fine, or both.'
  },
  {
    crime: 'Dowry Death',
    section: 'IPC Section 304B',
    description: 'Death of a woman due to dowry-related harassment within 7 years of marriage.',
    penalty: 'Minimum 7 years to life imprisonment.'
  },
  {
    crime: 'Domestic Violence',
    section: 'IPC Section 498A',
    description: 'Cruelty by husband or his relatives towards a woman.',
    penalty: 'Imprisonment up to 3 years and fine.'
  },
  {
    crime: 'Rioting',
    section: 'IPC Section 147',
    description: 'Use of force or violence by an unlawful assembly.',
    penalty: 'Imprisonment up to 2 years, or fine, or both.'
  },
  {
    crime: 'Forgery',
    section: 'IPC Section 463',
    description: 'Making false documents with intent to cause damage or fraud.',
    penalty: 'Imprisonment up to 2 years, or fine, or both.'
  },
  {
    crime: 'Criminal Intimidation',
    section: 'IPC Section 503',
    description: 'Threatening another person with injury to cause fear.',
    penalty: 'Imprisonment up to 2 years, or fine, or both.'
  },
  {
    crime: 'Bribery',
    section: 'IPC Section 171E',
    description: 'Giving or accepting a bribe during elections.',
    penalty: 'Imprisonment up to 1 year, or fine, or both.'
  },
  {
    crime: 'Public Nuisance',
    section: 'IPC Section 268',
    description: 'Act causing common injury, danger or annoyance to the public.',
    penalty: 'Punishable under related sections like 290 or 291.'
  },
  {
    crime: 'Unlawful Assembly',
    section: 'IPC Section 141',
    description: 'Gathering of 5 or more people with a common illegal intention.',
    penalty: 'Imprisonment up to 6 months, or fine, or both.'
  },
  {
    crime: 'Causing Death by Negligence',
    section: 'IPC Section 304A',
    description: 'Causing death due to rash or negligent act.',
    penalty: 'Imprisonment up to 2 years, or fine, or both.'
  },
  {
    crime: 'Abetment of Suicide',
    section: 'IPC Section 306',
    description: 'Encouraging or assisting someone to commit suicide.',
    penalty: 'Imprisonment up to 10 years and fine.'
  },
  {
    crime: 'House Trespass',
    section: 'IPC Section 448',
    description: 'Unlawfully entering into someone’s house.',
    penalty: 'Imprisonment up to 1 year, or fine, or both.'
  }
];

function IPCSection() {
  return (
    <div className="ipc-section-container">
      <h1>Common Crimes and Their IPC Sections</h1>
      <p>Know the law – each of these crimes is punishable under the Indian Penal Code (IPC).</p>

      <div className="ipc-section-list">
        {ipcSections.map((item, index) => (
          <div className="ipc-card" key={index}>
            <h3>{item.crime}</h3>
            <p><strong>Section:</strong> {item.section}</p>
            <p><strong>Description:</strong> {item.description}</p>
            <p><strong>Penalty:</strong> {item.penalty}</p>
          </div>
        ))}
      </div>

      <Link to="/" className="back-home">← Back to Home</Link>
    </div>
  );
}

export default IPCSection;

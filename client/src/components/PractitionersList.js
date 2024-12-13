import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './PractitionersList.css';

const PractitionersList = () => {
  const [practitioners, setPractitioners] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPractitioners = async () => {
      try {
        console.log('Fetching practitioners...');
        const response = await axios.get('http://localhost:5000/api/practitioners');
        console.log('Received response:', response.data);
        setPractitioners(response.data);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching practitioners:', err);
        setError('Failed to load practitioners: ' + err.message);
        setLoading(false);
      }
    };

    fetchPractitioners();
  }, []);

  if (loading) return <div className="loading">Loading practitioners...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="practitioners-container">
      <h1>Our Ayurvedic Practitioners</h1>
      <div className="practitioners-grid">
        {practitioners && practitioners.length > 0 ? (
          practitioners.map((practitioner) => (
            <Link 
              to={`/practitioners/${encodeURIComponent(practitioner.name)}`} 
              key={practitioner._id} 
              className="practitioner-card"
            >
              <div className="practitioner-image">
                <img 
                  src={practitioner.profileImage || '/images/default-profile.png'} 
                  alt={practitioner.name}
                  onError={(e) => {
                    e.target.src = '/images/default-profile.png';
                  }}
                />
              </div>
              <div className="practitioner-info">
                <h2>{practitioner.name}</h2>
                <h3>{practitioner.title}</h3>
                {practitioner.specializations && (
                  <p className="specializations">
                    {practitioner.specializations.slice(0, 2).join(', ')}
                    {practitioner.specializations.length > 2 && '...'}
                  </p>
                )}
                <p className="experience">{practitioner.yearsOfExperience} years of experience</p>
                <Link to={`/practitioners/${encodeURIComponent(practitioner.name)}`} className="view-profile">
                  View Profile
                </Link>
              </div>
            </Link>
          ))
        ) : (
          <div className="no-practitioners">No practitioners found</div>
        )}
      </div>
    </div>
  );
};

export default PractitionersList;

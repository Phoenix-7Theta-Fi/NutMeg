import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './AuthorProfile.css';

const AuthorProfile = () => {
  const { name } = useParams();
  const [practitioner, setPractitioner] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPractitioner = async () => {
      try {
        // Remove URL encoding from the name parameter
        const decodedName = decodeURIComponent(name);
        const response = await axios.get(`http://localhost:5000/api/practitioners/name/${decodedName}`);
        setPractitioner(response.data);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching practitioner:', err);
        setError('Failed to load practitioner profile');
        setLoading(false);
      }
    };

    fetchPractitioner();
  }, [name]);

  if (loading) return <div className="loading">Loading profile...</div>;
  if (error) return <div className="error">{error}</div>;
  if (!practitioner) return <div className="error">Practitioner not found</div>;

  return (
    <div className="profile-container">
      <div className="profile-header">
        <div className="profile-image-container">
          <img
            src={practitioner.profileImage}
            alt={practitioner.name}
            className="profile-image"
            onError={(e) => {
              e.target.src = '/images/default-profile.png';
            }}
          />
        </div>
        <div className="profile-title">
          <h1>{practitioner.name}</h1>
          <h2>{practitioner.title}</h2>
          <p className="experience">{practitioner.experience} years of experience</p>
        </div>
      </div>

      <div className="profile-content">
        <section className="profile-section">
          <h3>About</h3>
          <p className="bio">{practitioner.bio}</p>
        </section>

        <div className="profile-grid">
          <section className="profile-section">
            <h3>Specializations</h3>
            <ul className="specializations-list">
              {practitioner.specializations.map((spec, index) => (
                <li key={index}>{spec}</li>
              ))}
            </ul>
          </section>

          <section className="profile-section">
            <h3>Qualifications</h3>
            <ul className="qualifications-list">
              {practitioner.qualifications.map((qual, index) => (
                <li key={index}>{qual}</li>
              ))}
            </ul>
          </section>

          <section className="profile-section">
            <h3>Languages</h3>
            <ul className="languages-list">
              {practitioner.languages.map((lang, index) => (
                <li key={index}>{lang}</li>
              ))}
            </ul>
          </section>

          <section className="profile-section">
            <h3>Certifications</h3>
            <ul className="certifications-list">
              {practitioner.certifications.map((cert, index) => (
                <li key={index}>
                  <strong>{cert.name}</strong>
                  <div className="cert-details">
                    {cert.institution} ({cert.year})
                  </div>
                </li>
              ))}
            </ul>
          </section>
        </div>

        <section className="profile-section contact-info">
          <h3>Contact Information</h3>
          <div className="contact-grid">
            <div className="contact-item">
              <h4>Clinic Location</h4>
              <p>{practitioner.clinicLocation}</p>
            </div>
            <div className="contact-item">
              <h4>Consultation Hours</h4>
              <p>{practitioner.consultationHours}</p>
            </div>
            <div className="contact-item">
              <h4>Email</h4>
              <p><a href={`mailto:${practitioner.contactEmail}`}>{practitioner.contactEmail}</a></p>
            </div>
          </div>
        </section>

        <section className="profile-section social-links">
          <h3>Connect</h3>
          <div className="social-grid">
            {practitioner.socialMedia.website && (
              <a href={practitioner.socialMedia.website} target="_blank" rel="noopener noreferrer" className="social-link">
                Website
              </a>
            )}
            {practitioner.socialMedia.linkedin && (
              <a href={practitioner.socialMedia.linkedin} target="_blank" rel="noopener noreferrer" className="social-link">
                LinkedIn
              </a>
            )}
            {practitioner.socialMedia.twitter && (
              <a href={`https://twitter.com/${practitioner.socialMedia.twitter.replace('@', '')}`} target="_blank" rel="noopener noreferrer" className="social-link">
                Twitter
              </a>
            )}
          </div>
        </section>
      </div>
    </div>
  );
};

export default AuthorProfile;

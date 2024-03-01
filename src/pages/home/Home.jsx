import React, { useState, useEffect } from 'react';
import './Home.css'; // Uvoz CSS-a

const Home = () => {
  const [apartments, setApartments] = useState([]);

  useEffect(() => {
    const fetchApartments = async () => {
      try {
        const response = await fetch('https://api.adriatic.hr/test/accommodation');
        if (!response.ok) {
          throw new Error('Došlo je do greške pri dohvaćanju podataka');
        }
        const data = await response.json();
        setApartments(data);
      } catch (error) {
        console.error('Greška pri dohvaćanju podataka:', error);
      }
    };

    fetchApartments();
  }, []);

  return (
    <div className="apartment-container">
      {apartments.length > 0 ? (
        apartments.map((apartment, index) => (
          <div key={index} className="apartment-card">
            <img src={apartment.image} alt={apartment.title} className="apartment-image" />
            <div className="apartment-info">
              <h3>{apartment.title}</h3>
              <p>Kapacitet: {apartment.capacity}</p>
              {apartment.beachDistanceInMeters == null ? <p></p> : <p>Udaljenost do plaže: {apartment.beachDistanceInMeters} metara</p>}
            </div>
          </div>
        ))
      ) : (
        <p>Učitavanje podataka o apartmanima...</p>
      )}
    </div>
  );
};

export default Home;

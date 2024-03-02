import React, { useState, useEffect, useRef } from 'react';
import './Home.css';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();
  const [apartments, setApartments] = useState([]);
  const [originalApartments, setOriginalApartments] = useState([]);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [capacity, setCapacity] = useState('');
  const [amenitiesFilter, setAmenitiesFilter] = useState({
    airConditioning: false,
    parkingSpace: false,
    pets: false,
    pool: false,
    wifi: false,
    tv: false,
  });
  
  const endDatePickerRef = useRef(null);

  useEffect(() => {
    const fetchApartments = async () => {
      try {
        const response = await fetch('https://api.adriatic.hr/test/accommodation');
        if (!response.ok) {
          throw new Error('Došlo je do greške pri dohvaćanju podataka');
        }
        const data = await response.json();
        setApartments(data);
        console.log(data)
        setOriginalApartments(data); // Spremite kopiju podataka kao originalni popis
      } catch (error) {
        console.error('Greška pri dohvaćanju podataka:', error);
      }
    };

    fetchApartments();
  }, []);

  useEffect(() => {
    if (startDate) {
      setEndDate(startDate);
      endDatePickerRef.current?.focus();
    }
  }, [startDate]);

  
  const handleClick = (apartment) => {
    navigate(`/apartment/${apartment.id}`, {
      state: {
        apartment: apartment,
        startDate: startDate, 
        endDate: endDate
      }
    });
  };
  

  const filterApartments = () => {
    const filteredApartments = originalApartments.filter((apartment) => {
      const isDateAvailable = !startDate || !endDate ? true : apartment.availableDates.some((dateRange) => {
        const start = new Date(dateRange.intervalStart);
        const end = new Date(dateRange.intervalEnd);
        const selectedStart = new Date(startDate);
        const selectedEnd = new Date(endDate);
        return start <= selectedEnd && end >= selectedStart;
      });
  
      const isCapacitySufficient = !capacity || apartment.capacity >= parseInt(capacity);
  
      const isAmenitiesMatch = Object.entries(amenitiesFilter).every(([key, value]) => {
        return !value || apartment.amenities[key] === value;
      });
  
      return isDateAvailable && isCapacitySufficient && isAmenitiesMatch;
    });
  
    setApartments(filteredApartments);
  };
  

  const resetFilters = () => {
    setApartments(originalApartments);
    setStartDate('');
    setEndDate('');
    setCapacity(''); 
  };

  return (
    <>
      <div className="date-filter">
        <input
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          min="2024-01-01"
          max="2024-12-31"
        />
        <input
          type="date"
          ref={endDatePickerRef}
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
          min="2024-01-01"
          max="2024-12-31"
        />
        <input
          type="number"
          min="1"
          placeholder="Broj osoba"
          value={capacity}
          onChange={(e) => setCapacity(e.target.value)}
        />
        <div className="filter-controls">
          <label><input type="checkbox" checked={amenitiesFilter.airConditioning} onChange={(e) => setAmenitiesFilter({ ...amenitiesFilter, airConditioning: e.target.checked })} /> Klima</label>
          <label><input type="checkbox" checked={amenitiesFilter.parkingSpace} onChange={(e) => setAmenitiesFilter({ ...amenitiesFilter, parkingSpace: e.target.checked })} /> Parking</label>
          <label><input type="checkbox" checked={amenitiesFilter.pets} onChange={(e) => setAmenitiesFilter({ ...amenitiesFilter, pets: e.target.checked })} /> Ljubimci</label>
          <label><input type="checkbox" checked={amenitiesFilter.pool} onChange={(e) => setAmenitiesFilter({ ...amenitiesFilter, pool: e.target.checked })} /> Bazen</label>
          <label><input type="checkbox" checked={amenitiesFilter.wifi} onChange={(e) => setAmenitiesFilter({ ...amenitiesFilter, wifi: e.target.checked })} /> Wi-Fi</label>
          <label><input type="checkbox" checked={amenitiesFilter.tv} onChange={(e) => setAmenitiesFilter({ ...amenitiesFilter, tv: e.target.checked })} /> TV</label>
        </div>
        <button onClick={filterApartments}>Filtriraj</button>
        <button onClick={resetFilters}>Poništi filtere</button>
      </div>
      <div className="apartment-container">
        {apartments.length > 0 ? (
          apartments.map((apartment, index) => (
            <div key={index} className="apartment-card" onClick={() => handleClick(apartment)}>
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
    </>
  );
  
};

export default Home;

import React from 'react';
import { useLocation } from 'react-router-dom';
import './ApartmentDetails.css'; // Osigurajte da je ovaj put ispravan

const ApartmentDetails = () => {
    const location = useLocation();
    const { apartment } = location.state || {};

    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(dateString).toLocaleDateString(undefined, options);
    };

    return (
        <div className="apartment-details">
            {apartment ? (
                <>
                    <h2>{apartment.title}</h2>
                    <img src={apartment.image} alt={apartment.title} className="apartment-image" />
                    <p>Capacity: {apartment.capacity} people</p>
                    <p>Distance to beach: {apartment.beachDistanceInMeters} meters</p>
                    <div className="amenities">
                    {apartment.amenities == null ?<h3></h3>:<h3>Pogodnosti:</h3>}
                        <ul>
                            {apartment.amenities.airConditioning && (
                                <li><img src="https://cdn-icons-png.flaticon.com/128/1530/1530297.png" alt="Air Conditioning"/><p>Air Conditioning</p></li>
                            )}
                            {apartment.amenities.parkingSpace && (
                                <li><img src="https://cdn-icons-png.flaticon.com/128/10815/10815101.png" alt="Parking Space"/><p>Parking Space</p></li>
                            )}
                            {apartment.amenities.pets && (
                                <li><img src="https://cdn-icons-png.flaticon.com/128/1076/1076877.png" alt="Pets Allowed"/><p>Pets Allowed</p></li>
                            )}
                            {apartment.amenities.pool && (
                                <li><img src="https://cdn-icons-png.flaticon.com/128/2581/2581223.png" alt="Pool"/><p>Pool</p></li>
                            )}
                            {apartment.amenities.wifi && (
                                <li><img src="https://cdn-icons-png.flaticon.com/128/1/1848.png" alt="WiFi"/><p>WiFi</p></li>
                            )}
                            {apartment.amenities.tv && (
                                <li><img src="https://cdn-icons-png.flaticon.com/128/2502/2502208.png" alt="TV"/><p>TV</p></li>
                            )}
                        </ul>
                    </div>
                    <div className="price-list">
                        <h3>Price List:</h3>
                        {apartment.pricelistInEuros.map((price, index) => (
                            <p key={index}>
                                {formatDate(price.intervalStart)} - {formatDate(price.intervalEnd)}: {price.pricePerNight}€ per night
                            </p>
                        ))}
                    </div>
                    <div className="availability">
                        <h3>Available Dates:</h3>
                        {apartment.availableDates.map((date, index) => (
                            <p key={index}>
                                {formatDate(date.intervalStart)} - {formatDate(date.intervalEnd)}
                            </p>
                        ))}
                    </div>
                </>
            ) : (
                <p>No apartment details available.</p>
            )}
        </div>
    );
}

export default ApartmentDetails;

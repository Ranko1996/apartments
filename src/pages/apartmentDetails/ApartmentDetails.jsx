import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import './ApartmentDetails.css'; 
import ReservationModal from '../../components/confirmationModal/ConfirmationModal';

const ApartmentDetails = () => {
    const location = useLocation();
    const { apartment, startDate, endDate } = location.state || {};
    const [isModalOpen, setIsModalOpen] = useState(false);

    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(dateString).toLocaleDateString(undefined, options);
    };

    const calculateTotalPrice = () => {
        if (!apartment || !startDate || !endDate) {
            return 'N/A';
        }
    
        let totalPrice = 0;
        const start = new Date(startDate);
        const end = new Date(endDate);
    
        apartment.pricelistInEuros.forEach((price) => {
            const priceStart = new Date(price.intervalStart);
            const priceEnd = new Date(price.intervalEnd);
    
            if (start < priceEnd && end > priceStart) {
                const effectiveStart = start > priceStart ? start : priceStart;
                const effectiveEnd = end < priceEnd ? end : priceEnd;
                const diffTime = effectiveEnd - effectiveStart;
                const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
                totalPrice += diffDays * price.pricePerNight;
            }
        });
    
        return totalPrice.toFixed(2);
    };
    

    const handleReservation = () => {
        setIsModalOpen(true);
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
                        <h3>Amenities:</h3>
                        <ul>
                            {apartment.amenities.airConditioning && <li>Air Conditioning</li>}
                            {apartment.amenities.parkingSpace && <li>Parking Space</li>}
                            {apartment.amenities.pets && <li>Pets Allowed</li>}
                            {apartment.amenities.pool && <li>Pool</li>}
                            {apartment.amenities.wifi && <li>WiFi</li>}
                            {apartment.amenities.tv && <li>TV</li>}
                        </ul>
                    </div>
                    <div className="price-list">
                        <h3>Price List:</h3>
                        {apartment.pricelistInEuros.map((price, index) => (
                            <p key={index}>{formatDate(price.intervalStart)} - {formatDate(price.intervalEnd)}: {price.pricePerNight}€ per night</p>
                        ))}
                    </div>
                    <div className="availability">
                        <h3>Available Dates:</h3>
                        {apartment.availableDates.map((date, index) => (
                            <p key={index}>{formatDate(date.intervalStart)} - {formatDate(date.intervalEnd)}</p>
                        ))}
                    </div>
                    <div className="total-price">
                        {startDate && endDate ? (
                            <>
                                <h3>Total Price:</h3>
                                <p>{calculateTotalPrice()} €</p>
                                <button onClick={handleReservation}>Rezerviraj</button>
                            </>
                        ) : (
                            <>
                                <h3>Price Range:</h3>
                                <p>Please select stay dates to see the exact price and book the apartment.</p>
                            </>
                        )}
                    </div>
                    <ReservationModal 
                        isOpen={isModalOpen} 
                        details={{
                            apartmentName: apartment.title,
                            startDate: formatDate(startDate),
                            endDate: formatDate(endDate),
                            capacity: apartment.capacity,
                            totalPrice: calculateTotalPrice()
                        }} 
                        onClose={() => setIsModalOpen(false)} 
                    />
                </>
            ) : (
                <p>No apartment details available.</p>
            )}
        </div>
    );
};

export default ApartmentDetails;

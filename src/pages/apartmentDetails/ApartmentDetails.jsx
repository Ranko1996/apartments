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
        return new Date(dateString).toLocaleDateString('hr-HR', options);
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
                    <p>Kapacitet: {apartment.capacity} osoba</p>
                    <p>Udaljenost do plaže: {apartment.beachDistanceInMeters} metara</p>
                    <div className="amenities">
                        <h3>Pogodnosti:</h3>
                        <ul>
                            {apartment.amenities.airConditioning && <li>Klima uređaj</li>}
                            {apartment.amenities.parkingSpace && <li>Parking mjesto</li>}
                            {apartment.amenities.pets && <li>Dozvoljeni ljubimci</li>}
                            {apartment.amenities.pool && <li>Bazen</li>}
                            {apartment.amenities.wifi && <li>Wi-Fi</li>}
                            {apartment.amenities.tv && <li>TV</li>}
                        </ul>
                    </div>
                    <div className="price-list">
                    <h3>Cjenik:</h3>
                    <div className="cards-container">
                        {apartment.pricelistInEuros.map((price, index) => (
                            <div className="card" key={index}>
                                <p>{formatDate(price.intervalStart)} - {formatDate(price.intervalEnd)}:</p>
                                <p><strong>{price.pricePerNight}€ po noći</strong></p>
                            </div>
                        ))}
                    </div>
                    </div>
                    <div className="availability">
                        <h3>Dostupni datumi:</h3>
                        <div className="cards-container">
                            {apartment.availableDates.map((date, index) => (
                                <div className="card" key={index}>
                                    <p>{formatDate(date.intervalStart)} - {formatDate(date.intervalEnd)}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="total-price">
                        {startDate && endDate ? (
                            <>
                                <h3>Ukupna cijena:</h3>
                                <p>{calculateTotalPrice()} €</p>
                                <button onClick={handleReservation}>Rezerviraj</button>
                            </>
                        ) : (
                            <>
                                <h3>Raspon cijena:</h3>
                                <p>Molimo odaberite datume boravka kako biste vidjeli točnu cijenu i rezervirali smještaj.</p>
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
                <p>Detalji o smještaju nisu dostupni.</p>
            )}
        </div>
    );
};

export default ApartmentDetails;

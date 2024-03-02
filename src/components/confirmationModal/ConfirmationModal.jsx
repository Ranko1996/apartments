import React from 'react';
import './ConfirmationModal.css'; // Stilizirajte svoj modal po želji

const ReservationModal = ({ isOpen, details, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Uspješno ste rezervirali smještaj {details.apartmentName}</h2>
        <p>Termin boravka: {details.startDate} - {details.endDate}</p>
        <p>Broj osoba: {details.capacity}</p>
        <p>Ukupna cijena: {details.totalPrice} €</p>
        <button onClick={onClose}>Zatvori</button>
      </div>
    </div>
  );
};

export default ReservationModal;

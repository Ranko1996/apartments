import React from 'react'
import { useLocation } from 'react-router-dom';

const ApartmentDetails = () => {
    const location = useLocation();
    const { apartment } = location.state || {};
  return (
    <div>
<h2>{apartment.title}</h2>
    </div>
  )
}

export default ApartmentDetails
// U ApartmentDetails komponenti
// import { useLocation } from 'react-router-dom';

// const ApartmentDetails = () => {
//   const location = useLocation();
//   const { apartment } = location.state || {}; // Ako state nije definiran, vrati prazan objekt

//   return (
//     <div>
//       <h2>{apartment.title}</h2>
//       {/* Ostali detalji apartmana */}
//     </div>
//   );
// };


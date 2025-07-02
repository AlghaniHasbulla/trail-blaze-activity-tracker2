import React from "react";

const LocationCard = ({ location }) => {
  return (
    <div className="bg-white rounded-xl shadow-md p-4 border hover:shadow-lg transition">
      <h2 className="text-xl font-bold text-gray-800 mb-1">{location.name}</h2>
      <p className="text-gray-600 mb-1">{location.address}</p>
      <p className="text-sm text-gray-500 mb-2 italic">Type: {location.type}</p>
      <p className="text-gray-700">{location.description}</p>
      {location.average_rating !== null && (
        <p className="mt-2 text-yellow-500 font-semibold">
          ⭐ Average Rating: {location.average_rating}/5
        </p>
      )}
    </div>
  );
};

export default LocationCard;

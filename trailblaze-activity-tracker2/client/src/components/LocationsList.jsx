import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { API_BASE_URL } from "../config";

export default function LocationsList() {
  const [locations, setLocations] = useState([]);

  useEffect(() => {
    fetch(`${API_BASE_URL}/locations`)
      .then(res => res.json())
      .then(data => setLocations(data))
      .catch(err => console.error("Failed to fetch locations:", err));
  }, []);

  return (
    <div className="max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Locations</h2>
      {locations.length === 0 ? (
        <p className="text-gray-500">No locations available.</p>
      ) : (
        <ul className="space-y-4">
          {locations.map(loc => (
            <li key={loc.id} className="border p-4 rounded shadow">
              <Link to={`/locations/${loc.id}`} className="text-xl font-semibold text-blue-600 hover:underline">
                {loc.name}
              </Link>
              <p className="text-sm text-gray-600">{loc.type} - {loc.address}</p>
              <p className="text-gray-700">{loc.description}</p>
              {loc.average_rating && (
                <p className="text-yellow-600 font-semibold">⭐ Avg Rating: {loc.average_rating}</p>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

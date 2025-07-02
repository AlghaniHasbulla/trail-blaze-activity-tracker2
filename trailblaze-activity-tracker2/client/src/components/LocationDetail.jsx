import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { API_BASE_URL } from "../config";

export default function LocationDetail() {
  const { id } = useParams();
  const [location, setLocation] = useState(null);

  useEffect(() => {
    fetch(`${API_BASE_URL}/locations`)
      .then(res => res.json())
      .then(data => {
        const found = data.find(loc => loc.id === parseInt(id));
        setLocation(found);
      });
  }, [id]);

  if (!location) return <p>Loading...</p>;

  return (
    <div className="max-w-3xl mx-auto p-4">
      <h2 className="text-3xl font-bold text-green-700">{location.name}</h2>
      <p className="text-gray-600">{location.address}</p>
      <p className="my-2">{location.description}</p>
      {location.average_rating ? (
        <p className="text-yellow-600">⭐ Average Rating: {location.average_rating}</p>
      ) : (
        <p>No ratings yet.</p>
      )}
    </div>
  );
}

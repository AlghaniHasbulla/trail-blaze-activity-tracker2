import React from 'react';
import { Link } from 'react-router-dom';

function NavBar() {
  return (
    <nav className="bg-blue-600 text-white p-4 flex justify-between">
      <h1 className="text-xl font-bold">TrailBlaze</h1>
      <div>
        <Link to="/" className="mx-2">Home</Link>
        <Link to="/map" className="mx-2">Map</Link>
      </div>
    </nav>
  );
}

export default NavBar;
import { Route, Routes, NavLink } from "react-router-dom";
import Home from "./components/Home";
import LocationsList from "./components/LocationsList";
import LocationDetail from "./components/LocationDetail";

export default function App() {
  return (
    <div className="p-4 font-sans">
      <header className="text-center text-4xl font-bold text-green-700 mb-6">TrailBlaze</header>
      <nav className="flex justify-center gap-6 mb-8 text-blue-600">
        <NavLink to="/" className="hover:underline">Home</NavLink>
        <NavLink to="/locations" className="hover:underline">Locations</NavLink>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/locations" element={<LocationsList />} />
        <Route path="/locations/:id" element={<LocationDetail />} />
      </Routes>
    </div>
  );
}

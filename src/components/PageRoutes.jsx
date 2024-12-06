import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";
import { Logout } from "../pages/Logout";
import About from "../pages/About"; // Import the About page
import Services from "../pages/Services"; // Import the Services page
import Hospital from "../pages/Hospital"; // Import the Hospital component (adjust the path if needed)
export const PageRoutes = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/about" element={<About />} /> {/* About route */}
        <Route path="/services" element={<Services />} /> {/* Services route */}
        <Route path="/hospital" element={<Hospital />} /> {/* Hospital route */}
      </Routes>
    </>
  );
};

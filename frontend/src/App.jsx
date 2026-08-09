import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/pages/Home.jsx";
import EditNote from "./components/pages/EditNote.jsx";
import Login from "./components/pages/Login";
import Register from "./components/pages/Register";
import ProtectedRoute from "./components/ProtectedRoutes.jsx";
import Navbar from "./components/navbar/Navbar.jsx";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<ProtectedRoute>{<Home />}</ProtectedRoute>} />
        <Route path="/edit/:id" element={<EditNote />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>

    </BrowserRouter>
  );
}

export default App;
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/pages/Home.jsx";
import EditNote from "./components/pages/EditNote.jsx";


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/edit/:id" element={<EditNote />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;
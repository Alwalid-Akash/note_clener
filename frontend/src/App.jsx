import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import EditNote from "./pages/EditNote";



function App() {
  return (
    <BrowserRouter>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/edit/:id" element={<EditNote />} />

        {/* 👇 Catch-all route for any undefined path */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
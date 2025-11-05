import { Header, Footer } from "./components/layout";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Departments from "./pages/Departments";
import Executives from "./pages/Executives";
import News from "./pages/News";
import AppLanding from "./pages/AppLanding";

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen flex flex-col">
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/departments" element={<Departments />} />
          <Route path="/executives" element={<Executives />} />
          <Route path="/news" element={<News />} />
          <Route path="/app" element={<AppLanding />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;

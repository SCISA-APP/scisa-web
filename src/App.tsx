import { Header, Footer } from "./components/layout";
import { BrowserRouter, Routes, Route, Navigate, useLocation } from "react-router-dom";

import Home from "./pages/Home";
import About from "./pages/About";
import Departments from "./pages/Departments";
import Executives from "./pages/Executives";
import News from "./pages/News";
import AppLanding from "./pages/AppLanding";
import Management from "./pages/management/Management";
import Login from "./pages/Login";
import Privacy from "./pages/Privacy";

import ProtectedRoute from "./lib/protectedRoute";

function AppContent() {
  const location = useLocation();

  // Hide header/footer on these routes
 const hideLayout =
  location.pathname.startsWith("/login") ||
  location.pathname.startsWith("/management");

  return (
    <div className="min-h-screen flex flex-col">
      {!hideLayout && <Header />}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/departments" element={<Departments />} />
        <Route path="/executives" element={<Executives />} />
        <Route path="/news" element={<News />} />
        <Route path="/app" element={<AppLanding />} />
        <Route path="/login" element={<Login />} />

        <Route
          path="/management/*"
          element={
            <ProtectedRoute>
              <Management />
            </ProtectedRoute>
          }
        />

        <Route path="/privacy" element={<Privacy />} />

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>

      {!hideLayout && <Footer />}
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}

export default App;

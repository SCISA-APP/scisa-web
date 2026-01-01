import { Header, Footer } from "./components/layout";
import { BrowserRouter, Routes, Route, Navigate, useLocation } from "react-router-dom";
import ScrollToTop from "./components/ui/ScrollToTop";

import Home from "./pages/Home";
import About from "./pages/About";
import Departments from "./pages/Departments";
import Executives from "./pages/Executives";
import News from "./pages/News";
import AppLanding from "./pages/AppLanding";
import Management from "./pages/management/Management";
import Login from "./pages/Login";
import Privacy from "./pages/Privacy";

import DepartmentLayout from "./pages/department/DepartmentLayout";
import DepartmentHome from "./pages/department/DepartmentHome";
import DepartmentFaculty from "./pages/department/DepartmentFaculty";
import DepartmentProgrammes from "./pages/department/DepartmentProgrammes";

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
        <Route path="/executives" element={<Executives />} />
        <Route path="/news" element={<News />} />
        <Route path="/app" element={<AppLanding />} />
        <Route path="/login" element={<Login />} />

        {/* Department Routes */}
        <Route path="/departments" element={<Departments />} />
        <Route path="/departments/:slug" element={<DepartmentLayout />}>
          <Route index element={<DepartmentHome />} />
          <Route path="faculty" element={<DepartmentFaculty />} />
          <Route path="programmes" element={<DepartmentProgrammes />} />
        </Route>

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
      <ScrollToTop />
      <AppContent />
    </BrowserRouter>
  );
}

export default App;

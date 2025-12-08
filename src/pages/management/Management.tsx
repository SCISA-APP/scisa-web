// src/pages/Management.tsx
import { Routes, Route } from "react-router-dom";
import ManagementLayout from "../../components/layout/ManagementLayout";

// Module Pages
import Bursary from "./Bursary";
import Articles from "./Articles";
import Sellers from "./Sellers";
import Purchases from "./Purchases";
import Counselors from "./Counselors";
import Reports from "./Reports";


function Management() {
  return (
    <ManagementLayout>
      <Routes>
        <Route index element={<Bursary />} /> {/* Default page */}
        <Route path="bursary" element={<Bursary />} />
        <Route path="articles" element={<Articles />} />
        <Route path="sellers" element={<Sellers />} />
        <Route path="purchases" element={<Purchases />} />
        <Route path="counselors" element={<Counselors />} />
        <Route path="reports" element={<Reports />} />
      </Routes>
    </ManagementLayout>
  );
}

export default Management;

import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { OnePage } from "../pages/onepage";
import { AdminLogin } from "../pages/admin/Login";
import { AdminDashboard } from "../pages/admin/Dashboard";
import { ProtectedRoute } from "../components/ProtectedRoute";
import "./App.css";

export default function App() {
  const location = useLocation();
  
  // Si on est sur une route admin, afficher les pages admin
  if (location.pathname.startsWith('/admin')) {
    return (
      <Routes>
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route 
          path="/admin/dashboard" 
          element={
            <ProtectedRoute>
              <AdminDashboard />
            </ProtectedRoute>
          } 
        />
      </Routes>
    );
  }
  
  // Sinon, afficher OnePage (le portfolio principal)
  return <OnePage />;
}

import { BrowserRouter, Routes, Route } from "react-router-dom";

import MainLayout from "../layouts/MainLayout";

import LandingPage from "../pages/LandingPage";
import Login from "../pages/Login";
import Register from "../pages/Register";

import Home from "../pages/Home";
import UploadIssue from "../pages/UploadIssue";
import AIProcessing from "../pages/AIProcessing";
import AIResult from "../pages/AIResult";
import PublishSuccess from "../pages/PublishSuccess";
import Reports from "../pages/Reports";
import ReportDetails from "../pages/ReportDetails";
import Analytics from "../pages/Analytics";
import Profile from "../pages/Profile";
import Map from "../pages/Map";
import AdminDashboard from "../pages/AdminDashboard";
import NotFound from "../pages/NotFound";

import ProtectedRoute from "../components/auth/ProtectedRoute";
import AdminRoute from "../components/auth/AdminRoute";
import HomeRedirect from "../components/auth/HomeRedirect";
import ManageReports from "../pages/ManageReports";

import Notifications from "../pages/Notifications";

export default function AppRoutes() {
  return (
    <BrowserRouter>

      <Routes>

        {/* Public Routes */}

        <Route
          path="/"
          element={<LandingPage />}
        />

        <Route
          path="/login"
          element={<Login />}
        />

        <Route
          path="/register"
          element={<Register />}
        />

        {/* Protected Routes */}

        <Route
          element={
            <ProtectedRoute>
              <MainLayout />
            </ProtectedRoute>
          }
        >

          <Route
  path="/home"
  element={<HomeRedirect />}
/>
          <Route path="/upload" element={<UploadIssue />} />

          <Route path="/processing" element={<AIProcessing />} />

          <Route path="/result" element={<AIResult />} />

          <Route path="/success" element={<PublishSuccess />} />

          <Route path="/map" element={<Map />} />

          <Route path="/reports" element={<Reports />} />

          <Route path="/reports/:id" element={<ReportDetails />} />

          <Route path="/analytics" element={<Analytics />} />

          <Route path="/profile" element={<Profile />} />

          <Route
  path="/admin"
  element={
    <AdminRoute>
      <AdminDashboard />
    </AdminRoute>
  }
/>

<Route
  path="/admin/manage-reports"
  element={
    <AdminRoute>
      <ManageReports />
    </AdminRoute>
  }
/>
          <Route
  path="/notifications"
  element={<Notifications />}
/>

        </Route>

        <Route
          path="*"
          element={<NotFound />}
        />

      </Routes>

    </BrowserRouter>
  );
}
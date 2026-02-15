import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import ProtectedRoute from '../components/ProtectedRoute';
import Login from '../pages/auth/Login';
import Signup from '../pages/auth/Signup';
import DonorDashboard from '../pages/donor/DonorDashboard';
import DonorProfile from '../pages/donor/DonorProfile';
import PatientDashboard from '../pages/patient/PatientDashboard';
import CreateRequest from '../pages/patient/CreateRequest';
import HospitalDashboard from '../pages/hospital/HospitalDashboard';
import CreateHospitalRequest from '../pages/hospital/CreateHospitalRequest';
import AdminDashboard from '../pages/admin/AdminDashboard';
import ManageUsers from '../pages/admin/ManageUsers';

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        
        {/* Donor Routes */}
        <Route
          path="/donor/dashboard"
          element={
            <ProtectedRoute allowedRole="DONOR">
              <DonorDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/donor/profile"
          element={
            <ProtectedRoute allowedRole="DONOR">
              <DonorProfile />
            </ProtectedRoute>
          }
        />

        {/* Patient Routes */}
        <Route
          path="/patient/dashboard"
          element={
            <ProtectedRoute allowedRole="PATIENT">
              <PatientDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/patient/create-request"
          element={
            <ProtectedRoute allowedRole="PATIENT">
              <CreateRequest />
            </ProtectedRoute>
          }
        />

        {/* Hospital Routes */}
        <Route
          path="/hospital/dashboard"
          element={
            <ProtectedRoute allowedRole="HOSPITAL">
              <HospitalDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/hospital/create-request"
          element={
            <ProtectedRoute allowedRole="HOSPITAL">
              <CreateHospitalRequest />
            </ProtectedRoute>
          }
        />

        {/* Admin Routes */}
        <Route
          path="/admin/dashboard"
          element={
            <ProtectedRoute allowedRole="ADMIN">
              <AdminDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/users"
          element={
            <ProtectedRoute allowedRole="ADMIN">
              <ManageUsers />
            </ProtectedRoute>
          }
        />

        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;

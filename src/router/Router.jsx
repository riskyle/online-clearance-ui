import { Route, Routes } from "react-router";
import Index from "../pages/Index";
import Login from "../pages/auth/Login";
import ForgotPassword from "../pages/auth/ForgotPassword";
import ResetPassword from "../pages/auth/ResetPassword";
import EmailVerification from "../pages/auth/EmailVerification";
import RootLayout from "../pages/layouts/RootLayout";
import Dashboard from "../pages/Dashboard";
import ProtectedRoute from "./ProtectedRoute";
import { ROLE } from "../config/roles";
import StudentList from "../pages/admin/StudentList";

export default function Router() {
  return (
    <>
      <Routes>
        <Route element={<RootLayout />}>
          <Route path="/" element={<Index />} />
          <Route path="/login" element={<Login />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password/:token" element={<ResetPassword />} />
        </Route>

        <Route
          element={
            <ProtectedRoute
              allowedRoles={[ROLE.USER, ROLE.ADMIN, ROLE.SUPER_ADMIN]}
            />
          }
        >
          <Route path="/dashboard" element={<Dashboard />} />
        </Route>

        <Route
          element={
            <ProtectedRoute allowedRoles={[ROLE.ADMIN, ROLE.SUPER_ADMIN]} />
          }
        >
          <Route path="/admin/student-list" element={<StudentList />} />
        </Route>

        <Route path="/verify-email" element={<EmailVerification />} />
      </Routes>
    </>
  );
}

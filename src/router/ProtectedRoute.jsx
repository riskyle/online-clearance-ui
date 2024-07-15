import { Navigate, Outlet, useNavigate } from "react-router";
import { useAuthContext } from "../contexts/AuthContext";
import useSWR from "swr";
import axios from "../api/axios";
import AuthLayout from "../pages/layouts/AuthLayout";

export default function ProtectedRoute({ allowedRoles }) {
  const { token, logout } = useAuthContext();
  const navigate = useNavigate();

  let fetcher = (url) =>
    axios
      .get(url)
      .then((res) => res.data)
      .catch((e) => {
        if (e?.response?.status !== 409) throw e;
        navigate("/verify-email");
      })
      .finally(() => {
        if (window.location.pathname === "/verify-email") navigate("/");
      });

  const { data: user, isLoading, error } = useSWR("/api/user", fetcher);

  if (error?.response?.status === 401 || error?.response?.status === 419) {
    localStorage.removeItem("u_token");
    return <Navigate to="/login" />;
  } else if (!isLoading && !token) {
    return logout();
  } else if (!isLoading && token && !user.data.emailVerifiedAt) {
    return <Navigate to="/verify-email" />;
  }

  if (!isLoading) {
    return token && allowedRoles?.includes(user.data.roleId) ? (
      <AuthLayout>
        <Outlet context={{ user }} />
      </AuthLayout>
    ) : (
      <Navigate to="/dashboard" />
    );
  }
}

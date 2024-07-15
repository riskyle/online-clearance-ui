import { createContext, useContext, useState } from "react";
import axios from "../api/axios";
import { useNavigate } from "react-router";
import { useProgressContext } from "./ProgressContext";

export const AuthContext = createContext();

export default function AuthProvider({ children }) {
  const [errors, setErrors] = useState([]);
  const [successMsg, setSuccessMsg] = useState("");
  const [loggingIn, setLogginIn] = useState(false);
  const { setShowProgress } = useProgressContext();

  const navigate = useNavigate();

  const csrf = () => axios.get("/sanctum/csrf-cookie");

  const login = async ({ ...data }) => {
    await csrf();

    setShowProgress(true);
    setErrors([]);

    axios
      .post("/login", data)
      .then((res) => {
        let user = res.data.user;

        localStorage.setItem("u_token", res.data.token);
        setLogginIn(true);

        if (!user.email_verified_at) {
          navigate("/verify-email");
        } else {
          navigate("/dashboard");
        }
      })
      .catch((e) => {
        if (e.response.status !== 422) throw e;
        setErrors(e.response.data.errors);
      })
      .finally(() => setShowProgress(false));
  };

  const register = async ({ ...data }) => {
    await csrf();

    setShowProgress(true);
    setErrors([]);

    axios
      .post("/register", data)
      .then((res) => {
        let user = res.data.user;
        console.log(res);
        localStorage.setItem("u_token", res.data.token);
        setLogginIn(true);
        navigate("/verify-email");
      })
      .catch((e) => {
        if (e.response.status !== 422) throw e;
        setErrors(e.response.data.errors);
      })
      .finally(() => setShowProgress(false));
  };

  const sendRequestToResetPassword = async ({ ...data }) => {
    await csrf();

    setShowProgress(true);
    setErrors([]);

    axios
      .post("/forgot-password", data)
      .then((res) => setSuccessMsg(res.data.status))
      .catch((e) => {
        if (e.response.status !== 422) throw e;
        setErrors(e.response.data.errors);
      })
      .finally(() => setShowProgress(false));
  };

  const resetPassword = async ({ ...data }) => {
    await csrf();

    setShowProgress(true);

    axios
      .post("/reset-password", data)
      .catch((e) => {
        if (e.response.status !== 422) throw e;
        setErrors(e.response.data.errors);
      })
      .finally(() => setShowProgress(false));
  };

  const resendEmailVerification = ({ setStatus }) => {
    axios
      .post("/email/verification-notification")
      .then((response) => setStatus(response.data.status));
  };

  const logout = () => {
    axios.post("/logout").catch((e) => {
      if (e?.response?.status) throw e;
    });

    localStorage.removeItem("u_token");
    navigate("/login");
  };

  const token = localStorage.getItem("u_token");

  return (
    <AuthContext.Provider
      value={{
        loggingIn,
        token,
        errors,
        setErrors,
        successMsg,
        setSuccessMsg,
        login,
        logout,
        register,
        sendRequestToResetPassword,
        resetPassword,
        resendEmailVerification,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuthContext = () => {
  const context = useContext(AuthContext);
  return context;
};

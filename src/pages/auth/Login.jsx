import { useState, useEffect } from "react";
import { useAuthContext } from "../../contexts/AuthContext";

export default function Login() {
  document.title = "Login";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login, setErrors } = useAuthContext();

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    login({ email, password });
  };

  //to reset the error message from previous routes
  useEffect(() => setErrors([]), []);

  return (
    <form onSubmit={handleLoginSubmit}>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button type="submit">Login</button>
    </form>
  );
}

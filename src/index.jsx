import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import { ProgressProvider } from "./contexts/ProgressContext.jsx";
import AuthProvider from "./contexts/AuthContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <ProgressProvider>
        <AuthProvider>
          <App />
        </AuthProvider>
      </ProgressProvider>
    </BrowserRouter>
  </React.StrictMode>
);

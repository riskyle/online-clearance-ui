import { createContext, useState, useContext } from "react";

export const ProgressContext = createContext();

export const ProgressProvider = ({ children }) => {
  const [progress, setProgress] = useState(0);
  const [showProgress, setShowProgress] = useState(false);

  return (
    <ProgressContext.Provider
      value={{ progress, setProgress, showProgress, setShowProgress }}
    >
      {children}
    </ProgressContext.Provider>
  );
};

export const useProgressContext = () => {
  const context = useContext(ProgressContext);
  return context;
};

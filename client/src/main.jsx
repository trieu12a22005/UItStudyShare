import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter as Router } from "react-router-dom";
import { AuthProvider } from "./hooks/AuthContext.jsx";
import { Provider } from "react-redux";
import { store } from "./redux/store.js";
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
  <AuthProvider>
    <Router>
    <App />
  </Router>
  </AuthProvider>
</Provider>
</StrictMode>
);

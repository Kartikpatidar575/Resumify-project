import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import ScrollToHash from "./components/ScrollToHash.jsx";
import ScrollToTop from "./components/ScrollToTop.jsx";
import { LoadingProvider } from "../context/LoadingContext.jsx";
import { HelmetProvider } from "react-helmet-async";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <HelmetProvider>
      <BrowserRouter>
        <LoadingProvider>
          <ScrollToTop />
          <ScrollToHash />
          <App />
        </LoadingProvider>
      </BrowserRouter>
    </HelmetProvider>
  </StrictMode>,
);

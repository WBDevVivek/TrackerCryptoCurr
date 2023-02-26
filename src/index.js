import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import { CryptoContext } from "./CryptoContext";

// for carousel

import "react-alice-carousel/lib/alice-carousel.css";

// for carousel End
const rootElement = document.getElementById("root");
const root = createRoot(rootElement);

root.render(
  <StrictMode>
    <BrowserRouter>
      <CryptoContext>
        <App />
      </CryptoContext>
    </BrowserRouter>
  </StrictMode>
);

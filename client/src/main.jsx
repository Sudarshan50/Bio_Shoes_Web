import { createRoot } from "react-dom/client";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import ShopContextProvider from "./context/ShopContext.jsx";
import { GoogleOAuthProvider } from "@react-oauth/google";

const clientId = import.meta.env.VITE_GOOGLE_CLIENT;
createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <ShopContextProvider>
      <GoogleOAuthProvider clientId={clientId}>
        <App />
      </GoogleOAuthProvider>
    </ShopContextProvider>
  </BrowserRouter>
);

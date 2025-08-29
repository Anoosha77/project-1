// src/main.tsx
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import QueryProvider from "./@core/tanstack/queryClientProvider";
import { GoogleOAuthProvider } from "@react-oauth/google";

const clientId =
  "925576924145-g6cfs6qsucpkdf75nh8c2jd245oo7bbr.apps.googleusercontent.com";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <GoogleOAuthProvider clientId={clientId}>
    <QueryProvider>
      <App />
    </QueryProvider>
  </GoogleOAuthProvider>
);

import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import AppProvider from "./context/useAuthContext.tsx";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import SearchAppProvider from "./context/useSearchContext.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <AppProvider>
      <SearchAppProvider>
        <App />
      </SearchAppProvider>
      <ToastContainer />
    </AppProvider>
  </React.StrictMode>
);

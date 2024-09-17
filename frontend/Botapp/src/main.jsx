import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./Context/AuthContext.jsx";
import axios from "axios";
import { Toaster } from "react-hot-toast";
axios.defaults.baseURL="https://cheat-chatf-ketansharma22s-projects.vercel.app"
axios.defaults.withCredentials= true;
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <BrowserRouter>
      <Toaster />
        <App />
      </BrowserRouter>
    </AuthProvider>
  </React.StrictMode>
);

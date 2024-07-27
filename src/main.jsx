import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { firebase } from "./lib/firebase";
import FirebaseContext from "./context/firebase";
import { FieldValue } from "firebase/firestore";

ReactDOM.createRoot(document.getElementById("root")).render(
  <FirebaseContext.Provider value={{ firebase, FieldValue }}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </FirebaseContext.Provider>
);

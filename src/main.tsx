import React from "react";
import ReactDOM from "react-dom/client";

import App2 from "./App2.tsx";
import { Amplify } from "aws-amplify";
import outputs from "../amplify_outputs.json";

import '@aws-amplify/ui-react/styles.css';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js'; // This is critical for dropdowns

Amplify.configure(outputs);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App2 />
  </React.StrictMode>
);

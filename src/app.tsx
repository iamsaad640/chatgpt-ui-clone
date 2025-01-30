//Modules
import React from "react";
import ReactDOM from "react-dom/client";

//Components
import Home from "@/pages/Home";

//Style
import "@/styles/global.css";
import { Providers } from "./components/Providers";
import Page from "./pages/Page";

ReactDOM.createRoot(document.getElementById("gpt-nova") as HTMLElement).render(
  <React.StrictMode>
    <Providers>
      <Page />
    </Providers>
  </React.StrictMode>
);

//Modules
import React from "react";
import ReactDOM from "react-dom/client";

//Components

//Style
import "@/styles/global.css";
import { Providers } from "./components/Providers";
import ChatPopup from "./ChatModel/Chatpopup";
import Signin from "./Pages/Signin";
import Home from "./Pages/Home";

ReactDOM.createRoot(document.getElementById("gpt-nova") as HTMLElement).render(
  <React.StrictMode>
    <Providers>
      <Home />
    </Providers>
  </React.StrictMode>
);

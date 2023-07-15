import React from "react";
import ReactDOM from "react-dom/client";

import "./styles/index.scss";
import App from "./App";
import { ConfigProvider } from "antd";
import { defaultTheme } from "./themes/default.theme";
import { BrowserRouter } from "react-router-dom";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <ConfigProvider theme={defaultTheme}>
        <App />
      </ConfigProvider>
    </BrowserRouter>
  </React.StrictMode>
);

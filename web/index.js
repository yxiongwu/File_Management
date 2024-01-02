import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";

function render() {
  const rootElement = document.getElementById("root");
  const root = createRoot(rootElement);
  root.render(<App />);
}

render();

if (module.hot) {
  module.hot.accept("./App", render);
}

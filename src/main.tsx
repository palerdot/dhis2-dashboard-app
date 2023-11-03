import React from "react"
import ReactDOM from "react-dom/client"

import AppContextHolder from "./AppContext.tsx"
import App from "./App.tsx"
import "./index.css"

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <AppContextHolder>
      <App />
    </AppContextHolder>
  </React.StrictMode>
)

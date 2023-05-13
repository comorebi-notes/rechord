import "babel-polyfill" // for GoogleBot (Chrome 41)

import React          from "react"
import { createRoot } from "react-dom/client"
import Root           from "../components"
import { document }   from "../utils/browser-dependencies"
import "../styles/rechord.sass"

const renderComponent = (id, component) => () => {
  const element = document.getElementById(id)
  if (element) {
    const root = createRoot(element)
    root.render(component)
  }
}
const setReact = (id, component) => (
  document.addEventListener("DOMContentLoaded", renderComponent(id, component))
)

setReact("rechord", <Root />)

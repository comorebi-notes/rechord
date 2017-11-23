import React        from "react"
import ReactDOM     from "react-dom"
import Root         from "../components"
import { document } from "../utils/browser-dependencies"
import "../styles/rechord.sass"

const renderComponent = (id, component) => () => {
  const element = document.getElementById(id)
  if (element) ReactDOM.render(component, element)
}
const setReact = (id, component) => (
  document.addEventListener("DOMContentLoaded", renderComponent(id, component))
)

setReact("rechord", <Root />)

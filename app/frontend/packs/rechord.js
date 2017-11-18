import React        from "react"
import ReactDOM     from "react-dom"
import Rechord      from "../components/Rechord"
import { document } from "../utils/browser-dependencies"
import "../styles/rechord.sass"

const renderComponent = (id, component) => () => {
  const element = document.getElementById(id)
  if (element) ReactDOM.render(component, element)
}
const unmountComponent = (id) => () => {
  const element = document.getElementById(id)
  if (element) ReactDOM.unmountComponentAtNode(element)
}

document.addEventListener("turbolinks:load",  renderComponent("rechord", <Rechord />))
document.addEventListener("turbolinks:visit", unmountComponent("rechord"))

import React        from "react"
import ReactDOM     from "react-dom"
import EditRechord  from "../components/EditRechord"
import ShowRechord  from "../components/ShowRechord"
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

document.addEventListener("turbolinks:load",  renderComponent("edit-rechord", <EditRechord />))
document.addEventListener("turbolinks:visit", unmountComponent("edit-rechord"))
document.addEventListener("turbolinks:load",  renderComponent("show-rechord", <ShowRechord />))
document.addEventListener("turbolinks:visit", unmountComponent("show-rechord"))

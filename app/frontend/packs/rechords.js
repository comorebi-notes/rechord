import React     from "react"
import ReactDOM  from "react-dom"
import App from "../components/App"
import "../styles/rechords.sass"

document.addEventListener("DOMContentLoaded", () => {
  ReactDOM.render(
    <App />,
    document.body.appendChild(document.createElement("div")),
  )
})

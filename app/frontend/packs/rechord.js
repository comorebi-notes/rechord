import React        from "react"
import ReactDOM     from "react-dom"
import App          from "../components/App"
import { document } from "../utils/browser-dependencies"
import "../styles/rechord.sass"

document.addEventListener("turbolinks:load", () => {
  ReactDOM.render(<App />, document.getElementById("rechord"))
})

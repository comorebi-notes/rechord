import React     from "react"
import ReactDOM  from "react-dom"

import App from "components/App"
import "styles/rechords"

document.addEventListener("DOMContentLoaded", () => {
  ReactDOM.render(
    <App name="Hello World!" />,
    document.body.appendChild(document.createElement("div")),
  )
})

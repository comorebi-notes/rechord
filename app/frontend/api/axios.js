import axios        from "axios"
import { document } from "../utils/browser-dependencies"

axios.defaults.headers["X-Requested-With"] = "XMLHttpRequest"
export default axios

export const config = {
  headers: {
    "X-CSRF-Token": document.querySelector("head [name=csrf-token]").content
  }
}

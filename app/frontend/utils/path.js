import { location } from "./browser-dependencies"

export const current = location.href
export const root    = "/"

export const score = {
  show:    (token) => `/${token}`,
  create:  (token) => `/${token}`,
  edit:    (token) => `/${token}/edit`,
  update:  (token) => `/${token}`
}

export const user = {
  show:    (name) => `/users/${name}`,
  update:  (name) => `/users/${name}`,
  destroy: (name) => `/users/${name}`
}

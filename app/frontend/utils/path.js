import { location } from "./browser-dependencies"

export const current = location.href
export const root    = "/"

// view と api で path が異なるため注意
export const score = {
  show:     (token) => `/${token}`,
  edit:     (token) => `/${token}/edit`,
  api: {
    create: ()      => `/scores`,
    show:   (token) => `/scores/${token}`,
    edit:   (token) => `/scores/${token}/edit`,
    update: (token) => `/scores/${token}`
  }
}

export const user = {
  show:    (name) => `/users/${name}`,
  update:  (name) => `/users/${name}`,
  destroy: (name) => `/users/${name}`
}

import { location, history } from "./browser-dependencies"

export const current = location.href
export const back    = () => history.back()
export const forward = () => history.forward()

export const root = "/"

// view と api で path が異なるため注意
export const score = {
  show:      (token) => `/${token}`,
  edit:      (token) => `/${token}/edit`,
  api: {
    create:  ()      => `/scores`,
    show:    (token) => `/scores/${token}`,
    edit:    (token) => `/scores/${token}/edit`,
    update:  (token) => `/scores/${token}`,
    destroy: (token) => `/scores/${token}`
  }
}

export const user = {
  show:    (name) => `/users/${name}`,
  update:  (name) => `/users/${name}`,
  destroy: (name) => `/users/${name}`
}

export const auth = {
  twitter:  "/auth/twitter",
  facebook: "/auth/facebook",
  google:   "/auth/google",
  tumblr:   "/auth/tumblr",
  github:   "/auth/github"
}

import { location, history } from "./browser-dependencies"

export const current = location.href
export const back    = () => history.back()
export const forward = () => history.forward()

export const root   = "/"
export const logout = "/users/logout"
export const about  = "/about"
export const terms  = "/terms"

// view と api で path が異なるため注意
export const score = {
  show:      (token) => `/${token}`,
  edit:      (token) => `/${token}/edit`,
  api: {
    create:  ()      => `/scores`,
    show:    (token) => `/scores/${token}`,
    edit:    (token) => `/scores/${token}/edit`,
    update:  (token) => `/scores/${token}`,
    destroy: (token) => `/scores/${token}`,
    search:  (query) => `/scores/search?${query}`
  }
}

export const user = {
  show:       (name)  => `/users/${name}`,
  validName:  (name)  => `/users/${name}/valid_name`,
  update:     (name)  => `/users/${name}`,
  updateIcon: (name)  => `/users/${name}/update_icon`,
  removeIcon: (name)  => `/users/${name}/remove_icon`,
  destroy:    (name)  => `/users/${name}`,
  api: {
    search:   (query) => `/users/search?${query}`
  }
}

export const auth = {
  twitter:  "/users/auth/twitter",
  facebook: "/users/auth/facebook",
  google:   "/users/auth/google_oauth2",
  tumblr:   "/users/auth/tumblr",
  github:   "/users/auth/github"
}

export const search = (_type, _query) => {
  const type = _type || "scores"
  const query = _query ? `?${_query}` : ""
  return `/${type}/search${query}`
}

export const twitter = (id) => `https://twitter.com/${id}`

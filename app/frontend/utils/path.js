import * as qs from "qs"

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
  index:     ()      => "/scores",
  api: {
    create:  ()      => `/scores`,
    show:    (token) => `/scores/${token}`,
    edit:    (token) => `/scores/${token}/edit`,
    update:  (token) => `/scores/${token}`,
    destroy: (token) => `/scores/${token}`,
    index:   (query) => `/scores?${query}`
  }
}

export const user = {
  show:       (name)  => `/users/${name}`,
  validName:  (name)  => `/users/${name}/valid_name`,
  update:     (name)  => `/users/${name}`,
  updateIcon: (name)  => `/users/${name}/update_icon`,
  removeIcon: (name)  => `/users/${name}/remove_icon`,
  destroy:    (name)  => `/users/${name}`,
  index:      ()      => "/users",
  api: {
    index:    (query)           => `/users?${query}`,
    scores:   (userName, query) => `/users/${userName}/scores?${query}`
  }
}

export const fav = {
  index:     ()      => "/favs",
  api: {
    create:  ()      => "/favs",
    destroy: (id)    => `/favs/${id}`,
    index:   (query) => `favs?${query}`
  }
}

export const auth = {
  twitter:  "/users/auth/twitter",
  facebook: "/users/auth/facebook",
  google:   "/users/auth/google_oauth2",
  tumblr:   "/users/auth/tumblr",
  github:   "/users/auth/github"
}

export const search = (_query) => {
  const queries = qs.parse(_query)
  Object.keys(queries).forEach(key => {
    if (queries[key] === "") delete queries[key]
  })
  const queryStrings = qs.stringify(queries)
  const query = queryStrings ? `?${queryStrings}` : ""
  return `${location.pathname}${query}`
}

export const twitter = (id) => `https://twitter.com/${id}`

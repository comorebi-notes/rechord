Rails.application.routes.draw do
  get "auth/:provider/callback", to: "sessions#create"
  get "/logout",                 to: 'sessions#destroy'

  root "top#index"
end

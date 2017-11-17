Rails.application.routes.draw do
  get "auth/:provider/callback", to: "sessions#create"
  get "/logout",                 to: 'sessions#destroy'

  resources :scores, param: :token

  root "top#index"
end

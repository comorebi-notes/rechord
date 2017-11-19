Rails.application.routes.draw do
  get "auth/:provider/callback", to: "sessions#create"
  get "/logout",                 to: 'sessions#destroy'

  resources :scores, param: :token
  resources :users, only: [:show, :update, :delete]

  scope "/:token" do
    get "" => "scores#show"
  end

  root "scores#edit"
end

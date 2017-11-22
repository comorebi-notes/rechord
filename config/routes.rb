class OnlyAjaxRequest
  def matches?(request)
    request.xhr?
  end
end

Rails.application.routes.draw do
  get "auth/:provider/callback", to: "sessions#create"
  get "/logout",                 to: 'sessions#destroy'

  resources :scores, param: :token, only: [:show, :edit, :update, :create], constraints: OnlyAjaxRequest.new
  resources :users, only: [:show, :update, :destroy]

  get "/"                   => "scores#index"
  get "/:token"             => "scores#index"
  get "/scores/:token"      => "scores#index"
  get "/scores/:token/edit" => "scores#index"

  root "scores#index"
end

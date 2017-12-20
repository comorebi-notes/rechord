class OnlyAjaxRequest
  def matches?(request)
    request.xhr?
  end
end

Rails.application.routes.draw do
  mount RailsAdmin::Engine => "/admin", as: "rails_admin"

  devise_for :users, controllers: { omniauth_callbacks: "users/omniauth_callbacks" }
  devise_scope :user do
    get "/users/logout", to: "devise/sessions#destroy", as: :destroy_user_session
  end

  resource :scores, only: [], constraints: OnlyAjaxRequest.new do
    get "search" => "scores#search"
  end
  resources :scores, {
    only: [:show, :edit, :update, :create, :destroy],
    param: :token,
    constraints: OnlyAjaxRequest.new
  }

  resource :users, only: [], constraints: OnlyAjaxRequest.new do
    get "search" => "users#search"
  end
  resources :users, {
    only: [:show, :update, :destroy],
    param: :name,
    constraints: OnlyAjaxRequest.new
  } do
    post   :valid_name
    put    :update_icon
    delete :remove_icon
  end

  get "not_supported" => "top#not_supported"
  get "*path" => "top#index"
  root "top#index"
end

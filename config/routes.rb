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

  resources :scores, {
    only: [:index, :show, :edit, :update, :create, :destroy],
    param: :token,
    constraints: OnlyAjaxRequest.new
  }

  resources :users, {
    only: [:index, :show, :update, :destroy],
    param: :name,
    constraints: OnlyAjaxRequest.new
  } do
    post   :valid_name
    put    :update_icon
    delete :remove_icon
  end

  resources :favs, only: [:index, :create, :destroy], constraints: OnlyAjaxRequest.new

  get "not_supported" => "top#not_supported"
  get "*path" => "top#index"
  root "top#index"
end

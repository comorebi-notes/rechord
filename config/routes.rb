class OnlyAjaxRequest
  def matches?(request)
    request.xhr?
  end
end

Rails.application.routes.draw do
  get "auth/:provider/callback", to: "sessions#create"
  get "/logout",                 to: 'sessions#destroy'

  resources :scores, {
    only: [:show, :edit, :update, :create, :destroy],
    param: :token,
    constraints: OnlyAjaxRequest.new
  }
  resources :users, {
    only: [:show, :update, :destroy],
    param: :name,
    constraints: OnlyAjaxRequest.new
  } do
    put :update_icon
    delete :remove_icon
  end

  get "*path" => "top#index"
  root "top#index"
end

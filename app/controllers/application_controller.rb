class ApplicationController < ActionController::Base
  protect_from_forgery with: :exception

  rescue_from CanCan::AccessDenied do |exception|
    redirect_to main_app.root_path
  end

  before_action :no_cache

  private

  def authenticate_user!
    session[:user_return_to] = request.path_info
    redirect_to root_path unless user_signed_in?
  end

  def no_cache
    # ブラウザバックで JSON が表示されるのを防止
    if request.format.json?
      response.headers["Cache-Control"] = "no-cache, no-store"
      response.headers["Expires"] = "Fri, 01 Jan 1990 00:00:00 GMT"
      response.headers["Pragma"] = "no-cache"
    end
  end

  def after_sign_out_path_for(resource)
    root_path
  end

  def new_session_path(scope)
    root_path
  end
end

class ApplicationController < ActionController::Base
  protect_from_forgery with: :exception

  before_action :no_cache

  private

  def authenticate_user!
    session[:user_return_to] = env["PATH_INFO"]
    redirect_to root_path unless user_signed_in?
  end

  def no_cache
    # ブラウザバックで JSON が表示されるのを防止
    expires_in 0, "no-store" => true, "no-cache" => true, "must-revalidate" => true, "max-age" => 0
  end

  def after_sign_out_path_for(resource)
    root_path
  end
end

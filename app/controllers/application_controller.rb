class ApplicationController < ActionController::Base
  protect_from_forgery with: :exception

  helper_method :current_user, :logged_in?

  before_action :no_cache

  private

  def current_user
    return unless session[:user_id]
    @current_user ||= User.find(session[:user_id])
  end

  def logged_in?
    session[:user_id].present?
  end

  def authenticate
    return if logged_in?
    redirect_to root_path, alert: "ログインしてください"
  end

  def no_cache
    # ブラウザバックで JSON が表示されるのを防止
    expires_in 0, "no-store" => true, "no-cache" => true, "must-revalidate" => true, "max-age" => 0
  end
end

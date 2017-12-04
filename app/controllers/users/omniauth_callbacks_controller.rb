class Users::OmniauthCallbacksController < Devise::OmniauthCallbacksController
  def twitter
    callback_from :twitter
  end

  def facebook
    callback_from :facebook
  end

  def google_oauth2
    callback_from :google_oauth2
  end

  def tumblr
    callback_from :tumblr
  end

  def github
    callback_from :github
  end

  private

  def callback_from(provider)
    user = User.find_or_create_from_auth(request.env["omniauth.auth"])

    if user.persisted?
      sign_in_and_redirect user, event: :authentication
      set_flash_message(:notice, :success, kind: provider) if is_navigational_format?
    else
      session["devise.#{provider}_data"] = request.env["omniauth.auth"]
      redirect_to root_path
    end
  end

end

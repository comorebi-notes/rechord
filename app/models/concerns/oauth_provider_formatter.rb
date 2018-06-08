class OauthProviderFormatter
  class << self
    def params_for_create_user(auth)
      case auth[:provider]
      when "twitter"
        {
          name:        auth[:info][:nickname],
          screen_name: auth[:info][:name],
          profile:     auth[:info][:description],
          icon:        auth[:info][:image],
          site:        auth[:info][:urls][:Website],
          twitter:     auth[:info][:nickname]
        }
      when "facebook"
        {
          name:        SecureRandom.urlsafe_base64(8),
          screen_name: auth[:info][:name],
          icon:        auth[:info][:image],
          site:        auth[:extra][:raw_info][:link],
          email:       auth[:info][:email]
        }
      when "google_oauth2"
        {
          name:        SecureRandom.urlsafe_base64(8),
          screen_name: auth[:info][:name],
          icon:        auth[:info][:image],
          site:        auth[:info][:urls]&.fetch(:google),
          email:       auth[:info][:email]
        }
      when "tumblr"
        {
          name:        auth[:info][:nickname],
          screen_name: auth[:info][:name],
          icon:        auth[:info][:avatar]
        }
      when "github"
        {
          name:        auth[:info][:nickname],
          screen_name: auth[:info][:nickname],
          icon:        auth[:info][:image],
          site:        auth[:info][:urls][:GitHub],
          email:       auth[:info][:email]
        }
      end
    end
  end
end

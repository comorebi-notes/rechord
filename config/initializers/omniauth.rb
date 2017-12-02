Rails.application.config.middleware.use OmniAuth::Builder do
  provider :twitter, ENV["TWITTER_KEY"], ENV["TWITTER_SECRET"],
    {
      secure_image_url: true,
      image_size:       "original"
    }
  provider :facebook, ENV["FACEBOOK_KEY"], ENV["FACEBOOK_SECRET"],
    {
      secure_image_url: true,
      image_size:       "large"
    }
  provider :google_oauth2, ENV["GOOGLE_CLIENT_ID"], ENV["GOOGLE_CLIENT_SECRET"]
  provider :tumblr, ENV["TUMBLR_KEY"], ENV["TUMBLR_SECRET"]
  provider :github, ENV["GITHUB_KEY"], ENV["GITHUB_SECRET"], scope: "user,repo"
end

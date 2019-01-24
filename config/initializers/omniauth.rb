Rails.application.config.middleware.use OmniAuth::Builder do
  configure do |config|
    config.full_host = ENV['RAILS_FULL_HOST']
  end
end

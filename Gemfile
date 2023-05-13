source 'https://rubygems.org'

git_source(:github) do |repo_name|
  repo_name = "#{repo_name}/#{repo_name}" unless repo_name.include?("/")
  "https://github.com/#{repo_name}.git"
end

ruby '3.2.1'

# Core
gem 'rails', '6.1.7.3'
gem 'pg'
gem 'puma'
gem 'sass-rails'
gem 'uglifier'
gem 'webpacker', '~> 3.5.5'
# gem 'mini_racer'
gem 'jbuilder'
# gem 'capistrano-rails', group: :development
gem 'bootsnap'
gem 'unicorn'
gem 'dotenv-rails'

# Layout
gem 'font-awesome-rails'
gem 'rails-i18n'
gem 'slim-rails'
gem 'bulma-rails', '0.7.4'

# API
gem 'friendly_id'
gem 'ransack'
gem 'kaminari'

# Authentication
gem 'devise'
gem 'omniauth', '~> 1.9.0'
gem 'omniauth-twitter', '~> 1.4.0'
gem 'omniauth-facebook', '~> 6.0.0'
gem 'omniauth-google-oauth2', '~> 0.6.0'
gem 'omniauth-tumblr', '~> 1.2'
gem 'omniauth-github', '~> 1.3.0'

# Management
gem 'cancancan'
gem 'rails_admin'
gem 'rails_admin-i18n'
gem 'newrelic_rpm'

# Upload
gem 'carrierwave'
gem 'fog', '= 2.1.0'
gem 'rmagick'

# Counter
gem 'impressionist'
gem 'counter_culture', '~> 1.8'

# Session
gem 'redis', '~>4.8.1'
gem 'redis-rails'

# Backup
gem 'dropbox_api'
gem 'whenever', require: false

# Notification
gem 'exception_notification'
gem 'slack-notifier'

gem 'psych', '~> 3.1'

group :development, :test do
  gem 'byebug', platforms: [:mri, :mingw, :x64_mingw]
  gem 'capybara', '~> 2.13'
  gem 'selenium-webdriver'
  gem 'pry-rails'
  gem 'pry-byebug'
  gem 'pry-doc'
end

group :development do
  gem 'web-console', '>= 3.3.0'
  gem 'spring'
  gem 'spring-watcher-listen', '~> 2.0.0'
  gem 'bcrypt', '~> 3.1.7'
  gem 'bcrypt_pbkdf'
  gem 'ed25519'

  # gem 'capistrano',         require: false
  # gem 'capistrano-rails',   require: false
  # gem 'capistrano-bundler', require: false
  # gem 'capistrano3-puma',   require: false
  # gem 'capistrano-rbenv',   require: false
end

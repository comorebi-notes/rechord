require_relative "boot"

require "rails/all"

# Require the gems listed in Gemfile, including any gems
# you've limited to :test, :development, or :production.
Bundler.require(*Rails.groups)

module Rechord
  class Application < Rails::Application
    # Initialize configuration defaults for originally generated Rails version.
    config.load_defaults 6.1

    config.preference = config_for(:version)

    config.time_zone = 'Tokyo'
    config.active_record.default_timezone :local

    config.autoload_paths << Rails.root.join('lib')
  end
end

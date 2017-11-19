class User < ApplicationRecord
  class << self
    def find_or_create_from_auth(auth)
      provider = auth[:provider]
      uid      = auth[:uid]
      name     = auth[:info][:nickname]
      icon_url = auth[:info][:image].gsub(/^http:/, "https:")

      user = self.find_or_create_by(provider: provider, uid: uid) do |u|
        u.name     = name
        u.icon_url = icon_url
      end

      update_targets = {
        name:     name,
        icon_url: icon_url
      }
      if update_targets.any? { |key, value| user[key] != value }
        user.update(update_targets)
      end

      user
    end
  end
end

class User < ApplicationRecord
  include FriendlyId
  friendly_id :name

  has_many :scores

  class << self
    def find_or_create_from_auth(auth)
      provider    = auth[:provider]
      uid         = auth[:uid]
      name        = auth[:info][:nickname]
      screen_name = auth[:info][:name]
      profile     = auth[:info][:description]
      icon_url    = auth[:info][:image].gsub(/^http:/, "https:")
      site_url    = auth[:info][:urls][:Website]

      user = self.find_or_create_by(provider: provider, uid: uid) do |u|
        u.name        = name
        u.screen_name = screen_name
        u.profile     = profile
        u.icon_url    = icon_url
        u.site_url    = site_url
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

class User < ApplicationRecord
  class << self
    def find_or_create_from_auth(auth)
      provider = auth[:provider]
      uid      = auth[:uid]
      name     = auth[:info][:nickname]
      icon_url = auth[:info][:image]

      self.find_or_create_by(provider: provider, uid: uid) do |user|
        user.name     = name
        user.icon_url = icon_url
      end
    end
  end
end

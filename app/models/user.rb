class User < ApplicationRecord
  include FriendlyId
  friendly_id :name

  has_many :scores

  validates :name,        presence: true, length: { maximum: 16 }
  validates :screen_name, presence: true, length: { maximum: 32 }
  validates :profile,     length: { maximum: 256 }
  validates :icon_url,    length: { maximum: 256 }
  validates :site_url,    length: { maximum: 256 }
  # validates :twitter,     length: { maximum: 16 }

  class << self
    def find_or_create_from_auth(auth)
      provider = auth[:provider]
      uid      = auth[:uid]

      case provider
      when "twitter"
        params = {
          name:        auth[:info][:nickname],
          screen_name: auth[:info][:name],
          profile:     auth[:info][:description],
          icon_url:    auth[:info][:image],
          site_url:    auth[:info][:urls][:Website],
          twitter:     auth[:info][:nickname]
        }
      when "facebook"
        params = {
          name:        auth[:uid],
          screen_name: auth[:info][:name],
          icon_url:    auth[:info][:image],
          site_url:    auth[:extra][:raw_info][:link],
          email:       auth[:info][:email]
        }
      end

      self.find_or_create_by(provider: provider, uid: uid) do |user|
        params.each do |key, value|
          user[key] = value
        end
      end
    end
  end
end

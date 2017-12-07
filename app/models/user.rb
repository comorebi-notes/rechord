class User < ApplicationRecord
  include FriendlyId
  friendly_id :name

  mount_uploader :icon, ImageUploader
  devise :omniauthable

  has_many :scores, dependent: :destroy

  validates :name,        presence: true, length: { maximum: 16 }, format: { with: /[a-z0-9._-]*/ }, uniqueness: true
  validates :screen_name, presence: true, length: { maximum: 32 }
  validates :profile,     length: { maximum: 256 }
  validates :site,        length: { maximum: 256 }
  validates :twitter,     length: { maximum: 16 }
  validate  :limit_icon_file_size, if: :has_icon?

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
          icon:        auth[:info][:image],
          site:        auth[:info][:urls][:Website],
          twitter:     auth[:info][:nickname]
        }
      when "facebook"
        params = {
          name:        SecureRandom.urlsafe_base64(8),
          screen_name: auth[:info][:name],
          icon:        auth[:info][:image],
          site:        auth[:extra][:raw_info][:link],
          email:       auth[:info][:email]
        }
      when "google_oauth2"
        params = {
          name:        SecureRandom.urlsafe_base64(8),
          screen_name: auth[:info][:name],
          icon:        auth[:info][:image],
          site:        auth[:info][:urls][:google],
          email:       auth[:info][:email]
        }
      when "tumblr"
        params = {
          name:        auth[:info][:nickname],
          screen_name: auth[:info][:name],
          icon:        auth[:info][:avatar]
        }
      when "github"
        params = {
          name:        auth[:info][:nickname],
          screen_name: auth[:info][:nickname],
          icon:        auth[:info][:image],
          site:        auth[:info][:urls][:GitHub],
          email:       auth[:info][:email]
        }
      end

      loop do
        params[:name].downcase!
        break unless User.find_by(name: params[:name])
        params[:name] = SecureRandom.urlsafe_base64(8)
      end

      self.find_or_create_by(provider: provider, uid: uid) do |user|
        params.each do |key, value|
          if key == :icon
            user.remote_icon_url = value
          else
            user[key] = value
          end
        end
      end
    end
  end

  def has_icon?
    icon.present?
  end

  def limit_icon_file_size
    limit_size = (1024 * 1024 * 2).to_f
    if icon.file.size.to_f > limit_size
      errors.add(:icon, "over_size")
    end
  end
end

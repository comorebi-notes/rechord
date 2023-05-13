class User < ApplicationRecord
  include FriendlyId
  friendly_id :name

  mount_uploader :icon, ImageUploader
  devise :omniauthable

  has_many :scores,     dependent: :destroy
  has_many :favs,       dependent: :destroy
  has_many :fav_scores, through: :favs, source: :score

  paginates_per 20

  validates :name,        presence: true, length: { maximum: 16 }, format: { with: /[a-z0-9._-]*/ }, uniqueness: true
  validates :screen_name, presence: true, length: { maximum: 32 }
  validates :profile,     length: { maximum: 256 }
  validates :site,        length: { maximum: 256 }
  validates :twitter,     length: { maximum: 16 }
  validate  :limit_icon_file_size, if: :has_icon?

  scope :list, -> (params) {
    users = self
    users = users.where.not(scores_count: 0) unless params[:options][:no_scores]
    users = users.order(params[:sort] => params[:order])
    users = users.ransack(name_or_screen_name_or_profile_cont_all: params[:words]).result if params[:words].present?
    users
  }

  def self.ransackable_attributes(auth_object = nil) = %w[name screen_name profile]
  def self.ransackable_associations(auth_object = nil) = %w[score]


  class << self
    def find_or_create_from_auth(auth)
      provider = auth[:provider]
      uid      = auth[:uid]
      params   = OauthProviderFormatter.params_for_create_user(auth)

      loop do
        params[:name].downcase!
        break unless User.find_by(name: params[:name])
        params[:name] = SecureRandom.urlsafe_base64(8)
      end
      params[:screen_name] = params[:screen_name][0, 32]

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

  def editable_scores
    Score.all_editable(id)
  end

  def published_scores
    Score.all_published(id)
  end

  def favs_list(params)
    scores = fav_scores.where(status: :published)
    scores = scores.order(params[:sort] => params[:order])
    scores = scores.ransack(title_cont_all: params[:words]).result if params[:words].present?
    scores
  end

  def scores_list(params)
    scores = params[:owner] ? editable_scores : published_scores
    scores = scores.order(params[:sort] => params[:order])
    scores = scores.ransack(title_cont_all: params[:words]).result if params[:words].present?
    scores
  end
end

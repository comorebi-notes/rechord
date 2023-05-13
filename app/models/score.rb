class Score < ApplicationRecord
  include FriendlyId
  friendly_id :token
  is_impressionable counter_cache: true, column_name: :views_count

  belongs_to :user, optional: true
  has_many :favs, dependent: :destroy

  counter_culture :user,
    column_name: -> (score) { score.published? ? :scores_count : nil },
    column_names: { ["scores.status = ?", '0'] => :scores_count }

  paginates_per 20

  enum status: {
    published: 0,
    closed:    1,
    deleted:   2
  }
  enum instrument: {
    Piano:   0,
    Guitar:  1,
    Strings: 2
  }
  enum beat: {
    "2/4": 0,
    "3/4": 1,
    "4/4": 2,
    "5/4": 3,
    "6/4": 4,
    "7/4": 5
  }

  validates :title,   presence: true, length: { maximum: 40 }
  validates :content, presence: true, length: { maximum: 1024 }
  validates :bpm, numericality: { greater_than: 0 }
  validate :anti_attack

  before_create do
    self.token = SecureRandom.urlsafe_base64(8)
  end

  scope :all_published, -> (id) { where(user_id: id, status: :published) }
  scope :all_editable,  -> (id) { where(user_id: id).where.not(status: :deleted) }
  scope :list, -> (params) {
    scores = where(status: :published)
    scores = scores.where.not(user_id: nil) unless params[:options][:guest]
    scores = scores.order(params[:sort] => params[:order])
    scores = scores.ransack(title_cont_all: params[:words]).result if params[:words].present?
    scores
  }

  def self.ransackable_attributes(auth_object = nil) = %w[title]

  def owner?(id)
    user_id == id
  end

  def browsable?(id)
    published? || owner?(id)
  end

  private def anti_attack
    # 以下の荒らし投稿を取り急ぎ防ぐ
    #   皆様への大切なお知らせ\n大変申し訳ございませんが、rechord.ccは下記のリンクに移動することとなりました。
    #   今後ともrechord.ccをよろしくお願いします。
    #   移動先URL: https://www.nekozouneko.net/
    #   - by るんく
    errors.add(:content, :taken) if content.include?('大切なお知らせ') || content.include?('nekozouneko')
  end
end

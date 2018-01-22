class Score < ApplicationRecord
  include FriendlyId
  friendly_id :token
  is_impressionable counter_cache: true, column_name: :views_count

  belongs_to :user, optional: true
  has_many :favs, dependent: :destroy

  counter_culture :user, column_names: { ["scores.status = ?", '0'] => :scores_count }

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

  before_create do
    self.token = SecureRandom.urlsafe_base64(8)
  end

  scope :all_published, -> (id) { where(user_id: id, status: :published) }
  scope :all_editable,  -> (id) { where(user_id: id).where.not(status: :deleted) }
  scope :list, -> (_params) {
    params = set_list_params(_params)

    scores = where(status: :published)
    scores = scores.where.not(user_id: nil) unless params[:options][:guest]
    scores = scores.order(params[:sort] => params[:order])
    scores = scores.ransack(title_cont_all: params[:words]).result if params[:words].present?
    scores
  }

  class << self
    def set_list_params(params)
      words = params[:word]&.split(" ")
      sort  = params[:sort].present? ? params[:sort] : "id"
      order = sort.slice!(/(asc|desc)$/) || "desc"

      options = {}
      options[:guest] = params[:guest] == "true"
      sort.gsub!(/_$/, "")

      { words: words, sort: sort, order: order, options: options }
    end
  end

  def owner?(id)
    user_id == id
  end

  def browsable?(id)
    published? || owner?(id)
  end
end

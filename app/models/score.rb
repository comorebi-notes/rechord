class Score < ApplicationRecord
  include FriendlyId
  friendly_id :token

  belongs_to :user, optional: true
  enum status: { published: 0, closed: 1, deleted: 2 }

  validates :title,   presence: true
  validates :content, presence: true

  before_create do
    self.token = SecureRandom.urlsafe_base64(8)
  end
end

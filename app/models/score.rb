class Score < ApplicationRecord
  include FriendlyId
  friendly_id :token

  belongs_to :user, optional: true
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

  validates :title,   presence: true
  validates :content, presence: true

  before_create do
    self.token = SecureRandom.urlsafe_base64(8)
  end
end
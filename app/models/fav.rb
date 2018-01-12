class Fav < ApplicationRecord
  belongs_to :user
  belongs_to :score

  validates :user_id, uniqueness: { scope: :score_id }
end

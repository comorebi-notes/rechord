class Fav < ApplicationRecord
  belongs_to :user
  belongs_to :score

  counter_culture :score

  validates :user_id, uniqueness: { scope: :score_id }
end

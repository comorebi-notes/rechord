class Fav < ApplicationRecord
  belongs_to :user
  belongs_to :score

  counter_culture :score

  validates :user_id, uniqueness: { scope: :score_id }

  after_destroy :destroy_notification_if_zero_fav

  private

  def destroy_notification_if_zero_fav
    if score.favs_count == 1
      notification = Notification.find_by(title: score.token)
      notification.destroy if notification.present?
    end
  end
end

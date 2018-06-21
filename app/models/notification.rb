class Notification < ApplicationRecord
  validates :title,   length: { maximum: 128 }
  validates :content, length: { maximum: 2048 }

  scope :list_for_user, -> (user_id) {
    return if user_id.blank?

    user = User.find(user_id)
    return if user.blank?

    notifications = where(user_id: [user_id, nil])
    notifications = notifications.where("updated_at > ?", user.last_read_at) if user.last_read_at.present?
    notifications.order(updated_at: :desc).limit(20)
  }

  enum template: {
    default: 0,
    version: 1,
    fav:     2
  }
end

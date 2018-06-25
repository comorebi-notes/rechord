class Notification < ApplicationRecord
  validates :title,   length: { maximum: 128 }, uniqueness: true
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
    release: 1,
    fav:     2
  }

  class << self
    def create_or_update_by_fav(fav)
      notification = find_by(title: fav.score.token)
      if notification.present?
        notification.touch # updated_at だけ更新
      else
        notification = new(template: :fav, title: fav.score.token, user_id: fav.score.user_id)
      end
      notification.save!
    end

    def destroy_if_exist(params)
      notification = find_by(params)
      notification.destroy! if notification.present?
    end
  end
end

class FavsController < ApplicationController
  include SearchParams

  before_action :authenticate_user!

  def index
    scores = current_user.favs_list(users_favs_list_params)
    total_count = scores.count
    scores = scores.page(params[:page] || 1)

    render json: {
      result:       scores.as_json(include: :user),
      total_count:  total_count,
      current_page: scores.current_page,
      total_pages:  scores.total_pages
    }
  end

  def create
    ActiveRecord::Base.transaction do
      fav = Fav.new(fav_params)

      if current_user&.id != fav.score.user.id
        notification = Notification.find_by(title: fav.score.token)
        if notification.present?
          notification.touch # updated_at だけ更新
        else
          notification = Notification.new(template: :fav, title: fav.score.token, user_id: fav.score.user.id)
        end
        notification.save!
      end

      if fav.save!
        render json: fav
      else
        render json: fav.errors.full_messages, status: :unprocessable_entity
      end
    end
  rescue => e
    Rails.logger.error e.message
    render json: e.message, status: :internal_server_error
  end

  def destroy
    ActiveRecord::Base.transaction do
      fav = Fav.find(params[:id])
      score = fav.score

      if score.favs_count == 1
        notification = Notification.find_by(title: score.token)
        notification.destroy! if notification.present?
      end

      if fav.destroy!
        head :ok
      else
        render json: fav.errors.full_messages, status: :unprocessable_entity
      end
    end
  rescue => e
    render json: e.message, status: :internal_server_error
  end

  private

  def fav_params
    params.require(:fav).permit(:user_id, :score_id)
  end
end

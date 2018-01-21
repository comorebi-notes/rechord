class FavsController < ApplicationController
  def index
    scores = current_user.favs_list(params)
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
    fav = Fav.new(fav_params)
    if fav.save!
      render json: fav
    else
      render json: fav.errors.full_messages, status: :unprocessable_entity
    end
  end

  def destroy
    fav = Fav.find(params[:id])
    if fav.destroy
      head :ok
    else
      render json: fav.errors.full_messages, status: :unprocessable_entity
    end
  end

  private

  def fav_params
    params.require(:fav).permit(:user_id, :score_id)
  end
end

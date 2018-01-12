class FavsController < ApplicationController
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

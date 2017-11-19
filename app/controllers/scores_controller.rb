class ScoresController < ApplicationController
  before_action :set_data, only: [:show, :edit]

  def show
  end

  def edit
  end

  def create
    score = Score.new(score_params)
    if score.save
      render json: score.token
    else
      render json: score.errors.full_messages, status: :unprocessable_entity
    end
  end

  private

  def score_params
    params.require(:score).permit(
      :title, :content, :instrument, :beat, :bpm, :click, :user_id
    )
  end

  def set_data
    @score = Score.friendly.find_by(token: params[:token])
  end
end

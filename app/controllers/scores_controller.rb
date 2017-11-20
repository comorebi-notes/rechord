class ScoresController < ApplicationController
  before_action :set_data, only: [:show, :edit, :update]

  def new
  end

  def show
    redirect_to root_path unless @score
  end

  def edit
    redirect_to root_path if @score.user_id != current_user.id
  end

  def create
    score = Score.new(score_params)
    if score.save
      render json: score.token
    else
      render json: score.errors.full_messages, status: :unprocessable_entity
    end
  end

  def update
    if @score.update(score_params)
      render json: @score.token
    else
      render json: @score.errors.full_messages, status: :unprocessable_entity
    end
  end

  private

  def score_params
    params.require(:score).permit(
      :title, :content, :instrument, :beat, :bpm, :click, :status, :user_id
    )
  end

  def set_data
    @score = Score.friendly.find_by(token: params[:token])
  end
end
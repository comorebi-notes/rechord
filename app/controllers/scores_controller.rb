class ScoresController < ApplicationController
  before_action :set_score,   only: [:show, :edit, :update, :destroy]

  def show
    render json: { score: @score, author: @score&.user }
  end

  def edit
    render json: { score: @score }
  end

  def create
    score = Score.new(score_params)
    if score.save
      render json: score
    else
      render json: score.errors.details, status: :unprocessable_entity
    end
  end

  def update
    if @score.update(score_params)
      render json: @score
    else
      render json: @score.errors.details, status: :unprocessable_entity
    end
  end

  def destroy
    if @score.deleted!
      head :ok
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

  def set_score
    @score = Score.friendly.find_by(token: params[:token])
    redirect_to root_path unless @score&.can_browse?(current_user&.id)
  end
end

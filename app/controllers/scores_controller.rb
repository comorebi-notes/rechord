class ScoresController < ApplicationController
  before_action :set_score,  only: [:show, :edit, :update, :destroy]
  before_action :browsable?, only: [:show]
  before_action :editable?,  only: [:edit, :update, :destroy]

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

  def search
    if params[:query].present?
      scores = Score.search(params[:query])
      render json: scores, include: [:user]
    else
      head :ok
    end
  rescue
    head :ok
  end

  private

  def score_params
    params.require(:score).permit(
      :title, :content, :instrument, :beat, :bpm, :click, :status, :user_id
    )
  end

  def browsable?
    head :not_found unless @score.browsable?(current_user&.id)
  end

  def editable?
    head :forbidden unless @score.owner?(current_user&.id)
  end

  def set_score
    @score = Score.friendly.find_by(token: params[:token])
    head :not_found unless @score
  end
end

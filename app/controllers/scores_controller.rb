class ScoresController < ApplicationController
  include SearchParams

  before_action :set_score,     only: [:show, :edit, :update, :destroy]
  before_action :authenticate!, only: [:edit, :update, :destroy]
  before_action :browsable?,    only: [:show]
  before_action :editable?,     only: [:edit, :update, :destroy]
  before_action :impression,    only: [:show]

  def index
    scores = Score.list(scores_list_params)
    total_count = scores.count
    scores = scores.page(params[:page] || 1)

    render json: {
      result:       scores.as_json(include: :user),
      total_count:  total_count,
      current_page: scores.current_page,
      total_pages:  scores.total_pages
    }
  end

  def show
    render json: {
      score:  @score.as_json(methods: :favs),
      author: @score&.user
    }
  end

  def edit
    render json: { score: @score }
  end

  def create
    score = Score.new(score_params)
    score.remote_ip = request.remote_ip
    if score.save
      render json: score
    else
      render json: score.errors.details, status: :unprocessable_entity
    end
  end

  def update
    @score.remote_ip = request.remote_ip
    if @score.update(score_params)
      render json: @score
    else
      render json: @score.errors.details, status: :unprocessable_entity
    end
  end

  def destroy
    ActiveRecord::Base.transaction do
      notification = Notification.find_by(title: @score.token)
      notification.destroy! if notification.present?

      if @score.deleted!
        head :ok
      else
        render json: @score.errors.full_messages, status: :unprocessable_entity
      end
    end
  rescue => e
    Rails.logger.error e.message
    render json: e.message, status: :internal_server_error
  end

  private

  def score_params
    params.require(:score).permit(
      :title, :content, :instrument, :beat, :bpm, :capo, :click, :loop, :status, :user_id
    )
  end

  def set_score
    @score = Score.friendly.find_by(token: params[:token])
    head :not_found unless @score
  end

  def authenticate!
    if @score.user_id != current_user.id
      render json: "現在ログイン中のユーザは、この操作に対する権限がありません。", status: :unprocessable_entity
    end
  end

  def browsable?
    head :not_found unless @score.browsable?(current_user&.id)
  end

  def editable?
    head :forbidden unless @score.owner?(current_user&.id)
  end

  def impression
    impressionist(@score, nil, unique: [:session_hash])
  end
end

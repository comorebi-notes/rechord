class ScoresController < ApplicationController
  before_action :set_score,  only: [:show, :edit, :update, :destroy]
  before_action :browsable?, only: [:show]
  before_action :editable?,  only: [:edit, :update, :destroy]
  before_action :impression, only: [:show]

  def index
    words = params[:word]&.split(" ")
    sort  = params[:sort] || "id"
    order = sort.slice!(/(asc|desc)$/) || "desc"

    options = {}
    options[:guest] = params[:guest] == "true"

    sort.gsub!(/_$/, "")
    scores = Score.list(sort, order, options)
    scores = scores.ransack(title_cont_all: words).result if words.present?
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

  def impression
    impressionist(@score, nil, unique: [:session_hash])
  end
end

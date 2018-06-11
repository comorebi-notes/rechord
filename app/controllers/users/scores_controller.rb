class Users::ScoresController < ApplicationController
  include SearchParams

  def index
    user = User.find_by(name: params[:user_name])
    return unless user

    scores = user.scores_list(user_scores_list_params)
    total_count = scores.count
    scores = scores.page(params[:page] || 1)

    render json: {
      result:       scores.as_json(include: :user),
      total_count:  total_count,
      current_page: scores.current_page,
      total_pages:  scores.total_pages
    }
  end
end

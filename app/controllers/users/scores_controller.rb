class Users::ScoresController < ApplicationController
  def index
    user = User.find_by(name: params[:user_name])
    return unless user

    owner = params[:user_name] == current_user&.name
    scores = user.scores_list(params, owner)
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

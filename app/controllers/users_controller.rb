class UsersController < ApplicationController
  def show
    @user = User.find(params[:id])
    if @user == current_user
      @scores = Score.where(user_id: @user.id)
    else
      @scores = Score.where(user_id: @user.id, status: :published)
    end
    render json: { user: @user, scores: @scores }
  end
end

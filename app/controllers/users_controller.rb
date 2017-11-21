class UsersController < ApplicationController
  def show
    @user = User.find(params[:id])
    @scores = Score.where(user_id: @user.id)
  end
end

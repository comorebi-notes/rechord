class UsersController < ApplicationController
  before_action :set_user, only: [:show, :update, :destroy]

  def show
    if @user == current_user
      @scores = Score.editable(@user.id)
    else
      @scores = Score.published(@user.id)
    end
    render json: { user: @user, scores: @scores }
  end

  def update
    if @user.update(user_params)
      render json: @user
    else
      render json: @user.errors.details, status: :unprocessable_entity
    end
  end

  def destroy
    scores = Score.where(user_id: @user.id)
    if @user.destroy
      scores&.each(&:deleted!)
      reset_session
      flash[:success] = "ユーザが削除されました。"
      head :ok
    else
      render json: @user.errors.full_messages, status: :unprocessable_entity
    end
  end

  private

  def user_params
    params.require(:user).permit(:screen_name, :profile, :icon_url, :site_url)
  end

  def set_user
    @user = User.friendly.find_by(name: params[:name])
  end
end

class UsersController < ApplicationController
  before_action :set_user, only: [:show, :valid_name, :update, :update_icon, :remove_icon, :destroy]

  def show
    if @user == current_user
      @scores = @user.editable_scores
    else
      @scores = @user.published_scores
    end
    render json: {
      user:   @user,
      scores: @scores.as_json(methods: [:favs, :views_count])
    }
  end

  def valid_name
    if !@user
      head :ok
    else
      @user.errors.add(:name, :taken)
      render json: @user.errors.details, status: :unprocessable_entity
    end
  end

  def update
    if @user.update(user_params)
      flash[:success] = "ユーザ情報が更新されました。"
      render json: @user
    else
      render json: @user.errors.details, status: :unprocessable_entity
    end
  end

  def update_icon
    if @user.update(icon_params)
      flash[:success] = "アイコンが更新されました。"
      head :ok
    else
      render json: @user.errors.details, status: :unprocessable_entity
    end
  rescue => e
    logger.error e
    flash[:error] = "アイコンの更新でエラーが発生しました。"
    head :internal_server_error
  end

  def remove_icon
    @user.remove_icon = true
    if @user.save
      flash[:success] = "アイコンが削除されました。"
      head :ok
    else
      render json: @user.errors.details, status: :unprocessable_entity
    end
  rescue => e
    logger.error e
    flash[:error] = "アイコンの削除でエラーが発生しました。"
    head :internal_server_error
  end

  def destroy
    if @user.destroy
      reset_session
      flash[:success] = "ユーザが削除されました。"
      head :ok
    else
      render json: @user.errors.full_messages, status: :unprocessable_entity
    end
  end

  def search
    if params[:word].present?
      words = params[:word].split(" ")
      users = User.ransack(name_or_screen_name_or_profile_cont_all: words).result
    else
      users = []
    end
    render json: users, methods: :scores_count
  end

  private

  def user_params
    params.require(:user).permit(:name, :screen_name, :profile, :icon, :site, :email, :twitter)
  end

  def icon_params
    params.permit(:icon)
  end

  def set_user
    @user = User.friendly.find_by(name: (params[:name] || params[:user_name]).downcase)
  end
end

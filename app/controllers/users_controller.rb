class UsersController < ApplicationController
  include SearchParams

  before_action :set_user,      only: [:show, :valid_name, :update, :update_icon, :remove_icon, :destroy, :read]
  before_action :authenticate!, only: [:update, :update_icon, :remove_icon, :destroy, :read]

  def index
    users = User.list(users_list_params)
    total_count = users.count
    users = users.page(params[:page] || 1)

    render json: {
      result:       users.as_json(methods: :scores_count),
      total_count:  total_count,
      current_page: users.current_page,
      total_pages:  users.total_pages
    }
  end

  def show
    render json: @user
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

  def read
    @user.last_read_at = Time.now
    if @user.save
      head :ok
    else
      render json: @user.errors.details, status: :unprocessable_entity
    end
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

  def authenticate!
    case
    when !user_signed_in?
      render json: "この操作に対する権限がありません。ログインしてください。", status: :unprocessable_entity
    when @user.id != current_user.id
      render json: "現在ログイン中のユーザは、この操作に対する権限がありません。", status: :unprocessable_entity
    end
  end
end

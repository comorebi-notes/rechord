class TopController < ApplicationController
  before_action :set_title
  before_action :set_notifications
  before_action :check_browser_support, only: [:index]
  before_action :check_maintenance

  def index
  end

  def not_supported
  end

  def maintenance
  end

  private

  def set_title
    case request.fullpath
    when /\/users\/([^\/]*)(\/[^\/]*)*/
      user = User.friendly.find_by(name: $1)
      @title = user&.screen_name
    when /\/([^\/]{11})(\/[^\/]*)*/
      score = Score.friendly.find_by(token: $1)
      if score&.browsable?(current_user&.id) || score&.owner?(current_user&.id)
        @title = score&.title
      end
    end
  end

  def set_notifications
    @notifications = Notification.list_for_user(current_user&.id)
  end

  # IE11 非対応処理
  def check_browser_support
    ua = request.user_agent&.downcase
    if ua.present? && ((ua.include?('msie') && ua.exclude?('opera')) || ua.include?('trident/7'))
      redirect_to controller: :top, action: :not_supported
    end
  end

  def check_maintenance
    @maintenance_schedules = MaintenanceSchedule.where('start_time >= ?', Time.zone.now).where('end_time <= ?', Time.zone.now)
    render :maintenance if @maintenance_schedules.present?
  end
end

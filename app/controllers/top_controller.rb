class TopController < ApplicationController
  before_action :set_title
  before_action :check_browser_support, only: [:index]

  def index
  end

  def not_support
  end

  private

  def set_title
    case request.fullpath
    when /\/users\/([^\/]*)(\/[^\/]*)*/
      user = User.friendly.find_by(name: $1)
      @title = user&.screen_name
    when /\/([^\/]{11})(\/[^\/]*)*/
      score = Score.friendly.find_by(token: $1)
      @title = score&.title
    end
  end

  def check_browser_support
    ua = request.user_agent.downcase
    if (ua.include?("msie") && ua.exclude?("opera")) || ua.include?("trident/7")
      redirect_to controller: :top, action: :not_support
    end
  end
end

class TopController < ApplicationController
  before_action :set_title

  def index
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
end

class ScoresController < ApplicationController
  def show
    @score = Score.friendly.find_by(token: params[:token])
  end
end

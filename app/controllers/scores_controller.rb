class ScoresController < ApplicationController
  def show
    @score = Score.friendly.find(params[:token])
  end
end

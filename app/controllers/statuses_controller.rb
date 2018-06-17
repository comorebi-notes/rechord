class StatusesController < ApplicationController
  def show
    render json: {
      currentUser:    current_user || {},
      currentVersion: Rails.configuration.preference["version"],
      notifications: [
        title:   "title",
        content: "content"
      ]
    }
  end

  private

  def status_params
    params.permit(:current_user_id, :current_version)
  end
end

RailsAdmin.config do |config|

  ### Popular gems integration

  # == Devise ==
  config.authenticate_with do
    warden.authenticate! scope: :user
  end
  config.current_user_method(&:current_user)

  # == Cancan ==
  config.authorize_with :cancan
  config.parent_controller = "ApplicationController"

  ## == Pundit ==
  # config.authorize_with :pundit

  ## == PaperTrail ==
  # config.audit_with :paper_trail, 'User', 'PaperTrail::Version' # PaperTrail >= 3.0.0

  ### More at https://github.com/sferik/rails_admin/wiki/Base-configuration

  ## == Gravatar integration ==
  ## To disable Gravatar integration in Navigation Bar set to false
  # config.show_gravatar = true

  config.actions do
    dashboard                     # mandatory
    index                         # mandatory
    new
    export
    bulk_delete
    show
    edit
    delete
    show_in_app

    ## With an audit adapter, you can add:
    # history_index
    # history_show
  end

  config.default_items_per_page = 20

  config.model "User" do
    list do
      field :id
      field :icon
      field :name
      field :screen_name
      field :scores
      field :twitter
      field :profile
      field :site
      field :email
      field :created_at
      field :updated_at
      field :provider
      field :uid
      field :admin
    end
  end

  config.model "Score" do
    list do
      field :id
      field :title
      field :user
      field :status
      field :content
      field :updated_at
      field :created_at
      field :token
      field :instrument
      field :beat
      field :click
    end
  end
end

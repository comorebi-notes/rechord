Rechord::Application.config.session_store :redis_store,
  servers: ['redis://127.0.0.1:6379/0/session'],
  expire_after: 20.years,
  key: "_#{Rails.application.class.parent_name.downcase}_session",
  threadsafe: false

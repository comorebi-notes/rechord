Rails.application.configure do
  # config.session_store :cookie_store, key: '_rechord_session', expire_after: 20.years
  config.session_store :redis_store, {
    servers: {
      host: "localhost",
      port: 6379,
      db: 0,
      namespace: "sessions"
    },
    expire_after: 20.years
  }
end

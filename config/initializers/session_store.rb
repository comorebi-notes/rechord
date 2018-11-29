Rails.application.configure do
  config.middleware.use ActionDispatch::Session::RedisStore, {
    servers: {
      host: 'localhost',
      port: 6379,
      db: 0,
      namespace: 'sessions'
    },
    expire_after: 20.years
  }
end

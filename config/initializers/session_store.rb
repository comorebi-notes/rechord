Rails.application.configure do
  config.middleware.use ActionDispatch::Session::RedisStore, {
    servers: {
      host: '127.0.0.1',
      port: 6379,
      db: 0,
      namespace: 'sessions'
    },
    expire_after: 20.years
  }
end

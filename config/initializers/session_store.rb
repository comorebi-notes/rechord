# Rails.application.configure do
#   config.middleware.use ActionDispatch::Session::RedisStore, {
#     servers: {
#       host: '127.0.0.1',
#       port: 6379,
#       db: 0,
#       namespace: 'sessions'
#     },
#     expire_after: 20.years
#   }
# end

Rechord::Application.config.session_store :redis_store,
  servers: ['redis://127.0.0.1:6379/0/session'],
  expire_after: 20.years,
  key: "_#{Rails.application.class.parent_name.downcase}_session",
  threadsafe: false

Rechord::Application.config.session_store :redis_store,
                                          servers: ENV['REDIS_URL'],
                                          expire_after: 20.years,
                                          key: "_#{Rails.application.class.module_parent_name.downcase}_session",
                                          threadsafe: false,
                                          ssl_params: { verify_mode: OpenSSL::SSL::VERIFY_NONE }

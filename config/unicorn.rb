rails_root = File.expand_path("../../", __FILE__)
# rails_env = ENV["RAILS_ENV"] || "development"

ENV["BUNDLE_GEMFILE"] = "#{rails_root}/Gemfile"

worker_processes 2
working_directory rails_root
timeout 30
preload_app true

stderr_path File.expand_path("#{rails_root}/log/unicorn_stderr.log", __FILE__)
stdout_path File.expand_path("#{rails_root}/log/unicorn_stdout.log", __FILE__)

pid File.expand_path("#{rails_root}/tmp/pids/unicorn.pid", __FILE__)

before_fork do |server, worker|
  defined?(ActiveRecord::Base) and
    ActiveRecord::Base.connection.disconnect!

  old_pid = "#{server.config[:pid]}.oldbin"
  if old_pid != server.pid
    begin
      sig = (worker.nr + 1) >= server.worker_processes ? :QUIT : :TTOU
      Process.kill(sig, File.read(old_pid).to_i)
    rescue Errno::ENOENT, Errno::ESRCH
    end
  end
end

after_fork do |server, worker|
  defined?(ActiveRecord::Base) and ActiveRecord::Base.establish_connection
end

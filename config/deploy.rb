# config valid for current version and patch releases of Capistrano
lock '~> 3.11.0'

set :application, 'rechord'
set :repo_url,    'git@github.com:comorebi-notes/rechord.git'
set :user,        'deploy'
set :ssh_options, {
  forward_agent: true,
  user:          fetch(:user),
  keys:          %w(~/.ssh/rechord_cloudgarage_rsa)
}

set :deploy_to,               "/var/www/#{fetch(:application)}"
set :deploy_via,              :remote_cache
set :puma_threads,            [4, 16]
set :puma_workers,            0
set :pty,                     true
set :use_sudo,                false
set :puma_bind,               "unix://#{shared_path}/tmp/sockets/#{fetch(:application)}-puma.sock"
set :puma_state,              '#{shared_path}/tmp/pids/puma.state'
set :puma_pid,                '#{shared_path}/tmp/pids/puma.pid'
set :puma_access_log,         '#{release_path}/log/puma.error.log'
set :puma_error_log,          '#{release_path}/log/puma.access.log'
set :puma_preload_app,        true
set :puma_worker_timeout,     nil
set :puma_init_active_record, true
set :rbenv_ruby, '2.5.3'
set :linked_dirs, fetch(:linked_dirs, []).push(
  'log',
  'tmp/pids',
  'tmp/cache',
  'tmp/sockets',
  'vendor/bundle',
  'public/system',
  'public/uploads'
)
set :linked_files, fetch(:linked_files, []).push(
  'config/database.yml',
  'config/credentials.yml.enc'
)

namespace :puma do
  desc 'Create Directories for Puma Pids and Socket'
  task :make_dirs do
    on roles(:app) do
      execute "mkdir #{shared_path}/tmp/sockets -p"
      execute "mkdir #{shared_path}/tmp/pids -p"
    end
  end
  before :start, :make_dirs
end

namespace :deploy do
  desc 'Make sure local git is in sync with remote.'
  task :check_revision do
    on roles(:app) do
      unless `git rev-parse HEAD` == `git rev-parse origin/#{fetch(:branch)}`
        puts "WARNING: HEAD is not the same as origin/#{fetch(:branch)}"
        puts 'Run `git push origin HEAD` to sync changes.'
        exit
      end
    end
  end

  desc 'Initial Deploy'
  task :initial do
    on roles(:app) do
      before 'deploy:restart', 'puma:start'
      invoke 'deploy'
    end
  end

  desc 'Restart application'
  task :restart do
    on roles(:app), in: :sequence, wait: 5 do
      invoke 'puma:restart'
    end
  end

  desc 'Upload files'
  task :upload do
    on roles(:app) do |host|
      if test "[ ! -d #{shared_path}/config ]"
        execute "mkdir -p #{shared_path}/config"
      end
      upload!('config/database.yml', '#{shared_path}/config/database.yml')
      upload!('config/credentials.yml.enc', '#{shared_path}/config/credentials.yml.enc')
    end
  end

  before :starting,  :check_revision
  after  :finishing, :compile_assets
  after  :finishing, :cleanup
end

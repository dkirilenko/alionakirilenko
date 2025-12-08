USER         = 'ubuntu'
PROJECT_PATH = "/home/#{USER}/apps/alionakirilenko"
SHARED_PATH  = "#{PROJECT_PATH}/shared"

lock "~> 3.19.2"

set :repo_url,        'git@github.com:dkirilenko/alionakirilenko.git'
set :application,     'alionakirilenko'
set :user,            USER
set :puma_threads,    [4,6]
set :puma_workers,    2

set :rvm_type,        :user
set :use_sudo,        false
set :deploy_via,      :remote_cache
set :deploy_to,       PROJECT_PATH #"/home/#{fetch(:user)}/apps/#{fetch(:application)}"
set :puma_bind,       "unix://#{shared_path}/tmp/sockets/#{fetch(:application)}-puma.sock"
set :puma_state,      "#{shared_path}/tmp/pids/puma.state"
set :puma_pid,        "#{shared_path}/tmp/pids/puma.pid"
set :puma_access_log, "#{release_path}/log/puma.error.log"
set :puma_error_log,  "#{release_path}/log/puma.access.log"
set :ssh_options,     forward_agent: true, user: fetch(:user), keys: %w[~/.ssh/id_rsa.pub]
set :puma_preload_app, true
set :puma_worker_timeout, nil
set :puma_init_active_record, true # Change to false when not using ActiveRecord
set :keep_releases, 2 # Releases count

append :linked_files, "config/master.key", "db/production.sqlite3"

append :linked_dirs, "log", "tmp/pids", "tmp/cache", "tmp/sockets", "storage"

task :restart_services do
  on roles(:web) do
    puts '------------------ Restart Service ------------------'
    execute 'sudo systemctl restart alionakirilenko'
  end
end


after 'deploy:finishing', :restart_services

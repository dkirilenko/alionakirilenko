server '89.168.113.105', user: "ubuntu", roles: %w[app db web], primary: true

set :rails_env, :production
set :branch,    :main

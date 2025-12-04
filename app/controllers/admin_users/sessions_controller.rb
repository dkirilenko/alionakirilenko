class AdminUsers::SessionsController < Devise::SessionsController
  layout "admin_auth"

  # optional overrides:
  # def create
  #   super
  # end
end

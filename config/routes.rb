Rails.application.routes.draw do
  devise_for :admin_users, controllers: {
    sessions: "admin_users/sessions"
  }

  authenticate :admin_user do
    mount Avo::Engine, at: Avo.configuration.root_path
  end


  root "home#index"
  resources :articles, only: [:index, :show]
end

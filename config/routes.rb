Rails.application.routes.draw do
  root 'main#main'
  # root to: 'sessions#new'
  get 'auth/:provider/callback', to: 'sessions#create'
  get 'auth/failure', to: redirect('/')
  get 'signout', to: 'sessions#destroy', as: 'signout'

  resources :sessions, only: [:create, :destroy, :new]

  namespace :api, defaults: { format: :json } do
    resource :user, only: [:show]
    resources :pages
  end
end

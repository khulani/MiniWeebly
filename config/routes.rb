Rails.application.routes.draw do
  root 'main#main'
  # root to: 'sessions#new'
  resources :sessions, only: :index
  get "/auth/:provider/callback" => 'sessions#create'
end

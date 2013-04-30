Capcap::Application.routes.draw do
  root to: "static_pages#start_page"
  
  get "/login" => 'static_pages#sign_up'

  post '/guess' => 'static_pages#match_secret'
  
  resources :online_games
  
  resources :users do
    resources :online_games, only: :index
  end

  resources :secrets, only: :index
  
  resources :direct_messages
  
  resource :session, only: [:show, :create, :destroy]
  
  resources :chatrooms, only: :index
end
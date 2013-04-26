Capcap::Application.routes.draw do
  root to: "static_pages#home"

  post '/guess' => 'static_pages#match_secret'

  resources :secrets, only: :index
  
  resources :games
  resources :direct_messages
end
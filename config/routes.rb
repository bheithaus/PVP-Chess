Capcap::Application.routes.draw do
  devise_for :users, controllers: {
                              omniauth_callbacks: 'users/omniauth_callbacks',
                              registrations: 'registrations'
                              } do
      get '/sign_up' => 'registrations#new'
      post '/sign_up' => 'registrations#create'
  end
  # devise_scope :user do
  #   get '/sign_up' => 'registrations#new'
  #   post '/sign_up' => 'registrations#create'
  # end
  
  root to: "static_pages#start_page"
  
  post '/guess' => 'static_pages#match_secret'
  post '/pusher/auth' => 'pusher#auth'
  
  resources :online_games
  
  resources :users do
    resources :online_games, only: :index
  end
    
 # resource :session, only: [:show, :create, :destroy]
  
  resources :chatrooms, only: :index
end
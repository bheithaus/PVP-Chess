Capcap::Application.routes.draw do
  root to: "static_pages#start_page"
  
  devise_for :users, controllers: {
                              omniauth_callbacks: 'users/omniauth_callbacks',
                              registrations: 'registrations'
                              } do
      get '/sign_up' => 'registrations#new'
      post '/sign_up' => 'registrations#create'
      post '/guest_access' => 'registrations#create_guest'
  end
  
  post '/guess' => 'static_pages#match_secret'
  
  post '/pusher/auth' => 'pusher#auth'
  
  resources :online_games
  
  resources :users do
    resources :online_games, only: :index
  end
  
  resources :chatrooms, only: :index
end
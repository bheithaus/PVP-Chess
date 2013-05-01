require 'pusher'

class OnlineGamesController < ApplicationController
  respond_to :json
  
  def index
    user_id = params[:user_id]
    @online_games = OnlineGame.all
    
    render json: @online_games
  end
  
  def show
    @online_game = OnlineGame.find(params[:id])
    
    render json: @online_game
  end
  
  def create
    @online_game = OnlineGame.new_game(params[:online_game])
    if @online_game.save
      render json: @online_game
    else
      render json: @online_game.errors.full_messages, status: 422
    end
  end
  
  def update
    @online_game = OnlineGame.find(params[:id])
    @online_game.execute_move(params[:move])
    if @online_game.save
      Pusher.trigger("private-game-#{@online_game.id}", 'remote_update', @online_game)
    end

    render nothing: true

    # render json: @online_game
  end
  
  def destroy
    #might not implement this
  end
end

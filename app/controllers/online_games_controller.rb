require 'pusher'

class OnlineGamesController < ApplicationController
  respond_to :json
  
  def index
    id = params[:user_id]
    @online_games = OnlineGame.where("player_white_id = ? OR player_black_id = ?", id, id)
    
    render json: @online_games
  end
  
  def show
    @online_game = OnlineGame.find(params[:id])
    
    render json: @online_game
  end
  
  def create
    @online_game = OnlineGame.new_game(params[:online_game])
    if @online_game.save
      Pusher.trigger("private-user-#{@online_game.player_black_id}", "invited", @online_game);
      
      render json: @online_game
    else
      render json: @online_game.errors.full_messages, status: 422
    end
  end
  
  def update
    @online_game = OnlineGame.find(params[:id])
    
    begin
      @online_game.execute_move(params[:move])
    rescue Exception => e
      p "rescueing from exception"
      Pusher.trigger("private-game-#{@online_game.id}", 'remote_update_error', e.message)
    else
      p "turn"
      @online_game.turn
      
      if @online_game.save
        Pusher.trigger("private-game-#{@online_game.id}", 'remote_update', @online_game)
      end
    end
    
    render nothing: true

    # render json: @online_game
  end
  
  def destroy
    #might not implement this
  end
end

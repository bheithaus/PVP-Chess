class OnlineGamesController < ApplicationController
  respond_to :json
  
  def index
    @online_games = OnlineGame.all
    
    render json: @online_games
  end
  
  def show
    @online_game = OnlineGame.find(params[:id])
    
    render json: @online_game
    
    #pass game to client
  end
  
  def create
    @online_game = OnlineGame.new(params[:online_game])
    if @online_game.save
      render json: @online_game
    else
      render json: @online_game.errors.full_messages, status: 422
    end
    # make new board with player_white_id and player_black_id
    
    # save and give back to client
  end
  
  def update
    @online_game = OnlineGame.find(params[:id])
    
    @online_game.execute_move(params[:move])
    # takes three params ----( game_id, from, to)
    
    # find that game, move from and to! :)
    
    # return serialized updated game if success
    
    # else throw error
  end
  
  def destroy
    #might not implement this
  end
end

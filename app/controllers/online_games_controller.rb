class OnlineGamesController < ApplicationController
  respond_to :json
  
  def index
    user_id = params[:user_id]
    @online_games = OnlineGame.all#.where("player_black_id = ? OR player_white_id = ?", user_id, user_id)
    
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

    p @online_game
    @online_game.save
    render json: @online_game
    # takes three params ----( game_id, from, to)
    
    # find that game, move from and to! :)
    
    # return serialized updated game if success
    
    # else throw error
  end
  
  def destroy
    #might not implement this
  end
end

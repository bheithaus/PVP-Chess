class OnlineGamesController < ApplicationController
  def show
    #pass game to client
  end
  
  def create
    
    # make new board with player_white_id and player_black_id
    
    # save and give back to client
  end
  
  def update
    # takes three params ----( game_id, from, to)
    
    # find that game, move from and to! :)
    
    # return serialized updated game if success
    
    # else throw error
  end
  
  def destroy
    #might not implement this
  end
end

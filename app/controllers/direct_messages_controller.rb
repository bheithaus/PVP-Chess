class DirectMessagesController < ApplicationController
  def new
    #render a page to send a message to a user
  end
  
  def create
    # create new message with params of from_id / or current_user.id
    # route will specify to_id
    
  end
  
  def destroy
    #interesting question...might just keep all this data\
    
    # then allow user delete from their list
  end
end

class ChatroomsController < ApplicationController
  before_filter :signed_in_user?

  respond_to :json
  
  def index
    @chatrooms = ChatRoom.all
    
    render json: @chatrooms
  end  
end

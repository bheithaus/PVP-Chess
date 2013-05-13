class PusherController < ApplicationController
  protect_from_forgery :except => :auth
  
  def auth
    user = current_or_guest_user
     if user
       response = Pusher[params[:channel_name]].authenticate(params[:socket_id], {
        :user_id => user.id, # => required
        :user_info => { # => optional - for example
          :email => user.email
        }
       })
       render json: response
     else
       render :text => "Forbidden", :status => '403'
     end
  end
end

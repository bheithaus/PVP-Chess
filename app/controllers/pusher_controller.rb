class PusherController < ApplicationController
  protect_from_forgery :except => :auth
  
  def auth
     if current_user
       response = Pusher[params[:channel_name]].authenticate(params[:socket_id], {
        :user_id => current_user.id, # => required
        :user_info => { # => optional - for example
          :email => current_user.email
        }
       })
       render json: response
     else
       render :text => "Forbidden", :status => '403'
     end
  end
end

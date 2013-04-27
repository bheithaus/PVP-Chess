require 'pusher'

Pusher.app_id = '42733'
Pusher.key = '2bfd0a96d75cfe730e81'
Pusher.secret = '5d3b9ffcab1dfe555b48'

class SessionsController < ApplicationController
  before_filter :signed_in_user?, only: :destroy
  
  respond_to :json, :html
  
  def new

  end
  
  def create
    Pusher['my-channel'].trigger('my-event', message: 'hello world')
    
    @user = User.find_by_username(params[:username])
    
    sign_in @user
    render json: @user
  end
  
  def destroy
    sign_out
    render json: {}
  end
end

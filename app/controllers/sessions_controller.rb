require 'pusher'

class SessionsController < ApplicationController
  # before_filter :signed_in_user?, only: :destroy
#   
#   respond_to :json, :html
#   
#   def new
# 
#   end
#   
#   def create
#     Pusher['my-channel'].trigger('my-event', message: 'hello world')
#     
#     @user = User.find_by_username(params[:username])
#     
#     sign_in @user
#     render json: @user
#   end
#   
#   def destroy
#     sign_out
#     render json: {}
#   end
end
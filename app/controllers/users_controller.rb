class UsersController < ApplicationController
  respond_to :json
  
  def new
    @user = User.new
    
    render json: @user
  end
  
  def create
    @user = User.new(params[:user])
    
    if @user.save
      render json: @user
    else
      render json: @user.errors.full_messages, status: 422
    end
  end
  
  def edit
    
  end
  
  def update
    
  end
  
  
end

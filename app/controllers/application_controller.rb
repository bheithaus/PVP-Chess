class ApplicationController < ActionController::Base
  before_filter :signed_in?
  
  protect_from_forgery
  
  private 
  
  def signed_in?
    redirect_to new_user_session_url unless user_signed_in? || self.class == Devise::SessionsController || self.class == Devise::RegistrationsController
  end
end

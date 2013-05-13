class ApplicationController < ActionController::Base
  before_filter :signed_in?
  helper_method :current_or_guest_user
  
  protect_from_forgery
  
  # if user is logged in, return current_user, else return guest_user
  def current_or_guest_user
    if current_user
      if session[:guest_user_id]
        logging_in
        guest_user.destroy
        session[:guest_user_id] = nil
      end
      current_user
    else
      guest_user
    end
  end

  # find guest_user object associated with the current session,
  # creating one as needed
  def guest_user
    # Cache the value the first time it's gotten.
    @cached_guest_user ||= User.find(session[:guest_user_id])

  rescue ActiveRecord::RecordNotFound # if session[:guest_user_id] invalid
     session[:guest_user_id] = nil
     guest_user
  end  
  
  def create_guest_user
    u = User.create(:email => "guest_#{Time.now.to_i}#{rand(99)}@example.com")
    u.save!(:validate => false)
    session[:guest_user_id] = u.id
    u
  end
  
  private 
  
    # called (once) when the user logs in, insert any code your application needs
    # to hand off from guest_user to current_user.
    def logging_in
      # For example:
      # guest_comments = guest_user.comments.all
      # guest_comments.each do |comment|
        # comment.user_id = current_user.id
        # comment.save!
      # end
    end
  
    def signed_in?
      redirect_to new_user_session_url unless user_signed_in? || session[:guest_user_id] ||
                                              self.class == Devise::SessionsController ||
                                              self.class == Devise::RegistrationsController ||
                                              self.class == Users::OmniauthCallbacksController ||
                                              self.class == Devise::PasswordsController ||
                                              self.class == RegistrationsController
    end
end

module SessionsHelper
  
  def sign_in(user)
    cookies[:username] = user.username
  end
  
  def sign_out
    cookies.delete(:username)
  end
  
  def current_user
    @current_user ||= User.find_by_username(cookies[:username])
  end
  
private  
  def signed_in_user?
    if !current_user
      redirect_to root_path
    end
  end
end

class RegistrationsController < Devise::RegistrationsController
  include StaticPagesHelper

  def create_guest
    create_guest_user
    redirect_to root_url
  end

  def new
    make_secret
    
    super
  end
  
  def create
    build_resource
    
    if matched_secret?
      super
    else
      set_flash_message :notice, :update_needs_confirmation
      clean_up_passwords resource
      
      make_secret
      
      
      render :new
    end
  end
  
  private
  def make_secret
    choices = File.readlines("app/assets/images/dict.txt")
    word = choices[rand(choices.length)].chomp
    client_ip = request.remote_ip
    cap = Captcha.find_by_client_ip(client_ip)

    unless (cap)
      Captcha.create(client_ip:client_ip, secret: word)
    else
      cap.update_attributes(secret: word)
    end
    
    @obfuscated_word = obfusc(word, 1)
  end
  
  def matched_secret?
    client_ip = request.remote_ip
    cap = Captcha.find_by_client_ip(client_ip)
    cap.secret == params[:guess].downcase
  end
end
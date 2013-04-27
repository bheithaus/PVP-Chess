class StaticPagesController < ApplicationController
  respond_to :json, :html
  include StaticPagesHelper

  def sign_up
    
    choices = File.readlines("app/assets/images/dict.txt")
    word = choices[rand(choices.length)].chomp
    client_ip = request.remote_ip
    cap = Captcha.find_by_client_ip(client_ip)

    unless (cap)
      Captcha.create(client_ip:client_ip, secret: word)
    else
      cap.update_attributes(secret: word)
    end
    @unified_word = obfusc(word, 1)
  end
  
  def start_page
    
  end

  def match_secret
    client_ip = request.remote_ip

    cap = Captcha.find_by_client_ip(client_ip)
    if cap.secret == params[:guess]
      render json: {}
    else
      render json: { error: "no that is not quite it" }, status: 422
    end
  end
end

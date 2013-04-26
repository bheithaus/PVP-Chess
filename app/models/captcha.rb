class Captcha < ActiveRecord::Base
  attr_accessible :client_ip, :secret
end

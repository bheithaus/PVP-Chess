class User < ActiveRecord::Base
  attr_accessible :fname, :lname, :username, :email, :birth_date
  
  validates :fname, :lname, :username, :email, presence: true
end

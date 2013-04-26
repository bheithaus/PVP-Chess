class DirectMessage < ActiveRecord::Base
  attr_accessible :parent_message, :body
  
  validates :from_id, :to_id, presence: true
end

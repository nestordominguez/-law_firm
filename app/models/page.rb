class Page < ActiveRecord::Base
  extend FriendlyId
  friendly_id :link, use: :slugged
  validates :link, :title, :content, :presence => true
  validates :link, :uniqueness   =>  true
end

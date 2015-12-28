class Page < ActiveRecord::Base
  extend FriendlyId
  friendly_id :link, use: :slugged
  validates :link, :title, :content, :priority, :presence => true
  validates :link, :uniqueness   =>  true
  before_create :search_priority_free

  private

  def search_priority_free
    page = Page.find_by_priority(priority)
    if page
      pages = Page.all
      (pages.count + 1).times do |n|
        if !pages.find_by_priority(n) #&& priority <= pages.count +1
          page.priority = n
          page.save
        end
      end
    end
    true
  end
end

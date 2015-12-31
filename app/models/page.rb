class Page < ActiveRecord::Base
  extend FriendlyId
  friendly_id :link, use: :slugged
  validates :link, :title, :content, :priority, :presence => true
  validates :link, :uniqueness   =>  true
  before_create :validate_priority
  before_update :change_priority_between_object #solve this when the view its ready

  private

  def validate_priority
    return true unless page = Page.find_by_priority(priority)
    switch_priority_to(page)
  end

  def switch_priority_to(page)
    return false if priority < Page.all.count  && priority > 0
    available_priorities = (1..500).to_a - Page.pluck(:priority)
    page.update_column(:priority, available_priorities.first)
  end

  def change_priority_between_object
    return false if priority > Page.all.count && priority > 0
    change_priority
  end
  def change_priority
    new_priority = Page.find(id).priority
    page = Page.find_by_priority(priority)
    page.update_column(:priority, new_priority)
  end
end

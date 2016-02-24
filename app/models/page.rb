class Page < ActiveRecord::Base
  extend FriendlyId
  friendly_id :link, use: :slugged
  validates :link, :title, :content, :priority, :presence => true
  validates :link, :uniqueness   =>  true
  before_create :include_in_range_for_create, :check_if_there_are_15_rows_or_less, :validate_priority
  before_update :include_in_range_for_update, :change_priority_between_object
  after_destroy :change_priority_to_all

  private

  def check_if_there_are_15_rows_or_less
    Page.all.count < 15
  end

  def validate_priority
    return true unless page = Page.find_by_priority(priority)
    switch_priority_to(page)
  end

  def switch_priority_to(page)
    available_priorities = (1..15).to_a - Page.pluck(:priority)
    page.update_column(:priority, available_priorities.first)
  end

  def include_in_range_for_create
    priority > 0 && priority <= Page.all.count + 1
  end

  def include_in_range_for_update
    Page.pluck(:priority).include?(priority)
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

  def change_priority_to_all
    all_priority = Page.pluck(:priority)
    count = Page.all.count
    priority = 1
    test = false
    count.times do |x|
      if !all_priority.include?(x + 1)
        priority = x + 1
        test = true
      end
    end
    if !test
      priority = all_priority.max
    end
    unless priority == all_priority.max
      pages_to_change = Page.where(priority: priority..count+1)
      pages_to_change.each do |page|
        new_priority = page.priority - 1
        page.update_columns(priority: new_priority)
      end
    end
    return true
  end

end

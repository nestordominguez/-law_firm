class Page < ActiveRecord::Base
  extend FriendlyId
  friendly_id :link, use: :slugged
  validates :link, :title, :content, :priority, :presence => true
  validates :link, :uniqueness   =>  true
  before_create :include_in_range_for_create, :check_if_there_are_7_rows_or_less, :validate_priority
  before_update :include_in_range_for_update, :change_priority_between_object
  after_destroy :change_priority_to_all

  private

  def check_if_there_are_7_rows_or_less
    return true if Page.all.count < 7
    error_message("not_created")
    return false
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
    return true if priority > 0 && priority <= Page.all.count + 1
    error_message("out_of_range")
    return false
  end

  def error_message(type)
    case type
    when "not_created"
      msj = "no se puede crear mas de 7 páginas"
    when "out_of_range"
      msj = "esta fuera de rango la prioridad"
    end
    errors.add(:base, msj)
  end

  def include_in_range_for_update
    return true if Page.pluck(:priority).include?(priority)
    error_message("out_of_range")
    return false
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
    run_change(search_priority, count, all_priority)
  end

  def all_priority
    Page.pluck(:priority)
  end

  def count
    all_priority.count
  end

  def run_change(priority, cuantity, list_priority)
    unless priority == list_priority.max
      pages_to_change(priority, cuantity).each do |page|
        new_priority = page.priority - 1
        page.update_columns(priority: new_priority)
      end
    end
  end

  def pages_to_change(priority, cuantity)
    Page.where(priority: priority..cuantity+1)
  end

  def search_priority
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
    return priority
  end
end

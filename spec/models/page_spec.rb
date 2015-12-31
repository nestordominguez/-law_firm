require 'rails_helper'
require 'database_cleaner'

DatabaseCleaner.strategy = :truncation
RSpec.describe Page, type: :model do

  context "should not be saved" do
    it "without any info" do
      page = Page.create
      page.should_not be_valid
    end
    it "without link" do
      page = Page.create(title: "title", content: "content", priority: 1)
      page.should_not be_valid
    end
    it "without content" do
      page = Page.create(title: "title", link: "link", priority: 1)
      page.should_not be_valid
    end
    it "without title" do
      page = Page.create(link: "link", content: "content", priority: 1)
      page.should_not be_valid
    end
    it "without priority" do
      page = Page.create(title: "title", content: "content", link: "link")
      page.should_not be_valid
    end
    it "whit a link that exist" do
      page = Page.create(link: "link", title: "title", content: "content", priority: 1)
      page_not_saved = Page.create(link: "link", title: "title", content: "content", priority: 1)
      page_not_saved.should_not be_valid
    end
  end

  context "whould update" do
    it "if priority of the page change between they" do
      DatabaseCleaner.clean
      page_one = Page.create(link: "first", title: "title", content: "content", priority: 1)
      page_two = Page.create(link: "second", title: "title", content: "content", priority: 2)
      page_one.priority = 2
      page_one.save
      page_two = Page.find_by(link: "second")
      page_two.priority.should == 1
    end
  end

  context "should be saved" do
    DatabaseCleaner.clean
    it "whit all params" do
      page = Page.create(link: "link", title: "title", content: "content", priority: 1)
      page.should be_valid
    end
  end
end

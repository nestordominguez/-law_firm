require 'rails_helper'
require 'database_cleaner'

describe Page do

  context "should not be saved" do
    it "without any info" do
      page = Page.create
      expect(Page.all).to be_empty
    end
    it "without link" do
      page = Page.create(title: "title", content: "content", priority: 1)
      expect(Page.all).to be_empty
    end
    it "without content" do
      page = Page.create(title: "title", link: "link", priority: 1)
      expect(Page.all).to be_empty
    end
    it "without title" do
      page = Page.create(link: "link", content: "content", priority: 1)
      expect(Page.all).to be_empty
    end
    it "without priority" do
      page = Page.create(title: "title", content: "content", link: "link")
      expect(Page.all).to be_empty
    end
    it "with a link that exist" do
      page = create(:page)
      page_not_saved = Page.create(link: "link",
        title: "title",
        content: "content",
        priority: 2)
      expect(Page.all.count).to eq(1)
    end
    it "with a priority lower than 1" do
      page = Page.create(link: "first",
        title: "title", content:
        "content", priority: 0)
      expect(Page.all).to be_empty
    end
    it "with a priority higher than the cuantity of rows plus 1" do
      create(:page)
      page = build(:page)
      page.priority = 3
      page.link = "link1"
      page.save
      expect(Page.all.count).to eq(1)
    end
    it "if there are higher than 15 rows in db" do
      16.times do |n|
        Page.create(link: "#{n}",
          title: "title",
          content: "content",
          priority: n + 1 )
      end
      expect(Page.all.count).to eq(15)
    end
  end

  context "should be saved" do
    it "with all params" do
      create(:page)
      expect(Page.all).not_to be_empty
    end
    it "with a priority in range and not is in db" do
      create(:page)
      Page.create(link: "link1",
        title: "title",
        content: "content",
        priority: 2)
      expect(Page.all.count).to eq(2)
    end
    it "with a priority in range and is in db" do
      create(:page)
      Page.create(link: "link1",
        title: "title",
        content: "content",
        priority: 1)
      expect(Page.find(1).priority).to eq(2)
      expect(Page.find(2).priority).to eq(1)
    end
    it "if there are less than 15 rows" do
      15.times do |n|
        Page.create(link: "#{n}",
          title: "title",
          content: "content",
          priority: n + 1 )
      end
      expect(Page.all.count).to eq(15)
    end

  end

  context "whould not update" do
    before {create(:page)}
    it "if priority are lower than 1" do
      page = Page.find(1)
      page.priority = 0
      expect(page.save).to be false
    end
    it "if priority are out of de range" do
      Page.create(link: "link2",
        title: "title",
        content: "content",
        priority: 2)
      page = Page.find(1)
      page.priority = 3
      page.save
      expect(Page.find(1).priority).to eq(1)
      expect(Page.find(2).priority).to eq(2)
      page.priority = 0
      page.save
      expect(Page.find(1).priority).to eq(1)
      expect(Page.find(2).priority).to eq(2)
    end
  end

  context "whould update" do
    it "if priority of the page change between they" do
      create(:page)
      Page.create(link: "second",
        title: "title",
        content: "content",
        priority: 2)
      page = Page.find(1)
      page.priority = 2
      page.save
      expect(Page.find(1).priority).to eq(2)
      expect(Page.find(2).priority).to eq(1)
    end
  end
end

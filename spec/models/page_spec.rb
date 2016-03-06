require 'rails_helper'
require 'database_cleaner'

describe Page do

  context "when not be saved" do
    it "without any info" do
      page = Page.create
      expect(Page.all).to be_empty
    end

    it "without link" do
      page = build(:page, link: "").save
      expect(Page.all).to be_empty
    end

    it "without content" do
      page = build(:page, content: "").save
      expect(Page.all).to be_empty
    end

    it "without title" do
      page = build(:page, title: "").save
      expect(Page.all).to be_empty
    end

    it "without priority" do
      page = build(:page, priority: "").save
      expect(Page.all).to be_empty
    end

    it "with a link that exist" do
      page = create(:page)
      page_not_saved = build(:page, priority: 2).save
      expect(Page.all.count).to eq(1)
    end

    it "with a priority 0" do
      page = build(:page, priority: 0).save
      expect(Page.all).to be_empty
    end

    it "with a priority higher than the cuantity of rows plus 1" do
      create(:page)
      page = build(:page, link: "link1", priority: 3).save
      expect(Page.all.count).to eq(1)
    end

    it "there are higher than 7 rows in db" do
      8.times {|n| build(:page, link: "#{n}", priority: "#{n +1}").save}
      expect(Page.all.count).to eq(7)
    end
  end

  context "when be saved" do
    it "with all params" do
      expect(Page.all).to be_empty
      create(:page)
      expect(Page.all).not_to be_empty
    end

    it "with a priority in range and not is in db" do
      create(:page)
      build(:page, link: "link1", priority: 2).save
      expect(Page.all.count).to eq(2)
    end

    it "with a priority that is in db" do
      create(:page)
      build(:page, link: "link1").save
      expect(Page.find(1).priority).to eq(2)
      expect(Page.find(2).priority).to eq(1)
    end

    it "there are less than 7 rows" do
      7.times {|n| build(:page, link: "#{n}", priority: "#{n +1}").save}
      expect(Page.all.count).to eq(7)
    end

  end

  context "whould not update" do

    before {create(:page)}

    it "priority are lower than 1" do
      page = Page.find(1)
      page.priority = 0
      expect(page.save).to be false
    end

    it "priority are haigher of the range" do
      page = Page.find(1)
      page.priority = 2
      page.save
      expect(Page.find(1).priority).to eq(1)
    end
  end

  context "whould update" do
    it "if priority of the page change between they" do
      create(:page)
      build(:page, link: "link1", priority: 2).save
      page = Page.find(1)
      page.priority = 2
      page.save
      expect(Page.find(1).priority).to eq(2)
      expect(Page.find(2).priority).to eq(1)
    end
  end
end

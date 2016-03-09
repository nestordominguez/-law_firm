require 'rails_helper'
require 'database_cleaner'

describe User do
  context "when create first user" do
    it "have role equal 3" do
      user = FactoryGirl.create(:user)
      expect(user.role).to eq 3
    end
  end

  context "when exist user" do
    it "have role 1 by default" do
      admin = FactoryGirl.create(:admin)
      user = FactoryGirl.create(:user)
      expect(user.role).to eq 1
    end
  end

  context "when destroy admin" do
    it "not have permission" do
      admin = FactoryGirl.create(:admin)
      expect(admin.destroy).to be false
    end
  end

  context "when want quit admin access" do
    it "not have permission" do
      admin = FactoryGirl.create(:admin)
      admin.role = 1
      expect(admin.save).to be false
    end
  end
end

require 'rails_helper'

describe Staff do
  context "when presence is invalid" do

    it "not have names" do
      invalid = FactoryGirl.build(:staff, names: "")
      expect(invalid).to_not be_valid
    end

    it "not have last name" do
      invalid = FactoryGirl.build(:staff, last_name: "")
      expect(invalid).to_not be_valid
    end

    it "not have last name" do
      invalid = FactoryGirl.build(:staff, email: "")
      expect(invalid).to_not be_valid
    end

    it "not have last name" do
      invalid = FactoryGirl.build(:staff, phone: "")
      expect(invalid).to_not be_valid
    end

    it "not have last name" do
      invalid = FactoryGirl.build(:staff, cel: "")
      expect(invalid).to_not be_valid
    end

    it "not have last name" do
      invalid = FactoryGirl.build(:staff, cv: "")
      expect(invalid).to_not be_valid
    end
  end

  context "when presence is valid" do
    it "not have last name" do
      invalid = FactoryGirl.build(:staff)
      expect(invalid).to be_valid
    end
  end

  context "when has invalid phone" do

    it "have less than 9 number" do
      invalid = FactoryGirl.build(:staff, phone: "123456789")
      expect(invalid).to_not be_valid
    end

    it "have char -" do
      invalid = FactoryGirl.build(:staff, phone: "123-456789")
      expect(invalid).to_not be_valid
    end

    it "have more than 11 numbers" do
      invalid = FactoryGirl.build(:staff, phone: "12345678901")
      expect(invalid).to_not be_valid
    end
  end

  context "when has valid phone" do

    it "have 10 numbers without -" do
      valid = FactoryGirl.build(:staff, phone: "1234567890")
      expect(valid).to be_valid
    end
  end

  context "when has invalid cel" do

    it "have less than 9 number" do
      invalid = FactoryGirl.build(:staff, cel: "123456789")
      expect(invalid).to_not be_valid
    end

    it "have char -" do
      invalid = FactoryGirl.build(:staff, cel: "123-456789")
      expect(invalid).to_not be_valid
    end

    it "have more than 11 numbers" do
      invalid = FactoryGirl.build(:staff, cel: "12345678901")
      expect(invalid).to_not be_valid
    end
  end

  context "when has valid cel" do

    it "have 10 numbers without -" do
      valid = FactoryGirl.build(:staff, cel: "1234567890")
      expect(valid).to be_valid
    end
  end

    context "when email is invalid" do

    it "not have @" do
      invalid = FactoryGirl.build(:staff, email: "oscathotmail.com")
      expect(invalid).to_not be_valid
    end

    it "not have ." do
      invalid = FactoryGirl.build(:staff, email: "oscat@hotmailcom")
      expect(invalid).to_not be_valid
    end
  end

  context "when email is valid" do

    it "have @" do
      invalid = FactoryGirl.build(:staff, email: "oscat@hotmail.com")
      expect(invalid).to be_valid
    end

    it "have more than 1 '.'" do
      invalid = FactoryGirl.build(:staff, email: "oscat@hotmail.com.ar")
      expect(invalid).to be_valid
    end

    it "have '.' in name" do
      invalid = FactoryGirl.build(:staff, email: "osc.at@hotmail.com.ar")
      expect(invalid).to be_valid
    end

    it "have '-' in name" do
      invalid = FactoryGirl.build(:staff, email: "osc-at@hotmail.com.ar")
      expect(invalid).to be_valid
    end
  end
end

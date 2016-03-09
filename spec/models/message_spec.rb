require 'rails_helper'
require 'spec_helper'
require 'database_cleaner'

describe Message do
  context "when valid presence" do

    it "have valid params" do
      valid = FactoryGirl.build(:message)
      expect(valid).to be_valid
    end
  end

  context "when invalid presence" do

    it "not have name params" do
      invalid = FactoryGirl.build(:message, name: "")
      expect(invalid).to_not be_valid
    end

    it "not have email params" do
      invalid = FactoryGirl.build(:message, email: "")
      expect(invalid).to_not be_valid
    end

    it "not have phone params" do
      invalid = FactoryGirl.build(:message, phone: "")
      expect(invalid).to_not be_valid
    end

    it "not have content params" do
      invalid = FactoryGirl.build(:message, content: "")
      expect(invalid).to_not be_valid
    end
  end

  context "when invalid length name" do

    it "have higher than 15 char" do
      invalid = FactoryGirl.build(:message, name: "adasdasdasdasdaa")
      expect(invalid).to_not be_valid
    end

    it "have lower than 3 char" do
      invalid = FactoryGirl.build(:message, name: "ad")
      expect(invalid).to_not be_valid
    end
  end

  context "when is valid length name" do

    it "have less or eq than 15 char" do
      valid = FactoryGirl.build(:message, name: "adasdasdasdasda")
      expect(valid).to be_valid
    end

    it "have higher or eq than 3 char" do
      valid = FactoryGirl.build(:message, name: "ada")
      expect(valid).to be_valid
    end
  end

  context "when has invalid phone" do

    it "have less than 9 number" do
      invalid = FactoryGirl.build(:message, phone: "123456789")
      expect(invalid).to_not be_valid
    end

    it "have char -" do
      invalid = FactoryGirl.build(:message, phone: "123-456789")
      expect(invalid).to_not be_valid
    end

    it "have more than 11 numbers" do
      invalid = FactoryGirl.build(:message, phone: "12345678901")
      expect(invalid).to_not be_valid
    end
  end

  context "when has valid phone" do

    it "have 10 numbers without -" do
      valid = FactoryGirl.build(:message, phone: "1234567890")
      expect(valid).to be_valid
    end
  end

  context "when email is invalid" do

    it "not have @" do
      invalid = FactoryGirl.build(:message, email: "oscathotmail.com")
      expect(invalid).to_not be_valid
    end

    it "not have ." do
      invalid = FactoryGirl.build(:message, email: "oscat@hotmailcom")
      expect(invalid).to_not be_valid
    end
  end

  context "when email is valid" do

    it "have @" do
      invalid = FactoryGirl.build(:message, email: "oscat@hotmail.com")
      expect(invalid).to be_valid
    end

    it "have more than 1 '.'" do
      invalid = FactoryGirl.build(:message, email: "oscat@hotmail.com.ar")
      expect(invalid).to be_valid
    end

    it "have '.' in name" do
      invalid = FactoryGirl.build(:message, email: "osc.at@hotmail.com.ar")
      expect(invalid).to be_valid
    end

    it "have '-' in name" do
      invalid = FactoryGirl.build(:message, email: "osc-at@hotmail.com.ar")
      expect(invalid).to be_valid
    end
  end

  context "when content is invalid" do

    it "have more than 500 chars" do
      text = "t" * 501
      invalid = FactoryGirl.build(:message, content: text)
      expect(invalid).to_not be_valid
    end
  end

  context "when content is valid" do
    it "have less than 500 chars" do
      text = "t" * 500
      valid = FactoryGirl.build(:message, content: text)
      expect(valid).to be_valid
    end
  end
end

require 'rails_helper'

RSpec.describe Api::V1::PagesController, type: :controller do
  describe "GET show" do
    before { @page = create(:page)}
    before { get :show, id: @page.link, format: :json }
    it "has a 200 status code" do
      expect(response.status).to eq(200)
    end
    it "respond with json" do
      expect(response.content_type).to eq("application/json")
    end
  end
  describe "GET index" do
    it "has a 200 status code" do
      get :index, format: :json
      expect(response.status).to eq 200
    end
  end
end

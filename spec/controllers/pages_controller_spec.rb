require 'rails_helper'

RSpec.describe Api::V1::PagesController, type: :controller do

  describe "GET index" do
    before { get :index, format: :json}

    it "respond with a 200 status code" do
      expect(response.status).to eq 200
    end

    it {expect(response.content_type).to eq("application/json")}
  end

  describe "action show" do
    subject {create(:page)}

    before { get :show, id: subject.link, format: :json }

    it "respond with a 200 status code" do
      expect(response.status).to eq(200)
    end

    it {expect(response.content_type).to eq("application/json")}
  end

  describe "action create" do
    context "when has valid parameters" do
      it "add a new row to db" do
        post :create, :page => attributes_for(:page), format: :json
        expect(Page.all.count).to eq 1
      end
    end

    context "when has invalid parameters" do
      let(:page) {{link: "asd", title: "asd", content: "asd", priority: 0}}

      before(:each) do
        post :create, :page => page, format: :json
      end

      it "priority higher than 1" do
        expect(Page.all.count).to eq 0
      end

      it "have status 422" do
        expect(response).to have_http_status(422)
      end
    end
  end

  describe "action edit" do
    let(:page) {create(:page)}

    before(:each) {get :edit, id: page.id, format: :json}

    it "finds a specific page" do
      expect(assigns(:page)).to eq(page)
    end

    it {expect(response.content_type).to eq("application/json")}
  end

  describe "action update" do
    subject {create(:page)}

    context "when has a valid attr" do
      let(:page) {{title: "hola", content: "asdd"}}

      before(:each) do
        put :update, id: subject.id, page: page, format: :json
        subject.reload
      end

      it "have status 200" do
        expect(response).to have_http_status(:ok)
      end

      it "have new title" do
        expect(subject.title).to eq("hola")
      end
    end

    context "when has not valid attr" do
      let(:low_priority) {{ priority: 0}}

      before(:each) do
        put :update, id: subject.id, page: low_priority, format: :json
        subject.reload
      end

      it "have status unprocessable entity" do
        expect(response.status).to eq(422)
      end

      it "have old priority" do
        expect(subject.priority).to eq(1)
      end
    end
  end
end

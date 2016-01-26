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
      let(:valid_page) {{link: "asd", title: "asd", content: "asd", priority: 1}}

      before(:each) do
        post :create, :page => valid_page, format: :json
      end

      it "add a new row to db" do
        expect(Page.all.count).to eq 1
      end

      it "have status 201" do
        expect(response).to have_http_status(201)
      end

      it {expect(response.content_type).to eq("application/json")}
    end

    context "when has invalid parameters" do
      let(:invalid_page) {{link: "asd", title: "asd", content: "asd", priority: 0}}

      before(:each) do
        post :create, :page => invalid_page, format: :json
      end

      it "not add a new row to db" do
        expect(Page.all.count).to eq 0
      end

      it "have status 422" do
        expect(response).to have_http_status(422)
      end

      it {expect(response.content_type).to eq("application/json")}
    end
  end

  describe "action edit" do
    let(:page) {create(:page)}

    before(:each) {get :edit, id: page.id, format: :json}

    it "finds a specific page" do
      expect(assigns(:page)).to eq(page)
    end

    it "have status 200" do
      expect(response).to have_http_status(200)
    end

    it {expect(response.content_type).to eq("application/json")}
  end

  describe "action update" do
    subject {create(:page)}

    context "when has a valid attr" do
      let(:valid_attr_page) {{title: "hola", content: "asdd"}}

      before(:each) do
        put :update, id: subject.id, page: valid_attr_page, format: :json
        subject.reload
      end

      it "have status 200" do
        expect(response).to have_http_status(200)
      end

      it "have new title hola" do
        expect(subject.title).to eq("hola")
      end

      it {expect(response.content_type).to eq("application/json")}
    end

    #preguntar si se debe testear todas las posibilidades
    context "when has not valid attr" do
      let(:low_priority) {{ priority: 0}}

      before(:each) do
        put :update, id: subject.id, page: low_priority, format: :json
        subject.reload
      end

      it "have status unprocessable entity 422" do
        expect(response.status).to eq(422)
      end

      it "have old priority 1" do
        expect(subject.priority).to eq(1)
      end

      it {expect(response.content_type).to eq("application/json")}
    end
  end

  describe "action destroy" do
    subject {create(:page)}

    before do
      delete :destroy, id: subject.id, format: :json
    end

    it "have status 204" do
      expect(response.status).to eq 204
    end
  end
end

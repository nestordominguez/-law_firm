require 'rails_helper'
RSpec.describe Api::V1::MessagesController, type: :controller do
  describe "GET action #index" do
    context "when admin is loged" do
      login_admin
      before { get :index, format: :json}

      it "respond with a 200 status code" do
        expect(response.status).to eq 200
      end

      it {expect(response.content_type).to eq("application/json")}
    end

    context "when user is loged" do
      login_user
      before { get :index, format: :json}

      it "respond with a 403 status code" do
        expect(response.status).to eq 403
      end

      it {expect(response.content_type).to eq("application/json")}
    end

    context "when there is not user loged" do
      before { get :index, format: :json}

      it "respond with a 401 status code" do
        expect(response.status).to eq 401
      end

      it {expect(response.content_type).to eq("application/json; charset=utf-8")}
    end
  end

  describe "Get action #show" do
    subject {create(:message)}

    context "when admin is loged" do
      login_admin

      before { get :show, id: subject.id, format: :json}

      it "respond with a 200 status code" do
        expect(response.status).to eq 200
      end

      it {expect(response.content_type).to eq("application/json")}
    end

    context "when user is loged" do
      login_user

      before { get :show, id: subject.id, format: :json}

      it "respond with a 403 status code" do
        expect(response.status).to eq 403
      end

      it {expect(response.content_type).to eq("application/json")}
    end

    context "when user is loged" do

      before { get :show, id: subject.id, format: :json}

      it "respond with a 401 status code" do
        expect(response.status).to eq 401
      end

      it {expect(response.content_type).to eq("application/json; charset=utf-8")}
    end
  end

  describe "Post #create" do
    let(:valid_message) {{
      name: "Oscar",
      email: Faker::Internet.email,
      phone: "3814327271",
      content: Lorem::Base.new('characters', 120).output}}
    let(:invalid_message) {{
      name: "",
      email: Faker::Internet.email,
      phone: "3814327271",
      content: Lorem::Base.new('characters', 120).output}}


    context "when admin is loged" do
      login_admin

      before { post :create, :message => valid_message, format: :json}

      it "respond with a 201 status code create" do
        expect(response.status).to eq 201
      end

      it {expect(response.content_type).to eq("application/json")}
    end

    context "when admin is loged and attr are incorrect" do
      login_admin

      before { post :create, :message => invalid_message, format: :json}

      it "respond with a 422 status code create" do
        expect(response.status).to eq 422
      end

      it {expect(response.content_type).to eq("application/json")}
    end

    context "when user is loged" do
      login_user

      before { post :create, :message => valid_message, format: :json}

      it "respond with a 201 status code create" do
        expect(response.status).to eq 201
      end

      it {expect(response.content_type).to eq("application/json")}
    end

    context "when there is't loged" do
      before { post :create, :message => valid_message, format: :json}

      it "respond with a 201 status code create" do
        expect(response.status).to eq 201
      end

      it {expect(response.content_type).to eq("application/json")}
    end
  end

  describe "action #destroy" do
    subject {create(:message)}

    context "when admin is loged" do
      login_admin

      before { delete :destroy, id: subject.id, format: :json }

      it "have status 204" do
        expect(response.status).to eq 204
      end

      it {expect(response.content_type).to eq("application/json")}
    end

    context "when user is loged" do
      login_user

      before { delete :destroy, id: subject.id, format: :json }

      it "have status 403" do
        expect(response.status).to eq 403
      end

      it {expect(response.content_type).to eq("application/json")}
    end

    context "when there is't user loged" do
      before { delete :destroy, id: subject.id, format: :json }

      it "have status 401" do
        expect(response.status).to eq 401
      end

      it {expect(response.content_type).to eq("application/json; charset=utf-8")}
    end
  end
end

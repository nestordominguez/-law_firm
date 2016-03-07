require 'rails_helper'
RSpec.describe Api::V1::UsersController, type: :controller do
  describe "action #index" do
    subject {create(:user)}

    context "when admin is loged" do
      login_admin

      before { get :index, format: :json}

      it "have access" do
        expect(response).to have_http_status(200)
      end

      it {expect(response.content_type).to eq("application/json")}
    end

    context "when user is loged" do
      login_user

      before { get :index, format: :json}

      it "not have permission" do
        expect(response).to have_http_status(403)
      end

      it {expect(response.content_type).to eq("application/json")}
    end

    context "when user is not loged" do

      before { get :index, format: :json}

      it "not have permission" do
        expect(response).to have_http_status(401)
      end

      it {expect(response.content_type).to eq("application/json; charset=utf-8")}
    end
  end

  describe "action show" do
    subject {create(:user)}

    context "when admin is loged" do
      login_admin

      before { get :show, id: subject.id, format: :json}

      it "have access" do
        expect(response).to have_http_status 200
      end

      it {expect(response.content_type).to eq("application/json")}
    end

    context "when user is loged" do
      login_user

      before { get :show, id: 1, format: :json}

      it "not have permission" do
        expect(response).to have_http_status 403
      end

      it {expect(response.content_type).to eq("application/json")}
    end

    context "when user is not loged" do

      before { get :show, id: subject.id, format: :json}

      it "not have authorization" do
        expect(response).to have_http_status 401
      end

      it {expect(response.content_type).to eq("application/json; charset=utf-8")}
    end
  end

  describe "action #update" do
    subject {create(:user)}

    context "when admin is loged" do
      login_admin
      let(:valid_user) {{role: 2}}

      before { put :update, id: 1, user: valid_user, format: :json }

      it "have access" do
        expect(response).to have_http_status 200
      end

      it {expect(response.content_type).to eq("application/json")}
    end

    context "when user is loged" do
      login_user

      before { put :update, id: 1, format: :json}

      it "not have permission" do
        expect(response).to have_http_status 403
      end

      it {expect(response.content_type).to eq("application/json")}
    end

    context "when user is not loged" do

      before { put :update, id: subject.id, format: :json}

      it "not have authorization" do
        expect(response).to have_http_status 401
      end

      it {expect(response.content_type).to eq("application/json; charset=utf-8")}
    end
  end

  describe "action #destroy" do
    subject {create(:user)}

    context "when admin is loged" do
      login_admin

      it "have access and can destroy" do
        User.create(
          email: "osc@hotmail.com",
          password: "magoloco",
          password_confirmation: "magoloco")
        delete :destroy, id: 2, format: :json
        expect(response).to have_http_status 200
      end

      it "have access and can't destroy" do
        delete :destroy, id: 1, format: :json
        expect(response).to have_http_status 422
      end

      it "have content type json" do
        delete :destroy, id: 1, format: :json
        expect(response.content_type).to eq("application/json")
      end
    end

    context "when user is loged" do
      login_user

      before { delete :destroy, id: 1, format: :json}

      it "not have permission" do
        expect(response).to have_http_status 403
      end

      it {expect(response.content_type).to eq("application/json")}
    end

    context "when user is not loged" do

      before { get :update, id: subject.id, format: :json}

      it "not have authorization" do
        expect(response).to have_http_status 401
      end

      it {expect(response.content_type).to eq("application/json; charset=utf-8")}
    end
  end

  describe "action #unique?" do
    subject {create(:user)}

    context "when email exist" do

      before do
        get :unique?, :email => subject.email
      end

      it "have status 200" do
        expect(response.status).to eq 200
      end

      it "return false" do
        expect(response.body).to eq false.to_json
      end
    end

    context "when email not exist" do

      before do
        get :unique?, :email => "oscar1@hotmail.com"
      end

      it "have status 200" do
        expect(response.status).to eq 200
      end

      it "return true" do
        expect(response.body).to eq true.to_json
      end
    end
  end
end

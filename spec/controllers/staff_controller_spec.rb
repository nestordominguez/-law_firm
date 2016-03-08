require 'rails_helper'
RSpec.describe Api::V1::StaffController, type: :controller do
  describe "action #index" do
    context "when admin is loged" do
      login_admin

      before { get :index, format: :json}

      it "have status 200" do
        expect(response.status).to eq 200
      end

      it {expect(response.content_type).to eq("application/json")}
    end

    context "when user is loged" do
      login_user

      before { get :index, format: :json}

      it "have status 200" do
        expect(response.status).to eq 200
      end

      it {expect(response.content_type).to eq("application/json")}
    end

    context "when there is't user loged" do
      before { get :index, format: :json}

      it "have status 200" do
        expect(response.status).to eq 200
      end

      it {expect(response.content_type).to eq("application/json")}
    end
  end

  describe "Get action #show" do
    subject {create(:staff)}

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

      it "respond with a 200 status code" do
        expect(response.status).to eq 200
      end

      it {expect(response.content_type).to eq("application/json")}
    end

    context "when user is loged" do

      before { get :show, id: subject.id, format: :json}

      it "respond with a 200 status code" do
        expect(response.status).to eq 200
      end

      it {expect(response.content_type).to eq("application/json")}
    end
  end

  describe "Post #create" do
    let(:valid_staff) {{
      names: "Oscar",
      last_name: "Dominguez",
      email: Faker::Internet.email,
      phone: "3814327271",
      cel: "3815434343",
      address: "corrientes",
      number: "3117",
      code: "4000",
      cv: "asdasd asd asd"}}
    let(:invalid_staff) {{ names: ""}}


    context "when admin is loged" do
      login_admin

      before { post :create, :staff => valid_staff, format: :json}

      it "respond with a 201 status code create" do
        expect(response.status).to eq 201
      end

      it {expect(response.content_type).to eq("application/json")}
    end

    context "when attr is invalid" do
      login_admin

      before { post :create, :staff => invalid_staff, format: :json}

      it "respond with a 422 status code" do
        expect(response.status).to eq 422
      end

      it {expect(response.content_type).to eq("application/json")}

    end

    context "when user is loged" do
      login_user
      before { post :create, :staff => valid_staff, format: :json}

      it "respond with a 403 status code" do
        expect(response.status).to eq 403
      end

      it {expect(response.content_type).to eq("application/json")}
    end

    context "when there is't loged" do

      before { post :create, :staff => valid_staff, format: :json}

      it "respond with a 401 status code" do
        expect(response.status).to eq 401
      end

      it {expect(response.content_type).to eq("application/json; charset=utf-8")}
    end
  end

  describe "action #update" do
    subject {create(:staff)}
    let(:valid_staff) {{ names: "other" }}
    let(:invalid_staff) {{ names: "" }}

    context "when admin is loged" do
      login_admin

      before{ put :update, id: subject.id, staff: valid_staff, format: :json }

      it "have access" do
        expect(response).to have_http_status(200)
      end

      it "not update row in db" do
        expect(Staff.find(1)).to eq(subject)
      end

      it {expect(response.content_type).to eq("application/json")}
    end

    context "when attr is invalid" do
      login_admin

      before{ put :update, id: subject.id, staff: invalid_staff, format: :json }

      it "have error status 422" do
        expect(response).to have_http_status(422)
      end

      it "not update row in db" do
        expect(Staff.find(1)).to eq(subject)
      end

      it {expect(response.content_type).to eq("application/json")}
    end

    context "when user is loged" do
      login_user

      before{ put :update, id: subject.id, staff: valid_staff, format: :json}

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
    subject {create(:staff)}

    context "when admin is loged" do
      login_admin

      before { delete :destroy, id: subject.id, format: :json }

      it "have access for destroy" do
        expect(response).to have_http_status 204
      end

      it "have content type json" do
        expect(response.content_type).to eq("application/json")
      end
    end

    context "when user is loged" do
      login_user

      before { delete :destroy, id: subject.id, format: :json}

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
end

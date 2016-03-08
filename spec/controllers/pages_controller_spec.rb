require 'rails_helper'

RSpec.describe Api::V1::PagesController, type: :controller do
  describe "GET action #index" do
    before { get :index, format: :json}

    it "respond with a 200 status code" do
      expect(response.status).to eq 200
    end

    it {expect(response.content_type).to eq("application/json")}
  end

  describe "action show" do
    login_admin
    let(:valid_page) {{link: "asd", title: "asd", content: "asd", priority: 1}}
    subject {create(:page)}

    before(:each) do
      post :create, :page => valid_page, format: :json
    end

    it "respond with a 200 status code" do
      sign_out controller.current_user
      get :show, id: "undefined", format: :json
      expect(response.status).to eq(200)
    end

    it "respond with a 200 status code" do
      sign_out controller.current_user
      get :show, id: subject.link, format: :json
      expect(response.status).to eq(200)
    end

    it "respond with show" do
      sign_out controller.current_user
      get :show, id: subject.link, format: :json
      expect(response.body).to eq(subject.to_json)
    end
    it {expect(response.content_type).to eq("application/json")}
  end

  describe "action create" do
    context "when has valid parameters" do
      login_admin
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
    login_admin
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

    context "when it's unauthorized user" do
      login_user
      let(:valid_page) {{link: "asd", title: "asd", content: "asd", priority: 1}}

      before(:each) do
        post :create, :page => valid_page, format: :json
      end

      it "not have access, error 403" do
        expect(response).to have_http_status(403)
      end

      it "not add a new row to db" do
        expect(Page.all.count).to eq 0
      end

      it {expect(response.content_type).to eq("application/json")}
    end

    context "when not there is user" do
      let(:valid_page) {{link: "asd", title: "asd", content: "asd", priority: 1}}

      before(:each) do
        post :create, :page => valid_page, format: :json
      end

      it "respond with 401 unauthorized" do
        expect(response).to have_http_status(401)
      end

      it "not add a new row to db" do
        expect(Page.all.count).to eq 0
      end

      it {expect(response.content_type).to eq("application/json; charset=utf-8")}
    end
  end

  describe "action update" do
    subject {create(:page)}
    context "when it's authorized user" do
      login_admin

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

    context "when it's not authorized user" do
      login_user
      let(:valid_page) {{link: "asd", title: "asd", content: "asd", priority: 2}}

      before(:each) do
        put :update, id: subject.id, page: valid_page, format: :json
      end

      it "not have access, error 403" do
        expect(response).to have_http_status(403)
      end

      it "not update row in db" do
        expect(Page.find(1)).to eq(subject)
      end

      it {expect(response.content_type).to eq("application/json")}
    end

    context "when not there is user" do
      let(:valid_page) {{link: "asd", title: "asd", content: "asd", priority: 2}}

      before(:each) do
        put :update, id: subject.id, page: valid_page, format: :json
      end

      it "not have access" do
        expect(response).to have_http_status(401)
      end

      it "not update row in db" do
        expect(Page.find(1)).to eq(subject)
      end

      it {expect(response.content_type).to eq("application/json; charset=utf-8")}
    end
  end

  describe "action destroy" do

    context "when user it's authorized" do
      login_admin
      subject {create(:page)}

      before { delete :destroy, id: subject.id, format: :json }

      it "have status 204" do
        expect(response.status).to eq 204
      end
    end

    context "when user have athorization" do
      login_user
      subject {create(:page)}

      before do
        delete :destroy, id: subject.id, format: :json
      end

      it "not have permission with status 403" do
        expect(response.status).to eq 403
      end
    end

    context "when not there is user" do
      subject {create(:page)}

      before do
        delete :destroy, id: subject.id, format: :json
      end

      it "have status 401" do
        expect(response.status).to eq 401
      end
    end
  end

  describe "list available" do
    subject {create(:page)}

    context "when user have access" do
      login_admin

      before do
        get :list_available, format: :json
      end

      it "have status 200" do
        expect(response.status).to eq 200
      end
    end

    context "when user not have access" do
      login_user

      before do
        get :list_available, format: :json
      end

      it "not have permission with status 403" do
        expect(response.status).to eq 403
      end
    end

    context "when there is not user" do
      before do
        get :list_available, format: :json
      end
      it "have status 401" do
        expect(response.status).to eq 401
      end
    end
  end

  describe "unique link in page" do
    login_admin
    let(:valid_page) {{link: "link", title: "asd", content: "asd", priority: 1}}
    before(:each) do
      post :create, :page => valid_page, format: :json
    end

    context "when don't exist" do
      before do
        get :unique?, :link => "linsk", format: :json
      end

      it "have permission with status 200" do
        expect(response.status).to eq 200
      end

      it "respond with false" do
        expect(response.body).to eq false.to_json
      end
    end

    context "when exist" do
      before do
        get :unique?, :link => "link", format: :json
      end

      it "have status 200" do
        expect(response.status).to eq 200
      end

      it "respond with true" do
        expect(response.body).to eq true.to_json
      end
    end
  end
end

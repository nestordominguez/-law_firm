require "rails_helper"

RSpec.describe "routes for Users", :type => :routing do

  it "routes /api/v1/users to the index action" do
    expect(get("/api/v1/users")).
      to route_to(controller: "api/v1/users", action: "index", format: :json)
  end

  it "routes to /api/v1/users index" do
    expect(:get => "/api/v1/users").to be_routable
  end

  it "routes /api/v1/users/:id to the show action" do
    expect(get("/api/v1/users/:id")).
      to route_to(
        controller: "api/v1/users",
        id: ":id",
        action: "show",
        format: :json)
  end

  it "routes to /api/v1/users/:id show" do
    expect(:get => "/api/v1/users/:id").to be_routable
  end

  it "routes /api/v1/users to the update action" do
    expect(put("api/v1/users/:id")).
      to route_to(
        controller: "api/v1/users",
        id: ":id",
        action: "update",
        format: :json)
  end

  it "routes to /api/v1/users update" do
    expect(:put => "/api/v1/users/:id").to be_routable
  end

  it "routes /api/v1/users/:id to the destroy action" do
    expect(delete("api/v1/users/:id")).
      to route_to(
        controller: "api/v1/users",
        id: ":id",
        action: "destroy",
        format: :json)
  end

  it "routes to /api/v1/users/:id destroy" do
    expect(:delete => "/api/v1/users/:id").to be_routable
  end

  it "routes /api/v1/users/unique/*email to the unique? action" do
    expect(get("/api/v1/users/unique/*email")).
      to route_to(
        controller: "api/v1/users",
        email: "*email",
        action: "unique?",
        format: :json)
  end

  it "routes to /api/v1/users/unique/*email unique?" do
    expect(:get => "/api/v1/users/unique/*email").to be_routable
  end
end

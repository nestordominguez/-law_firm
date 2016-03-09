require "rails_helper"

RSpec.describe "routes for Staff", :type => :routing do

  it "routes /api/v1/staff to the index action" do
    expect(get("/api/v1/staff")).
      to route_to(controller: "api/v1/staff", action: "index", format: :json)
  end

  it "routes to /api/v1/staff index" do
    expect(:get => "/api/v1/staff").to be_routable
  end

  it "routes /api/v1/staff/:id to the show action" do
    expect(get("/api/v1/staff/:id")).
      to route_to(
        controller: "api/v1/staff",
        id: ":id",
        action: "show",
        format: :json)
  end

  it "routes to /api/v1/staff/:id show" do
    expect(:get => "/api/v1/staff/:id").to be_routable
  end

  it "routes /api/v1/staff to the create action" do
    expect(post("api/v1/staff")).
      to route_to(
        controller: "api/v1/staff",
        action: "create",
        format: :json)
  end

  it "routes to /api/v1/staff create" do
    expect(:post => "/api/v1/staff").to be_routable
  end

  it "routes /api/v1/staff to the update action" do
    expect(put("api/v1/staff/:id")).
      to route_to(
        controller: "api/v1/staff",
        id: ":id",
        action: "update",
        format: :json)
  end

  it "routes to /api/v1/staff update" do
    expect(:put => "/api/v1/staff/:id").to be_routable
  end

  it "routes /api/v1/staff/:id to the destroy action" do
    expect(delete("api/v1/staff/:id")).
      to route_to(
        controller: "api/v1/staff",
        id: ":id",
        action: "destroy",
        format: :json)
  end

    it "routes to /api/v1/staff/:id destroy" do
    expect(:delete => "/api/v1/staff/:id").to be_routable
  end
end

require "rails_helper"

RSpec.describe "routes for Messages", :type => :routing do

  it "routes /api/v1/messages to the index action" do
    expect(get("/api/v1/messages")).
      to route_to(controller: "api/v1/messages", action: "index", format: :json)
  end

  it "routes to /api/v1/messages index" do
    expect(:get => "/api/v1/messages").to be_routable
  end

  it "routes /api/v1/messages/:id to the show action" do
    expect(get("/api/v1/messages/:id")).
      to route_to(
        controller: "api/v1/messages",
        id: ":id",
        action: "show",
        format: :json)
  end

  it "routes to /api/v1/messages/:id show" do
    expect(:get => "/api/v1/messages/:id").to be_routable
  end

  it "routes /api/v1/messages to the create action" do
    expect(post("api/v1/messages")).
      to route_to(
        controller: "api/v1/messages",
        action: "create",
        format: :json)
  end

  it "routes to /api/v1/messages create" do
    expect(:post => "/api/v1/messages").to be_routable
  end

  it "routes /api/v1/messages/:id to the destroy action" do
    expect(delete("api/v1/messages/:id")).
      to route_to(
        controller: "api/v1/messages",
        id: ":id",
        action: "destroy",
        format: :json)
  end

    it "routes to /api/v1/messages/:id destroy" do
    expect(:delete => "/api/v1/messages/:id").to be_routable
  end
end

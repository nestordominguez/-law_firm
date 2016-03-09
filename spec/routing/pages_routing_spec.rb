require "rails_helper"

RSpec.describe "routes for Pages", :type => :routing do

  it "routes /api/v1/pages to the index action" do
    expect(get("/api/v1/pages")).
      to route_to(controller: "api/v1/pages", action: "index", format: :json)
  end

  it "routes to /api/v1/pages index" do
    expect(:get => "/api/v1/pages").to be_routable
  end

  it "routes /api/v1/pages/:id to the show action" do
    expect(get("/api/v1/pages/:id")).
      to route_to(
        controller: "api/v1/pages",
        id: ":id",
        action: "show",
        format: :json)
  end

  it "routes to /api/v1/pages/:id show" do
    expect(:get => "/api/v1/pages/:id").to be_routable
  end

  it "routes /api/v1/pages to the create action" do
    expect(post("api/v1/pages")).
      to route_to(
        controller: "api/v1/pages",
        action: "create",
        format: :json)
  end

  it "routes to /api/v1/pages create" do
    expect(:post => "/api/v1/pages").to be_routable
  end

  it "routes /api/v1/pages to the update action" do
    expect(put("api/v1/pages/:id")).
      to route_to(
        controller: "api/v1/pages",
        id: ":id",
        action: "update",
        format: :json)
  end

  it "routes to /api/v1/pages update" do
    expect(:put => "/api/v1/pages/:id").to be_routable
  end

  it "routes /api/v1/pages/:id to the destroy action" do
    expect(delete("api/v1/pages/:id")).
      to route_to(
        controller: "api/v1/pages",
        id: ":id",
        action: "destroy",
        format: :json)
  end

    it "routes to /api/v1/pages/:id destroy" do
    expect(:delete => "/api/v1/pages/:id").to be_routable
  end

  it "routes /api/v1/pages/availability_priority/list to the list_available action" do
    expect(get("api/v1/pages/availability_priority/list")).
      to route_to(
        controller: "api/v1/pages",
        action: "list_available",
        format: :json)
  end

  it "routes to /api/v1/pages/availability_priority/list list_available" do
    expect(:get => "/api/v1/pages/availability_priority/list").to be_routable
  end

  it "routes /api/v1/pages/unique/*link to the unique? action" do
    expect(get("/api/v1/pages/unique/*link")).
      to route_to(
        controller: "api/v1/pages",
        link: "*link",
        action: "unique?",
        format: :json)
  end

  it "routes to /api/v1/pages/unique/*link unique?" do
    expect(:get => "/api/v1/pages/unique/*link").to be_routable
  end
end

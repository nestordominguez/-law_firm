module ControllerMacros

  def login_admin
    before(:each) do
      @request.env["devise.mapping"] = Devise.mappings[:admin]
      sign_in FactoryGirl.create(:admin)
    end
  end

  def login_user
    before(:each) do
      @request.env["devise.mapping"] = Devise.mappings[:user]
      admin = FactoryGirl.create(:admin)
      user = FactoryGirl.create(:user)
      sign_in user
    end
  end

  def sign_up
    before(:each) do
      @request.env["devise.mapping"] = Devise.mappings[:user]
      user = FactoryGirl.create(:user)
    end
  end
end

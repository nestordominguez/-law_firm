class RegistrationsController < Devise::RegistrationsController
  respond_to :json
  #skip_before_filter :verify_authenticity_token, :only => :create
end

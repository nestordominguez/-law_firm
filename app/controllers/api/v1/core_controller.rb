class Api::V1::CoreController < ActionController::Base
  protect_from_forgery with: :exception
  respond_to :json
end

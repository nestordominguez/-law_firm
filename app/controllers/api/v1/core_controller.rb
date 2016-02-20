class Api::V1::CoreController < ApplicationController

  private
  def authorized?
    return true if current_user.role == 3
    return false
  end

  def unauthorized
    return "No esta autorizado a entrar a esta sección."
  end
end

class Api::V1::CoreController < ApplicationController

  private
  def authorized?
    current_user.role == 3
  end

  def unauthorized
    { error: "No esta autorizado a entrar a esta sección." }
  end

  def admin?
    current_user.role == 2
  end
end

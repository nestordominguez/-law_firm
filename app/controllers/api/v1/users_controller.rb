class Api::V1::UsersController < Api::V1::CoreController
  before_action :set_user, only: [:show, :update, :destroy]
  before_action :authenticate_user!, only: [:index, :show, :update, :destroy]
# role 1 = user role 2 = lawyer role 3 = superuser
  def index
    respond_to do |format|
      if authorized?
        format.json { render json: User.all }
      else
        format.json { render json: unauthorized, status: :forbidden }
      end
    end
  end

  def show
    respond_to do |format|
      if authorized?
        format.json { render json: @user }
      else
        format.json { render json: unauthorized, status: :forbidden }
      end
    end
  end

  def update
    respond_to do |format|
      if authorized?
        if @user.update_attributes(user_params)
          format.json { render json: @user, status: :ok}
        else
          format.json { render json: @user.errors, status: :unprocessable_entity }
        end
      else
        format.json { render json: unauthorized, status: :forbidden }
      end
    end
  end

  def destroy
    respond_to do |format|
      if authorized?
        if @user.destroy
          format.json { render json: @user.errors, status: :ok }
        else
          format.json { render json: @user.errors, status: :unprocessable_entity }
        end
      else
        format.json { render json: unauthorized, status: :forbidden }
      end
    end
  end

  def unique?
    render json: find_user == nil
  end

  private

  def set_user; @user = User.find(params[:id]); end

  def user_params
    params.permit(email: [])
    params.require(:user).permit(
      :id, :email, :created_at, :updated_at, :role )
  end

  def email_param
    begin
      actual_param = params[:email]
      if params[:format]
        actual_param << "." << params[:format]
      end
    rescue TypeError
      actual_param
    end
    return actual_param
  end

  def find_user
    User.find_by_email(email_param)
  end
end

class Api::V1::StaffController < Api::V1::CoreController
  before_action :set_staff, only: [:show, :update, :destroy]
  before_action :authenticate_user!, only: [:create, :update, :destroy]

  def index
    respond_with body: Staff.all
  end

  def show
    respond_with body: @staff
  end

  def create
    respond_to do |format|
      if authorized?
        @staff = Staff.new(staff_params)
        if @staff.save
          format.json { render json: @staff, status: :created }
        else
          format.json { render json: @staff.errors, status: :unprocessable_entity }
        end
      else
        format.json { render json: unauthorized, status: :forbidden}
      end
    end
  end

  def update
    respond_to do |format|
      if authorized?
        if @staff.update_attributes(staff_params)
          format.json { render json: @staff, status: :ok }
        else
          format.json { render json: @staff.errors, status: :unprocessable_entity }
        end
      else
        format.json { render json: unauthorized, status: :forbidden}
      end
    end
  end

  def destroy
    respond_to do |format|
      if authorized?
        format.json { head :no_content, status: :ok }
      else
        format.json { render json: unauthorized, status: :forbidden}
      end
    end
  end

  private

  def set_staff
    @staff = Staff.find(params[:id])
  end

  def staff_params
    params[:staff].permit(:names, :last_name, :email, :phone, :cel, :address,
      :number, :code, :cv)
  end
end

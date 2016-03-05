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
    if authorized?
      @staff = Staff.new(staff_params)
        respond_to do |format|
          if @staff.save
            format.json { render json: @staff, status: :created }
          else
            format.json { render json: @staff.errors, status: :unprocessable_entity }
          end
        end
    else
      respond_with error: unauthorized
    end
  end

  def update
    if authorized?
      respond_to do |format|
        if @staff.update_attributes(staff_params)
          format.json { render json: @staff, status: :ok }
        else
          format.json { render json: @staff.errors, status: :unprocessable_entity }
        end
      end
    else
      respond_with error: unauthorized
    end
  end

  def destroy
    if authorized?
      respond_to do |format|
        if @staff.destroy
          format.json { head :no_content, status: :ok }
        else
          format.json { render json: @staff.errors, status: :unprocessable_entity }
        end
      end
    else
      respond_with error: unauthorized
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

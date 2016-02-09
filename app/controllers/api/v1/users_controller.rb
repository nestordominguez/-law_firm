class Api::V1::UsersController < Api::V1::CoreController
  # before_action :set_page, only: [:edit, :update, :destroy]
  #skip_before_action :authenticate_user!, only: [:unique]

  def index
    # respond_with Page.all.sort_by {|page| page.priority }.reverse
  end

  def show
    # return respond_with Page.find_by_priority(1) if params[:id] == "undefined"
    # respond_with Page.friendly.find(params[:id].downcase)
  end

  def create
    # @page = Page.new(page_params)
    # respond_to do |format|
    #   if @page.save
    #     format.json { render json: @page, status: :created }
    #   else
    #     format.json { render json: @page.errors, status: :unprocessable_entity }
    #   end
    # end
  end

  def edit
    # respond_with @page
  end

  def update
    # respond_to do |format|
    #   if @page.update_attributes(page_params)
    #     format.json { render json: @page, status: :ok }
    #   else
    #     format.json { render json: @page.errors, status: :unprocessable_entity }
    #   end
    # end
  end

  def destroy
    # respond_to do |format|
    #   if @page.destroy
    #     format.json { head :no_content, status: :ok }
    #   else
    #     format.json { render json: @page.errors, status: :unprocessable_entity }
    #   end
    # end
  end

  def unique
    actual_param = params[:email]
    if params[:format]
      actual_param << "." << params[:format]
    end
     email = request.original_url.split("/").last
    render json: User.find_by_email(email)
  end

  private

  def set_user
    @user = User.find(params[:id])
  end

  def user_params
    params[:user].permit(:email, :password, :password_confirmation)
    params.permit(email: [])
    #params.permit(user: [:email, :password, :password_confirmation])
  end
end

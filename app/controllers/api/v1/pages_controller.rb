class Api::V1::PagesController < Api::V1::CoreController
  before_action :set_page, only: [:edit, :update]

  def index
    respond_with Page.all.sort_by {|page| page.priority }.reverse
  end

  def show
    return respond_with Page.find_by_priority(1) if params[:id] == "undefined"
    respond_with Page.friendly.find(params[:id].downcase)
  end

  def create
    @page = Page.new(page_params)
    if @page.save
      respond_with(:api, :v1, @page, status: :created)
    else
      render json: {errors: @page.errors}, status: :unprocessable_entity, head: :no_content
    end
  end

  def edit
    respond_with @page
  end

  def update

    if @page.update_attributes(page_params)
      render json:  @page, status: :ok
    else
      render json: { errors: @page.errors }, status: :unprocessable_entity
    end
  end

  private

  def set_page
    @page = Page.find(params[:id])
  end

  def page_params
    params[:page].permit(:link, :title, :content, :priority)
  end
end

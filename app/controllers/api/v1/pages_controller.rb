class Api::V1::PagesController < Api::V1::CoreController
  before_action :set_page, only: [:edit, :update, :destroy]

  def index
    respond_with Page.all.sort_by {|page| page.priority }.reverse
  end

  def show
    return respond_with Page.find_by_priority(1) if params[:id] == "undefined"
    respond_with Page.friendly.find(params[:id].downcase)
  end

  def create
    @page = Page.new(page_params)
    respond_to do |format|
      if @page.save
        format.json { render json: @page, status: :created }
      else
        format.json { render json: @page.errors, status: :unprocessable_entity }
      end
    end
  end

  def edit
    respond_with @page
  end

  def update
    respond_to do |format|
      if @page.update_attributes(page_params)
        format.json { render json: @page, status: :ok }
      else
        format.json { render json: @page.errors, status: :unprocessable_entity }
      end
    end
  end

  def destroy
    respond_to do |format|
      if @page.destroy
        format.json { head :no_content, status: :ok }
      else
        format.json { render json: @page.errors, status: :unprocessable_entity }
      end
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

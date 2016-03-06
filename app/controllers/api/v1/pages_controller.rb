class Api::V1::PagesController < Api::V1::CoreController
  before_action :set_page, only: [:update, :destroy]
  before_action :authenticate_user!, only: [:create, :update, :destroy, :list_available]

  def index
    respond_with body: Page.all.sort_by {|page| page.priority }.reverse
  end

  def show
    return respond_with Page.find_by_priority(1) if params[:id] == "undefined"
    respond_with Page.friendly.find(params[:id].downcase)
  end

  def create
    respond_to do |format|
      if authorized?
        @page = Page.new(page_params)
        if @page.save
          format.json { render json: @page, status: :created }
        else
          format.json { render json: @page.errors, status: :unprocessable_entity }
        end
      else
        format.json { render json: unauthorized }
      end
    end
  end

  def update
    respond_to do |format|
      if authorized?
        if @page.update_attributes(page_params)
          format.json { render json: @page, status: :ok }
        else
          format.json { render json: @page.errors, status: :unprocessable_entity }
        end
      else
        format.json { render json: unauthorized }
      end
    end
  end

  def destroy
    respond_to do |format|
      if authorized?
        if @page.destroy
          format.json { head :no_content, status: :ok }
        else
          format.json { render json: @page.errors, status: :unprocessable_entity }
        end
      else
        format.json { render json: unauthorized }
      end
    end
  end

  def list_available
    respond_to do |format|
      if authorized?
        format.json { render json: {body: Page.pluck(:priority)} }
      else
        format.json { render json: unauthorized }
      end
    end
  end

  def unique?
    respond_with find_link != nil
  end

  private

  def set_page
    @page = Page.find(params[:id])
  end

  def page_params
    params[:page].permit(:link, :title, :content, :priority)
  end

  def find_link
    Page.find_by_link(params[:link])
  end
end

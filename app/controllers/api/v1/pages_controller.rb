class Api::V1::PagesController < Api::V1::CoreController
  before_action :set_page, only: [:update, :destroy]
  before_action :authenticate_user!, only: [:create, :update, :destroy, :list_avaliable]

  def index
    respond_with body: Page.all.sort_by {|page| page.priority }.reverse
  end

  def show
    return respond_with Page.find_by_priority(1) if params[:id] == "undefined"
    respond_with Page.friendly.find(params[:id].downcase)
  end

  def create
    if authorized?
      @page = Page.new(page_params)
        respond_to do |format|
          if @page.save
            format.json { render json: @page, status: :created }
          else
            format.json { render json: @page.errors, status: :unprocessable_entity }
          end
        end
    else
      respond_with error: unauthorized
    end
  end

  def update
    if authorized?
      respond_to do |format|
        if @page.update_attributes(page_params)
          format.json { render json: @page, status: :ok }
        else
          format.json { render json: @page.errors, status: :unprocessable_entity }
        end
      end
    else
      respond_with error: unauthorized
    end
  end

  def destroy
    if authorized?
      respond_to do |format|
        if @page.destroy
          format.json { head :no_content, status: :ok }
        else
          format.json { render json: @page.errors, status: :unprocessable_entity }
        end
      end
    else
      respond_with error: unauthorized
    end
  end

  def list_available
    respond_with body: Page.pluck(:priority)
  end

  def unique?
    link = true
    link = false if find_link == nil
    render json: link
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

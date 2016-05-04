class Api::V1::PagesController < Api::V1::CoreController
  before_action :set_page, only: [:update, :destroy]
  before_action :authenticate_user!, only: [:create, :update, :destroy,
    :list_available]

  def index
    respond_to do |format|
      format.json {
        render json: Page.all.sort_by {|page| page.priority }.reverse,
        status: :ok }
    end
  end

  def show
    respond_to do |format|
      if params[:id] == "undefined"
        format.json { render json: Page.find_by_priority(1), status: :ok }
      else
        format.json {
          render json: Page.friendly.find(params[:id].downcase), status: :ok }
      end
    end
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
        format.json { render json: unauthorized, status: :forbidden }
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
        format.json { render json: unauthorized, status: :forbidden }
      end
    end
  end

  def destroy
    respond_to do |format|
      if authorized?
        if @page.destroy
          format.json { render json: @pages, status: :ok }
        else
          format.json { render json: @page.errors, status: :unprocessable_entity }
        end
      else
        format.json { render json: unauthorized, status: :forbidden }
      end
    end
  end

  def list_available
    respond_to do |format|
      if authorized?
        format.json { render json: {body: Page.pluck(:priority)}, status: :ok }
      else
        format.json { render json: unauthorized, status: :forbidden }
      end
    end
  end

  def unique?
    render json: find_link != nil
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

class Api::V1::PagesController < Api::V1::CoreController
  before_action :set_page, only: [:edit, :update]
  def index
    respond_with @pages = Page.all.sort_by {|page| page.priority }.reverse
  end

  def show
    return respond_with @page = Page.find_by_priority(1) if params[:id] == "undefined"
    respond_with @page = Page.friendly.find(params[:id].downcase)
  end

  def new
    @page = Page.new
  end

  def create
    @page = Contacto.new(page_params)

    respond_with do |format|
      if @page.save
        format.json { render action: 'show', status: :created, location: @page }
      else
        format.json { render json: @page.errors, status: :unprocessable_entity }
      end
    end
  end
  def edit
  end

  def update
    @page_one.save
    respond_with do |format|
      if @page.update(page_params)
        format.json { head :no_content }
      else
        format.json { render json: @page.errors, status: :unprocessable_entity }
      end
    end
  end

  private
  def set_page
    @page = Page.find(params[:id])
  end

  # Never trust parameters from the scary internet, only allow the white list through.
  def page_params
    params.require(:page).permit(:link, :title, :content, :priority)
  end
end

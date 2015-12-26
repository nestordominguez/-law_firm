class Api::V1::PagesController < Api::V1::CoreController
  def index
    respond_with @pages = Page.all
  end

  def show
    respond_with @page = Page.friendly.find(params[:id])
  end

  private

  # def page_params
  #   params.require(:page).permit(:link, :title, :content)
  # end

end

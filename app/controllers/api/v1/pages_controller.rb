class Api::V1::PagesController < Api::V1::CoreController
  def index
    respond_with @pages = Page.all.sort_by {|page| page.priority }.reverse
  end

  def show
    respond_with @page = Page.friendly.find(params[:id])
  end

end

class Api::PagesController < ApplicationController
	before_action :ensure_logged_in

	def index
		@pages = current_user.pages.order(:created_at)
		render :index
	end

  def create
    page = current_user.pages.create(page_params)

    render json: page
  end

  def show
    page = Page.find(params[:id])
    render json: page
  end

  def update
    page = Page.find(params[:id])
    page.update(page_params)
    render json: page
  end

  def destroy
    page = Page.find(params[:id])
    page.destroy
     
    render json: {}, statu: :ok
  end

  private

  def page_params
    params.require(:page).permit(:title, :content)
  end
end

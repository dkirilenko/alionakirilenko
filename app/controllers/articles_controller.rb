class ArticlesController < ApplicationController
  before_action :set_dark_navbar
  before_action -> { set_selected_navbar_item('articles') }

  def index
    @articles = Article.all.published.order(published_at: :desc)
  end

  def show
    @article = Article.find_by(slug: params[:id])
  end
end

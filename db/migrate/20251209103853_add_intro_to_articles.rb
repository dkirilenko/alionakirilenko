class AddIntroToArticles < ActiveRecord::Migration[8.1]
  def change
    add_column :articles, :intro, :text
  end
end

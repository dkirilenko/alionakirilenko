class CreateArticles < ActiveRecord::Migration[8.1]
  def change
    create_table :articles do |t|
      t.string :title
      t.text :content
      t.datetime :published_at
      t.boolean :published, default: false
      t.string :slug, null: false, index: true

      t.timestamps
    end
  end
end

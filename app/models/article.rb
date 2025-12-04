class Article < ApplicationRecord
  has_one_attached :image
  has_rich_text :content
  validates :title, :content, :published_at, presence: true

  scope :published, -> { where(published: true) }
end

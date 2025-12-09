class Certificate < ApplicationRecord
  has_one_attached :image

  scope :ordered, -> { order(position: :desc) }
end

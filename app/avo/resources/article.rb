class Avo::Resources::Article < Avo::BaseResource
  # self.includes = []
  # self.attachments = []
  # self.search = {
  #   query: -> { query.ransack(id_eq: q, m: "or").result(distinct: false) }
  # }

  def fields
    field :id, as: :id
    field :slug, as: :text
    field :title, as: :text
    field :content, as: :trix
    field :published_at, as: :date_time
    field :published, as: :boolean
    field :image, as: :file
  end
end

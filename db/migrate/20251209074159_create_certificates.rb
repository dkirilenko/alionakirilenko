class CreateCertificates < ActiveRecord::Migration[8.1]
  def change
    create_table :certificates do |t|
      t.integer :position

      t.timestamps
    end
  end
end

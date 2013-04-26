class CreateSecrets < ActiveRecord::Migration
  def change
    create_table :secrets do |t|
      t.string :shh

      t.timestamps
    end
  end
end

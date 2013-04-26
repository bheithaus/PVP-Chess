class RemoveBirthdateIndexFromUser < ActiveRecord::Migration
  def up
    change_column :users, :birth_date, :date, null: true
  end

  def down
  end
end
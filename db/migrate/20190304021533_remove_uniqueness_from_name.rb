class RemoveUniquenessFromName < ActiveRecord::Migration[5.2]
  def change
    remove_index :stocks, :name
    add_index :stocks, :name
  end
end

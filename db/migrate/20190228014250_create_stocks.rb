class CreateStocks < ActiveRecord::Migration[5.2]
  def change
    create_table :stocks do |t|
      t.string :name, null: false
      t.string :symbol, null: false
    end
    add_index :stocks, :name, unique: true
    add_index :stocks, :symbol, unique: true
  end
end

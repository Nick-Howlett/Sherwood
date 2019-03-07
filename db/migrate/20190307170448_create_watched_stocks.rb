class CreateWatchedStocks < ActiveRecord::Migration[5.2]
  def change
    create_table :stock_watch do |t|
      t.integer :user_id, null: false
      t.string :symbol, null: false
      t.timestamps
    end
    add_index :stock_watch, [:user_id, :symbol], unique: true
    add_index :stock_watch, :symbol
  end
end

class CreateTransactions < ActiveRecord::Migration[5.2]
  def change
    create_table :transactions do |t|
      t.integer :user_id, null: false
      t.string :symbol, null: false
      t.string :transaction_type, null: false
      t.float :stock_price, null: false
      t.integer :num_shares, null: false
      t.timestamps
    end
    add_index :transactions, :user_id
    add_index :transactions, :symbol
  end
end

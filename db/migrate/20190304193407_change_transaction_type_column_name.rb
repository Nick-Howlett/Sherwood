class ChangeTransactionTypeColumnName < ActiveRecord::Migration[5.2]
  def change
    rename_column :transactions, :transaction_type, :type
  end
end

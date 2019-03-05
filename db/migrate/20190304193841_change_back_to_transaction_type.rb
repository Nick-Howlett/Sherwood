class ChangeBackToTransactionType < ActiveRecord::Migration[5.2]
  def change
    rename_column :transactions, :type, :transaction_type
  end
end

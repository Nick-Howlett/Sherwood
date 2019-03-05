class AddColumnsToStocks < ActiveRecord::Migration[5.2]
  def change
    add_column :stocks, :description, :string
    add_column :stocks, :ceo, :string
    add_column :stocks, :employees, :integer
    add_column :stocks, :headquarters, :string
    add_column :stocks, :founded, :integer
    add_column :stocks, :dividend_yield, :integer
  end
end

class ChangeDividendYieldToBeFloat < ActiveRecord::Migration[5.2]
  def change
    change_column :stocks, :dividend_yield, :float
  end
end

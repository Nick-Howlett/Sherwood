class RenameStockWatchTable < ActiveRecord::Migration[5.2]
  def change
    rename_table :stock_watch, :stock_watches
  end
end

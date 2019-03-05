class ChangeBuyingPowerConstraints < ActiveRecord::Migration[5.2]
  def change
    change_column :users, :buying_power, :float, default: 0
  end
end

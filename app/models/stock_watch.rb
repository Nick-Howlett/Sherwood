class StockWatch < ApplicationRecord
  validates :user_id, :symbol, presence: :true
  validates :user_id, uniqueness: {scope: :symbol, message: "can't watch the same stock twice"}
  belongs_to :user
  belongs_to :stock, foreign_key: :symbol, primary_key: :symbol
end

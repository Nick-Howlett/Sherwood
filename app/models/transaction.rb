class Transaction < ApplicationRecord
  validates :user_id, :symbol, :stock_price, :num_shares, presence: true
  validates :transaction_type, inclusion: {in: ["purchase", "sale"]}
  belongs_to :user
  belongs_to :stock, primary_key: :symbol, foreign_key: :symbol
end

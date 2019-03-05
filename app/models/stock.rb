class Stock < ApplicationRecord
  validates :name, :symbol, presence: true
  validates :symbol, uniqueness: true
  has_many :transactions, primary_key: :symbol, foreign_key: :symbol
end

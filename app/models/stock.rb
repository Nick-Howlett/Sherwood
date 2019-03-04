class Stock < ApplicationRecord
  validates :name, :symbol, presence: true
  validates :symbol, uniqueness: true
end

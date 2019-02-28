class Stock < ApplicationRecord
  validates :name, :symbol, presence: true
  validates :name, :symbol, uniqueness: true
end

json.extract! @stock, :name, :symbol, :description, :ceo, :employees, :headquarters, :founded
json.dividendYield @stock.dividend_yield

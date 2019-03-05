@stocks.each do |stock|
  json.set! stock.symbol do
    json.symbol stock.symbol
    json.name stock.name
  end
end
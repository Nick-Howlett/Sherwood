json.user do 
  json.extract! user, :id, :username
  json.buyingPower user.buying_power
end
json.transactions do 
  user.transactions.each do |transaction|
    json.set! transaction.id do
      json.extract! transaction, :id, :symbol
      json.userId transaction.user_id
      json.transactionType transaction.transaction_type
      json.stockPrice transaction.stock_price
      json.numShares transaction.num_shares
      json.time transaction.created_at
    end
  end
end
json.watchlist do 
  user.watched_stocks.each do |watched_stock|
    json.set! watched_stock.id do
      json.extract! watched_stock, :id, :symbol
      json.userId watched_stock.user_id
    end
  end
end

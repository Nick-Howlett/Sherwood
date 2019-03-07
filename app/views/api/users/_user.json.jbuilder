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
    end
  end
end

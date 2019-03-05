json.user do 
  json.extract! user, :id, :username, :buying_power
end
json.transactions do 
  user.transactions.each do |transaction|
    json.set! transaction.id do
      json.extract! transaction, :id, :user_id, :symbol, :transaction_type, :stock_price, :num_shares
    end
  end
end

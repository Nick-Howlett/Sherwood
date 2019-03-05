json.transaction do
  json.extract! @transaction, :id, :user_id, :symbol, :transaction_type, :stock_price, :num_shares
end
json.user do
 json.buying_power @user.buying_power
end
json.transaction do
  json.extract! @transaction, :id, :symbol
  json.userId @transaction.user_id
  json.transactionType @transaction.transaction_type
  json.stockPrice @transaction.stock_price
  json.numShares @transaction.num_shares
end
json.user do
 json.buyingPower @user.buying_power
end
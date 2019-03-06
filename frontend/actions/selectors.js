export const currentUser = state => {
  return state.entities.users[state.session.id];
};

export const numShares = (state, symbol) => {
  let shares = 0;
  const id = state.session.id;
  Object.keys(state.entities.transactions).forEach(transaction_id => {
    const transaction = state.entities.transactions[transaction_id];
    if(transaction.user_id === id && transaction.symbol === symbol){
      if(transaction.transaction_type === "purchase"){
        shares += transaction.num_shares;
      } else{
        shares -= transaction.num_shares;
      }
    }
  });
  return shares;
};

export const searchStocks = (state, query) => {
  query = query.toLowerCase();
  const res = [];
  const stocks = Object.keys(state.entities.search).sort();
  if(query.length < 5){
    for(let i = 0; i < stocks.length; i++){
      const stock = state.entities.search[stocks[i]];
      const symbol = stock.symbol.toLowerCase();
      if(symbol.startsWith(query)){
        res.push(stock);
      }
      if(res.length > 5) return res;
    }
  }
  for(let i = 0; i < stocks.length; i++){
    const stock = state.entities.search[stocks[i]];
    const name = stock.name.toLowerCase();
    if(name.includes(query)){
      res.push(stock);
    }
    if(res.length > 5) return res;
  }
  return res;
};
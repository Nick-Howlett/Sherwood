import moment from 'moment';

export const currentUser = state => {
  return state.entities.users[state.session.id];
};

export const numShares = (state, symbol) => {
  let shares = 0;
  const id = state.session.id;
  Object.keys(state.entities.transactions).forEach(transactionId => {
    const transaction = state.entities.transactions[transactionId];
    if(transaction.userId === id && transaction.symbol === symbol){
      if(transaction.transactionType === "purchase"){
        shares += transaction.numShares;
      } else{
        shares -= transaction.numShares;
      }
    }
  });
  return shares;
};

export const stockShares = state => {
  const shares = {};
  const id = state.session.id;
  Object.keys(state.entities.transactions).forEach(transactionId => {
    const transaction = state.entities.transactions[transactionId];
    if(transaction.userId === id){
      if(transaction.transactionType === "purchase"){
        if(shares[transaction.symbol]){
          shares[transaction.symbol] += transaction.numShares;
        } else{
          shares[transaction.symbol] = transaction.numShares;
        }
      }
      else{
        if(shares[transaction.symbol]){
          shares[transaction.symbol] -= transaction.numShares;
          if(shares[transaction.symbol] === 0){
            delete shares[transaction.symbol];
          }
        } else{
          shares[transaction.symbol] = transaction.numShares;
        }
      }
    }
  });
  return shares;
};

export const searchStocks = (state, query) => {
  query = query.toLowerCase();
  let res = [];
  const stocks = Object.keys(state.entities.search).sort();
  if(query.length < 5){
    res = res.concat(search(5 - res.length, stocks, state, stock => stock.symbol.toLowerCase().startsWith(query)));
    if(res.length === 5) return res;
  } 
  return res.concat(search(5 - res.length, stocks, state, stock => stock.name.toLowerCase().includes(query)));
};

const search = (limit, stocks, state, cb)  => {
  const res = [];
  for(let i = 0; i < stocks.length; i++){
    const stock = state.entities.search[stocks[i]];
    if(cb(stock)){
      res.push(stock);
    }
    if(res.length === limit){
      return res;
    }
  }
  return res;
}

export const getWatchId = (state, symbol) => {
  const currentUser = state.session.id;
  const watchList = state.entities.watchedStocks;
  const ids = Object.keys(state.entities.watchedStocks)
  for(let i = 0; i < ids.length; i++){
    const currentStock = watchList[ids[i]];
    if(currentStock.userId === currentUser && currentStock.symbol === symbol){
      return ids[i];
    }
  }
  return null;
};


export const watchedStocks = state => {
  const currentUser = state.session.id;
  const watchList = state.entities.watchedStocks;
  const res = [];
  Object.keys(watchList).forEach(id => {
    if(watchList[id].userId === currentUser){
      res.push(watchList[id]);
    }
  });
  return res;
};

export const transactionArray = state => {
  const res = [];
  const currentUser = state.session.id;
  const transactions = state.entities.transactions;
  Object.keys(transactions).forEach(id => {
    if(transactions[id].userId === currentUser){
      transactions[id].time = moment(transactions[id].time);
      res.push(transactions[id]);
    }
  });
  return res.sort((transaction1, transaction2) => transaction1.time.isBefore(transaction2.time));
};


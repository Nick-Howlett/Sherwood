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
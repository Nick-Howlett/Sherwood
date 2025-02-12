import moment from "moment";

const buildUrlWithParams = (url, params) => {
  const urlParams = new URLSearchParams();
  for (const [key, value] of Object.entries(params)) {
    urlParams.append(key, value);
  }
  return url + "?" + urlParams.toString();
};

export const fetchStock = (symbol) =>
  $.ajax({
    method: "GET",
    url: `api/stocks/${symbol}`,
  });

export const makeTransaction = (transaction) =>
  $.ajax({
    method: "POST",
    url: `api/transactions/`,
    data: { transaction },
  });

export const getIntradayChart = (symbol) =>
  $.ajax({
    method: "GET",
    url: buildUrlWithParams(`api/stock_api/intraday`, {
      symbol: symbol,
    }),
  }).then((resp) => JSON.parse(resp.response));

export const getHistoricalChart = async (symbol) => {
  const dateEnd = moment().subtract(5, "years").format("YYYY-MM-DD");
  const dateStart = moment().format("YYYY-MM-DD");
  const makeRequest = async (page) => {
    return $.ajax({
      method: "GET",
      url: buildUrlWithParams(`api/stock_api/historical`, {
        symbol: symbol,
        from_date: dateEnd,
        to_date: dateStart,
        offset: page,
      }),
    }).then((resp) => JSON.parse(resp.response).data);
  };

  return Promise.all([makeRequest(0), makeRequest(1)]).then((arrays) => [
    ...arrays[0],
    ...arrays[1],
  ]);
};

export const getInfo = (symbol) => {
  const dateStart = moment().subtract("4", "days").format("YYYY-MM-DD"); // 4 days for holidays and weekends
  return $.ajax({
    method: "GET",
    url: buildUrlWithParams(`api/stock_api/info`, {
      symbol: symbol,
      from_date: dateStart,
    }),
  }).then((info) => JSON.parse(info.response).data[0]);
};

export const getNews = (name) => {
  if (name) {
    return $.ajax({
      method: "GET",
      url: `api/news/${name}`,
    });
  } else {
    return $.ajax({
      method: "GET",
      url: `api/news`,
    });
  }
};

export const getSearch = () =>
  $.ajax({
    method: "GET",
    url: `api/stocks/`,
  });

export const watchStock = (id, symbol) =>
  $.ajax({
    method: "POST",
    url: `api/stock_watches`,
    data: {
      stock_watch: { user_id: id, symbol },
    },
  });

export const deleteWatch = (id) =>
  $.ajax({
    method: "DELETE",
    url: `api/stock_watches/${id}`,
  });

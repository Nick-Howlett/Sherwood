const rp = require('request-promise');
const cheerio = require('cheerio');
const fs = require('fs');

const companies = [];

rp({url: "https://api.iextrading.com/1.0/ref-data/symbols", json: true})
  .then(arr => {
    arr.slice(8000).forEach((stock, i) => {
      const stockObj = {symbol: stock.symbol, name: stock.name, ceo: null, employees: null, headquarters: null, founded: null, dividend_yield: null};
      setTimeout(() => {
        rp(`https://robinhood.com/stocks/${stockObj.symbol}`)
        .then(html => {
          console.log(`Processing ${stockObj.symbol}, number ${i}`)
          $ = cheerio.load(html);
          stockObj.description = $(".section-description").text();
          infoArr = $("._3QG5sYEMe4Xs6188iqbZ5K");
          $(infoArr).each((i, obj) => {
            const $obj = $(obj);
            switch($obj.text()){
              case "CEO":
                if($obj.next().text() !== "—"){
                  stockObj.ceo = $obj.next().text();
                }
              break;
              case "Employees":
                if($obj.next().text() !== "—"){
                  stockObj.employees = $obj.next().text();
                }
              break;
              case "Headquarters":
                if($obj.next().text() !== "—"){
                  stockObj.headquarters = $obj.next().text();
                }
              break;
              case "Founded":
                if($obj.next().text() !== "—"){
                  stockObj.founded = $obj.next().text();
                }
              break;
              case "Dividend Yield":
              if($obj.next().text() !== "—"){
                stockObj.dividend_yield = $obj.next().text();
              }
              break;
            }  
          });
          companies.push(stockObj);
        })
        .catch(function(err){
          console.log(err);
        });
      }, 500 * i);
      setTimeout( () => { 
        const jsonArr = companies.map(company => JSON.stringify(company));
        fs.writeFile("company_data.txt", jsonArr.join("\n"), err => console.log(err));
      }, (arr.slice(0, 1000).length + 1) * 500);
    });
});


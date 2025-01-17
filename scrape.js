const rp = require("request-promise");
const cheerio = require("cheerio");
const fs = require("fs");

const companies = [];

/*

This was the scraping algorithm used to generate company data for seeding the database. 
With a 500ms delay robinhood's servers will rarely 429, but occasional hiccups do occur.
Any field set to — is null in our file, and the file is simply read line by line in
seeds.rb and parsed.

*/

rp({ url: "https://api.iextrading.com/1.0/ref-data/symbols", json: true }).then(
  (arr) => {
    arr.forEach((stock, i) => {
      const stockObj = {
        symbol: stock.symbol,
        name: stock.name,
        ceo: null,
        employees: null,
        headquarters: null,
        founded: null,
        dividend_yield: null,
      };
      setTimeout(() => {
        rp(`https://robinhood.com/stocks/${stockObj.symbol}`)
          .then((html) => {
            console.log(`Processing ${stockObj.symbol}, number ${i}`);
            $ = cheerio.load(html);
            stockObj.description = $(".section-description").text();
            infoArr = $("._3QG5sYEMe4Xs6188iqbZ5K");
            $(infoArr).each((i, obj) => {
              const $obj = $(obj);
              switch ($obj.text()) {
                case "CEO":
                  if ($obj.next().text() !== "—") {
                    stockObj.ceo = $obj.next().text();
                  }
                  break;
                case "Employees":
                  if ($obj.next().text() !== "—") {
                    stockObj.employees = $obj.next().text();
                  }
                  break;
                case "Headquarters":
                  if ($obj.next().text() !== "—") {
                    stockObj.headquarters = $obj.next().text();
                  }
                  break;
                case "Founded":
                  if ($obj.next().text() !== "—") {
                    stockObj.founded = $obj.next().text();
                  }
                  break;
                case "Dividend Yield":
                  if ($obj.next().text() !== "—") {
                    stockObj.dividend_yield = $obj.next().text();
                  }
                  break;
              }
            });
            companies.push(stockObj);
          })
          .catch(function (err) {
            console.log(err);
          });
      }, 500 * i);
      setTimeout(() => {
        const jsonArr = companies.map((company) => JSON.stringify(company));
        fs.writeFile("company_data.txt", jsonArr.join("\n"), (err) =>
          console.log(err)
        );
      }, (arr.slice(0, 1000).length + 1) * 500);
    });
  }
);

/*
Fetch a single stock's info
*/
// const stockObj = {symbol: "GOOGL", name: "Alphabet Inc.", ceo: null, employees: null, headquarters: null, founded: null, dividend_yield: null};
// rp(`https://robinhood.com/stocks/${stockObj.symbol}`)
//     .then(html => {
//       console.log(`Processing ${stockObj.symbol}`)
//       $ = cheerio.load(html);
//       stockObj.description = $(".section-description").text();
//       infoArr = $("._3QG5sYEMe4Xs6188iqbZ5K");
//       $(infoArr).each((i, obj) => {
//         const $obj = $(obj);
//         switch($obj.text()){
//           case "CEO":
//             if($obj.next().text() !== "—"){
//               stockObj.ceo = $obj.next().text();
//             }
//           break;
//           case "Employees":
//             if($obj.next().text() !== "—"){
//               stockObj.employees = $obj.next().text();
//             }
//           break;
//           case "Headquarters":
//             if($obj.next().text() !== "—"){
//               stockObj.headquarters = $obj.next().text();
//             }
//           break;
//           case "Founded":
//             if($obj.next().text() !== "—"){
//               stockObj.founded = $obj.next().text();
//             }
//           break;
//           case "Dividend Yield":
//           if($obj.next().text() !== "—"){
//             stockObj.dividend_yield = $obj.next().text();
//           }
//           break;
//         }
//       });
//       console.log(stockObj);
//     })

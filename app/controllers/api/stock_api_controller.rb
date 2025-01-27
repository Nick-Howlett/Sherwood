class Api::StockApiController < ApplicationController
    def show
        method = params[:method]
        symbol = params[:symbol]
        from_date = params[:from_date]
        to_date = params[:to_date]
        offset = params[:offset]
        api_key = Rails.application.credentials.stocks
        case method
        when 'intraday'
            url = "https://api.marketstack.com/v2/intraday/latest?symbols=#{symbol}&interval=5min&access_key=#{api_key}"
        when 'historical'
            url = "https://api.marketstack.com/v2/eod?access_key=#{api_key}&symbols=#{symbol}&date_from=#{from_date}&date_to=#{to_date}&limit=1000&offset=#{offset}"
        when 'info'
            url = "https://api.marketstack.com/v2/eod?access_key=#{api_key}&symbols=#{symbol}&date_from=#{from_date}"
        end
        print(url)
        uri = URI.parse(url)
        @response = Net::HTTP.get(uri)
        render 'api/stock_api/show'
    end  
end
  
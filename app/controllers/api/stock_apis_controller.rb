class Api::StockApisController < ApplicationController
    def show
        method = params[:method]
        symbols = params[:symbol]
        from_date = params[:from_date]
        to_date = params[:to_date]
        api_key = Rails.application.credentials.stocks
        case method
        when 'intraday':
            url = "https://api.marketstack.com/v2/intraday/latest?symbols=#{symbol}&interval=5min&access_key=#{api_key}"
        when 'historical':
            url = "https://api.marketstack.com/v2/eod?access_key=#{api_key}&symbols=#{symbols}&date_from=#{from_date}&date_to=#{to_date}"
        when 'info':
            url = "https://api.marketstack.com/v2/eod?access_key=#{api_key}&symbols=#{symbols}&date_from=#{from_date}"
        end
        uri = URI.parse(url)
        @response = Net::HTTP.get(uri)
        render 'api/stock_api/show'
    end  
end
  
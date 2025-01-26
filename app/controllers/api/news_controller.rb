require 'net/http'

class Api::NewsController < ApplicationController
    def show
        @name = params[:name]
        @api_key = Rails.application.credentials.news
        Net::HTTP::Get('https://newsapi.org/v2/everything?q=#{name}&language=en&apiKey=#{api_key}&pageSize=5')
    end


    def index
        @api_key = Rails.application.credentials.news
        Net::HTTP::Get('https://newsapi.org/v2/top-headlines?category=business&country=us&apiKey=#{api_key}&pageSize=5')
    end
end
  
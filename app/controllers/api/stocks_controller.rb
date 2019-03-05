class Api::StocksController < ApplicationController
  def show
    @stock = Stock.find_by(symbol: params[:symbol].upcase)
    if @stock
      render :show
    else
      render json: {}, status: :not_found
    end
  end
end

class Api::StocksController < ApplicationController
  def show
    @stock = Stock.find(params[:id])
    if @stock
      render :show
    else
      render json: {}, status: :not_found
    end
  end
end

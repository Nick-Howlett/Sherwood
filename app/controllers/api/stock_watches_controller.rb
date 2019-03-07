class Api::StockWatchesController < ApplicationController
  def create
    @stock_watch = StockWatch.new(watch_params)
    if @stock_watch.save
      render :show
    else
      render json: @stock_watch.errors.full_messages, status: :unprocessable_entity
    end
  end

  def destroy
    @stock_watch = StockWatch.find(params[:id])
    if @stock_watch
      @stock_watch.delete
      render json: {id: @stock_watch.id}
    else
      render json: {}, status: :not_found
    end
  end

  private
  
  def watch_params
    params.require(:stock_watch).permit(:user_id, :symbol)
  end

end

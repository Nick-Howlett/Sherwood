class Api::SessionsController < ApplicationController
  def create
    @user = User.find_by_credentials(params[:user][:username], params[:user][:password])
    if @user
      log_in(@user)
      render "api/users/show"
    else
      render json: ["Unable to log in with provided credentials."], status: :unauthorized
    end
  end
  
  def destroy
    log_out(current_user)
    render json: {}
  end
end

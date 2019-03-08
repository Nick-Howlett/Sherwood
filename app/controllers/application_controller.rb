class ApplicationController < ActionController::Base
  helper_method :current_user

  def current_user
    @current_user = User.find_by(session_token: session[:session_token])
  end

  def log_in(user)
    session[:session_token] = user.session_token
  end

  def log_out(current_user)
    current_user.reset_token if current_user
    session[:session_token] = nil
  end
end

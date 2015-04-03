class SessionsController < ApplicationController
	def new
	end

	def create
    user = User.from_omniauth(env["omniauth.auth"])
    session[:user_id] = user.id
    redirect_to root_path
  end

  def destroy
    session[:user_id] = nil
    redirect_to new_session_url
  end
end

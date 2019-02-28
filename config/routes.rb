Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  root to: "staticpages#root"
  namespace :api, default: {format: :json} do
    resources :users, only: [:create]
    resource :session, only: [:create, :destroy]
    resources :stocks, only: [:show]
  end
end

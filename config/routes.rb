Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  root to: "staticpages#root"
  namespace :api, default: {format: :json} do
    resources :users, only: [:create]
    resource :session, only: [:create, :destroy]
    resources :stocks, param: :symbol, only: [:show, :index]
    resources :transactions, only: [:create]
    resources :stock_watches, only: [:create, :destroy]
    resources :news, param: :name, only: [:show, :index]
    resources :stock_api, param: :method, only: [:show]
  end
end

Rails.application.routes.draw do
  devise_for :users, defaults: {format: :json}, controllers: { sessions: "users/sessions" }
  namespace :api do
    namespace :v1, defaults: {format: :json} do
      resources :pages, only: [:index, :show, :create, :update, :destroy]
      resources :messages, only: [:index, :show, :create, :destroy]
      resources :users, only: [:index, :show, :update, :destroy]
      get '/users/unique/*email', to: 'users#unique?'
      get '/pages/unique/*link', to: 'pages#unique?'
      get '/pages/availability_priority/list', to: 'pages#list_available'
    end
  end
  get '/', to: redirect('/app/index.html')
end

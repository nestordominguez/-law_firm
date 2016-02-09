Rails.application.routes.draw do
  devise_for :users, defaults: {format: :json}
  namespace :api do
    namespace :v1, defaults: {format: :json} do
      resources :pages
      get '/users/unique/*email', to: 'users#unique'

    end
  end
  get '/', to: redirect('/app/index.html')
end

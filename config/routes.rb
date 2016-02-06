Rails.application.routes.draw do
  devise_for :users, defaults: {format: :json}
  namespace :api do
    namespace :v1, defaults: {format: :json} do
      resources :pages
    end
  end

  get '/', :to => redirect('/app/index.html')
end

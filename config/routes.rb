Rails.application.routes.draw do
  namespace :api do
    namespace :v1, defaults: {format: :json} do
      resources :pages
    end
  end

  get '/angular', :to => redirect('/app/index.html')
end

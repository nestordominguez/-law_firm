class Message < ActiveRecord::Base
  validates :name, :email, :phone, :content,
    :presence => {:message => "no esta presente"}
  validates :name, :length => {
    :in         => 3..25,
    :too_short  => "Debe tener mas de %{count} letras",
    :too_long   => "Debe tener menos de %{count} letras"
  }
  VALID_EMAIL_REGEX = /((([A-Za-z0-9]+_+)|([A-Za-z0-9]+\-+)|([A-Za-z0-9]+\.+)|
    ([A-Za-z0-9]+\++))*[A-Za-z0-9]+@((\w+\-+)|(\w+\.))*\w{1,63}\.[a-zA-Z]{2,6})/i
  validates :email, :format => { with: VALID_EMAIL_REGEX,
    :message => "Formato no válido"}
  validates :phone, :length => {
    is: 10, :message => "No es un número válido"}
  validates :content, :length => {
    :maximum => 500,
    :too_long => "El mensaje tiene mas de 500 caractéres"}
end

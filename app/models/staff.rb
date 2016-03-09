class Staff < ActiveRecord::Base
  validates :names, :last_name, :email, :phone, :cel, :cv, :presence => true
  VALID_EMAIL_REGEX = /((([A-Za-z0-9]+_+)|([A-Za-z0-9]+\-+)|([A-Za-z0-9]+\.+)|
    ([A-Za-z0-9]+\++))*[A-Za-z0-9]+@((\w+\-+)|(\w+\.))*\w{1,63}\.[a-zA-Z]{2,6})/i
  validates :email, :format => { with: VALID_EMAIL_REGEX,
    :message => "Formato no válido"}
  validates :phone, :length => {
    is: 10, :message => "No es un número válido"}
  validates :cel, :length => {
    is: 10, :message => "No es un número válido"}
end

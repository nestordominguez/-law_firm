class Staff < ActiveRecord::Base
  validates :names, :last_name, :email, :phone, :cel, :cv, :presence => true
  VALID_PHONE_REGEX = /(([0-9]{2})(-|)([0-9]{8}))|(([0-9]{3})(-|)([0-9]{7}))|
    (([0-9]{4})(-|)([0-9]{6}))/
  VALID_EMAIL_REGEX = /((([A-Za-z0-9]+_+)|([A-Za-z0-9]+\-+)|([A-Za-z0-9]+\.+)|
    ([A-Za-z0-9]+\++))*[A-Za-z0-9]+@((\w+\-+)|(\w+\.))*\w{1,63}\.[a-zA-Z]{2,6})/i
  validates :email, :format => { with: VALID_EMAIL_REGEX,
    :message => "Formato no válido"}
  validates :phone, :length => {
    in: 10..11, :message => "No es un número válido"},
    :format => { with: VALID_PHONE_REGEX,
      :message => "Número inválido"}
end

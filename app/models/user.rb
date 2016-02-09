class User < ActiveRecord::Base
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable

  # before_create :first_user_do_lawyer
  # before_destroy :ensure_an_superuser
  # before_create :not_create_superuser

  # private
  # def first_user_do_lawyer
  #   self.abogado = true and self.superuser = true and return true unless User.any?
  # end

  # def ensure_an_superuser
  #   messages("is superuser") and return false if superuser
  #   messages("not superuser")
  # end

  # def not_create_superuser
  #   if superuser
  #     unless first_user_do_lawyer
  #       return false
  #     end
  #   end
  # end

  # def messages(message)
  #   msg = if message == "is superuser"
  #     "No puede borrar el usuario #{email}"
  #   else
  #     "El usuario #{email} se borro correctamente"
  #   end
  #   errors.add(:base, msg)
  # end
end

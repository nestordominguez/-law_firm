class User < ActiveRecord::Base
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable

  before_create :first_user_do_lawyer, :check_superuser_and_lawyer
  before_destroy :ensure_an_superuser
  before_update :not_update_superuser

  private

  def first_user_do_lawyer
    self.lawyer = true and self.superuser = true and return true unless User.any?
  end

  def ensure_an_superuser
    if superuser
      messages("is superuser")
      return false
    else
      messages("not superuser")
      return true
    end
  end

  def check_superuser_and_lawyer
    if User.any?
      self.lawyer = false
      self.superuser = false
    end
    return true
  end

  def messages(message)
    msg = if message == "is superuser"
      "No puede borrar el usuario #{email}"
    else
      "El usuario #{email} se borro correctamente"
    end
    errors.add(:base, msg)
  end

  def not_update_superuser
    return false if superuser
    return true
  end

end

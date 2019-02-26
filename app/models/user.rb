class User < ApplicationRecord
  before_validation :ensure_token
  validates :username, :session_token, uniqueness: true
  validates :username, :session_token, :password_hash, presence: true
  validates :password, length: {minimum: 6, allow_nil: true}
  attr_reader :password

  def self.find_by_credentials(username, password)
    user = User.find_by(username: username)
    return nil unless user && user.is_password?(password)
    user
  end

  def ensure_token
    self.session_token ||= SecureRandom::urlsafe_base64
  end

  def reset_token
    self.session_token = SecureRandom::urlsafe_base64
    self.save
    self.session_token
  end

  def password=(password)
    @password = password
    self.password_hash = BCrypt::Password.create(password)
  end

  def is_password?(password)
    BCrypt::Password.new(self.password_hash).is_password?(password)
  end
end

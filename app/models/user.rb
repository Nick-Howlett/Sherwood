class User < ApplicationRecord
  before_validation :ensure_token
  validates :username, :session_token, uniqueness: true
  validates :username, :session_token, :password_hash, presence: true
  validates :password, length: {minimum: 6, allow_nil: true}
  attr_reader :password
  has_many :transactions, dependent: destroy

  #session methods

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

  #stock_methods

  def num_shares(symbol)
    shares = 0
    transactions.where(symbol: symbol).each do |transaction|
      if(transaction.transaction_type == "purchase")
        shares += transaction.num_shares
      else
        shares -= transaction.num_shares
      end
    end
    shares
  end

end

# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

#helper function to remove unimportant elements from names.


def scrub_name(name)
  removal = [" Ltd.", " Holdings", " Inc.", " Corporation", " Corp", " Com", " Inc", " Trust", " Company", "Subordinate"]  
  removal.each do |removal|
    name.slice!(removal)
  end
  name
end

ActiveRecord::Base.transaction do 
  Stock.destroy_all
  User.destroy_all
  User.create(username: "xXSherrif_0f_N0ttinghamXx", password:"password", buying_power:1000000)
  File.open("full_company_data.txt").each do |line|
    stock = JSON.parse(line)
    stock["employees"] = stock["employees"].delete(",").to_i if stock["employees"]
    stock["name"] = scrub_name(stock["name"])
    Stock.create(stock)
  end
end



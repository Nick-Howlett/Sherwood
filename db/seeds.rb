# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

ActiveRecord::Base.transaction do 
  Stock.destroy_all
  File.open("full_company_data.txt").each do |line|
    stock = JSON.parse(line)
    stock["employees"] = stock["employees"].delete(",").to_i if stock["employees"]
    stock["name"] = stock["name"].split(" ")[0]; #inelegant but gets general idea for most companies (e.g. Aplhabet inc => Alphabet but Perth Mint Physical Gold => Perth);
    Stock.create(stock)
  end
end
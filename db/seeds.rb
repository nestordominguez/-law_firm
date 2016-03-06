require 'rubygems'
require 'lorem'
# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)

links = %w[estudio Link-1 Link-2 Link-3 Link-4]
content = Lorem::Base.new('paragraphs', 5).output
name = Faker::Name.name
email = Faker::Internet.email
last_name = Faker::Name.last_name
links.each_with_index do |link, index|
  Page.create(link: link, title: link, content: content, priority: index + 1)
end
users = %W(1 2 3 4 5)
User.create(email: "oscardom80@hotmail.com", password: "magoloco",
  password_confirmation: "magoloco")
User.create(email: "oscar@hotmail.com", password: "magoloco",
  password_confirmation: "magoloco")
users.each do |user|
  User.create(
    email: user + Faker::Internet.email,
    password: "magoloco",
    password_confirmation: "magoloco"
  )
end

5.times do |x|
  Message.create(
    name: "#{x}#{name}" ,
    email: "#{x}#{email}" ,
    phone: "381432727#{x}",
    content: Lorem::Base.new('characters', 120).output
  )
end

7.times do |x|
  Staff.create(
    names: Faker::Name.name,
    last_name: Faker::Name.last_name,
    email: email,
    phone: "381-432727#{x}",
    cel: "381-512345#{x}",
    address: Faker::Address.street_name,
    number: Faker::Address.building_number,
    code: "4000",
    cv: Lorem::Base.new('paragraphs', x + 1).output
  )
end

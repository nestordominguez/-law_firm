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
links.each_with_index do |link, index|
  Page.create(link: link, title: link, content: content, priority: index + 1)
end
users = %W(oscardom80 oscar 1 2 3 4 5)
users.each do |user|
  User.create(
    email: user + "@hotmail.com",
    password: "magoloco",
    password_confirmation: "magoloco"
  )
end

5.times do |x|
  Message.create(
    name: "oscar#{x}" ,
    email: "oscardom80#{x}@hotmail.com" ,
    phone: "381432727#{x}",
    content: Lorem::Base.new('characters', 120).output
  )
end

7.times do |x|
  Staff.create(
    names: "nestor oscar #{x}",
    last_name: "dominguez Diaz #{x}",
    email: "oscardom80#{x}@hotmail.com",
    phone: "381-432727#{x}",
    cel: "381-512345#{x}",
    address: "corrientes#{x}",
    number: "311#{x}",
    code: "4000",
    cv: Lorem::Base.new('paragraphs', x + 1).output
  )
end

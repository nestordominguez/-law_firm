require 'rubygems'
require 'lorem'
# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)

links = %w[estudio links publicaciones staff areas]
content = Lorem::Base.new('paragraphs', 5).output
links.each_with_index do |link, index|
  Page.new(link: link, title: link, content: content, priority: index + 1).save
end

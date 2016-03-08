FactoryGirl.define do
  pass = Faker::Internet.password(8)
  factory :admin, class: User do
    email "1" + Faker::Internet.email
    password pass
    password_confirmation pass
  end

  factory :user do
    email "oscar@hotmail.com"
    password pass
    password_confirmation pass
  end

  factory :page do
    link "link"
    title "title to link 1"
    content "content to link 1"
    priority "1"
  end

  factory :message do
    name "Oscar"
    email Faker::Internet.email
    phone "3814327271"
    content Lorem::Base.new('characters', 120).output
  end

  factory :staff do
    names "Oscar"
    last_name "Dominguez"
    email Faker::Internet.email
    phone "3814327271"
    cel "3815434343"
    address "corrientes"
    number "3117"
    code "4000"
    cv "asdasd asd asd"
  end
end

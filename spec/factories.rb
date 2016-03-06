FactoryGirl.define do
  pass = Faker::Internet.password(8)
  factory :admin, class: User do
    email Faker::Internet.email
    password pass
    password_confirmation pass
  end

  factory :user do
    email Faker::Internet.email
    password pass
    password_confirmation pass
  end

  factory :page do
    link "link"
    title "title to link 1"
    content "content to link 1"
    priority "1"
  end
end

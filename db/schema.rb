# encoding: UTF-8
# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended to check this file into your version control system.

ActiveRecord::Schema.define(:version => 20130427013218) do

  create_table "captchas", :force => true do |t|
    t.string   "client_ip"
    t.string   "secret"
    t.datetime "created_at", :null => false
    t.datetime "updated_at", :null => false
  end

  create_table "chat_rooms", :force => true do |t|
    t.string   "name"
    t.datetime "created_at", :null => false
    t.datetime "updated_at", :null => false
  end

  create_table "direct_messages", :force => true do |t|
    t.integer  "from_user_id",      :null => false
    t.integer  "to_user_id",        :null => false
    t.string   "body"
    t.integer  "parent_message_id"
    t.datetime "created_at",        :null => false
    t.datetime "updated_at",        :null => false
  end

  add_index "direct_messages", ["from_user_id"], :name => "index_direct_messages_on_from_user_id"
  add_index "direct_messages", ["parent_message_id"], :name => "index_direct_messages_on_parent_message_id"
  add_index "direct_messages", ["to_user_id"], :name => "index_direct_messages_on_to_user_id"

  create_table "games", :force => true do |t|
    t.integer  "player_white_id"
    t.integer  "player_black_id"
    t.integer  "winner_id"
    t.integer  "current_player_id"
    t.text     "board"
    t.datetime "created_at",        :null => false
    t.datetime "updated_at",        :null => false
  end

  create_table "messages", :force => true do |t|
    t.integer  "user_id"
    t.string   "username"
    t.string   "text"
    t.datetime "created_at", :null => false
    t.datetime "updated_at", :null => false
  end

  create_table "secrets", :force => true do |t|
    t.string   "shh"
    t.datetime "created_at", :null => false
    t.datetime "updated_at", :null => false
  end

  create_table "users", :force => true do |t|
    t.string   "fname",      :null => false
    t.string   "lname",      :null => false
    t.string   "username",   :null => false
    t.string   "email",      :null => false
    t.date     "birth_date"
    t.datetime "created_at", :null => false
    t.datetime "updated_at", :null => false
  end

  add_index "users", ["email"], :name => "index_users_on_email", :unique => true
  add_index "users", ["fname", "lname", "username", "email"], :name => "index_users_on_fname_and_lname_and_username_and_email"
  add_index "users", ["username"], :name => "index_users_on_username", :unique => true

end

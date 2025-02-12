# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema[7.1].define(version: 2019_03_08_175202) do
  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "stock_watches", force: :cascade do |t|
    t.integer "user_id", null: false
    t.string "symbol", null: false
    t.datetime "created_at", precision: nil, null: false
    t.datetime "updated_at", precision: nil, null: false
    t.index ["symbol"], name: "index_stock_watches_on_symbol"
    t.index ["user_id", "symbol"], name: "index_stock_watches_on_user_id_and_symbol", unique: true
  end

  create_table "stocks", force: :cascade do |t|
    t.string "name", null: false
    t.string "symbol", null: false
    t.string "description"
    t.string "ceo"
    t.integer "employees"
    t.string "headquarters"
    t.integer "founded"
    t.float "dividend_yield"
    t.index ["name"], name: "index_stocks_on_name"
    t.index ["symbol"], name: "index_stocks_on_symbol", unique: true
  end

  create_table "transactions", force: :cascade do |t|
    t.integer "user_id", null: false
    t.string "symbol", null: false
    t.string "transaction_type", null: false
    t.float "stock_price", null: false
    t.integer "num_shares", null: false
    t.datetime "created_at", precision: nil, null: false
    t.datetime "updated_at", precision: nil, null: false
    t.index ["symbol"], name: "index_transactions_on_symbol"
    t.index ["user_id"], name: "index_transactions_on_user_id"
  end

  create_table "users", force: :cascade do |t|
    t.string "username", null: false
    t.string "session_token", null: false
    t.string "password_hash", null: false
    t.datetime "created_at", precision: nil, null: false
    t.datetime "updated_at", precision: nil, null: false
    t.float "buying_power", default: 3000.0
    t.index ["session_token"], name: "index_users_on_session_token", unique: true
    t.index ["username"], name: "index_users_on_username", unique: true
  end

end

class CreateCaptchas < ActiveRecord::Migration
  def change
    create_table :captchas do |t|
      t.string :client_ip
      t.string :secret

      t.timestamps
    end
  end
end

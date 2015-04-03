class CreatePages < ActiveRecord::Migration
  def change
    create_table :pages do |t|
    	t.string :title
    	t.string :content
    	t.references :user, index: true

      t.timestamps null: false
    end
    add_foreign_key :pages, :users
  end
end

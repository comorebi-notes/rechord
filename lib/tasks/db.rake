namespace :db do
  namespace :collation do
    task change: :environment do
      Collation.new.change_all
    end
    task rollback: :environment do
      Collation.new.rollback_all
    end
  end
end

set :output, "log/crontab.log"
set :environment, :production

every 1.day, at: "4:00 am", roles: [:db] do
  rake "backup:daily"
end

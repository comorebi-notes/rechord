namespace :backup do
  desc 'daily backup'
  task daily: :environment do
    create_backup_file
    send_to_dropbox
    detele_olds_by_local
    detele_olds_by_dropbox
  end

  def create_backup_file
    `mkdir -p #{local_backup_path}`
    `PGPASSWORD=#{ENV["DATABASE_PASSWORD"]} #{ENV["PG_DUMP_PATH"]}pg_dump -Ft -h #{ENV["DATABASE_HOST"]} -p #{ENV["DATABASE_PORT"]} -U #{ENV["DATABASE_USERNAME"]} -w #{ENV["DATABASE_NAME"]} | gzip -c > #{local_backup_file_path}`
  end

  def send_to_dropbox
    client = initialize_dropbox_client
    client.upload("#{ENV["BACKUP_FILES_PATH"]}#{file_name}", IO.read(local_backup_file_path))
  end

  def detele_olds_by_local(generation_number = 7)
    files = Dir.glob("#{local_backup_path}*")
    files.select! { |file| file_name_pattern(local_backup_path) === file }
    targets = files.sort.reverse.slice(generation_number..-1)

    targets.each { |target| File.delete(target) } if targets.present?
  end

  def detele_olds_by_dropbox(generation_number = 7)
    client = initialize_dropbox_client
    files = client.list_folder(ENV["BACKUP_FILES_PATH"]).entries.map(&:name)
    files.select! { |file| file_name_pattern === file }
    targets = files.sort.reverse.slice(generation_number..-1)

    if targets.present?
      targets.each do |target|
        client.delete("#{ENV["BACKUP_FILES_PATH"]}#{target}")
      end
    end
  end


  def file_name
    return @file_name if @file_name.present?

    timestamp = Time.now.strftime('%Y-%m-%d_%H-%M-%S')
    @file_name = "#{ENV["DATABASE_NAME"]}_#{timestamp}_dump.gz"
  end

  def local_backup_path
    'tmp/backup/'
  end

  def local_backup_file_path
    "#{local_backup_path}/#{file_name}"
  end

  def initialize_dropbox_client
    DropboxApi::Client.new(ENV["DROPBOX_ACCESS_TOKEN"])
  end

  def file_name_pattern(path = "")
    /^#{path}#{ENV["DATABASE_NAME"]}_\d{4}-\d{2}-\d{2}_\d{2}-\d{2}-\d{2}_dump.gz$/
  end
end

# http://319ring.net/blog/archives/2645/

class Collation
  def initialize
    @connection = ActiveRecord::Base.connection
  end

  def change_all
    migration_base do |table, column|
      # 配列型に対応
      column_type = column.array ? "#{column.sql_type}[]" : column.sql_type
      @connection.execute "ALTER TABLE #{table} ALTER COLUMN #{column.name} TYPE #{column_type} COLLATE \"C\""
    end
  end

  def rollback_all
    migration_base do |table, column|
      # 配列型に対応
      column_type = column.array ? "#{column.sql_type}[]" : column.sql_type
      @connection.execute "ALTER TABLE #{table} ALTER COLUMN #{column.name} TYPE #{column_type}"
    end
  end

  private
  def migration_base
    @connection.tables.each do |table|
      begin
        model = Module.const_get(table.classify)
      rescue
        next
      end
      # 1からマイグレーションすると、schema cacheのせいで定義が古いまま。
      # 削除したり、リネームしたカラムを扱おうとして落ちるので、リセットする。
      model.connection.schema_cache.clear!
      model.reset_column_information
      model.columns.select {|column| column.type == :string || column.type == :text }.each do |column|
        yield(table, column)
      end
    end
  end
end

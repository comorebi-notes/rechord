class MaintenanceSchedule < ApplicationRecord
  validates :title, presence: true
  validates :description, presence: true
  validates :start_time, presence: true
  validates :end_time, presence: true

  validate :validate_times

  scope :active, -> { where('start_time <= ?', Time.zone.now).where('end_time >= ?', Time.zone.now) }

  private

  def validate_times
    errors.add('開始時間は終了時間より前にしてください。') if start_time > end_time
  end
end

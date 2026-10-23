CarrierWave.configure do |config|
  config.fog_credentials = {
    provider:           "OpenStack",
    openstack_tenant:   ENV["CONOHA_TENANT_NAME"],
    openstack_username: ENV["CONOHA_USERNAME"],
    openstack_api_key:  ENV["CONOHA_API_PASSWORD"],
    openstack_auth_url: ENV["CONOHA_API_AUTH_URL"]
  }
  config.fog_directory = ENV["CONOHA_CONTAINER_NAME"]
  config.asset_host    = ENV["CONOHA_ASSET_HOST"] + "/" + ENV["CONOHA_CONTAINER_NAME"]
  config.storage :fog
end

# ConoHa の認証 API に接続できなくてもアプリを起動できるよう、起動時の接続の失敗は無視する
module CarrierWaveFogEagerLoadRescue
  def eager_load
    super
  rescue Excon::Error, SystemCallError => e
    Rails.logger.warn("CarrierWave::Storage::Fog.eager_load failed: #{e.class}: #{e.message}")
  end
end
CarrierWave::Storage::Fog.singleton_class.prepend(CarrierWaveFogEagerLoadRescue)

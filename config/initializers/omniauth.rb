OmniAuth.config.logger = Rails.logger

Rails.application.config.middleware.use OmniAuth::Builder do
  provider :google_oauth2, '258791180938-n9fnia1mo156mnbmsrt7jk2gf92a2f3n.apps.googleusercontent.com', 'my Google client secret', {client_options: {ssl: {ca_file: Rails.root.join("cacert.pem").to_s}}}
end
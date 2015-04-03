OmniAuth.config.logger = Rails.logger

Rails.application.config.middleware.use OmniAuth::Builder do
  # provider :google_oauth2, '258791180938-egaaids9c2irqcaren6nc0brpt14pivg.apps.googleusercontent.com', 'Iww2u4nRh6pgYq_v8gnz7_CD', {client_options: {ssl: {ca_file: Rails.root.join("cacert.pem").to_s}}}
  provider :google_oauth2, '258791180938-n9fnia1mo156mnbmsrt7jk2gf92a2f3n.apps.googleusercontent.com', 'dMWhC3dpGtpkoBHsUW-1esfX', {client_options: {ssl: {ca_file: Rails.root.join("cacert.pem").to_s}}}
end
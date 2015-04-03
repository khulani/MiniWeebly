OmniAuth.config.logger = Rails.logger

Rails.application.config.middleware.use OmniAuth::Builder do
  provider :google_oauth2, '258791180938-egaaids9c2irqcaren6nc0brpt14pivg.apps.googleusercontent.com', 'Iww2u4nRh6pgYq_v8gnz7_CD', {client_options: {ssl: {ca_file: Rails.root.join("cacert.pem").to_s}}}
end 
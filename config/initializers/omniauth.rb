OmniAuth.config.logger = Rails.logger

Rails.application.config.middleware.use OmniAuth::Builder do
  provider :google_oauth2, '258791180938-jk0ave4al2kuccevhjdsn9bkiu0a9a9b.apps.googleusercontent.com', 'gWe1G2KsJWpVfFaOBnr8ooBv', {client_options: {ssl: {ca_file: Rails.root.join("cacert.pem").to_s}}}
end
json.array! @pages do |page|
  json.extract! page, :id, :title, :content
end
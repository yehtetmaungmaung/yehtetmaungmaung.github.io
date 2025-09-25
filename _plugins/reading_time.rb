# Reading Time Plugin for Jekyll
# Calculates estimated reading time based on word count
# Usage: {{ content | reading_time }} or {{ page.content | reading_time }}

module Jekyll
  module ReadingTimeFilter
    def reading_time(input)
      # Average reading speed is 200-250 words per minute
      # Using 200 WPM for conservative estimate
      words_per_minute = 200
      
      # Strip HTML tags and count words
      word_count = input.to_s.gsub(/<\/?[^>]*>/, '').split.size
      
      # Calculate reading time in minutes
      reading_time = (word_count.to_f / words_per_minute).ceil
      
      # Return minimum of 1 minute
      reading_time < 1 ? 1 : reading_time
    end
  end
end

Liquid::Template.register_filter(Jekyll::ReadingTimeFilter)
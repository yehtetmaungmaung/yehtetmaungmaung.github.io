# Use official Ruby image as base
FROM ruby:3.1-alpine

# Install system dependencies
RUN apk add --no-cache \
    build-base \
    git \
    nodejs \
    npm \
    tzdata

# Set working directory
WORKDIR /app

# Copy Gemfile and Gemfile.lock (if available)
COPY Gemfile* ./

# Install bundler and dependencies
RUN gem install bundler && \
    bundle install

# Copy the rest of the application
COPY . .

# Expose port 4000 for Jekyll development server
EXPOSE 4000

# Default command to serve Jekyll site
CMD ["bundle", "exec", "jekyll", "serve", "--host", "0.0.0.0", "--livereload"]
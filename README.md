# Cloud Engineer Portfolio & Blog

A professional portfolio website showcasing cloud engineering experience, skills, and projects with an integrated blog for sharing cloud and DevOps insights.

## Features

- **Professional Portfolio**: Showcase your cloud engineering experience and skills
- **Blog System**: Write and publish blog posts about cloud engineering and DevOps
- **Social Links**: Connect via LinkedIn and GitHub
- **Responsive Design**: Mobile-first design that works on all devices
- **Docker Development**: No need to install Ruby or Jekyll locally
- **Easy Configuration**: All portfolio data managed through YAML files

## Quick Start

### Development with Docker

1. Clone this repository
2. Start the development server:
   ```bash
   docker-compose up
   ```
3. Open your browser to `http://localhost:4000`

The site will automatically reload when you make changes to files.

## Configuration

### Portfolio Data

Edit `_data/portfolio.yml` to customize:

- **Personal Information**: Name, title, bio, avatar, resume, social links
- **Experience**: Work history with achievements and skills
- **Skills**: Technical skills organized by category with proficiency levels
- **Stats**: Quick stats displayed on homepage

### Site Settings

Edit `_config.yml` for Jekyll configuration:

- Site title and description
- URL and baseurl
- Author information
- Build settings and plugins

## Blog Workflow

### Writing Blog Posts

1. Create a new markdown file in `_posts/` directory
2. Use the naming convention: `YYYY-MM-DD-post-title.md`
3. Add front matter at the top of the file:

```yaml
---
layout: post
title: "Your Post Title"
date: 2024-01-01
categories: [cloud, aws, devops]
tags: [terraform, kubernetes, automation]
excerpt: "Brief description of your post"
---
```

4. Write your content in Markdown below the front matter
5. Commit and push to GitHub - the site will automatically rebuild

### Adding Images

1. Upload images to `assets/images/` directory
2. Reference them in your posts:
   ```markdown
   ![Alt text](/assets/images/your-image.jpg)
   ```

### Draft Posts

- Save drafts in `_drafts/` directory (no date in filename)
- They won't appear on the live site but will show in development

## Customization

### Updating Your Information

1. **Personal Details**: Edit `_data/portfolio.yml` → `personal` section
2. **Work Experience**: Edit `_data/portfolio.yml` → `experience` section  
3. **Skills**: Edit `_data/portfolio.yml` → `skills` section
4. **Social Links**: Edit `_data/portfolio.yml` → `personal` → `social` section

### Adding Social Links

Update the social section in `_data/portfolio.yml`:

```yaml
personal:
  social:
    github: "yourusername"
    linkedin: "yourusername"
```

## Deployment

This site is configured for GitHub Pages deployment:

1. Push your changes to the `main` branch
2. GitHub Pages will automatically build and deploy your site
3. Your site will be available at `https://yourusername.github.io`

## File Structure

```
├── _data/
│   └── portfolio.yml          # Portfolio configuration
├── _includes/                 # Reusable components
├── _layouts/                  # Page templates
├── _posts/                    # Blog posts
├── _sass/                     # Stylesheets
├── assets/                    # Images, CSS, JS
├── _config.yml               # Jekyll configuration
├── docker-compose.yml        # Docker development setup
├── Dockerfile               # Docker container definition
└── index.html              # Homepage
```

## Support

This is a Jekyll-based static site. For Jekyll documentation, visit [jekyllrb.com](https://jekyllrb.com/).

For Docker usage, see the [Docker documentation](https://docs.docker.com/).
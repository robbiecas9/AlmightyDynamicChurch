# Netlify Deployment Guide for Almighty God Fellowship Website

This guide explains how to deploy the Almighty God Fellowship website to Netlify as a static site.

## Prerequisites

1. A Netlify account (sign up at [netlify.com](https://netlify.com))
2. Git installed on your local machine

## Deployment Process

### Option 1: Using the Deployment Script

1. Run the deployment preparation script:

   ```bash
   chmod +x netlify_deploy.sh
   ./netlify_deploy.sh
   ```

2. The script will create a `netlify_deploy` directory with all the necessary files for deployment.

3. Download the `netlify_deploy` directory as a ZIP file.

4. Go to the Netlify dashboard and click "Add new site" > "Deploy manually".

5. Drag and drop the ZIP file to deploy.

### Option 2: Connecting to a Git Repository

1. Push your code to a Git repository (GitHub, GitLab, or Bitbucket).

2. In the Netlify dashboard, click "Add new site" > "Import an existing project".

3. Connect to your Git provider and select the repository.

4. Configure the build settings:
   - Build command: `npm run build`
   - Publish directory: `dist`

5. Click "Deploy site".

## Important Notes

### Static Site Architecture

This deployment is configured as a fully static website with no backend requirement. All data is stored directly in the code:

1. Church information (about, services, etc.) is stored in static JavaScript objects in `lib/church-data.ts`
2. The contact form uses Netlify's built-in form handling
3. No database or server APIs are required

### Form Handling

The contact form is configured to work with Netlify Forms. The essential elements are:

1. A hidden form with the same fields as your visible form:
   ```html
   <form name="contact" data-netlify="true" hidden>
     <input type="text" name="name" />
     <input type="email" name="email" />
     <input type="tel" name="phone" />
     <textarea name="message"></textarea>
   </form>
   ```

2. The actual form includes:
   ```html
   <form onSubmit={handleSubmit} data-netlify="true" name="contact">
     <input type="hidden" name="form-name" value="contact" />
     <!-- Form fields -->
   </form>
   ```

3. When the form is submitted, the handler creates a FormData object and submits it directly to Netlify:
   ```javascript
   const formData = new FormData();
   formData.append("form-name", "contact");
   Object.entries(data).forEach(([key, value]) => {
     formData.append(key, value);
   });
   
   await fetch("/", {
     method: "POST",
     body: formData,
   });
   ```

### Environment Variables

Currently, no environment variables are required as the site uses static data. If you add features requiring API keys or other secrets, set them in the Netlify dashboard under Site settings > Build & deploy > Environment.

### Custom Domain

To use your custom domain (almightygodfellowship.com):

1. In the Netlify dashboard, go to Site settings > Domain management > Custom domains.
2. Click "Add custom domain" and enter your domain name.
3. Follow the instructions to configure your DNS settings.

## Troubleshooting

- If your forms aren't working, check the form setup in the HTML to ensure it follows Netlify Forms requirements.
- If styles are missing, check that the build process is completing successfully and CSS is being generated.
- For deployment issues, check the deployment logs in the Netlify dashboard.

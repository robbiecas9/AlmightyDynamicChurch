# Netlify Deployment Guide for Almighty God Fellowship Website

This guide explains how to deploy the Almighty God Fellowship website to Netlify as a completely static site, eliminating the need for any backend server or database.

## What's Changed

1. All content is now stored directly in the code (`client/src/lib/church-data.ts`)
2. The contact form has been modified to use Netlify's built-in form handling
3. No database or API calls are needed - the entire site is static
4. Added image optimization for better performance

## Prerequisites

1. A Netlify account (sign up at [netlify.com](https://netlify.com))
2. Node.js and npm installed on your local machine

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

## Content Updates

To update the content of your website after deployment:

1. Edit the appropriate data in `client/src/lib/church-data.ts`
   - For basic church information (name, address, etc.)
   - For beliefData array to modify belief statements
   - For meetingData array to update service times and descriptions

2. For pastor's message or other sectional content, find the relevant objects:
   ```javascript
   export const pastorMessageContent = {
     title: "Message From Our Pastor",
     subtitle: "Rev. Dr. Jacob Mathai",
     content: "Your updated message here...",
     // other fields
   };
   ```

3. After making changes, run the deployment script again and redeploy to Netlify

## Image Updates

To update images:

1. Add your new images to the `attached_assets` directory
2. Update the image paths in `church-data.ts` to point to your new images
3. The deployment script will handle copying these to the appropriate location

## Troubleshooting

- **Forms not working**: Check that the HTML form includes both the hidden form definition and the `data-netlify="true"` attribute on your actual form.

- **Images not displaying**: Make sure image paths are correct and images are properly copied during the build process. Check for case sensitivity in file paths.

- **Routing issues**: If pages aren't loading correctly when accessed directly by URL, verify that the `_redirects` file is properly set up in your published directory with the rule `/* /index.html 200`.

- **Styles missing**: Check that the build process is completing successfully and CSS is being generated. Look for error messages in the build logs.

- **Contact form submissions**: To view form submissions, go to your Netlify dashboard, select your site, and click on the "Forms" tab.

- **For any other deployment issues**: Check the deployment logs in the Netlify dashboard for specific error messages.

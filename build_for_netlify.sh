#!/bin/bash

# Exit immediately if a command exits with a non-zero status
set -e

echo "📦 Starting Netlify build process"

# Create _redirects file for SPA routing
mkdir -p dist
cat > dist/_redirects << 'EOL'
/* /index.html 200
EOL
echo "✓ Created SPA routing config (_redirects)"

# Run the build
echo "🛠️ Building the application..."
npm run build

# Create a 404.html file that's identical to index.html for SPA routing
cp dist/index.html dist/404.html
echo "✓ Created 404.html for SPA routing"

echo "✓ Build completed successfully"

echo "🎉 Your application is ready for Netlify deployment!"
echo "Upload the 'dist' directory to Netlify, or use the Netlify CLI with 'netlify deploy'."

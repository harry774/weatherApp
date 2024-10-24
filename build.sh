#!/bin/bash
# build.sh

# Create a JavaScript file with environment variables
echo "window.env = {" > ./env.js
echo "  API_KEY: '$API_KEY'," >> ./env.js
echo "  API_URL: '$API_URL'" >> ./env.js
echo "};" >> ./env.js

# Run your normal build process
npm run build

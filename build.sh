#!/bin/bash
# build.sh

# Create a JavaScript file with environment variables
echo "window.env = {" > .etc/secrets/env.js
echo "  API_KEY: '${API_KEY}'," >> .etc/secrets/env.js
echo "  API_URL: '${API_URL}'" >> .etc/secrets/env.js
echo "};" >> .etc/secrets/env.js

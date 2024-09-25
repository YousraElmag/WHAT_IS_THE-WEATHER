const { defineConfig } = require('cypress');

module.exports = defineConfig({
  e2e: {
     baseUrl: 'http://localhost:5173', // Update this to your actual React app's URL
     supportFile: false,
    },
});
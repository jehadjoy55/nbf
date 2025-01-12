const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');

const app = express();

// Proxy middleware to forward requests and bypass restrictions
app.use('/proxy', createProxyMiddleware({
    target: 'https://www.example.com', // Default target website
    changeOrigin: true,
    pathRewrite: {
        '^/proxy': '', // Remove '/proxy' from the request URL
    },
}));

// Serve the static files (index.html, etc.)
app.use(express.static('public'));

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Proxy server is running at http://localhost:${PORT}`);
});

const express = require('express');
const app = express();

// Serve only the static files form the dist directory
app.use(express.static('./dist/unip-resort'));

app.get('/*', (req, res) =>
  res.sendFile('index.html', {
    root: 'dist/unip-resort/'
  }),
);

app.listen(process.env.PORT || 8080);
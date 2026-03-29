const express = require('express');
const app = express();

app.get('/dl', (req, res) => {
  const url = req.query.url || '';
  // placeholder response
  res.json({url, status:'ok'});
});

app.listen(process.env.PORT || 3003, () => console.log('API ready'));

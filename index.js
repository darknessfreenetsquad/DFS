const express = require('express');
const app = express();
app.use(express.json());
app.get('/', (req, res) => { res.sendFile(__dirname + '/home.html'); });
app.get('/dl', (req, res) => { res.json({ status: 'red ready' }); });
app.post('/dl', (req, res) => {
  const text = req.body?.message || '';
  if (text.startsWith('.play') || text.startsWith('/song')) {
    const q = text.split(' ').slice(1).join(' ');
    res.json({ reply: `pretending to play ${q} - title, 3:15, link` });
  } else { res.json({ reply: `red got: ${text}` }); }
});
const port = process.env.PORT || 3003;
app.listen(port, () => console.log('red starting on', port));

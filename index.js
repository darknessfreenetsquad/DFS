const express = require('express');
const { default: makeWASocket, useMultiFileAuthState } = require('@whiskeysockets/baileys');
const app = express();
app.use(express.json());

let latestQR = null;
async function startWA() {
  const { state, saveCreds } = await useMultiFileAuthState('auth');
  const sock = makeWASocket({ auth: state });
  sock.ev.on('creds.update', saveCreds);
  sock.ev.on('connection.update', u => { if (u.qr) latestQR = u.qr; });
}
startWA();

app.get('/', (req, res) => res.sendFile(__dirname + '/home.html'));
app.get('/qr', (req, res) => res.json({ qr: latestQR }));
app.post('/dl', (req, res) => {
  const text = req.body?.message || '';
  res.json({ reply: `red got: ${text}` });
});
app.listen(process.env.PORT || 3003, () => console.log('red starting'));

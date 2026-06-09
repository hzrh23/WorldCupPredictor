const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'changeme';
const DATA_DIR = path.join(__dirname, 'data');
const DATA_FILE = path.join(DATA_DIR, 'submissions.json');

if (!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR);
if (!fs.existsSync(DATA_FILE)) fs.writeFileSync(DATA_FILE, '[]');

app.use(cors());
app.use(express.json({ limit: '1mb' }));
app.use(express.static(path.join(__dirname, 'public')));

function readSubmissions() {
  return JSON.parse(fs.readFileSync(DATA_FILE, 'utf8'));
}
function writeSubmissions(data) {
  fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2));
}

app.post('/api/submit', (req, res) => {
  const { name, email, picks } = req.body || {};
  if (!name || typeof name !== 'string') return res.status(400).json({ error: 'Name is required.' });
  if (!picks || typeof picks !== 'object') return res.status(400).json({ error: 'Picks are required.' });
  const advancing = picks.advancing || [];
  if (!Array.isArray(advancing) || advancing.length !== 32) {
    return res.status(400).json({ error: 'Your group rankings + third-place picks must create exactly 32 advancers.' });
  }
  if (!picks.groupRanks || !picks.thirdPlaceAdvancers || !picks.bracket) {
    return res.status(400).json({ error: 'Missing group rankings, third-place picks, or bracket picks.' });
  }
  if (!Array.isArray(picks.thirdPlaceAdvancers) || picks.thirdPlaceAdvancers.length !== 8) {
    return res.status(400).json({ error: 'You must pick exactly 8 third-place advancers.' });
  }
  const submissions = readSubmissions();
  const entry = {
    id: Date.now().toString(36) + Math.random().toString(36).slice(2, 8),
    name: name.trim(),
    email: (email || '').trim(),
    submittedAt: new Date().toISOString(),
    picks
  };
  submissions.push(entry);
  writeSubmissions(submissions);
  res.json({ ok: true, id: entry.id });
});

app.get('/api/submissions', (req, res) => {
  if (req.query.password !== ADMIN_PASSWORD) return res.status(401).json({ error: 'Unauthorized' });
  res.json(readSubmissions());
});

app.delete('/api/submissions/:id', (req, res) => {
  if (req.query.password !== ADMIN_PASSWORD) return res.status(401).json({ error: 'Unauthorized' });
  const before = readSubmissions();
  const after = before.filter(s => s.id !== req.params.id);
  writeSubmissions(after);
  res.json({ ok: true, deleted: before.length - after.length });
});

app.listen(PORT, () => console.log(`World Cup pool running on http://localhost:${PORT}`));

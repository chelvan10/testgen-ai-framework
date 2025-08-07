const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
app.use(express.json());

const PROMPTS_DIR = path.join(__dirname, '../prompts/');
const TESTS_DIR = path.join(__dirname, '../tests/generated/');

app.post('/generate-test', async (req, res) => {
  const { prompt } = req.body;
  if (!prompt) return res.status(400).json({ error: 'Missing prompt input' });

  const filename = `prompt-${Date.now()}.txt`;
  const filepath = path.join(PROMPTS_DIR, filename);
  fs.writeFileSync(filepath, prompt.trim());

  const testName = prompt.toLowerCase().replace(/[^a-z0-9]+/g, '-').slice(0, 30);
  const testFilePath = path.join(TESTS_DIR, `${testName}.spec.ts`);
  const testCode = `
import { test, expect } from '@playwright/test';

test('${prompt}', async ({ page }) => {
  await page.goto('https://example.com');
  expect(true).toBeTruthy();
});
`.trim();

  fs.mkdirSync(TESTS_DIR, { recursive: true });
  fs.writeFileSync(testFilePath, testCode);

  res.json({ status: 'success', promptSaved: filename, testGenerated: testFilePath });
});

app.get('/health', (_, res) => res.send('OK'));
app.get('/status', (_, res) => res.json({ status: 'ready' }));

const PORT = 4000;
app.listen(PORT, () => console.log(`🚀 Server running at http://localhost:${PORT}`));
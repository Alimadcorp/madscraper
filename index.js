const express = require('express');
const puppeteer = require('puppeteer');

const app = express();

app.get('/proxy', async (req, res) => {
  const targetUrl = req.query.url;
  try {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(targetUrl, { waitUntil: 'networkidle0' });
    const htmlContent = await page.content();
    await browser.close();
    res.json({ html: htmlContent });
  } catch (error) {
    console.error(error);
    res.status(500).send('Error fetching content');
  }
});

app.listen(3000, () => console.log('Server listening on port 3000'));
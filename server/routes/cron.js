const express = require('express');
const { runDailyEmailJob } = require('../cron/valentineDailyEmailJob');
const { runFinalFeedbackJob } = require('../cron/valentineFinalFeedbackJob');

const router = express.Router();

/** Ensure request is from Vercel Cron (or has valid CRON_SECRET). */
function requireCronSecret(req, res, next) {
  const secret = process.env.CRON_SECRET;
  if (!secret) {
    return res.status(503).json({ error: 'Cron not configured (CRON_SECRET missing).' });
  }
  const auth = req.headers.authorization || '';
  const token = auth.startsWith('Bearer ') ? auth.slice(7) : '';
  if (token !== secret) {
    return res.status(401).json({ error: 'Unauthorized.' });
  }
  next();
}

/** GET /api/cron/daily – run daily Valentine email (invoked by Vercel Cron at 6 AM IST). */
router.get('/daily', requireCronSecret, async (req, res) => {
  try {
    const result = await runDailyEmailJob();
    return res.json({ ok: true, ...result });
  } catch (err) {
    console.error('[Cron API] daily error', err);
    return res.status(500).json({ ok: false, error: err.message });
  }
});

/** GET /api/cron/final – run final feedback email (invoked by Vercel Cron on Feb 14 8 PM IST). */
router.get('/final', requireCronSecret, async (req, res) => {
  try {
    const result = await runFinalFeedbackJob();
    return res.json({ ok: true, ...result });
  } catch (err) {
    console.error('[Cron API] final error', err);
    return res.status(500).json({ ok: false, error: err.message });
  }
});

module.exports = router;

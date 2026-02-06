const express = require('express');
const { getDayBySlug } = require('../utils/valentineDays');

const router = express.Router();

// GET /api/days/:slug
router.get('/:slug', (req, res) => {
  const { slug } = req.params;
  const dayConfig = getDayBySlug(slug);

  if (!dayConfig) {
    return res.status(404).json({ message: 'Day not found' });
  }

  // Only send what the frontend needs
  const { dayName, slug: safeSlug, theme, palette, emailSubject, messageText, animationStyle } =
    dayConfig;

  res.json({ dayName, slug: safeSlug, theme, palette, emailSubject, messageText, animationStyle });
});

module.exports = router;


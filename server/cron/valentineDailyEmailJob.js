const cron = require('node-cron');
const EmailLog = require('../models/EmailLog');
const { getTodayValentineDay, buildDateKeyForIst, toIstDate } = require('../utils/valentineDays');
const { sendValentineDayEmail } = require('../services/emailService');

/** Run the daily Valentine email logic once. Used by node-cron and by Vercel Cron (HTTP). */
async function runDailyEmailJob() {
  const now = new Date();
  const istNow = toIstDate(now);
  const todayConfig = getTodayValentineDay(now);

  if (!todayConfig) {
    console.log('[Cron] Today is not part of Valentine week.');
    return { sent: false, reason: 'not_valentine_day' };
  }

  const dateKey = `${buildDateKeyForIst(now)}-${todayConfig.slug}-daily`;

  const existing = await EmailLog.findOne({ dateKey, type: 'daily' });
  if (existing && existing.emailSent) {
    console.log('[Cron] Daily email already sent for', dateKey);
    return { sent: false, reason: 'already_sent', dateKey };
  }

  const to = process.env.RECIPIENT_EMAIL;
  if (!to) {
    console.error('[Cron] RECIPIENT_EMAIL not set, skipping send.');
    return { sent: false, reason: 'no_recipient' };
  }

  await sendValentineDayEmail({ to, dayConfig: todayConfig });

  await EmailLog.findOneAndUpdate(
    { dateKey },
    {
      dateKey,
      date: istNow,
      dayName: todayConfig.dayName,
      emailSent: true,
      sentAt: new Date(),
      type: 'daily',
    },
    { upsert: true, new: true }
  );

  console.log('[Cron] Daily Valentine email logged for', dateKey);
  return { sent: true, dateKey, dayName: todayConfig.dayName };
}

function scheduleDailyValentineEmailJob() {
  // 0 6 * * *  -> 6:00 AM every day (server time; dates computed in IST)
  cron.schedule('0 6 * * *', async () => {
    try {
      console.log('[Cron] Running daily Valentine email job');
      await runDailyEmailJob();
    } catch (err) {
      console.error('[Cron] Error in daily Valentine email job', err);
    }
  });
}

module.exports = { scheduleDailyValentineEmailJob, runDailyEmailJob };


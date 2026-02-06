const cron = require('node-cron');
const EmailLog = require('../models/EmailLog');
const { getTodayValentineDay, buildDateKeyForIst, toIstDate } = require('../utils/valentineDays');
const { sendValentineDayEmail } = require('../services/emailService');

function scheduleDailyValentineEmailJob() {
  // 0 6 * * *  -> 6:00 AM every day (server time; dates computed in IST)
  cron.schedule('0 6 * * *', async () => {
    try {
      console.log('[Cron] Running daily Valentine email job');

      const now = new Date();
      const istNow = toIstDate(now);
      const todayConfig = getTodayValentineDay(now);

      if (!todayConfig) {
        console.log('[Cron] Today is not part of Valentine week.');
        return;
      }

      const dateKey = `${buildDateKeyForIst(now)}-${todayConfig.slug}-daily`;

      const existing = await EmailLog.findOne({ dateKey, type: 'daily' });
      if (existing && existing.emailSent) {
        console.log('[Cron] Daily email already sent for', dateKey);
        return;
      }

      const to = process.env.RECIPIENT_EMAIL;
      if (!to) {
        console.error('[Cron] RECIPIENT_EMAIL not set, skipping send.');
        return;
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
    } catch (err) {
      console.error('[Cron] Error in daily Valentine email job', err);
    }
  });
}

module.exports = { scheduleDailyValentineEmailJob };


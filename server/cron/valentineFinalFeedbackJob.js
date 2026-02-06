const cron = require('node-cron');
const EmailLog = require('../models/EmailLog');
const { buildDateKeyForIst, isValentinesDay, toIstDate } = require('../utils/valentineDays');
const { sendFinalFeedbackEmail } = require('../services/emailService');

function scheduleFinalFeedbackEmailJob() {
  // 0 20 * * *  -> 8:00 PM every day (we’ll check if it’s Valentine’s Day in IST)
  cron.schedule('0 20 * * *', async () => {
    try {
      console.log('[Cron] Running final feedback email job');

      const now = new Date();

      if (!isValentinesDay(now)) {
        console.log('[Cron] Not Valentine’s Day in IST, skipping final email.');
        return;
      }

      const istNow = toIstDate(now);
      const dateKey = `${buildDateKeyForIst(now)}-final-feedback`;

      const existing = await EmailLog.findOne({ dateKey, type: 'final-feedback' });
      if (existing && existing.emailSent) {
        console.log('[Cron] Final feedback email already sent for', dateKey);
        return;
      }

      const to = process.env.RECIPIENT_EMAIL;
      if (!to) {
        console.error('[Cron] RECIPIENT_EMAIL not set, skipping final feedback send.');
        return;
      }

      await sendFinalFeedbackEmail({ to });

      await EmailLog.findOneAndUpdate(
        { dateKey },
        {
          dateKey,
          date: istNow,
          dayName: 'Valentine’s Day',
          emailSent: true,
          sentAt: new Date(),
          type: 'final-feedback',
        },
        { upsert: true, new: true }
      );

      console.log('[Cron] Final feedback email logged for', dateKey);
    } catch (err) {
      console.error('[Cron] Error in final feedback email job', err);
    }
  });
}

module.exports = { scheduleFinalFeedbackEmailJob };


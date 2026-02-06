const { scheduleDailyValentineEmailJob } = require('./valentineDailyEmailJob');
const { scheduleFinalFeedbackEmailJob } = require('./valentineFinalFeedbackJob');

function startCronJobs() {
  // On Vercel, cron runs via HTTP (Vercel Cron Jobs). Do not start in-process cron.
  if (process.env.VERCEL === '1') {
    console.log('Vercel detected: skipping in-process cron (use Vercel Cron + /api/cron/*).');
    return;
  }

  const enableCron = process.env.ENABLE_CRON_JOBS !== 'false';
  if (!enableCron) {
    console.log('Cron jobs are disabled via ENABLE_CRON_JOBS env.');
    return;
  }

  console.log('Starting Valentine cron jobs (node-cron)...');
  scheduleDailyValentineEmailJob();
  scheduleFinalFeedbackEmailJob();
}

module.exports = { startCronJobs };


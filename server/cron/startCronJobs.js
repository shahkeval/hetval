const { scheduleDailyValentineEmailJob } = require('./valentineDailyEmailJob');
const { scheduleFinalFeedbackEmailJob } = require('./valentineFinalFeedbackJob');

function startCronJobs() {
  // Only start cron jobs in production-like environments by default
  const enableCron = process.env.ENABLE_CRON_JOBS !== 'false';

  if (!enableCron) {
    console.log('Cron jobs are disabled via ENABLE_CRON_JOBS env.');
    return;
  }

  console.log('Starting Valentine cron jobs...');
  scheduleDailyValentineEmailJob();
  scheduleFinalFeedbackEmailJob();
}

module.exports = { startCronJobs };


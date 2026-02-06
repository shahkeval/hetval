const { PALETTE } = require('../../utils/valentineDays');

function buildValentineEmailHtml({ dayConfig, ctaUrl }) {
  const [primary, secondary] = dayConfig.palette || [PALETTE.blushPink, PALETTE.peach];

  return `
  <!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>${dayConfig.emailSubject}</title>
    <style>
      @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@500;600&family=Poppins:wght@300;400;500&display=swap');

      body {
        margin: 0;
        padding: 0;
        background: linear-gradient(135deg, ${primary}, ${secondary});
        font-family: 'Poppins', system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
        color: #2d1436;
      }

      .wrapper {
        width: 100%;
        padding: 24px 12px;
        box-sizing: border-box;
      }

      .card {
        max-width: 640px;
        margin: 0 auto;
        background: rgba(255, 255, 255, 0.96);
        border-radius: 24px;
        box-shadow: 0 18px 45px rgba(0, 0, 0, 0.12);
        padding: 28px 22px 26px;
        position: relative;
        overflow: hidden;
      }

      .hearts {
        position: absolute;
        inset: 0;
        pointer-events: none;
        overflow: hidden;
      }

      .heart {
        position: absolute;
        width: 18px;
        height: 18px;
        background: #ff8fb3;
        transform: rotate(45deg);
        opacity: 0.16;
        animation: floatUp 9s infinite ease-in-out;
      }

      .heart::before,
      .heart::after {
        content: '';
        position: absolute;
        width: 18px;
        height: 18px;
        background: #ff8fb3;
        border-radius: 50%;
      }

      .heart::before {
        top: -9px;
        left: 0;
      }

      .heart::after {
        left: -9px;
        top: 0;
      }

      .heart:nth-child(1) { left: 8%;  bottom: -20px; animation-delay: 0s; }
      .heart:nth-child(2) { left: 22%; bottom: -40px; animation-delay: 2s; }
      .heart:nth-child(3) { left: 46%; bottom: -35px; animation-delay: 4s; }
      .heart:nth-child(4) { left: 70%; bottom: -30px; animation-delay: 1s; }
      .heart:nth-child(5) { left: 88%; bottom: -45px; animation-delay: 3s; }

      @keyframes floatUp {
        0%   { transform: translateY(0) rotate(45deg); opacity: 0; }
        10%  { opacity: 0.22; }
        40%  { opacity: 0.3; }
        100% { transform: translateY(-220px) rotate(45deg); opacity: 0; }
      }

      .heading {
        position: relative;
        text-align: center;
        margin-bottom: 18px;
      }

      .day-pill {
        display: inline-block;
        padding: 6px 14px;
        border-radius: 999px;
        background: rgba(255, 182, 193, 0.16);
        font-size: 11px;
        letter-spacing: 0.12em;
        text-transform: uppercase;
        color: #a16386;
        margin-bottom: 6px;
      }

      h1 {
        font-family: 'Playfair Display', serif;
        font-size: 26px;
        margin: 0;
        color: #3a1b47;
        text-shadow: 0 0 18px rgba(255, 182, 193, 0.4);
      }

      .sub {
        font-size: 13px;
        color: #7c567e;
        margin-top: 8px;
      }

      .message {
        position: relative;
        margin: 22px 0 24px;
        padding: 16px 14px 16px;
        border-radius: 18px;
        background: linear-gradient(135deg, rgba(255, 218, 185, 0.2), rgba(230, 230, 250, 0.4));
        font-size: 13px;
        color: #4a294f;
        white-space: pre-wrap;
      }

      .closing {
        margin: 0 2px 22px;
        font-size: 13px;
        color: #6b416f;
      }

      .cta-wrapper {
        text-align: center;
      }

      .cta {
        display: inline-block;
        padding: 11px 26px;
        border-radius: 999px;
        background: linear-gradient(135deg, #ff99b8, #ffb6c1);
        color: #3a1b47;
        font-weight: 500;
        font-size: 13px;
        text-decoration: none;
        box-shadow: 0 10px 24px rgba(255, 137, 171, 0.36);
        transition: transform 0.2s ease, box-shadow 0.2s ease, background 0.2s ease;
      }

      .cta:hover {
        transform: translateY(-1px) scale(1.02);
        box-shadow: 0 14px 30px rgba(255, 137, 171, 0.46);
        background: linear-gradient(135deg, #ff8fb3, #ffc1cc);
      }

      .cta span {
        display: inline-block;
        margin-left: 4px;
      }

      .footer-note {
        margin-top: 18px;
        text-align: center;
        font-size: 11px;
        color: #9a7ca1;
      }

      @media (max-width: 600px) {
        .card {
          padding: 22px 16px 20px;
          border-radius: 20px;
        }

        h1 {
          font-size: 22px;
        }

        .message {
          font-size: 13px;
        }
      }
    </style>
  </head>
  <body>
    <div class="wrapper">
      <div class="card">
        <div class="hearts">
          <div class="heart"></div>
          <div class="heart"></div>
          <div class="heart"></div>
          <div class="heart"></div>
          <div class="heart"></div>
        </div>
        <div class="heading">
          <div class="day-pill">${dayConfig.dayName}</div>
          <h1>${dayConfig.emailSubject.replace('💖', '').replace('🌹', '').trim()}</h1>
          <div class="sub">
            A small note from my heart, just for you.
          </div>
        </div>
        <div class="message">
          ${dayConfig.messageText.replace(/\n/g, '<br />')}
        </div>
        <p class="closing">
          Whenever you’re ready, tap the little envelope below and open today’s page.
          It’s your quiet space to feel, write, and just be you.
        </p>
        <div class="cta-wrapper">
          <a href="${ctaUrl}" class="cta">
            Open Today’s Message 💌
          </a>
        </div>
        <div class="footer-note">
          This space is just between you and me — soft, private, and yours.
        </div>
      </div>
    </div>
  </body>
  </html>
  `;
}

module.exports = { buildValentineEmailHtml };


function buildFinalFeedbackEmailHtml({ feedbackUrl }) {
  return `
  <!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>One last thing… 💖</title>
    <style>
      @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@500;600&family=Poppins:wght@300;400;500&display=swap');

      body {
        margin: 0;
        padding: 0;
        background: radial-gradient(circle at top, #ffb6c1 0, #ffd7e0 40%, #ffeef6 100%);
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
        background: rgba(255, 255, 255, 0.97);
        border-radius: 26px;
        box-shadow: 0 20px 55px rgba(0, 0, 0, 0.14);
        padding: 30px 22px 26px;
        position: relative;
        overflow: hidden;
      }

      .halo {
        position: absolute;
        width: 220px;
        height: 220px;
        background: radial-gradient(circle, rgba(255, 182, 193, 0.5), transparent 65%);
        top: -80px;
        right: -40px;
        opacity: 0.6;
      }

      .heading {
        position: relative;
        text-align: center;
        margin-bottom: 18px;
      }

      h1 {
        font-family: 'Playfair Display', serif;
        font-size: 26px;
        margin: 0;
        color: #3a1b47;
      }

      .sub {
        font-size: 13px;
        color: #7c567e;
        margin-top: 10px;
      }

      .message {
        position: relative;
        margin: 22px 0 24px;
        padding: 16px 14px 16px;
        border-radius: 18px;
        background: linear-gradient(135deg, rgba(255, 218, 185, 0.2), rgba(230, 230, 250, 0.5));
        font-size: 13px;
        color: #4a294f;
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

      .footer-note {
        margin-top: 18px;
        text-align: center;
        font-size: 11px;
        color: #9a7ca1;
      }

      @media (max-width: 600px) {
        .card {
          padding: 22px 16px 20px;
          border-radius: 22px;
        }

        h1 {
          font-size: 22px;
        }
      }
    </style>
  </head>
  <body>
    <div class="wrapper">
      <div class="card">
        <div class="halo"></div>
        <div class="heading">
          <h1>One last thing… 💖</h1>
          <div class="sub">
            Before this little Valentine journey ends, I’d love to know how it felt for you.
          </div>
        </div>
        <div class="message">
          Your feelings matter to me — not just the smiles, but the quiet parts too.<br />
          If you’re willing to share, I’d love to hear what this week was like through your eyes.<br /><br />
          Take a minute, breathe, and write from your heart. No right words, no pressure — just you.
        </div>
        <div class="cta-wrapper">
          <a href="${feedbackUrl}" class="cta">
            Share how this week felt 💌
          </a>
        </div>
        <div class="footer-note">
          Thank you for being part of this — you’re more special to me than you know.
        </div>
      </div>
    </div>
  </body>
  </html>
  `;
}

module.exports = { buildFinalFeedbackEmailHtml };


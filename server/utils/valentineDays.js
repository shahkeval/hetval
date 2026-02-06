/**
 * Valentine Week day config: edit emailSubject and messageText per day.
 * messageText is used in both the 6 AM email and the /day/:slug webpage.
 * Use \n for line breaks. Keep slug, month, dayOfMonth unchanged.
 */
const PALETTE = {
  blushPink: '#FFB6C1',
  peach: '#FFDAB9',
  lavender: '#E6E6FA',
};

const valentineDays = [
  {
    dayName: 'Rose Day',
    slug: 'rose-day',
    month: 2,
    dayOfMonth: 7,
    theme: 'roses',
    palette: [PALETTE.blushPink, PALETTE.lavender],
    emailSubject: 'A soft rose to start our week 🌹',
    messageText:
`
Good morning, bachaaaaaa 🌹

Did you sleep well last night?
I hope your dreams were soft and your morning feels gentle.

Today is Rose Day, and it made me think of you
not because roses are dramatic, but because they’re quietly beautiful.

You don’t try too hard.
You don’t pretend.
You’re just… you.

And honestly, that’s what makes you special to me,
goll matolll 🤍

I hope today treats you kindly.
`,
    animationStyle: 'floating-roses',
  },
  {
    dayName: 'Propose Day',
    slug: 'propose-day',
    month: 2,
    dayOfMonth: 8,
    theme: 'confession',
    palette: [PALETTE.peach, PALETTE.blushPink],
    emailSubject: 'If feelings were words, they’d be this 💍',
    messageText:
`
Good morning, jaduuuuu ✨

How was your sleep?
I hope your night was peaceful and you woke up feeling safe and okay.

Today isn’t about dramatic words
or promises spoken in a hurry.

Today is about what my heart feels
quietly, honestly, deeply.

Kabhi kabhi kisi ka hona hi,
zindagi ke liye kaafi hota hai.

I don’t love you for loud reasons.
I love the calm you bring.
The way you think.
The way your words feel real.
The way you exist without pretending.

When I think of you,
my heart doesn’t rush it settles.
It feels sure.
It feels right.

Tumhara saath koi aadat nahi,
yeh toh meri zarurat banti ja rahi hai.

I’m just saying
I want to walk slowly,
with honesty,
with care,
and with feelings that don’t fade easily.

Main tumhe paane ki zid nahi karta,
bas tumhe apna maan kar chalna chahta hoon.

So this is me,
standing here with an open heart,
choosing you not once, but every day.

I’d really like to keep choosing you,
hetuuuuu 💫

Agar tum saath ho,
toh zindagi se aur kuch nahi chahiye.
`
,
    animationStyle: 'soft-glow',
  },
  {
    dayName: 'Chocolate Day',
    slug: 'chocolate-day',
    month: 2,
    dayOfMonth: 9,
    theme: 'sweetness',
    palette: [PALETTE.peach, PALETTE.lavender],
    emailSubject: 'For all the sweetness you bring 🍫',
    messageText:
      `
    Good morning, bondi ka laduuuuuu 🍫

    Did you sleep peacefully?
    Or did your thoughts keep you awake a little?

    Some people feel exciting.
    Some feel comforting.

    And somehow,you feel like both.

    Talking to you feels sweet in a calm way
    not loud, not heavy just warm.

    I hope today gives you at least one reason to smile,
    goll matolll 🤍
    And if I’m part of that… I’d really love that.
  `,
    animationStyle: 'floating-sweets',
  },
  {
    dayName: 'Teddy Day',
    slug: 'teddy-day',
    month: 2,
    dayOfMonth: 10,
    theme: 'comfort',
    palette: [PALETTE.blushPink, PALETTE.peach],
    emailSubject: '🧸🧸🧸🍬Soft like a teddy, sweet like you 🤍',
    messageText:
    `
    Good morning, jadiiiiii 🧸

    How was your night, hmm?
    Did you rest properly?

    Teddy Day is about comfort
    about feeling safe without explaining yourself.

    And honestly, that’s what your presence feels like to me.
    Calm. Soft. Reassuring.

    If life ever feels heavy or confusing,
    I hope you remember you don’t have to face it alone,
    bachaaaaaa.

    You deserve warmth every single day 🤍
  `,

    animationStyle: 'floating-clouds',
  },
  {
    dayName: 'Promise Day',
    slug: 'promise-day',
    month: 2,
    dayOfMonth: 11,
    theme: 'promises',
    palette: [PALETTE.lavender, PALETTE.blushPink],
    emailSubject: 'A quiet promise from my heart 🤝❤️❤️❤️',
    messageText:
      `
    Good morning, hetuuuuu 🤍

    Did you wake up feeling okay today?
    I hope your body and heart both feel a little lighter.

    I won’t promise perfection.
    I won’t promise fairy tales.

    But I promise honesty.
    I promise respect.
    I promise effort even on ordinary days.

    And I promise that whatever I feel for you,
    jaduuuuu,
    it will always come from a sincere place 🌱
  `,
    animationStyle: 'soft-pulse',
  },
  {
    dayName: 'Hug Day',
    slug: 'hug-day',
    month: 2,
    dayOfMonth: 12,
    theme: 'closeness',
    palette: [PALETTE.blushPink, PALETTE.lavender],
    emailSubject: 'A hug wrapped in words 🤗',
    messageText:
     `
    Good morning, goll matolll 🤗

    How was your sleep, hmm?
    Are you feeling fine this morning?

    Some hugs don’t need arms.
    They’re felt in patience, care, and understanding.

    If today feels overwhelming at any moment,
    imagine a quiet hug
    warm, safe, and judgment-free.

    That’s the kind of comfort I wish for you always,
    bondi ka laduuuuuu 💞
  `,
    animationStyle: 'floating-hearts',
  },
  {
    dayName: 'Valentine’s Day',
    slug: 'valentines-day',
    month: 2,
    dayOfMonth: 14,
    theme: 'valentine',
    palette: [PALETTE.blushPink, PALETTE.peach, PALETTE.lavender],
    emailSubject: '❤️🥹💞💞💞 This one is especially for you',
    messageText:
    `
Good morning, bachaaaaaa ❤️🌸

Did you sleep well last night? 😴✨
I hope you woke up feeling calm, safe, and a little lighter 🤍

This whole week was never about impressing you.
It was about being honest 💫
About showing up 🤍
About letting my heart speak, softly 💌

Har din tumhe likhte hue,
thoda thoda aur samajh aaya —
ki tum sirf ek khayal nahi,
tum ek ehsaas ho 💖

Writing to you every day,
sharing these small, quiet pieces of my heart,
has meant more to me than I can ever explain 🫶

Tumhari ek muskaan 😊
ek reply 💬
ya sirf tumhara hona —
kabhi kabhi poori duniya jaisa lagta hai 🌍❤️

Tumhare saath cheezein asaan lagti hain 🌱
Dil ko sukoon milta hai 💞
Aur mann ko thoda sa ghar 🏡

Jo bhi tumne is haftay mehsoos kiya —
khushi 🌸
comfort 🤍
curiosity ✨
ya bas ek soft warmth 💫 —
main bas yeh chahta hoon
ki tumne apne aap ko cared, respected,
aur thoda sa special mehsoos kiya ho,
jadiiiiii 🤍🥹

Aur aaj ke din ke khatam hone se pehle,
dil se kuch kehna chahta hoon 💭❤️

Ab toh hum tumhare hain 💞
Agar tumne paon mein rakha,
toh juti tumhari 👣
Aur agar tumne sar pe rakha,
toh taj tumhara 👑

Yeh dil bas itna hi chahta hai —
ki tum hamesha muskuraati raho 😊✨
Mujhe aur kuch nahi chahiye,
sirf aur sirf tumhari muskaan 💖

Bas itni si ek promise de do 🤞❤️
ki tum hamesha muskuraati rahogi 🌸

And I hope you know that I'm here for you,
no matter what.

I'm here to support you,
to listen to you,
to help you,
to love you.

In the end, I just want to say that
I loveeeeeeee youuuuuuuu bachuuuuuuuuu❤️❤️❤️❤️
`
,
    animationStyle: 'heart-orbit',
  },
];

function toIstDate(date = new Date()) {
  const utc = date.getTime() + date.getTimezoneOffset() * 60000;
  const istOffsetMinutes = 5.5 * 60;
  return new Date(utc + istOffsetMinutes * 60000);
}

function buildDateKeyForIst(date = new Date()) {
  const ist = toIstDate(date);
  const year = ist.getFullYear();
  const month = String(ist.getMonth() + 1).padStart(2, '0');
  const day = String(ist.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

function getTodayValentineDay(date = new Date()) {
  const ist = toIstDate(date);
  const month = ist.getMonth() + 1;
  const dayOfMonth = ist.getDate();

  return valentineDays.find((d) => d.month === month && d.dayOfMonth === dayOfMonth) || null;
}

function getDayBySlug(slug) {
  if (!slug) return null;
  return valentineDays.find((d) => d.slug === slug) || null;
}

function isValentinesDay(date = new Date()) {
  const ist = toIstDate(date);
  const month = ist.getMonth() + 1;
  const dayOfMonth = ist.getDate();
  return month === 2 && dayOfMonth === 14;
}

module.exports = {
  valentineDays,
  getTodayValentineDay,
  getDayBySlug,
  isValentinesDay,
  buildDateKeyForIst,
  toIstDate,
  PALETTE,
};


/**
 * Valentine Week day config: edit emailSubject and messageText per day.
 * messageText is used in both the 6 AM email and the /day/:slug webpage.
 * Use \n for line breaks. Keep slug, month, dayOfMonth unchanged.
 */
const PALETTE = {
  blushPink: "#FFB6C1",
  peach: "#FFDAB9",
  lavender: "#E6E6FA",
};

const valentineDays = [
  {
    dayName: "Rose Day",
    slug: "rose-day",
    month: 2,
    dayOfMonth: 7,
    theme: "roses",
    palette: [PALETTE.blushPink, PALETTE.lavender],
    emailSubject: "A soft rose to start our week 🌹",
    messageText: `
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
    animationStyle: "floating-roses",
  },
  {
    dayName: "Propose Day",
    slug: "propose-day",
    month: 2,
    dayOfMonth: 8,
    theme: "confession",
    palette: [PALETTE.peach, PALETTE.blushPink],
    emailSubject: "If feelings were words, they’d be this 💍",
    messageText: `
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
`,
    animationStyle: "soft-glow",
  },
  {
    dayName: "Chocolate Day",
    slug: "chocolate-day",
    month: 2,
    dayOfMonth: 9,
    theme: "sweetness",
    palette: [PALETTE.peach, PALETTE.lavender],
    emailSubject: "For all the sweetness you bring 🍫",
    messageText: `
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
    animationStyle: "floating-sweets",
  },
  {
    dayName: "Teddy Day",
    slug: "teddy-day",
    month: 2,
    dayOfMonth: 10,
    theme: "comfort",
    palette: [PALETTE.blushPink, PALETTE.peach],
    emailSubject: "🧸🧸🧸🍬Soft like a teddy, sweet like you 🤍",
    messageText: `
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

    animationStyle: "floating-clouds",
  },
  {
    dayName: "Promise Day",
    slug: "promise-day",
    month: 2,
    dayOfMonth: 11,
    theme: "promises",
    palette: [PALETTE.lavender, PALETTE.blushPink],
    emailSubject: "A quiet promise from my heart 🤝❤️❤️❤️",
    messageText: `
   Good morning, hetuuuuu 🤍❤️

Did you wake up feeling okay today?
I hope your body feels rested,
and your heart feels a little lighter❤️.

I’ve never really been the kind of person
who makes big promises just for the sake of words.
I believe more in showing up,
in doing the small things right,
and in proving feelings through actions.

But since today is Promise Day,
let me promise you a few things —
quiet, honest, and real 🌱

🤍 I promise to choose you,
not only on the happy days,
but on the slow, confusing, and ordinary ones too.

🤍 I promise to listen to you,
not just to reply,
but to truly understand what your heart is trying to say.

🤍 I promise to respect your feelings,
even when I don’t fully understand them yet.

🤍 I promise to protect your heart,
not by controlling it,
but by caring for it gently.

🤍 I promise to grow with you,
side by side,
learning, unlearning, and becoming better together.

🤍 I promise that whatever I feel for you,
will never be careless, casual, or temporary.
It will always come from a sincere place.

And here are a few softer, everyday promises 🧸

🌸 I promise to check in on you,
even when life gets busy.

🌸 I promise to be patient
on the days you feel tired, quiet, or unsure.

🌸 I promise to never make you feel
like you’re asking for “too much.”

🌸 I promise to celebrate your little wins
the same way I would celebrate the big ones.

🌸 I promise to be someone
you feel safe talking to,
even on your worst days.

🌸 I promise to send you random “did you eat?” messages,
because your health matters to me.

🌸 I promise to remember the little things you like
and bring them up when you least expect it.

🌸 I promise to never make you feel alone
even when we’re silent.

🌸 I promise to say sorry
when I’m wrong or even when I'm right, without ego.

🌸 I promise to laugh with you at silly things
and never judge you for them.

🌸 I promise to support your dreams,
even when they change.

🌸 I promise to stand by you
when things don’t go as planned.

🌸 I promise to be calm
when emotions run high.

🌸 I promise to choose you
not just when it’s easy,
but when it requires effort.

🌸 I promise to make love feel safe,
warm, and steady
like home.

🌸 I promise to care about your meals,
to remind you to eat on time,
and worry a little when you don’t,
because that’s very matters to me❤️.

🌸 I promise to share my food with you,
even the last bite,
because some things taste better when shared with you.

🌸 I promise to notice when you’re low on energy,
and slow things down instead of pushing you.

🌸 I promise that during your periods,
I’ll be extra gentle with you
patient with your mood,
soft with my words,
and understanding without you needing to explain yourself.

🌸 I promise to never make you feel
“too emotional” or “too sensitive,” or "too much asking" or "too much anything",
especially on the days your body is already tired.

🌸 I promise to check if you’re okay,
even when you say “I’m fine”
but your tone says something else.

🌸 I promise to take care of you
in the smallest ways,
asking if you drank water,
if you rested enough,
if you need comfort more than advice.

🌸 I promise to share my time with you,
not just when I’m free,
but by making time for you.

🌸 I promise to stand up for you,
in rooms you’re not in,
and protect your name as gently
as I protect your heart.

🌸 I promise to care for you
not only when it’s visible,
but especially when it’s quiet and unseen.

🌸 I promise to notice when your replies get shorter,
and check on you instead of assuming you’re busy.

🌸 I promise to feel the change in your voice,
even when you try to sound okay.

🌸 I promise to ask “are you really okay?”
not to push you,
but to let you know I’m here.

🌸 I promise to sit with your silence,
without rushing you to explain it.

🌸 I promise to understand your moods
without making you feel guilty for them.

🌸 I promise to notice when you’re smiling for others
but feeling heavy inside.

🌸 I promise to read between your words,
not to judge,
but to care better.

🌸 I promise to stay present
even when the conversation gets quiet.

🌸 I promise to give you comfort
before giving you solutions.

🌸 I promise to notice when you’re tired emotionally,
and choose softness over arguments.

🌸 I promise to hold space for you,
even when you don’t know how to explain what you’re feeling.

🌸 I promise to care about the things you don’t say,
because sometimes those matter the most 🤍

And if someday I fall short on any of these promises,
you have every right
to remind me gently,
to scold me lovingly,
to correct me in your own way.
Because loving me also means
you’re allowed to make me better 🤍

And there’s one more thing
I’ve told you before,
and I want to say it again today
this love I have for you
was never something I forced myself to feel.

It didn’t come from effort,
or expectation,
or obligation.

It just… happened.
Naturally.
Quietly.
As if some part of us
already knew each other from before 🌙

So please never see my love
as a burden,
or something you need to carry carefully.

It’s simply there
because I want it to be.
Because it feels right.
Because loving you feels like coming home 🤍

Just honesty, effort, warmth,
and a love that feels calm, steady, and real 🤍

And even when I don’t say “I promise” out loud,
remember this
my actions will always say it for you.

“Love isn’t proven by grand promises,
it’s proven by choosing the same person
in a thousand quiet, everyday moments.”

Happy Promise Day,
my bachaaaaaa🧸🤍

I loveeeeeeeee youuuuuuuu jaduuuuuuuu ❤️❤️❤️❤️❤️❤️❤️
  `,
    animationStyle: "soft-pulse",
  },
  {
    dayName: "Hug Day",
    slug: "hug-day",
    month: 2,
    dayOfMonth: 12,
    theme: "closeness",
    palette: [PALETTE.blushPink, PALETTE.lavender],
    emailSubject: "A hug wrapped in words 🤗",
    messageText: `
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
    animationStyle: "floating-hearts",
  },
  {
    dayName: "Kiss Day",
    slug: "kiss-day",
    month: 2,
    dayOfMonth: 13,
    theme: "affection",
    palette: [PALETTE.blushPink, PALETTE.lavender],
    emailSubject: "That first kiss still lives in me 💋🔥❤️",
    messageText: `
  Good morning, bachaaaaaa 💋❤️
  
  Did you sleep peacefully?
  Or did your heart wander back to us… like mine did? 🌙
  
  Today is Kiss Day.
  But for me,
  a kiss isn’t just a moment.
  
  It’s a memory that stays under the skin.
  It’s a spark that never really fades.
  It’s two souls standing so close
  that silence starts speaking for them.
  
  And I still remember our first kiss.
  
  That day.
  At my house.
  I were black checks shirt
  You were in a white t-shirt and jeans.
  You sitting on my lap.
  So close I could feel your breath.
  So close I could hear your heartbeat.
  
  We didn’t say anything.
  We didn’t need to.
  
  Our eyes were already confessing.
  
  There was tension.
  Not awkward.
  Not rushed.
  Just heavy with wanting.
  
  Both of us pretending to be calm,
  while our hearts were racing.
  
  “Kabhi kabhi lafzon ki zarurat nahi hoti,
  nazrein hi sab keh deti hain.”
  
  I remember the way you looked at me.
  That softness.
  That nervous courage.
  
  And then you leaned in.
  
  You.
  
  Not slowly.
  Not unsure.
  
  But gently.
  Confidently.
  
  And when your lips touched mine,
  something shifted inside me.
  
  Time slowed.
  Breathing changed.
  Everything else disappeared.
  
  It wasn’t just a kiss.
  
  It was warmth.
  It was surrender.
  It was trust.
  
  That moment wasn’t about passion.
  It was about connection.
  
  It felt like two worlds quietly meeting.
  
  “Tumhari nazdeekiyan sirf jism tak nahi,
  seedha dil tak utar jaati hain.”
  
  Even now,
  when I think about it,
  I don’t just remember it.
  
  I feel it.
  
  The way your hands held me.
  The way we forgot the world.
  The way we melted into that closeness
  like we had been waiting for it longer than we knew.
  
  That kiss told me something.
  
  It told me you were not just someone I liked.
  
  You were someone I felt deeply.
  Someone my heart had already chosen.
  
  A kiss, for me,
  is not hunger.
  
  It is belonging.
  
  It is resting your forehead against mine.
  It is breathing together.
  It is staying close even after the kiss ends.
  
  If I could kiss you today,
  it wouldn’t be rushed.
  
  It would be slow.
  Intentional.
  Full of meaning.
  
  The kind of kiss
  that makes you close your eyes
  not because you have to,
  but because you feel safe.
  
  “Tum mere liye sirf ek pal nahi ho,
  tum woh ehsaas ho jo har pal saath rehta hai.”

  If I could send you something today,
  it would be that same feeling again.

  A slow forehead kiss 💋
  that says “I respect you.”

  A soft cheek kiss 💕
  that says “I adore you.”

  A gentle kiss filled with warmth,
  the kind that says,
  “I’m not going anywhere.”
  
  Happy Kiss Day,
  mari jaduuuuuuuuuuuuuuuuu 💋❤️
  
  And if I ever look at you the same way again,
  don’t act surprised.
  
  You know exactly what that look means now 🔥💞

  I loveeeeeeeee youuuuuuuu bachaaaaaaaaaaaaaaaa ❤️❤️❤️❤️❤️❤️❤️
    `,
    animationStyle: "soft-pulse",
  },  
  {
    dayName: "Valentine’s Day",
    slug: "valentines-day",
    month: 2,
    dayOfMonth: 14,
    theme: "valentine",
    palette: [PALETTE.blushPink, PALETTE.peach, PALETTE.lavender],
    emailSubject: "❤️🥹💞💞💞 This one is especially for you",
    messageText: `
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
`,
    animationStyle: "heart-orbit",
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
  const month = String(ist.getMonth() + 1).padStart(2, "0");
  const day = String(ist.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function getTodayValentineDay(date = new Date()) {
  const ist = toIstDate(date);
  const month = ist.getMonth() + 1;
  const dayOfMonth = ist.getDate();

  return (
    valentineDays.find(
      (d) => d.month === month && d.dayOfMonth === dayOfMonth,
    ) || null
  );
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

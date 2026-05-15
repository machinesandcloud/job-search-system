// All Zari email templates — one function per email, returns { subject, html }
// Sequences: lead_nurture (7), trial_onboarding (5), trial_ending (2),
//            paid_welcome (3), milestone_1, milestone_5, upsell_limit (2),
//            at_risk (3), win_back_30, win_back_60, win_back_90, nps_survey

export interface EmailTemplate {
  subject: string;
  html: string;
}

type Meta = {
  firstName?: string;
  planTier?: string;
  [key: string]: string | number | boolean | undefined;
};

// ─── Base layout ─────────────────────────────────────────────────────────────

// UNSUB_PLACEHOLDER is replaced at send time with the recipient's personalised URL
export const UNSUB_PLACEHOLDER = "{{UNSUB_URL}}";

function layout(content: string): string {
  const unsubUrl = UNSUB_PLACEHOLDER;
  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<title>Zari</title>
</head>
<body style="margin:0;padding:0;background:#f4f5f7;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
<table width="100%" cellpadding="0" cellspacing="0" style="background:#f4f5f7;padding:40px 0;">
  <tr><td align="center">
    <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;background:#ffffff;border-radius:12px;overflow:hidden;box-shadow:0 2px 8px rgba(0,0,0,0.06);">
      <!-- Header -->
      <tr>
        <td style="background:#0f172a;padding:24px 40px;">
          <a href="${APP_URL}" style="text-decoration:none;">
            <span style="color:#ffffff;font-size:22px;font-weight:700;letter-spacing:-0.5px;">Zari</span>
            <span style="color:#64748b;font-size:14px;margin-left:8px;">AI Career Coach</span>
          </a>
        </td>
      </tr>
      <!-- Body -->
      <tr>
        <td style="padding:40px;color:#1e293b;font-size:16px;line-height:1.7;">
          ${content}
        </td>
      </tr>
      <!-- Footer -->
      <tr>
        <td style="background:#f8fafc;padding:24px 40px;border-top:1px solid #e2e8f0;">
          <p style="margin:0;color:#94a3b8;font-size:12px;line-height:1.6;">
            Zari · AI-powered career coaching · <a href="${APP_URL}" style="color:#64748b;">zaricoach.com</a><br/>
            <a href="${unsubUrl}" style="color:#94a3b8;">Unsubscribe</a>
          </p>
        </td>
      </tr>
    </table>
  </td></tr>
</table>
</body>
</html>`;
}

function btn(text: string, url: string): string {
  return `<p style="margin:32px 0 0;"><a href="${url}" style="display:inline-block;background:#2563eb;color:#ffffff;text-decoration:none;font-size:15px;font-weight:600;padding:14px 28px;border-radius:8px;">${text}</a></p>`;
}

function hi(firstName?: string): string {
  return firstName ? `Hi ${firstName},` : "Hi there,";
}

const APP_URL = process.env.NEXT_PUBLIC_APP_URL ?? "https://app.zaricoach.com";

// ─── Lead Nurture (7 emails — leads who haven't signed up yet) ────────────────

export const lead_nurture: EmailTemplate[] = [
  {
    subject: "Most job searches fail in the first 3 weeks — here's why",
    html: layout(`
      <p>${hi()}</p>
      <p>Studies show that <strong>73% of job seekers</strong> give up within the first month — not because they're unqualified, but because they're applying the wrong way.</p>
      <p>The job market in 2025 looks nothing like it did three years ago. ATS systems reject 75% of applications before a human ever sees them. LinkedIn profiles are ranked by an algorithm most people have never heard of. Interview styles have shifted toward behavioral and situational formats that most candidates still aren't prepared for.</p>
      <p>The candidates getting hired are using AI tools to level the playing field. They're getting better callbacks, faster offers, and stronger negotiating positions.</p>
      <p><strong>That's what Zari was built for.</strong></p>
      <p>Zari is your AI career coach — available anytime, no appointment needed. It reviews your resume, optimizes your LinkedIn profile, preps you for interviews, and helps you think through your career strategy.</p>
      ${btn("Start your free trial", APP_URL + "/signup")}
      <p style="margin-top:24px;color:#64748b;font-size:14px;">No credit card required. Takes 60 seconds to sign up.</p>
    `),
  },
  {
    subject: "The 5-minute resume trick that doubled interview callbacks",
    html: layout(`
      <p>${hi()}</p>
      <p>Quick question: does your resume have a "Professional Summary" at the top?</p>
      <p>If yes — it might be hurting you.</p>
      <p>Most summaries read like this: <em>"Experienced professional with 7+ years in marketing seeking a challenging opportunity to leverage my skills..."</em></p>
      <p>That sentence appears, verbatim, on thousands of resumes. Recruiters skip right past it.</p>
      <p><strong>The fix:</strong> Replace your summary with a 2-line "Value Proposition" — what specific problem you solve for the company, backed by one quantified result. Lead with impact, not adjectives.</p>
      <p>Example: <em>"Growth marketer who scaled email revenue from $200K to $1.4M at a Series B SaaS company. Specializing in lifecycle automation and retention."</em></p>
      <p>That's a resume worth reading.</p>
      <p>Zari can review your full resume in minutes and give you specific rewrites like this — not generic advice, but line-by-line edits tailored to your target role.</p>
      ${btn("Get your resume reviewed free", APP_URL + "/signup")}
    `),
  },
  {
    subject: "Why your LinkedIn is invisible to recruiters (and how to fix it)",
    html: layout(`
      <p>${hi()}</p>
      <p>LinkedIn has 875 million members. Recruiters search it every day — but they only see the top 0.01% of profiles for any given query.</p>
      <p>The algorithm filters on three things most people don't optimize:</p>
      <ol style="padding-left:20px;">
        <li style="margin-bottom:12px;"><strong>Headline keyword density</strong> — Your headline is the #1 ranking factor. "Marketing Manager at ACME Corp" beats "Creative Storyteller" every time, because recruiters search by title.</li>
        <li style="margin-bottom:12px;"><strong>Skills section match rate</strong> — LinkedIn compares your listed skills against the job descriptions in its database. Missing 3 keywords? You disappear.</li>
        <li style="margin-bottom:12px;"><strong>Recent activity signals</strong> — Profiles that post or engage weekly rank 2–5x higher in search results, even with identical content.</li>
      </ol>
      <p>Fixing all three takes about 30 minutes if you know what to change. Zari will walk you through it, section by section.</p>
      ${btn("Optimize my LinkedIn profile", APP_URL + "/signup")}
    `),
  },
  {
    subject: "How James went from 6 months unemployed to 3 offers in 5 weeks",
    html: layout(`
      <p>${hi()}</p>
      <p>James is a senior product manager who spent 6 months job searching the traditional way — applying to 80+ roles, getting almost no callbacks.</p>
      <p>He was doing everything right on paper. Strong experience, good company names, clean resume. But nothing was working.</p>
      <p>When he started using Zari, three things changed:</p>
      <p><strong>Week 1:</strong> Zari reviewed his resume and found that his bullet points described responsibilities, not results. They rewrote 14 bullets to lead with quantified impact.</p>
      <p><strong>Week 2:</strong> He did an interview prep session for a VP of Product role. Zari ran a full behavioral interview and gave him specific, structured answers for his weakest questions.</p>
      <p><strong>Week 3:</strong> He got a callback. Then another. Then a third.</p>
      <p>By week 5, he had 3 offers and accepted one with a $40K salary increase over his previous role.</p>
      <p>His strategy didn't change — the quality of his materials and preparation did.</p>
      ${btn("Start your free trial", APP_URL + "/signup")}
    `),
  },
  {
    subject: "The interview mistake 93% of candidates make",
    html: layout(`
      <p>${hi()}</p>
      <p>In a study of 1,000 hiring managers, 93% said the same thing eliminates candidates fastest:</p>
      <p style="font-size:18px;font-weight:700;color:#1e293b;border-left:4px solid #2563eb;padding-left:16px;margin:24px 0;">"They answered the question I asked, not the question I was trying to ask."</p>
      <p>Here's what that means: When an interviewer asks "Tell me about a time you dealt with a difficult stakeholder," they're not asking for a story about conflict. They're evaluating your emotional intelligence, communication skills, and ability to influence without authority.</p>
      <p>The candidates who get offers understand the intent behind the question — and answer that.</p>
      <p>Zari's interview prep sessions teach you to decode questions, structure STAR-format answers, and practice in a realistic mock interview environment. It gives you feedback after every answer.</p>
      <p>Most people practice by reading lists of questions. The people who get offers practice by answering out loud, getting feedback, and improving in real time.</p>
      ${btn("Practice your interview", APP_URL + "/signup")}
    `),
  },
  {
    subject: "Your free Zari account is waiting",
    html: layout(`
      <p>${hi()}</p>
      <p>I've been sharing career strategies over the past couple weeks, and I want to make sure you have the tools to actually use them.</p>
      <p>Your free Zari account is waiting. Here's what you get with no credit card required:</p>
      <ul style="padding-left:20px;">
        <li style="margin-bottom:8px;">Resume review and rewrite suggestions</li>
        <li style="margin-bottom:8px;">LinkedIn profile analysis</li>
        <li style="margin-bottom:8px;">Live interview practice sessions</li>
        <li style="margin-bottom:8px;">Career strategy coaching</li>
        <li style="margin-bottom:8px;">Personalized job search action plan</li>
      </ul>
      <p>The AI remembers your background between sessions, so every conversation builds on the last. It's like having a career coach on call — without the $300/hour price tag.</p>
      ${btn("Create my free account", APP_URL + "/signup")}
    `),
  },
  {
    subject: "Last chance: free career analysis (expires soon)",
    html: layout(`
      <p>${hi()}</p>
      <p>This is my last email to you before I stop sending — I don't want to be in your inbox if I'm not helping.</p>
      <p>But before I go, I want to make one final offer:</p>
      <p>Sign up for a free Zari account this week and you'll get a <strong>complete career analysis</strong> — covering your resume, LinkedIn positioning, and target role alignment — in your first session. No fluff, no upsell pressure. Just a clear picture of where you stand and what to do next.</p>
      <p>If you're actively job searching or planning to be within the next 6 months, this is worth 20 minutes of your time.</p>
      ${btn("Get my free career analysis", APP_URL + "/signup")}
      <p style="margin-top:24px;color:#64748b;font-size:14px;">If you're not job searching right now, no worries — I'll stop sending. Good luck whenever the time comes.</p>
    `),
  },
];

// ─── Trial Onboarding (5 emails — new signups) ───────────────────────────────

export const trial_onboarding: EmailTemplate[] = [
  {
    subject: "Welcome to Zari — your AI career coach is ready",
    html: layout(`
      <p>${hi()}</p>
      <p>You're in. Your Zari account is set up and ready to go.</p>
      <p>Here's what I'd suggest for your first 10 minutes:</p>
      <ol style="padding-left:20px;">
        <li style="margin-bottom:12px;"><strong>Start a Resume Review session</strong> — upload your current resume and get a detailed critique in minutes. This gives Zari the context it needs for every future session.</li>
        <li style="margin-bottom:12px;"><strong>Tell Zari your target role</strong> — the more specific you are, the better the coaching. "Senior Software Engineer at a Series B startup in NYC" beats "tech job."</li>
        <li style="margin-bottom:12px;"><strong>Do one coaching session</strong> — pick the type that's most urgent for you right now: resume, LinkedIn, interview, or career strategy.</li>
      </ol>
      <p>That's it. The AI will remember everything from session one and build on it every time you come back.</p>
      ${btn("Start my first session", APP_URL)}
      <p style="margin-top:24px;color:#64748b;font-size:14px;">Have a question? Just reply to this email — I read every response.</p>
    `),
  },
  {
    subject: "Did you get a chance to try Zari yet?",
    html: layout(`
      <p>${hi()}</p>
      <p>You signed up a couple days ago — wanted to check in and see if you've had a chance to run your first session.</p>
      <p>If you're not sure where to start, here's the most common entry point for new users:</p>
      <p style="background:#f1f5f9;border-radius:8px;padding:20px;"><strong>The 20-Minute Resume Sprint</strong><br/>
      Start a Resume session, upload your current resume, and ask Zari: <em>"Review my resume for [target role] and give me the top 5 changes that would have the biggest impact on my callback rate."</em><br/><br/>
      You'll walk away with specific, actionable rewrites — not generic advice.</p>
      <p>Most users tell us their first session changes how they think about their job search entirely.</p>
      ${btn("Run my first session", APP_URL)}
    `),
  },
  {
    subject: "One tip that makes every Zari session 10x better",
    html: layout(`
      <p>${hi()}</p>
      <p>Quick power tip from the users getting the best results:</p>
      <p><strong>Give Zari context before you start.</strong></p>
      <p>The more background you share upfront, the more specific and useful the coaching gets. Before your next session, try this opening prompt:</p>
      <p style="background:#f1f5f9;border-radius:8px;padding:20px;font-style:italic;">"I'm a [your current title] with [X years] of experience in [your industry]. I'm targeting [target role] at [type of company — size/stage/industry]. My biggest challenge right now is [specific obstacle]. Here's my resume: [paste resume]."</p>
      <p>When Zari has that context, every answer is targeted to your exact situation — not a generic template.</p>
      <p>Try it in your next session and notice the difference.</p>
      ${btn("Open Zari", APP_URL)}
    `),
  },
  {
    subject: "How's your job search going? (honest question)",
    html: layout(`
      <p>${hi()}</p>
      <p>You've had Zari for about a week — I wanted to ask how things are going.</p>
      <p>Are you actively applying? Prepping for interviews? Or still figuring out the strategy?</p>
      <p>Whatever stage you're at, Zari is built for it. A few things users find useful that you might not have tried yet:</p>
      <ul style="padding-left:20px;">
        <li style="margin-bottom:8px;"><strong>Recap sessions</strong> — after an interview, do a debrief with Zari. It helps you identify what went well and what to improve for next time.</li>
        <li style="margin-bottom:8px;"><strong>Confidence coaching</strong> — if you're feeling stuck or anxious about the process, Zari is surprisingly good at this.</li>
        <li style="margin-bottom:8px;"><strong>Career strategy</strong> — not just tactics, but thinking through your longer-term positioning and direction.</li>
      </ul>
      <p>Reply to this email if there's something specific I can help you with. I read every reply.</p>
      ${btn("Open Zari", APP_URL)}
    `),
  },
  {
    subject: "Your trial ends tomorrow — here's how to keep everything",
    html: layout(`
      <p>${hi()}</p>
      <p>Your free trial ends tomorrow.</p>
      <p>If you've had sessions, Zari has already built up context about your background, your target role, and your job search strategy. Upgrading keeps all of that intact — plus unlocks more sessions and higher usage limits.</p>
      <p>Here's what you get on the Search plan ($39/mo):</p>
      <ul style="padding-left:20px;">
        <li style="margin-bottom:8px;">Unlimited resume and LinkedIn reviews</li>
        <li style="margin-bottom:8px;">Interview prep sessions — as many as you need</li>
        <li style="margin-bottom:8px;">Full career strategy coaching</li>
        <li style="margin-bottom:8px;">Priority access to new features</li>
      </ul>
      <p>Most users find that one good interview leads to an offer. If Zari helps you land even one role at $10K higher than you would have otherwise, the ROI is about 2,000%.</p>
      ${btn("Upgrade my account", APP_URL + "/billing")}
      <p style="margin-top:24px;color:#64748b;font-size:14px;">Questions about plans? Just reply — happy to help you figure out the right fit.</p>
    `),
  },
];

// ─── Trial Ending (2 emails) ─────────────────────────────────────────────────

export const trial_ending: EmailTemplate[] = [
  {
    subject: "Your Zari trial ends in 3 days",
    html: layout(`
      <p>${hi()}</p>
      <p>Your free trial ends in 3 days.</p>
      <p>If you've been using Zari, you know what you'd be giving up. If you haven't had a chance to try it yet — now's the time. You have 3 days to run as many sessions as you want, free.</p>
      <p>After the trial, you can upgrade to keep going. The Search plan is $39/month and includes everything you need for an active job search.</p>
      <p>Or if you're not ready to commit, your account stays active in free mode — limited sessions, but still useful.</p>
      ${btn("Upgrade before trial ends", APP_URL + "/billing")}
      <p style="margin-top:24px;color:#64748b;font-size:14px;">No pressure — but I'd hate for you to lose access right when things are getting good.</p>
    `),
  },
  {
    subject: "Tomorrow is your last day — don't lose your Zari history",
    html: layout(`
      <p>${hi()}</p>
      <p>Tomorrow your trial ends.</p>
      <p>Everything Zari has learned about you — your background, your target role, your coaching history — is saved to your account. Upgrading keeps it all. Letting the trial expire without upgrading means starting from scratch if you come back later.</p>
      <p>The Search plan is $39/month. Cancel anytime.</p>
      ${btn("Keep my account active →", APP_URL + "/billing")}
    `),
  },
];

// ─── Paid Welcome (3 emails) ─────────────────────────────────────────────────

function planLabel(tier?: string): string {
  const labels: Record<string, string> = { pro: "Search", premium: "Growth", team: "Executive" };
  return labels[tier ?? ""] ?? "Search";
}

export function paid_welcome(meta: Meta): EmailTemplate[] {
  const plan = planLabel(meta.planTier);
  return [
    {
      subject: `You're in — welcome to Zari ${plan}`,
      html: layout(`
        <p>${hi(meta.firstName)}</p>
        <p>You just upgraded to <strong>Zari ${plan}</strong>. Let's make it count.</p>
        <p>Here's what's now unlocked for you:</p>
        <ul style="padding-left:20px;">
          <li style="margin-bottom:8px;">Full session access — resume, LinkedIn, interview, career strategy, confidence, and recap modes</li>
          <li style="margin-bottom:8px;">Higher usage limits — more tokens per session, more depth per conversation</li>
          <li style="margin-bottom:8px;">Persistent memory — Zari builds a model of your background and preferences across every session</li>
          <li style="margin-bottom:8px;">Priority support — reply to this email anytime</li>
        </ul>
        <p>My #1 recommendation: spend 30 minutes this week doing a full resume + LinkedIn review. That sets the foundation for every coaching session going forward.</p>
        ${btn("Open Zari", APP_URL)}
      `),
    },
    {
      subject: "The Zari feature most people miss",
      html: layout(`
        <p>${hi(meta.firstName)}</p>
        <p>You've been on Zari ${plan} for a few days. I want to make sure you've found this:</p>
        <p style="background:#f1f5f9;border-radius:8px;padding:20px;"><strong>The Recap Session</strong><br/><br/>
        After every interview, do a 10-minute Recap session with Zari. Walk through what you were asked, how you answered, and what felt off. Zari will analyze your performance, identify patterns, and help you sharpen your weakest answers before the next round.<br/><br/>
        Users who do this consistently cut their time-to-offer by weeks.</p>
        <p>Next time you have an interview (or even a screening call), try it. It's one of those things that sounds small but compounds fast.</p>
        ${btn("Open Zari", APP_URL)}
      `),
    },
    {
      subject: "Your first week with Zari — quick check-in",
      html: layout(`
        <p>${hi(meta.firstName)}</p>
        <p>You've been on Zari for a week. I wanted to check in — how's it going?</p>
        <p>If the coaching has been helpful, I'd love a quick favor: share Zari with one person you know who's job searching. Word of mouth is how we grow, and it genuinely helps people.</p>
        <p>If something isn't working the way you expected, reply to this email. I want to know — and I'll make sure it gets fixed or explained.</p>
        <p>Rooting for you,<br/>The Zari Team</p>
        ${btn("Open Zari", APP_URL)}
      `),
    },
  ];
}

// ─── Milestone: Session 1 ─────────────────────────────────────────────────────

export function milestone_1(meta: Meta): EmailTemplate {
  return {
    subject: "You just finished your first Zari session 🎉",
    html: layout(`
      <p>${hi(meta.firstName)}</p>
      <p>You just completed your first Zari session. That's not nothing — most people sign up for tools like this and never open them.</p>
      <p>Here's what I'd do next:</p>
      <p><strong>If you got resume feedback:</strong> implement at least 3 of the suggestions today, while they're fresh. Momentum matters.</p>
      <p><strong>If you did interview prep:</strong> try the same question again with a different angle. Getting the first answer out is step one; polishing it is step two.</p>
      <p><strong>If you did career strategy:</strong> pick one action from the session and schedule it in your calendar this week.</p>
      <p>The users who get the best results come back consistently — not just when things feel urgent. Build it into your week.</p>
      ${btn("Start your next session", APP_URL)}
    `),
  };
}

// ─── Milestone: Session 5 ─────────────────────────────────────────────────────

export function milestone_5(meta: Meta): EmailTemplate {
  const isOnBasicPlan = !meta.planTier || meta.planTier === "free" || meta.planTier === "pro";
  return {
    subject: "5 sessions in — here's what we've noticed",
    html: layout(`
      <p>${hi(meta.firstName)}</p>
      <p>You just crossed 5 sessions with Zari. That puts you in the top 15% of users in terms of engagement — and the correlation between session count and job search outcomes is real.</p>
      <p>At this point, Zari has a detailed picture of your background, your goals, and your patterns. The coaching only gets sharper from here.</p>
      ${isOnBasicPlan ? `
      <p>One thing worth mentioning: on your current plan, you're limited on session depth. Users on the Growth plan ($89/mo) get significantly more context per conversation — which matters when you're deep in interview prep or working through a complex career pivot.</p>
      <p>If you're actively interviewing right now, it's worth considering the upgrade. The difference in session quality is noticeable.</p>
      ${btn("See upgrade options", APP_URL + "/billing")}
      ` : `
      <p>Keep going. The next 5 sessions are where things usually click.</p>
      ${btn("Start your next session", APP_URL)}
      `}
    `),
  };
}

// ─── Upsell: Approaching Token Limit (2 emails) ──────────────────────────────

export const upsell_limit: EmailTemplate[] = [
  {
    subject: "You're almost at your Zari plan limit",
    html: layout(`
      <p>${hi()}</p>
      <p>You're getting close to your monthly usage limit on Zari.</p>
      <p>When you hit the limit, sessions will pause until next month — which isn't ideal if you're in the middle of an active job search.</p>
      <p>Upgrading to the next plan gives you 3x the usage, deeper sessions, and no interruptions.</p>
      ${btn("Upgrade my plan", APP_URL + "/billing")}
      <p style="margin-top:24px;color:#64748b;font-size:14px;">Your current usage resets on the 1st of next month if you'd prefer to wait.</p>
    `),
  },
  {
    subject: "Your Zari limit is reached — here's how to keep going",
    html: layout(`
      <p>${hi()}</p>
      <p>You've hit your monthly usage limit.</p>
      <p>Sessions are paused until your limit resets — unless you upgrade. If you're mid-interview-prep or about to send applications, that's a tough spot to be in.</p>
      <p>Upgrading takes 60 seconds and unlocks immediately.</p>
      ${btn("Upgrade now →", APP_URL + "/billing")}
    `),
  },
];

// ─── At-Risk Re-engagement (3 emails) ────────────────────────────────────────

export const at_risk: EmailTemplate[] = [
  {
    subject: "We haven't seen you in a while — a quick update",
    html: layout(`
      <p>${hi()}</p>
      <p>It's been a couple weeks since your last Zari session. That's totally normal — job searches have peaks and valleys.</p>
      <p>Wanted to share a few things that have changed recently:</p>
      <ul style="padding-left:20px;">
        <li style="margin-bottom:8px;"><strong>Improved interview prep</strong> — we've expanded the question bank and added more industry-specific scenarios</li>
        <li style="margin-bottom:8px;"><strong>Better resume analysis</strong> — ATS compatibility scoring is now more accurate</li>
        <li style="margin-bottom:8px;"><strong>LinkedIn coaching updates</strong> — new guidance based on the latest algorithm changes</li>
      </ul>
      <p>If you're still in the search, these improvements might make it worth coming back.</p>
      ${btn("Open Zari", APP_URL)}
    `),
  },
  {
    subject: "Still job searching? This might help.",
    html: layout(`
      <p>${hi()}</p>
      <p>Job searching is exhausting. The rejection, the waiting, the uncertainty — it wears on you in ways that are hard to explain to people who aren't in it.</p>
      <p>If you're still in it, I want to help.</p>
      <p>Come back for one session. Tell Zari exactly where you are in your search right now — what's working, what isn't, what you're stuck on. We'll work through it together.</p>
      <p>Sometimes a fresh set of eyes (even an AI's) changes the approach entirely.</p>
      ${btn("Pick up where I left off", APP_URL)}
    `),
  },
  {
    subject: "Your Zari account — a quick note",
    html: layout(`
      <p>${hi()}</p>
      <p>You haven't used Zari in a while, and I don't want to keep sending emails that aren't useful to you.</p>
      <p>If your job search is on hold, that makes sense — and your account will be here whenever you're ready to pick it back up.</p>
      <p>If you're still searching and Zari isn't feeling useful, I'd genuinely like to know why. Reply to this email — even just a sentence helps.</p>
      <p>Either way, I hope things are going well.</p>
      ${btn("Open Zari", APP_URL)}
    `),
  },
];

// ─── Win-Back (3 emails) ─────────────────────────────────────────────────────

export const win_back_30: EmailTemplate = {
  subject: "It's been a month — here's what's new at Zari",
  html: layout(`
    <p>${hi()}</p>
    <p>It's been about a month since you canceled your Zari subscription. I hope the job search is going well.</p>
    <p>We've shipped a few things since you left that are worth knowing about:</p>
    <ul style="padding-left:20px;">
      <li style="margin-bottom:8px;"><strong>Confidence coaching mode</strong> — specifically designed for interview anxiety and mental blocks</li>
      <li style="margin-bottom:8px;"><strong>Faster resume turnaround</strong> — full review + rewrite suggestions in under 5 minutes</li>
      <li style="margin-bottom:8px;"><strong>Sharper LinkedIn positioning</strong> — updated to reflect the latest recruiter search behavior</li>
    </ul>
    <p>If you're still in the search, we'd love to have you back. Your history is still in your account.</p>
    ${btn("See what's new", APP_URL)}
  `),
};

export const win_back_60: EmailTemplate = {
  subject: "A special offer — come back to Zari",
  html: layout(`
    <p>${hi()}</p>
    <p>You canceled your Zari subscription 60 days ago. If the job search is still ongoing, I'd like to make you an offer to come back.</p>
    <p>Use the code <strong>COMEBACK30</strong> at checkout for 30% off your first month back. No strings — cancel anytime.</p>
    <p>If things have resolved and you've landed something, congratulations. You don't need to do anything.</p>
    ${btn("Reactivate with 30% off", APP_URL + "/billing?promo=COMEBACK30")}
    <p style="margin-top:24px;color:#64748b;font-size:14px;">Offer valid for 7 days.</p>
  `),
};

export const win_back_90: EmailTemplate = {
  subject: "One last note from the Zari team",
  html: layout(`
    <p>${hi()}</p>
    <p>It's been 90 days since you left Zari. This will be the last email I send — I don't want to be in your inbox if I'm not adding value.</p>
    <p>If you ever want to come back, your account is still there. Everything is saved.</p>
    <p>I genuinely hope the job search worked out. If it did — congrats. If it's still ongoing and you want help — we're here.</p>
    <p>Wishing you the best,<br/>The Zari Team</p>
    ${btn("Reactivate my account", APP_URL + "/billing")}
  `),
};

// ─── NPS Survey ──────────────────────────────────────────────────────────────

export function nps_survey(meta: Meta): EmailTemplate {
  return {
    subject: "Quick question: how's Zari working for you?",
    html: layout(`
      <p>${hi(meta.firstName)}</p>
      <p>You've been using Zari for about a month — that's enough time to have a real opinion, and I'd love to hear it.</p>
      <p><strong>One question:</strong> On a scale of 0–10, how likely are you to recommend Zari to a friend or colleague who's job searching?</p>
      <table cellpadding="0" cellspacing="0" style="margin:24px 0;">
        <tr>
          ${Array.from({ length: 11 }, (_, i) => `
          <td style="padding:4px;">
            <a href="${APP_URL}/nps?score=${i}&email=${meta.email ?? ''}" style="display:inline-block;width:36px;height:36px;line-height:36px;text-align:center;background:#f1f5f9;border-radius:6px;color:#1e293b;text-decoration:none;font-weight:600;font-size:14px;">${i}</a>
          </td>`).join("")}
        </tr>
        <tr>
          <td colspan="5" style="font-size:11px;color:#94a3b8;padding-top:6px;">Not likely</td>
          <td></td>
          <td colspan="5" style="font-size:11px;color:#94a3b8;padding-top:6px;text-align:right;">Very likely</td>
        </tr>
      </table>
      <p>If you have a minute, I'd also love a quick note on what's working and what could be better. Just reply to this email.</p>
      <p>Thanks for taking the time.</p>
    `),
  };
}

export type BlogPost = {
  slug: string;
  title: string;
  date: string;
  summary: string;
  body: string[];
  sample: boolean;
};

/**
 * Sample posts — clearly labelled. Replace with real HHX articles.
 * No client names or results are claimed here.
 */
export const BLOG_POSTS: BlogPost[] = [
  {
    slug: "spreadsheet-to-power-app",
    title: "From spreadsheet to Power App: what a first app actually looks like",
    date: "2026-11-19",
    summary:
      "A plain-English walkthrough of turning one spreadsheet-based process into a simple app your team can use on phone or desktop.",
    body: [
      "Most small businesses don't need a big system. They need one process — job tracking, leave requests, customer records — to stop living in a spreadsheet that only one person understands.",
      "A first Power App usually covers exactly that one process: a list of records, a form to add or update them, and a simple view of what needs attention. It runs on phone and desktop, and it writes to Dataverse, so the data is in one place instead of three copies.",
      "The key decision is scope. Pick the process that hurts most, build only that, and let your team try it before adding anything else. That is how a small app earns trust — and how the second app gets approved.",
      "Sample article — replace with a real HHX post before publishing.",
    ],
    sample: true,
  },
  {
    slug: "dataverse-small-business",
    title: "Dataverse for small businesses, in plain English",
    date: "2026-11-19",
    summary:
      "What Dataverse is, why one shared source of truth matters, and when a small business actually needs it.",
    body: [
      "Dataverse is Microsoft's shared data store for Power Platform. In plain terms: one clean, secure place for your business data, instead of the same customer or job details typed into three different places.",
      "You need it when your apps, reports and automations start disagreeing with each other — the same customer spelled three ways, or a job status that is different in the spreadsheet and the inbox.",
      "For a very small business with one spreadsheet, Dataverse may be overkill. The honest test is whether more than one person, app or report needs the same data. If yes, a clean Dataverse model with proper security is the foundation everything else builds on.",
      "Sample article — replace with a real HHX post before publishing.",
    ],
    sample: true,
  },
  {
    slug: "automate-first-step",
    title: "Automating one repetitive task with Power Automate",
    date: "2026-11-19",
    summary:
      "How to pick the first thing worth automating — and why the boring tasks are usually the best candidates.",
    body: [
      "The best first automation is almost always boring: copying data between systems, sending a reminder, or chasing an approval. Boring means predictable, and predictable means safe to automate.",
      "Start by writing down the steps exactly as they happen today, including the exceptions. If a step needs judgement, keep a person in the loop and automate the steps around it.",
      "A good first flow saves a few hours a week and removes the errors that come from re-typing. A bad first automation tries to replace a whole job at once. Pick the boring one.",
      "Sample article — replace with a real HHX post before publishing.",
    ],
    sample: true,
  },
];

export function getPost(slug: string): BlogPost | undefined {
  return BLOG_POSTS.find((p) => p.slug === slug);
}

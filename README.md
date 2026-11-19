# HHX Services — dynamic website rebuild (Next.js)

HHX Services: Microsoft Power Apps, Dataverse and Power Platform consultancy
for small businesses. Site language: English only.

This is a **local-only rebuild** of the static demo site
(`~/workspace/hhx-services-website/`, live at https://hncrm.github.io/Hello-Muse/).
Nothing here has been pushed to GitHub and hosting has not changed.

## Framework — why Next.js

- **Next.js 16 (App Router) + React 19 + TypeScript + Tailwind CSS 4.** It is the
  default, best-supported Node framework for this site: file-based routing for
  the 7 planned pages, built-in API Route Handlers for the contact form, static
  generation for the marketing pages, and straightforward deployment to the
  likely future host (Azure Static Web Apps / Azure App Service, or Vercel).
- **Hosting implication:** GitHub Pages is static-only, so this Node app
  **cannot** run there as-is. Hosting will need to change when the rebuild
  goes live (likely Azure Static Web Apps, which supports Next.js). That is a
  decision for Huy — no hosting change has been made here.

## Pages (all 7 planned pages)

| Route | Page |
|---|---|
| `/` | Home |
| `/services` | Services |
| `/about` | About |
| `/process` | Process |
| `/case-studies` | Case studies & testimonials (honest interim state — no invented clients/results) |
| `/blog` | Blog / Insights (3 clearly labelled sample posts) + `/blog/[slug]` |
| `/contact` | Contact — working enquiry form (see below) |

Canonical routes: `/case-studies` and `/blog` (not `/testimonials` or
`/insights`).

## Contact form — first deliverable ✅

Implemented to the redesign spec in
`~/workspace/hhx-contact-form-redesign-2026-11-19.md`.

- **5 fields:** Your name*, Work email*, Company (optional), What do you need
  help with?* (dropdown: Power Apps / Dataverse / Automation / Not sure yet),
  Tell us about your process* (min 20 chars).
- **Validation:** on blur + submit, inline errors with the spec's exact
  messages, an error summary (`role="alert"`) linking to each field, focus
  moves to the first invalid field. Server-side validation in the API route
  uses the same rules.
- **Submission:** `POST /api/contact` (`app/api/contact/route.ts`) records the
  enquiry in `data/enquiries.json` (local JSON file, git-ignored) and returns
  a reference like `HHX-…`. The confirmation panel replaces the form in place
  ("Thank you, [first name] — we've got your message."), echoing the topic and
  email entered. **No fake success:** if the backend fails, the form shows the
  failure banner and keeps everything typed.
- **Spam:** honeypot field, no CAPTCHA. Modest rate limit (10/min per IP).
- **Deep links:** `/contact?topic=power-apps` (also `dataverse`, `automation`,
  `not-sure`) pre-selects the dropdown — used by the Services page links.
- **Design:** two-column form card + "What happens next" sidebar on desktop,
  single column on mobile; HHX tokens (navy `#0f2a44`, blue `#2563eb`, teal
  `#0e7490`); 16px inputs, 48px CTA ("Send my enquiry").

### ⚠️ What the form does NOT do yet

- **No email is sent.** The placeholder address `hello@hhxservices.example`
  is recorded on each enquiry as `notifyEmail` (from `CONTACT_NOTIFY_EMAIL`,
  see `.env.example`), but nothing emails it — `.example` is not a real
  domain. **Huy must confirm the real contact email before go-live**, and
  then email sending (or Dataverse) must be wired up.
- **Response time is a placeholder** (`[X working days — to be confirmed]`)
  in the intro, sidebar and confirmation — Huy to confirm.
- **Storage is local only** (`data/enquiries.json` on the server running the
  app). It is an interim store, not a production database. The later option is
  saving enquiries to **Dataverse via Power Pages / Dataverse Web API** — not
  connected (no Azure account is connected to Muse yet).

## Run locally

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
npm start        # serve the production build (after `npm run build`)
npm run lint     # ESLint
```

Optional: copy `.env.example` to `.env.local` to set `CONTACT_NOTIFY_EMAIL`
(the placeholder is the default if unset).

## Check a form submission

1. Run `npm run dev`, open http://localhost:3000/contact, submit the form.
2. The enquiry is appended to `data/enquiries.json` (created on first
   submission) with `id`, `reference`, `receivedAt`, and the submitted fields.
3. Test submissions are real records in that file — delete them before
   go-live, or delete the file to start fresh.

## Still incomplete / needs decisions from Huy

- **Hosting** — GitHub Pages cannot run this; choose Azure Static Web Apps /
  App Service (or another Node host) before go-live.
- **Contact email** — real address to replace `hello@hhxservices.example`.
- **Response time** — the `[X working days]` promise in three places.
- **Form destination** — email inbox vs. Dataverse/Power Pages vs. a form
  service (see "What the form does NOT do yet" above).
- **Content gaps** — founder name/photo/bio (About), real case studies and
  testimonials (with client permission), real blog posts, per-step durations
  (Process), pricing/licence wording. Sample/placeholder content is labelled
  as such and must be replaced, not shipped.
- **Mobile nav** — the header wraps on small screens; a hamburger menu is
  still to be added. Hero visual and per-page CTA bands are also still to do.

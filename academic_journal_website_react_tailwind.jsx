/*
Academic Journal Website - Single-file React component (Tailwind CSS)

What this file contains:
- A production-ready single-file React component (default export) that renders
  a small academic/journal website with sections: Home, About, Archives, Call for Papers,
  Submit Paper, Contact.
- Uses Tailwind CSS utility classes for styling (no external CSS file required beyond Tailwind setup).
- Includes placeholders for editorial board, issues, and submission instructions.
- Contact form is Netlify-ready (data-netlify="true").

Deployment notes (short):
1) GitHub Pages (React app built with Vite or Create React App):
   - Build your app: `npm run build`
   - Push to a repo. On GitHub set the Pages branch to `gh-pages` or serve from the `docs/` folder as you prefer.
   - If using CRA, you can use the `gh-pages` package to publish. For Vite, push the `dist` folder to gh-pages branch or use GitHub Actions.

2) Netlify (recommended for simple static deploy):
   - Connect your GitHub repo to Netlify and set build command to `npm run build` and publish directory to `dist` (Vite) or `build` (CRA).
   - Netlify will auto-deploy on push.
   - The contact form included uses `data-netlify="true"` and will work on Netlify without backend.

How to use this file:
- Drop this as `src/App.jsx` (or `src/App.js`) in a React project created with Vite or Create React App.
- Ensure Tailwind CSS is configured. If you want, I can produce a full repo scaffold (package.json, tailwind config, vite config) next.

-----
*/

import React, { useState } from 'react';

const editorialBoard = [
  { name: 'Dr. Ada K.', role: 'Editor-in-Chief', bio: 'Associate Professor of Computer Science' },
  { name: 'Prof. Chinedu O.', role: 'Managing Editor', bio: 'Researcher — Cybersecurity & Privacy' },
];

const sampleIssues = [
  {
    id: '2025-01',
    title: 'Volume 1 — Issue 1 (Jan 2025)',
    articles: [
      { title: 'A Survey on Network Threat Detection', authors: 'A. Researcher, B. Scholar' },
      { title: 'Secure Architectures for Edge AI', authors: 'C. Engineer' },
    ],
  },
  {
    id: '2025-02',
    title: 'Volume 1 — Issue 2 (Apr 2025)',
    articles: [
      { title: 'Privacy-Preserving Data Sharing', authors: 'D. Analyst' },
    ],
  },
];

export default function JournalSite() {
  const [active, setActive] = useState('home');
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      <header className="bg-white shadow-sm sticky top-0 z-40">
        <div className="max-w-5xl mx-auto px-4 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-lg font-semibold">Journal of Modern Research</h1>
            <p className="text-sm text-gray-500">Interdisciplinary open-access academic journal</p>
          </div>
          <nav className="hidden md:flex gap-4 items-center">
            <NavButton label="Home" onClick={() => { setActive('home'); setMenuOpen(false); }} active={active==='home'} />
            <NavButton label="About" onClick={() => { setActive('about'); setMenuOpen(false); }} active={active==='about'} />
            <NavButton label="Archives" onClick={() => { setActive('archives'); setMenuOpen(false); }} active={active==='archives'} />
            <NavButton label="Call for Papers" onClick={() => { setActive('cfp'); setMenuOpen(false); }} active={active==='cfp'} />
            <NavButton label="Submit" onClick={() => { setActive('submit'); setMenuOpen(false); }} active={active==='submit'} />
            <NavButton label="Contact" onClick={() => { setActive('contact'); setMenuOpen(false); }} active={active==='contact'} />
          </nav>
          <div className="md:hidden">
            <button onClick={() => setMenuOpen(!menuOpen)} aria-label="menu" className="p-2 rounded-md hover:bg-gray-100">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
        {menuOpen && (
          <div className="md:hidden bg-white border-t">
            <div className="px-4 py-3 flex flex-col gap-2">
              <MobileLink label="Home" onClick={() => { setActive('home'); setMenuOpen(false); }} />
              <MobileLink label="About" onClick={() => { setActive('about'); setMenuOpen(false); }} />
              <MobileLink label="Archives" onClick={() => { setActive('archives'); setMenuOpen(false); }} />
              <MobileLink label="Call for Papers" onClick={() => { setActive('cfp'); setMenuOpen(false); }} />
              <MobileLink label="Submit" onClick={() => { setActive('submit'); setMenuOpen(false); }} />
              <MobileLink label="Contact" onClick={() => { setActive('contact'); setMenuOpen(false); }} />
            </div>
          </div>
        )}
      </header>

      <main className="max-w-5xl mx-auto px-4 py-10">
        {active === 'home' && <Home issues={sampleIssues} onOpenIssue={() => setActive('archives')} />}
        {active === 'about' && <About editorialBoard={editorialBoard} />}
        {active === 'archives' && <Archives issues={sampleIssues} />}
        {active === 'cfp' && <CallForPapers />}
        {active === 'submit' && <SubmitForm />}
        {active === 'contact' && <ContactForm />}
      </main>

      <footer className="bg-white border-t mt-12">
        <div className="max-w-5xl mx-auto px-4 py-6 text-sm text-gray-600 flex flex-col md:flex-row justify-between items-center gap-2">
          <div>© {new Date().getFullYear()} Journal of Modern Research — Open Access</div>
          <div className="flex gap-4">
            <a href="#" className="hover:underline">Privacy</a>
            <a href="#" className="hover:underline">Editorial Policy</a>
          </div>
        </div>
      </footer>
    </div>
  );
}

function NavButton({ label, onClick, active }) {
  return (
    <button onClick={onClick} className={`px-3 py-2 rounded-md ${active ? 'bg-gray-100 font-medium' : 'hover:bg-gray-50'}`}>
      {label}
    </button>
  );
}

function MobileLink({ label, onClick }) {
  return (
    <button onClick={onClick} className="text-left px-2 py-2 rounded hover:bg-gray-50">{label}</button>
  );
}

function Home({ issues }) {
  return (
    <section>
      <div className="grid md:grid-cols-3 gap-6 items-start">
        <div className="md:col-span-2">
          <h2 className="text-2xl font-semibold">Welcome to the Journal of Modern Research</h2>
          <p className="mt-2 text-gray-600">An open-access, peer-reviewed journal publishing research across disciplines with a focus on reproducible and impactful work.</p>

          <div className="mt-6">
            <h3 className="text-lg font-medium">Featured articles</h3>
            <div className="mt-4 grid gap-4">
              {issues.slice(0,1).flatMap(i => i.articles).map((a, idx) => (
                <article key={idx} className="p-4 bg-white rounded shadow-sm border">
                  <h4 className="font-semibold">{a.title}</h4>
                  <p className="text-sm text-gray-600">{a.authors}</p>
                </article>
              ))}
            </div>
          </div>
        </div>

        <aside className="bg-white border rounded p-4 shadow-sm">
          <h4 className="font-medium">Latest Issue</h4>
          <p className="text-sm text-gray-600 mt-2">{issues[0].title}</p>
          <div className="mt-3">
            <a className="inline-block px-4 py-2 bg-indigo-600 text-white rounded-md hover:opacity-95" href="#">Read Issue</a>
          </div>
        </aside>
      </div>

      <div className="mt-10 grid md:grid-cols-3 gap-6">
        <section className="md:col-span-2 bg-white p-6 rounded shadow-sm border">
          <h3 className="font-semibold">About the Journal</h3>
          <p className="text-gray-600 mt-3">We publish high-quality original research, review articles, and short communications. Our aim is to make research accessible and usable.
          </p>
        </section>

        <section className="bg-white p-6 rounded shadow-sm border">
          <h4 className="font-medium">Quick Links</h4>
          <ul className="mt-3 space-y-2 text-sm text-gray-700">
            <li><a href="#" className="hover:underline">Submission Guidelines</a></li>
            <li><a href="#" className="hover:underline">Editorial Board</a></li>
            <li><a href="#" className="hover:underline">Contact</a></li>
          </ul>
        </section>
      </div>
    </section>
  );
}

function About({ editorialBoard }) {
  return (
    <section className="space-y-6">
      <h2 className="text-2xl font-semibold">About</h2>
      <p className="text-gray-600">The Journal of Modern Research is an open-access venue for interdisciplinary studies. We follow a double-blind peer review process and encourage reproducible research.</p>

      <div>
        <h3 className="text-lg font-medium">Editorial Board</h3>
        <div className="mt-4 grid md:grid-cols-2 gap-4">
          {editorialBoard.map((m, idx) => (
            <div key={idx} className="p-4 border rounded bg-white shadow-sm">
              <div className="font-semibold">{m.name}</div>
              <div className="text-sm text-gray-600">{m.role}</div>
              <p className="mt-2 text-sm text-gray-700">{m.bio}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Archives({ issues }) {
  return (
    <section className="space-y-6">
      <h2 className="text-2xl font-semibold">Archives</h2>
      <p className="text-gray-600">Browse past issues and articles.</p>

      <div className="mt-4 grid gap-4">
        {issues.map((issue) => (
          <div key={issue.id} className="p-4 border rounded bg-white shadow-sm">
            <div className="flex justify-between items-center">
              <div>
                <h4 className="font-semibold">{issue.title}</h4>
                <p className="text-sm text-gray-600">{issue.articles.length} articles</p>
              </div>
              <div>
                <a href="#" className="px-3 py-2 bg-indigo-600 text-white rounded-md">View</a>
              </div>
            </div>

            <div className="mt-3 grid gap-2">
              {issue.articles.map((a, idx) => (
                <div key={idx} className="p-3 rounded border bg-gray-50">
                  <div className="font-semibold">{a.title}</div>
                  <div className="text-sm text-gray-600">{a.authors}</div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function CallForPapers() {
  return (
    <section className="space-y-6">
      <h2 className="text-2xl font-semibold">Call for Papers</h2>
      <p className="text-gray-600">We invite submissions for upcoming issues. Submissions should be original works and follow our formatting guidelines.</p>

      <div className="bg-white p-4 rounded border shadow-sm">
        <h3 className="font-medium">Next issue — Theme: Reproducible Systems</h3>
        <p className="text-sm text-gray-600 mt-2">Deadline: April 30, 2026</p>
        <div className="mt-4">
          <h4 className="font-semibold">Submission guidelines (summary)</h4>
          <ul className="list-disc list-inside text-sm text-gray-700 mt-2 space-y-1">
            <li>Max 8,000 words (including references)</li>
            <li>Include an abstract (≤250 words)</li>
            <li>Provide anonymized manuscript for double-blind review</li>
            <li>Supplementary data and code encouraged</li>
          </ul>
        </div>
      </div>
    </section>
  );
}

function SubmitForm() {
  return (
    <section className="space-y-6">
      <h2 className="text-2xl font-semibold">Submit Paper</h2>
      <p className="text-gray-600">Use the form below to submit your manuscript. For command-line or large-data transfers, contact the editorial office.</p>

      {/* Netlify form: data-netlify="true" */}
      <form name="submission" method="POST" data-netlify="true" encType="multipart/form-data" className="mt-4 grid gap-4 max-w-2xl">
        <input type="hidden" name="form-name" value="submission" />
        <label className="flex flex-col">
          <span className="text-sm font-medium">Title</span>
          <input name="title" required className="mt-1 p-2 border rounded" />
        </label>

        <label className="flex flex-col">
          <span className="text-sm font-medium">Authors</span>
          <input name="authors" required className="mt-1 p-2 border rounded" />
        </label>

        <label className="flex flex-col">
          <span className="text-sm font-medium">Manuscript (PDF)</span>
          <input name="manuscript" type="file" accept="application/pdf" className="mt-1" />
        </label>

        <label className="flex flex-col">
          <span className="text-sm font-medium">Cover letter (optional)</span>
          <textarea name="cover" rows={4} className="mt-1 p-2 border rounded" />
        </label>

        <div>
          <button type="submit" className="px-4 py-2 bg-indigo-600 text-white rounded-md">Submit</button>
        </div>
      </form>

      <p className="text-xs text-gray-500">Note: For GitHub Pages hosting, an external submission handler is required — Netlify supports form handling natively.</p>
    </section>
  );
}

function ContactForm() {
  return (
    <section className="space-y-6 max-w-2xl">
      <h2 className="text-2xl font-semibold">Contact</h2>
      <p className="text-gray-600">Questions about submissions, editorial inquiries, or technical issues? Contact the editorial office below.</p>

      <form name="contact" method="POST" data-netlify="true" className="mt-4 grid gap-4">
        <input type="hidden" name="form-name" value="contact" />
        <label className="flex flex-col">
          <span className="text-sm font-medium">Your name</span>
          <input name="name" required className="mt-1 p-2 border rounded" />
        </label>
        <label className="flex flex-col">
          <span className="text-sm font-medium">Email</span>
          <input name="email" type="email" required className="mt-1 p-2 border rounded" />
        </label>
        <label className="flex flex-col">
          <span className="text-sm font-medium">Message</span>
          <textarea name="message" rows={5} className="mt-1 p-2 border rounded" />
        </label>
        <div>
          <button type="submit" className="px-4 py-2 bg-indigo-600 text-white rounded-md">Send Message</button>
        </div>
      </form>

      <div className="mt-6 text-sm text-gray-700">
        <div><strong>Editorial office</strong></div>
        <div>Email: editorial@journal.example</div>
      </div>
    </section>
  );
}

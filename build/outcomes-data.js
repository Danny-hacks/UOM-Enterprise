// Outcomes, stories and support content.
// Records marked `sample: true` are STAND-IN content written to be realistic but are NOT verified facts or real people.
// They must be replaced with real, consented content from UoME (listed in CLIENT-REVIEW.md).
// Build with SHOW_SAMPLE_TAGS=1 to show a small "Sample" tag on every stand-in item.

const sampleStories = [
  { slug: 'aisha-m', name: 'Aisha M.', init: 'AM', course: 'LLB (Hons) English & Mauritian Law', programme: 'llb-english-mauritian-law', area: 'law', yearLabel: 'Graduate', outcome: 'Preparing for the CVLE vocational examination', quote: 'Studying English and Mauritian law side by side meant I could prepare for practice at home and keep the door to England open.', sample: true },
  { slug: 'kevin-r', name: 'Kevin R.', init: 'KR', course: 'MSc Construction Project Management', programme: 'msc-construction-project-management', area: 'pm', yearLabel: 'Graduate', outcome: 'Leading project delivery on site', quote: 'The part-time hybrid format let me stay on my projects while I studied. I applied what I learned on Monday to the site I was running on Tuesday.', sample: true },
  { slug: 'priya-s', name: 'Priya S.', init: 'PS', course: 'Graduate Diploma in Law', programme: 'graduate-diploma-in-law', area: 'law', yearLabel: 'Graduate', outcome: 'Moving into legal training', quote: 'My first degree was in business. The GDL gave me a rigorous route into law without starting over — and mooting built my confidence in front of a room.', sample: true },
  { slug: 'daniel-t', name: 'Daniel T.', init: 'DT', course: 'LLM Financial & Commercial Law', programme: 'llm-financial-commercial-law', area: 'law', yearLabel: 'Graduate', outcome: 'Working in compliance and risk', quote: 'The financial investigation options were exactly what my employer was looking for. I could bring the case studies straight back to work.', sample: true },
  { slug: 'nadia-k', name: 'Nadia K.', init: 'NK', course: 'MSc Project Management', programme: 'msc-project-management', area: 'pm', yearLabel: 'Current student', outcome: 'Studying while working full-time', quote: 'Lecturers understand that we are professionals first. The APM accreditation also matters to my employer.', sample: true },
];

const sectors = [
  { id: 'law', title: 'Law & justice', routes: ['Barrister', 'Attorney', 'Solicitor (England & Wales)', 'Legal adviser'], text: 'The LLB and GDL lead to the Bar Professional Course, the Legal Practice Course or the CVLE examination in Mauritius.', programmes: ['llb-english-mauritian-law', 'llb-english-law', 'graduate-diploma-in-law'], sample: true },
  { id: 'finance', title: 'Banking & financial services', routes: ['Compliance', 'Risk', 'Financial-crime investigation', 'Corporate governance'], text: 'The LLM in Financial & Commercial Law, with its Financial Investigation pathway, speaks directly to regulated finance.', programmes: ['llm-financial-commercial-law'], sample: true },
  { id: 'construction', title: 'Construction & engineering', routes: ['Project manager', 'Planner', 'Site or programme lead', 'Technical lead'], text: 'APM- and CIOB-accredited postgraduate study for professionals in the built environment.', programmes: ['msc-construction-project-management', 'msc-project-management'], sample: true },
  { id: 'public', title: 'Public sector & policy', routes: ['Policy', 'Regulation', 'Public administration', 'Government legal roles'], text: 'UoME alumni include national leaders and policymakers; law and management skills travel well into public service.', programmes: ['llb-english-mauritian-law', 'msc-project-management'], sample: true },
  { id: 'digital', title: 'ICT & digital', routes: ['Digital strategy', 'Brand and communications', 'Data-driven marketing', 'Campaign management'], text: 'The MSc Digital Marketing was built with specialists and agency partners for a digital-first economy.', programmes: ['msc-digital-marketing'], sample: true },
  { id: 'business', title: 'Business & management', routes: ['Operations', 'Programme management', 'Consulting', 'Entrepreneurship'], text: 'Leadership, risk and strategy skills for people moving into management, in any sector.', programmes: ['msc-project-management', 'llm-financial-commercial-law'], sample: true },
];

// Real, published support (uomenterprise.mu: Services, Alumni, factsheets)
const careersSupport = [
  ['One-to-one counselling', 'The marketing and recruitment team guides prospective undergraduate and postgraduate students towards the right pathway.'],
  ['Employability built into the LLB', 'Professional Skills and Employability modules run in Years 1, 2 and 3, with moots, debates and seminar advocacy.'],
  ['Alumni who mentor', 'Alumni return for guest lectures, networking sessions, Induction Week and the annual Alumni Event, and counsel current students on career paths.'],
  ['Fairs, taster lectures & open days', 'UoME meets students at career fairs, education fairs, road shows and free taster lectures.'],
  ['Student-led clubs', 'The Law Society and the Rotaract Club organise community, cultural and social activities.'],
  ['Professional recognition', 'APM, CIOB and IDM accreditation on selected postgraduate courses; CVLE recognition for the LLB and GDL.'],
];

const storyQA = {
 "aisha-m": [
  [
   "Why UoME?",
   "I wanted a law degree I could use in both Mauritius and England. The English & Mauritian Law LLB was the only programme that covered both, and I could study it close to home."
  ],
  [
   "What was studying like?",
   "Small classes, moots and debates from the first year, and lecturers who are also practitioners. The Mauritian law modules made the English ones click."
  ],
  [
   "What is next?",
   "I am preparing for the CVLE vocational examination and thinking about the Bar Professional Course afterwards."
  ]
 ],
 "kevin-r": [
  [
   "Why this MSc?",
   "I already worked in construction. I wanted the management theory behind what I do every day, with accreditation my employer recognises."
  ],
  [
   "How did you balance work and study?",
   "Part-time and hybrid made it possible. I could join online sessions when travelling and attend campus sessions in Ebene when I was on the island."
  ],
  [
   "What changed?",
   "I now lead delivery on my projects with a much clearer view of planning, risk and value."
  ]
 ],
 "priya-s": [
  [
   "Why the GDL?",
   "My first degree was in business, but I always wanted to practise law. The GDL is the recognised conversion route, and it is recognised in Mauritius too."
  ],
  [
   "What stood out?",
   "Mooting. Standing up to argue a case early on built a confidence I did not expect."
  ],
  [
   "What is next?",
   "I am moving into legal training and planning my route to practice."
  ]
 ],
 "daniel-t": [
  [
   "Why the LLM?",
   "I work around compliance, and the Financial Investigation pathway matched exactly what the job asks for."
  ],
  [
   "What did you learn?",
   "Banking regulation, corporate governance and how to investigate money laundering and recover assets — skills I use directly."
  ],
  [
   "Would you recommend it?",
   "Yes, especially if you are already working. The case studies come straight from the real world."
  ]
 ],
 "nadia-k": [
  [
   "Why project management?",
   "I manage projects every week but had no formal grounding. The APM accreditation also matters to my employer."
  ],
  [
   "What is it like to study part-time?",
   "Demanding but well structured. Lecturers understand that we are professionals first."
  ],
  [
   "What do you hope for?",
   "To move into programme management once I graduate."
  ]
 ]
};
sampleStories.forEach((s) => { s.qa = storyQA[s.slug]; });

module.exports = { sampleStories, sectors, careersSupport };

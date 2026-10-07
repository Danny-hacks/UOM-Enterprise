// Single source of truth for the UoME demo site.
// Facts come from uomenterprise.mu (site pages, course factsheets, fee tables, application checklists).
// Items marked `// editorial` are original copy written from those facts for the client to confirm.

const site = {
  name: 'UOM Enterprise',
  short: 'UoME',
  tagline: 'Shaping tomorrow’s Leaders',
  partner: 'University of Lancashire',
  phone1: '(230) 467 8925',
  phone2: '(230) 467 8926',
  tel: '+2304678925',
  email: 'contactus@uomenterprise.ac.mu',
  supportEmail: 'studentsupport@uomenterprise.ac.mu',
  financeEmail: 'accountsreceivable@uomenterprise.ac.mu',
  address: '1st Floor, The Core Building, Ebene, Mauritius',
  hours: 'Monday – Friday, 09:00 – 16:30',
  hoursNote: 'Open through lunch (12:00 – 13:00)',
  facebook: 'https://www.facebook.com/',
  map: 'https://www.google.com/maps/search/?api=1&query=The+Core+Building+Ebene+Mauritius',
  whatsapp: '23050000000', // STAND-IN number — replace with UoME's WhatsApp line
  whatsappLabel: '+230 5000 0000',
};

// next open intakes, evaluated at runtime too (assets/js/countdown.js)
const intakes = [
  { id: '2027-01', label: 'January 2027', date: '2027-01-01', programmes: ['graduate-diploma-in-law', 'llm-financial-commercial-law'] },
  { id: '2027-02', label: 'February 2027', date: '2027-02-01', programmes: ['llb-english-mauritian-law', 'llb-english-law'] },
  { id: '2027-09', label: 'September 2027', date: '2027-09-01', programmes: ['llb-english-mauritian-law', 'llb-english-law', 'graduate-diploma-in-law', 'llm-financial-commercial-law', 'msc-project-management', 'msc-construction-project-management', 'msc-digital-marketing'] },
];

const programmes = [
  {
    slug: 'llb-english-mauritian-law',
    title: 'LLB (Hons) with English & Mauritian Law',
    short: 'LLB English & Mauritian Law',
    area: 'law', areaLabel: 'Law',
    level: 'undergraduate', levelLabel: 'Undergraduate',
    award: 'LLB (Hons)',
    durationLabel: '3 years full-time',
    durationDetail: '3 years full-time (September intake) · 2.5 years full-time (February intake)',
    months: 36,
    mode: 'On campus, full-time',
    modeKey: 'full-time',
    intakeLabel: 'September · February',
    intakes: ['Sep', 'Feb'],
    accred: ['cvle'],
    img: 'course-llb-mau',
    hero: 'grad-portrait',
    tagline: 'One degree. Two jurisdictions.',
    lede: 'A Qualifying Law Degree for practice in both England & Wales and Mauritius — taught in Ebene, awarded by the University of Lancashire.',
    overview: [
      'The LLB (Hons) with English and Mauritian Law is a Qualifying Law Degree for the purpose of practice in both England & Wales and Mauritius. It gives you a detailed understanding of both legal systems, together with employability skills that travel across disciplines and countries.',
      'It is designed for students who intend to work in an environment like Mauritius, where English and Mauritian law sit side by side. You are taught by professionally experienced academics and practitioners, in modern classrooms with state-of-the-art equipment, and supported on every module by the University’s virtual learning environment.',
    ],
    why: [
      ['Dual qualification', 'A Qualifying Law Degree for England & Wales and Mauritius — one programme, two routes.'],
      ['Recognised routes onward', 'Progress to the Bar Professional Course (BPC) or Legal Practice Course (LPC) in England & Wales, or the CVLE vocational examination in Mauritius.'],
      ['Taught by practitioners', 'Professionally experienced academics and practitioners, with moots, debates and seminar advocacy built into assessment.'],
      ['Studied at home', 'Complete a University of Lancashire degree on the Ebene campus — no relocation required.'],
    ],
    modules: [
      ['Year 1', ['Introduction to Professional Skills and Employability', 'English and EU Legal Systems', 'Criminal Law', 'Contract Law', 'Fundamentals of Mauritian Law and Judicial Review', 'Law and Emerging Technology']],
      ['Year 2', ['Tort Law', 'Mauritian Criminal Law', 'Advanced Professional Skills and Employability', 'International and European Law', 'Alternative Dispute Resolution', 'Family and Child Law Rights and Responsibilities']],
      ['Year 3', ['Equity and Trusts in Life and Death', 'Graduate Professional Skills and Employability', 'Mauritian Law: Les Obligations', 'Mauritian Property and Family Law', 'Land Law', 'Street Law: Community Law in Action', 'Project']],
    ],
    assessment: 'A varied mix: traditional unseen exams and seen examinations; end-of-module and in-course coursework; e-quizzes and e-case studies; group and individual presentations; portfolios; personal development reflective diaries; moots and debates; and oral performance in seminars.',
    entry: {
      local: [
        'Minimum 3 A-levels and 1 Subsidiary, or 2 A-levels and 2 Subsidiaries, or 112 UCAS points',
        'English: Grade C at O/SC level, or IELTS 6.0',
        'French: Grade C at O/SC level (required for this LLB)',
        'French Bac: 12 / 20 plus IELTS / SL English',
        'International Baccalaureate: Diploma including 112 points from HL subjects (H6 H5 H5)',
      ],
      international: [
        'Minimum 3 A-levels and 1 Subsidiary, or 2 A-levels and 2 Subsidiaries, or 112 UCAS points',
        'English: Grade C at O/SC level, or IELTS 6.0; French Grade C at O/SC level for this LLB',
        'French Bac: 11 or 12 / 20 plus IELTS / SL English',
        'International Baccalaureate: HL subjects (H5 H5 H5)',
      ],
      note: 'UoME operates a flexible admissions policy and treats every applicant as an individual — educational achievement, predicted grades, work experience and your personal statement are all considered.',
    },
    careers: [
      'Barrister: Bar Professional Course (BPC) in England & Wales',
      'Solicitor: Legal Practice Course (LPC), for practice in England & Wales',
      'Mauritian legal practice: CVLE vocational examination, leading to Barrister or Attorney roles',
      'Government, regulation, compliance and the wider employment market — law is a strong foundation for many careers',
    ],
    careersNote: 'Over 100 LLB and GDL graduates of UoME are now practising Barristers and Attorneys.',
    fee: 'llb-mau',
    related: ['llb-english-law', 'graduate-diploma-in-law', 'llm-financial-commercial-law'],
    faqs: [
      ['Can I practise in Mauritius after this degree?', 'The LLB is recognised by the Council for Vocational Legal Education (CVLE) for admission to the vocational examination conducted under its supervision — the route to practice in Mauritius.'],
      ['Can I qualify in England & Wales?', 'The degree is a Qualifying Law Degree for England & Wales. You then continue to the professional stage: the Bar Professional Course (BPC) for barristers or the Legal Practice Course (LPC) for solicitors.'],
      ['Which intake should I choose?', 'September gives a 3-year route; February is a 2.5-year route. Speak to admissions about the best fit for your results timeline.'],
      ['Do I need French?', 'Yes — Grade C at O/SC level in French is required for the English & Mauritian Law LLB.'],
    ],
  },
  {
    slug: 'llb-english-law',
    title: 'LLB (Hons) with English Law',
    short: 'LLB English Law',
    area: 'law', areaLabel: 'Law',
    level: 'undergraduate', levelLabel: 'Undergraduate',
    award: 'LLB (Hons)',
    durationLabel: '3 years full-time',
    durationDetail: '3 years full-time (September intake) · 2.5 years full-time (February intake)',
    months: 36,
    mode: 'On campus, full-time',
    modeKey: 'full-time',
    intakeLabel: 'September · February',
    intakes: ['Sep', 'Feb'],
    accred: ['cvle'],
    img: 'course-llb-eng',
    hero: 'grad-group',
    tagline: 'A rigorous English law degree, in Ebene.',
    lede: 'A Qualifying Law Degree built on intellectual development, legal and language knowledge, and the flexibility to specialise.',
    overview: [
      'The LLB (Hons) with English Law is a Qualifying Law Degree for the purpose of practice in both England & Wales and Mauritius. It lets you progress to the professional stages of legal training in the UK — the Bar Professional Course (BPC) for barristers, or the Legal Practice Course (LPC) for solicitors — and is recognised by the Council for Vocational Legal Education (CVLE) in Mauritius.',
      'The aim is to offer the opportunity for intellectual development, to acquire the fundamental legal and language knowledge needed to progress into the legal profession, the wider employment market or further study, and to give you flexibility in developing specialised interests.',
    ],
    why: [
      ['A Qualifying Law Degree', 'Recognised for practice in England & Wales and by the CVLE in Mauritius.'],
      ['Flexible specialisation', 'Build your own interests as you progress through the programme.'],
      ['Language and legal skills', 'Fundamental legal and language knowledge that supports entry to the profession, wider employment or further study.'],
      ['University of Lancashire award', 'A UK degree taught on the Ebene campus with online learning support.'],
    ],
    modules: null,
    modulesNote: 'Full year-by-year module structure is provided in the programme factsheet — ask admissions for the current syllabus.',
    assessment: 'Assessment combines examinations, coursework, presentations and oral performance. Your factsheet sets out the full approach for each module.',
    entry: {
      local: [
        'Minimum 3 A-levels and 1 Subsidiary, or 2 A-levels and 2 Subsidiaries, or 112 UCAS points',
        'English: Grade C at O/SC level, or IELTS 6.0',
        'French Bac: 12 / 20 plus IELTS / SL English',
        'International Baccalaureate: Diploma including 112 points from HL subjects (H6 H5 H5)',
      ],
      international: [
        'Minimum 3 A-levels and 1 Subsidiary, or 2 A-levels and 2 Subsidiaries, or 112 UCAS points',
        'English: Grade C at O/SC level, or IELTS 6.0',
        'French Bac: 11 or 12 / 20 plus IELTS / SL English',
        'International Baccalaureate: HL subjects (H5 H5 H5)',
      ],
      note: 'UoME operates a flexible admissions policy and treats every applicant as an individual.',
    },
    careers: [
      'Barrister: Bar Professional Course (BPC) in England & Wales',
      'Solicitor: Legal Practice Course (LPC), for practice in England & Wales',
      'CVLE vocational examination in Mauritius',
      'Wider employment market or further study',
    ],
    careersNote: 'Over 100 LLB and GDL graduates of UoME are now practising Barristers and Attorneys.',
    fee: 'llb-eng',
    related: ['llb-english-mauritian-law', 'graduate-diploma-in-law', 'llm-financial-commercial-law'],
    faqs: [
      ['What is the difference between the two LLBs?', 'Both are Qualifying Law Degrees. The English & Mauritian Law LLB adds dedicated Mauritian law modules (for example Les Obligations and Mauritian Property and Family Law); the English Law LLB focuses on English law.'],
      ['Is it full-time only?', 'Yes — full-time on campus: 3 years (September) or 2.5 years (February).'],
    ],
  },
  {
    slug: 'graduate-diploma-in-law',
    title: 'Graduate Diploma in Law (GDL)',
    short: 'Graduate Diploma in Law',
    area: 'law', areaLabel: 'Law',
    level: 'graduate', levelLabel: 'Graduate conversion',
    award: 'Graduate Diploma in Law',
    durationLabel: '1 year full-time · 2 years part-time',
    durationDetail: '1 year (full-time) or 2 years (part-time)',
    months: 12,
    mode: 'On campus, full-time or part-time',
    modeKey: 'both',
    intakeLabel: 'September · January',
    intakes: ['Sep', 'Jan'],
    accred: ['cvle'],
    img: 'course-gdl',
    hero: 'grad-stage',
    tagline: 'Change direction. Start a career in law.',
    lede: 'A rigorous conversion course for non-law graduates and overseas law graduates — commended by employers, recognised for the Bar and the CVLE.',
    overview: [
      'Our GDL is a conversion course that allows non-law graduates, or those with an overseas law degree, the opportunity to pursue a career in law. This rigorous and challenging one- or two-year learning experience, commended by employers, can lay the foundations of the law knowledge you need to move to the professional stages of legal training in the UK — the Bar Professional Course (BPC) for barristers, or the Legal Practice Course (LPC) for those wishing to become a solicitor (for practice in England & Wales only).',
      'It is also recognised by the Council for Vocational Legal Education (CVLE) in Mauritius for admission to the vocational examination conducted under its supervision.',
      'Your studies consolidate and enhance your intellectual rigour through legal research, reasoning and argument, and build transferable skills in oral and written communication, group work, advocacy and critical thinking.',
    ],
    why: [
      ['For graduates of any discipline', 'No law degree needed — a degree in any subject at 2:2 or above.'],
      ['Full-time or part-time', 'One year full-time, or two years part-time alongside work.'],
      ['Routes to the Bar and the CVLE', 'Foundations for the BPC, the LPC, and the Mauritian vocational examination.'],
      ['Advocacy from day one', 'Criminal law with mooting builds your oral advocacy early.'],
    ],
    modules: [
      ['Core subjects', ['Contract Law', 'Criminal Law and Mooting', 'Tort Law', 'Public Law', 'Trusts and Equity', 'Land Law', 'European Union Law']],
    ],
    assessment: 'A mix of examinations, coursework and oral advocacy through mooting.',
    entry: {
      local: [
        'A degree in any subject, minimum 2:2, from a recognised institution',
        'English: Grade C at O/SC level, or IELTS 6.0 – 6.5',
        'To train for the Bar in England & Wales, apply for a Certificate of Academic Standing (COAS) from the Bar Standards Board — ideally before applying',
      ],
      international: [
        'A degree in any subject, minimum 2:2, from a recognised institution',
        'English: Grade C at O/SC level, or IELTS 6.5',
        'To train for the Bar in England & Wales, apply for a Certificate of Academic Standing (COAS) from the Bar Standards Board — ideally before applying',
      ],
      note: 'The COAS confirms the Bar Standards Board has accepted that you meet the standard to undertake the GDL for the purpose of training as a barrister in England & Wales.',
    },
    careers: [
      'Barrister: Bar Professional Course (BPC) in England & Wales',
      'Solicitor: Legal Practice Course (LPC), for practice in England & Wales',
      'CVLE vocational examination in Mauritius',
    ],
    careersNote: 'Over 100 LLB and GDL graduates of UoME are now practising Barristers and Attorneys.',
    fee: 'gdl',
    related: ['llb-english-mauritian-law', 'llm-financial-commercial-law', 'llb-english-law'],
    faqs: [
      ['What is the COAS?', 'A Certificate of Academic Standing issued by the Bar Standards Board (UK). Its issue means the BSB accepts that you have reached the standard required to undertake the GDL for the purpose of training as a barrister in England & Wales.'],
      ['I already have a law degree from overseas — can I apply?', 'Yes. The GDL welcomes non-law graduates and those with an overseas law degree.'],
    ],
    feeNote: 'Fees shown for full-time (1 year) and part-time (2 years).',
  },
  {
    slug: 'llm-financial-commercial-law',
    title: 'LLM in Financial and Commercial Law',
    sub: 'with a pathway in Financial Investigation',
    short: 'LLM Financial & Commercial Law',
    area: 'law', areaLabel: 'Law',
    level: 'postgraduate', levelLabel: 'Postgraduate',
    award: 'LLM',
    durationLabel: '1.5 years part-time',
    durationDetail: '1.5 years part-time',
    months: 18,
    mode: 'Part-time, hybrid (online + campus)',
    modeKey: 'part-time',
    intakeLabel: 'September · January',
    intakes: ['Sep', 'Jan'],
    accred: [],
    img: 'course-llm',
    hero: 'campus-advice',
    tagline: 'Law for the world of finance and business.',
    lede: 'Analytical and reflective skills for the competitive domain of financial and commercial law — with an optional pathway in Financial Investigation.',
    overview: [
      'The LLM in Financial and Commercial Law provides the analytical and reflective skills required in the competitive domain of financial and commercial law. You graduate with transferable skills that are essential in the modern workplace and crucial to effective leadership — negotiation, problem solving and dispute resolution.',
      'Through seminar-based learning you develop a systematic understanding and critical appreciation of the complex legal, economic and political issues surrounding international trade relations, global business and their regulation.',
      'The course is open to law and non-law graduates alike — and to professionals joining with legal or commercial industry experience. That mix of backgrounds enriches the learning of the whole cohort.',
    ],
    why: [
      ['For law and non-law backgrounds', 'Graduates from law or business, and professionals from legal or commercial industry.'],
      ['Specialise your qualification', 'Choose two option modules, including Cryptocurrency Investigation and Investigating Money Laundering.'],
      ['A dissertation of your choosing', 'Produce a detailed, supervised piece of work in a legal area you select.'],
      ['Designed around work', 'Part-time, hybrid delivery — online and on campus — supported by Blackboard.'],
    ],
    modules: [
      ['Compulsory', ['Dissertation', 'Advanced Legal Systems', 'Banking and Financial Services Regulation', 'International Corporate Governance', 'Law of International Financial Transactions']],
      ['Choose two options*', ['Cryptocurrency Investigation', 'Investigating Money Laundering', 'Discovery & Recovery of Assets', 'International Commercial Litigation']],
    ],
    modulesNote: '*Option modules are subject to numbers. The Financial Investigation pathway draws on the investigation-focused options.',
    assessment: 'Seminar-based learning with a supervised dissertation, supported by the University’s Blackboard virtual learning environment.',
    entry: {
      local: [
        'A bachelor degree with Honours at lower second class or above, or a professional qualification deemed degree-equivalent',
        'English: Grade C at O/SC level, or IELTS 6.0 – 6.5',
      ],
      international: [
        'A bachelor degree with Honours at lower second class or above, or a professional qualification deemed degree-equivalent',
        'English: Grade C at O/SC level, or IELTS 6.5',
      ],
      note: 'Appropriate professional experience is also considered for postgraduate courses.',
    },
    careers: [
      'Roles in banking, financial services and regulation',
      'Compliance, risk and financial-crime investigation',
      'Corporate governance and commercial legal practice',
      'Leadership roles that value negotiation and dispute-resolution skills',
    ],
    careersNote: 'The programme can bolster your employability in both business and legal roles by demonstrating your knowledge and expertise.',
    fee: 'llm',
    related: ['graduate-diploma-in-law', 'msc-project-management', 'llb-english-mauritian-law'],
    faqs: [
      ['Do I need a law degree?', 'No. The course welcomes law and non-law graduates, and professionals with legal or commercial industry experience.'],
      ['What is the Financial Investigation pathway?', 'A pathway built around the investigation-focused option modules — Cryptocurrency Investigation, Investigating Money Laundering and Discovery & Recovery of Assets.'],
      ['How is it delivered?', 'Part-time over 1.5 years in a hybrid format — online and on campus in Ebene.'],
    ],
  },
  {
    slug: 'msc-project-management',
    title: 'MSc Project Management',
    short: 'MSc Project Management',
    area: 'pm', areaLabel: 'Project Management',
    level: 'postgraduate', levelLabel: 'Postgraduate',
    award: 'MSc',
    durationLabel: '1.5 years part-time',
    durationDetail: '1.5 years part-time',
    months: 18,
    mode: 'Part-time, hybrid (online + campus)',
    modeKey: 'part-time',
    intakeLabel: 'September',
    intakes: ['Sep'],
    accred: ['apm'],
    img: 'course-pm',
    hero: 'campus-lab',
    tagline: 'Lead complex projects with confidence.',
    lede: 'Accredited by the Association for Project Management — knowledge, process and leadership for contemporary project environments.',
    overview: [
      'The MSc in Project Management is designed for those who wish to develop their project management skills and abilities. It focuses on the project management knowledge areas, the project management processes, and the resolution of complex problems encountered in contemporary project environments.',
      'The programme provides an opportunity to develop the leadership and teamworking skills essential in today’s global workplace, and gives you the chance to build research skills suited to your own working environment and your interest in the project management process.',
    ],
    why: [
      ['APM accredited', 'The MSc Project Management is accredited by the Association for Project Management.'],
      ['Built for working professionals', 'Part-time over 1.5 years, delivered as a hybrid of online and on-campus study.'],
      ['Leadership as well as method', 'Project team and leadership development sits alongside planning, risk and strategy.'],
      ['A dissertation on your own context', 'The triple-module dissertation applies research to your own working environment.'],
    ],
    modules: [
      ['Course outline', ['Project Planning, Control and Analysis', 'Risk and Value Management', 'Project Team and Leadership Development', 'Strategic Project Management', 'Health and Safety Management', 'Quality and Environmental Management Systems', 'Dissertation (triple module)']],
    ],
    assessment: 'Coursework and applied assignments, culminating in a dissertation. Delivered through a mix of online and on-campus study.',
    entry: {
      local: ['An honours degree with 2:2 classification or higher in a management discipline', 'English: Grade C at O/SC level, or IELTS 6.0 – 6.5'],
      international: ['An honours degree with 2:2 classification or higher in a management discipline', 'English language competence: IELTS 6.0 (or equivalent)'],
      note: 'Appropriate professional experience is also considered for postgraduate applications.',
    },
    careers: [
      'Project, programme and portfolio management roles across sectors',
      'Leadership of cross-functional teams and delivery functions',
      'Risk, value and quality management',
      'Progression towards APM professional recognition',
    ],
    careersNote: 'Accreditation from the Association for Project Management adds recognised professional weight to your qualification (terms and conditions apply).',
    fee: 'pm',
    related: ['msc-construction-project-management', 'msc-digital-marketing', 'llm-financial-commercial-law'],
    faqs: [
      ['Which body accredits this MSc?', 'The Association for Project Management (APM).'],
      ['Can I study while working?', 'Yes. The programme is part-time over 1.5 years in a hybrid format.'],
      ['Is there a January intake?', 'No — MSc Project Management starts in September.'],
    ],
  },
  {
    slug: 'msc-construction-project-management',
    title: 'MSc Construction Project Management',
    short: 'MSc Construction Project Management',
    area: 'pm', areaLabel: 'Project Management',
    level: 'postgraduate', levelLabel: 'Postgraduate',
    award: 'MSc',
    durationLabel: '1.5 years part-time',
    durationDetail: '1.5 years part-time',
    months: 18,
    mode: 'Part-time, hybrid (online + campus)',
    modeKey: 'part-time',
    intakeLabel: 'September',
    intakes: ['Sep'],
    accred: ['apm', 'ciob'],
    img: 'course-cpm',
    hero: 'core-night',
    tagline: 'Build careers as well as buildings.',
    lede: 'Accredited by both the APM and the Chartered Institute of Building — for construction professionals ready to lead.',
    overview: [
      'The MSc in Construction Project Management is designed to develop the knowledge and skills of construction professionals in the context of contemporary construction projects. There is a focus on construction project management knowledge areas, including the planning and control methods within the project management process, and you extend your knowledge of technologies for the resolution of new-build problems.',
      'The programme gives you opportunities to develop the personal, interpersonal and project-personnel skills relevant to your working environment, in the context of international construction project management.',
    ],
    why: [
      ['Double accreditation', 'Accredited by both the Association for Project Management (APM) and the Chartered Institute of Building (CIOB).'],
      ['Advanced construction technology', 'A dedicated module extends your technical knowledge for new-build problem solving.'],
      ['Part-time and hybrid', '1.5 years, online and on campus — structured around a working week.'],
      ['International perspective', 'Skills framed for international construction project management.'],
    ],
    modules: [
      ['Course outline', ['Project Planning, Control and Analysis', 'Risk and Value Management', 'Project Team and Leadership Development', 'Strategic Project Management', 'Health and Safety Management', 'Advanced Construction Technology', 'Dissertation (triple module)']],
    ],
    assessment: 'Coursework and applied assignments, culminating in a dissertation.',
    entry: {
      local: ['An honours degree with 2:2 classification or higher in a construction or engineering discipline that demonstrates awareness of construction processes and procedures', 'English: Grade C at O/SC level, or IELTS 6.0 – 6.5'],
      international: ['An honours degree with 2:2 classification or higher in a construction or engineering discipline that demonstrates awareness of construction processes and procedures', 'English language competence: IELTS 6.0 (or equivalent)'],
      note: 'Appropriate professional experience is also considered for postgraduate applications.',
    },
    careers: [
      'Construction project management and site delivery leadership',
      'Planning, cost and risk control on contemporary construction projects',
      'Engineering and built-environment careers — UoME engineering alumni are contributing to Mauritius’s construction industry',
      'Progression towards APM and CIOB professional recognition',
    ],
    careersNote: 'Graduates in engineering have played key roles in design, project supervision and technical sales in Mauritius’s built environment (terms and conditions apply to accreditation).',
    fee: 'cpm',
    related: ['msc-project-management', 'msc-digital-marketing', 'llm-financial-commercial-law'],
    faqs: [
      ['Which bodies accredit this MSc?', 'Both the Association for Project Management (APM) and the Chartered Institute of Building (CIOB).'],
      ['What background do I need?', 'An honours degree (2:2 or higher) in a construction or engineering discipline.'],
    ],
  },
  {
    slug: 'msc-digital-marketing',
    title: 'MSc Digital Marketing',
    sub: 'Communications',
    short: 'MSc Digital Marketing',
    area: 'digital', areaLabel: 'Digital Marketing',
    level: 'postgraduate', levelLabel: 'Postgraduate',
    award: 'MSc',
    durationLabel: '1.5 years part-time',
    durationDetail: '1.5 years part-time',
    months: 18,
    mode: 'Part-time, hybrid (online + campus)',
    modeKey: 'part-time',
    intakeLabel: 'September',
    intakes: ['Sep'],
    accred: ['idm'],
    img: 'course-dm',
    hero: 'campus-atrium',
    tagline: 'Plan, deliver and measure in a digital-first world.',
    lede: 'Created with digital marketing specialists and agency partners — accredited by the Institute of Data & Marketing.',
    overview: [
      'Our MSc Digital Marketing was created with digital marketing specialists and agency partners. It helps you plan, deliver and assess marketing activity in a digital-first world. You learn how to understand online consumer behaviour and use data and analytics responsibly, and you design integrated digital marketing campaigns that deliver clear, measurable results.',
      'You gain cutting-edge knowledge in digital and social media marketing, with both theoretical and applied perspectives, and the ability to apply a range of specialist digital marketing skills inside the organisation in which you work.',
    ],
    why: [
      ['Industry co-created', 'Built with digital marketing specialists and agency partners.'],
      ['IDM accreditation', 'Accredited by the Institute of Data & Marketing (IDM), the accrediting body of the Data & Marketing Association (DMA).'],
      ['Data used responsibly', 'Analytics and online consumer behaviour taught with an ethical lens.'],
      ['Real projects', 'Hands-on projects, case studies and simulations — blending theory and practice in a hybrid mode.'],
    ],
    modules: [
      ['Course outline', ['Impact Project', 'Learning without Limits', 'Future Leaders’ Challenge', 'Digital Marketing Futures', 'Strategic Digital Marketing', 'Digital Insights']],
    ],
    assessment: 'Applied assessment built around projects and real-world challenges, delivered as a hybrid course.',
    entry: {
      local: ['An honours degree with 2:2 classification or higher', 'English: Grade C at O/SC level, or IELTS 6.0 – 6.5'],
      international: ['An honours degree with 2:2 classification or higher', 'English language competence: IELTS 6.5 (or equivalent)'],
      note: 'Appropriate professional experience is also considered for postgraduate applications.',
    },
    careers: [
      'Digital strategy and online brand communications',
      'Data-driven marketing and analytics',
      'Social media and digital campaign management',
      'Marketing leadership in organisations of any size',
    ],
    careersNote: 'In 2026 UoME celebrates the first graduating cohort of the MSc Digital Marketing, preparing graduates for careers in digital strategy, online branding and communications, data-driven marketing, social media and digital campaign management.',
    fee: 'dm',
    related: ['msc-project-management', 'msc-construction-project-management', 'llm-financial-commercial-law'],
    faqs: [
      ['Is this the same as MSc Digital Marketing Communications?', 'Yes — the programme was introduced in 2024 as the MSc Digital Marketing Communications, and its current University of Lancashire title is MSc Digital Marketing.'],
      ['Who accredits it?', 'The Institute of Data & Marketing (IDM).'],
    ],
  },
];

const accreditations = [
  { id: 'hec', name: 'Higher Education Commission', abbr: 'HEC', short: 'Mauritius', what: 'UoME is registered with the Higher Education Commission as a post-secondary educational institution, and every programme delivered at UoME has gone through the HEC’s accreditation process.', matters: 'Your qualification is delivered by a registered, regulated institution in Mauritius.' },
  { id: 'qaa', name: 'Quality Assurance Agency for Higher Education', abbr: 'QAA', short: 'United Kingdom', what: 'All University of Lancashire courses delivered in Mauritius are recognised under the UK system regulated by the QAA.', matters: 'Your degree sits inside the UK’s quality framework — the same framework that underpins degrees taught in Britain.' },
  { id: 'cvle', name: 'Council for Vocational Legal Education', abbr: 'CVLE', short: 'Mauritius', what: 'The LLB (Hons) programmes and the Graduate Diploma in Law are recognised by the CVLE for admission onto the vocational examination conducted under its supervision.', matters: 'The route to practising law in Mauritius.', programmes: ['llb-english-mauritian-law', 'llb-english-law', 'graduate-diploma-in-law'] },
  { id: 'apm', name: 'Association for Project Management', abbr: 'APM', short: 'Project Management', what: 'The MSc Project Management and the MSc Construction Project Management are accredited by the APM.', matters: 'Recognised professional weight for project professionals. Terms and conditions apply.', programmes: ['msc-project-management', 'msc-construction-project-management'], logo: 'apm.png' },
  { id: 'ciob', name: 'Chartered Institute of Building', abbr: 'CIOB', short: 'Construction', what: 'The MSc Construction Project Management is also accredited by the CIOB.', matters: 'Standing with the leading professional body in the built environment. Terms and conditions apply.', programmes: ['msc-construction-project-management'], logo: 'ciob.png' },
  { id: 'idm', name: 'Institute of Data & Marketing', abbr: 'IDM', short: 'Digital Marketing', what: 'The MSc Digital Marketing offers the opportunity to gain certification from the IDM, the accrediting body of the Data & Marketing Association (DMA).', matters: 'Globally recognised marketing credentials alongside your degree. Terms and conditions apply.', programmes: ['msc-digital-marketing'] },
];

// fees from the published UoME tuition schedule (MUR for local, GBP for international)
const fees = {
  'llb-mau': { unit: 'per year', mur: 236500, gbp: null, inst: { sep: [118000, 59500, 59000], feb: [118000, 59500, 59000] }, instGbp: null },
  'llb-eng': { unit: 'per year', mur: 236500, gbp: 5260, inst: { sep: [118000, 59500, 59000], feb: [118000, 59500, 59000] }, instGbp: { sep: [2630, 1315, 1315], feb: [2630, 1315, 1315] } },
  'gdl': {
    variants: [
      { id: 'ft', label: 'Full-time (1 year)', unit: 'total', mur: 289000, gbp: 6320, inst: { sep: [144500, 144500, 0], jan: [144500, 144500, 0] }, instGbp: { sep: [3160, 3160, 0], jan: [3160, 3160, 0] } },
      { id: 'pt', label: 'Part-time (2 years)', unit: 'per year', mur: 144500, gbp: 3160, inst: { sep: [72500, 72000, 0], jan: [72500, 72000, 0] }, instGbp: { sep: [1580, 1580, 0], jan: [1580, 1580, 0] } },
    ],
  },
  'llm': { unit: 'total', mur: 281000, gbp: 6150, inst: { sep: [140000, 71000, 70000], jan: [140000, 71000, 70000] }, instGbp: { sep: [3075, 1538, 1537], jan: [3075, 1538, 1537] } },
  'pm': { unit: 'total', mur: 307500, gbp: 6680, inst: { sep: [150000, 80000, 77500] }, instGbp: { sep: [3340, 1670, 1670] } },
  'cpm': { unit: 'total', mur: 307500, gbp: 6680, inst: { sep: [150000, 80000, 77500] }, instGbp: { sep: [3340, 1670, 1670] } },
  'dm': { unit: 'total', mur: 281000, gbp: 6150, inst: { sep: [140000, 71000, 70000] }, instGbp: { sep: [3075, 1538, 1537] } },
};

const instalmentDates = {
  sep: ['On acceptance of offer', 'By 30 January', 'By 30 April'],
  feb: ['On acceptance of offer', 'By 30 April', 'By 31 July'],
  jan: ['On acceptance of offer', 'By 30 April', 'By 31 August'],
};

const costOfLiving = [
  ['Shared apartment / house, incl. utilities and wifi (monthly)', 250, [10000, 15000]],
  ['Groceries for one person (monthly)', 83, [4000, 5000]],
  ['Fast food meal', 8, [300, 500]],
  ['Clothing — one T-shirt', 7, [350, 500]],
  ['Clothing — jeans', 15, [500, 1000]],
  ['Bus — single journey', 2, [0, 70]],
  ['Private taxi — single journey', 8, [500, 600]],
];

const timeline = [
  ['2010', 'UoME is established by the UOM Trust', 'Registered with the Higher Education Commission as a post-secondary educational institution.'],
  ['2011', 'Partnership with the University of Lancashire', 'UoME begins delivering University of Lancashire programmes in Mauritius — starting with an LLM in International Business Law, delivered for three years.'],
  ['2014', 'Law and Project Management programmes launch', 'Undergraduate and postgraduate courses are introduced in Law and in Project Management.'],
  ['2024', 'Digital Marketing joins the portfolio', 'The MSc Digital Marketing Communications widens the partnership into the digital economy.'],
  ['2026', 'First Digital Marketing graduates', 'The first graduating cohort of the MSc Digital Marketing is celebrated, alongside 900+ UoME graduates to date.'],
];

const leadership = [
  ['Professor Raja Vinesh Sannassee', 'Chairman'],
  ['Mr Vadish Horeessran', 'Board Director'],
  ['Mr Ashwan Domah', 'Board Director'],
  ['Ms Romina Koorja', 'Board Director'],
];

const events = {
  past: [
    { title: 'SVICC Career Expo 2025', date: '14 – 16 February 2025', time: '10:00 – 17:00', place: 'SVICC, Pailles', kind: 'Career fair', img: 'fair-1', text: 'The UoME team met prospective students and parents across three days at one of Mauritius’s largest career expos, presenting programmes and offering one-to-one counselling.' },
    { title: 'Le Bocage International School Education Fair', date: '13 February 2025', time: '', place: 'Le Bocage International School', kind: 'Education fair', img: 'fair-5', text: 'UoME joined the school’s education fair to guide students on pathways into law, project management and digital marketing.' },
    { title: 'Graduation Ceremony 2024', date: '2024', time: '', place: 'Mauritius', kind: 'Graduation', img: 'grad-hall', text: 'Graduates in law, project management and more celebrated with University of Lancashire academics and distinguished guests.' },
    { title: 'Alumni & Community Evenings', date: '2024 – 2025', time: '', place: 'Mauritius', kind: 'Alumni', img: 'alumni-1', text: 'Graduates, current students and staff reconnect at networking and celebration evenings.' },
  ],
};

const stories = [
  {
    slug: 'yaniish-engutsamy',
    name: 'Yaniish Engutsamy',
    course: 'MSc Digital Marketing Communications',
    year: 'Year 1',
    img: 'person-yaniish',
    short: 'The curriculum was thoughtfully structured to cover every essential aspect of modern digital marketing — and we applied it through real projects.',
    quote: 'The MSc in Digital Marketing Communications exceeded all my expectations. The curriculum was thoughtfully structured to cover every essential aspect of modern digital marketing, from content strategy and SEO to consumer behavior and analytics.',
    more: [
      'What stood out to me most was the balance between theory and practice as well as the hybrid mode of studies. We didn’t just learn about strategies — we applied them through hands-on projects, case studies, and simulations that mirrored real-world challenges. The lecturers from both the UK and Mauritius were always available and always encouraging us to think critically and creatively.',
      'This program sharpened my strategic thinking, enhanced my communication skills, and opened doors to exciting career opportunities I once only dreamed of. It is an amazing course helping to manage both work and studies.',
    ],
    programme: 'msc-digital-marketing',
  },
];

const news = require('./news');

const nav = [
  { id: 'study', label: 'Study', href: 'study/' },
  { id: 'apply', label: 'Apply', href: 'apply/' },
  { id: 'international', label: 'International', href: 'international/' },
  { id: 'outcomes', label: 'Careers & outcomes', href: 'outcomes/' },
  { id: 'life', label: 'Life at UoME', href: 'life/' },
  { id: 'about', label: 'About', href: 'about/' },
];

const O = require('./outcomes-data');
const faqs = require('./faq-data');
const videos = {
  film: { id: 'film', title: 'See UoME in a minute', src: 'assets/video/uome-placeholder.webm', poster: 'assets/video/uome-poster.webp', sample: true },
  campus: { id: 'campus', title: 'Walk the campus', src: 'assets/video/uome-placeholder.webm', poster: 'assets/img/campus-atrium.webp', sample: true },
  students: { id: 'students', title: 'Hear it from students', src: 'assets/video/uome-placeholder.webm', poster: 'assets/img/life-group-1.webp', sample: true },
  mauritius: { id: 'mauritius', title: 'Welcome to Mauritius', src: 'assets/video/uome-placeholder.webm', poster: 'assets/img/core-night.webp', sample: true },
};

module.exports = { faqs, videos, sampleStories: O.sampleStories, sectors: O.sectors, careersSupport: O.careersSupport, site, intakes, programmes, accreditations, fees, instalmentDates, costOfLiving, timeline, leadership, events, stories, news, nav };

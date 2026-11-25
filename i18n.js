/* =============================================================
   RIN NAIRITH — English / Khmer language switch
   -------------------------------------------------------------
   English lives in the HTML (so crawlers and no-JS visitors get
   the full page). Khmer is applied on top by:
     1. elements with data-i18n="key"  → innerHTML from KM[key]
     2. any text node whose (trimmed) text is a key in KM
     3. placeholder / aria-label attributes whose value is a key
   New DOM (GitHub cards, palette, notifications…) is translated
   automatically by a MutationObserver while Khmer is active.
   ============================================================= */
'use strict';

const KM = {
  /* ── Page meta ── */
  'meta.title': 'Rin Nairith – អ្នកអភិវឌ្ឍន៍កម្មវិធីនៅភ្នំពេញ កម្ពុជា',
  'meta.description': 'Rin Nairith (Nairith Rin) ជាអ្នកអភិវឌ្ឍន៍កម្មវិធីនៅភ្នំពេញ ប្រទេសកម្ពុជា ដែលបង្កើតកម្មវិធីគេហទំព័រដោយប្រើ Laravel, Vue.js និង PHP ហើយជាអ្នកបង្កើត ZeroPing PHP framework។',

  /* ── Navigation ── */
  'Home': 'ទំព័រដើម',
  'About': 'អំពីខ្ញុំ',
  'Skills': 'ជំនាញ',
  'Experience': 'បទពិសោធន៍',
  'Certificates': 'វិញ្ញាបនបត្រ',
  'Projects': 'គម្រោង',
  'Services': 'សេវាកម្ម',
  'Contact': 'ទំនាក់ទំនង',

  /* ── Hero ── */
  'Available for opportunities': 'ត្រៀមខ្លួនសម្រាប់ឱកាសការងារ',
  "I'm": 'ខ្ញុំគឺ',
  'Software Developer based in Cambodia. I build scalable web applications, open-source frameworks, and cloud-deployed systems.':
    'អ្នកអភិវឌ្ឍន៍កម្មវិធីនៅកម្ពុជា។ ខ្ញុំបង្កើតកម្មវិធីគេហទំព័រដែលអាចពង្រីកបាន framework កូដចំហ និងប្រព័ន្ធដែលដំណើរការលើ Cloud។',
  'View Projects': 'មើលគម្រោង',
  'View Services': 'មើលសេវាកម្ម',
  'Get in Touch': 'ទាក់ទងមកខ្ញុំ',
  'Projects shipped': 'គម្រោងបានបញ្ចប់',
  'Open source': 'កូដចំហ',
  'creator': 'អ្នកបង្កើត',
  'Tech stacks': 'បច្ចេកវិទ្យា',
  'Software Developer': 'អ្នកអភិវឌ្ឍន៍កម្មវិធី',
  'Phnom Penh, Cambodia': 'ភ្នំពេញ កម្ពុជា',

  /* ── About ── */
  'Building things that matter': 'បង្កើតអ្វីដែលមានតម្លៃ',
  'about.p1': 'ខ្ញុំឈ្មោះ <strong>Rin Nairith</strong> (Nairith Rin) ជាអ្នកអភិវឌ្ឍន៍កម្មវិធីនៅភ្នំពេញ ប្រទេសកម្ពុជា ដែលស្រឡាញ់ស្ថាបត្យកម្មកូដស្អាត ឧបករណ៍សម្រាប់អ្នកអភិវឌ្ឍន៍ និងការបញ្ចេញកម្មវិធីដែលរួចរាល់សម្រាប់ប្រើប្រាស់ជាក់ស្តែង។ ខ្ញុំជាអ្នកបង្កើត <strong>ZeroPing PHP Framework</strong> ហើយបានដាក់ឱ្យដំណើរការកម្មវិធីជាច្រើនលើ AWS EC2 ដោយប្រើ Docker, Nginx និង CI/CD pipelines។',
  'about.p2': 'បច្ចុប្បន្នខ្ញុំកំពុងធ្វើការនៅ <strong>CTX-98 Co., Ltd</strong> ក្នុងតួនាទីជាអ្នកអភិវឌ្ឍន៍កម្មវិធី ហើយបន្តពង្រឹងជំនាញផ្នែក Cloud infrastructure ការរចនាប្រព័ន្ធ និងការអភិវឌ្ឍន៍គេហទំព័រទំនើប។',
  'Software Engineering': 'វិស្វកម្មកម្មវិធី',
  'Vue.js frontends, Java Spring Boot and PHP Laravel backends, production cloud deployments.':
    'Frontend ជាមួយ Vue.js, Backend ជាមួយ Java Spring Boot និង PHP Laravel ព្រមទាំងការដាក់ដំណើរការលើ Cloud។',
  'Cloud & DevOps': 'Cloud និង DevOps',
  'AWS EC2, Docker, Nginx, SSL/HTTPS, GitHub Actions CI/CD, Linux server administration.':
    'AWS EC2, Docker, Nginx, SSL/HTTPS, GitHub Actions CI/CD និងការគ្រប់គ្រង Linux server។',
  'Open Source': 'កូដចំហ (Open Source)',
  'Creator of ZeroPing — a modern PHP MVC framework with CLI tooling, ORM, and queues.':
    'អ្នកបង្កើត ZeroPing — PHP MVC framework ទំនើបដែលមាន CLI, ORM និង queue។',
  "Let's Work Together": 'ធ្វើការជាមួយគ្នា',
  'Download CV': 'ទាញយក CV',
  'Expertise': 'ជំនាញឯកទេស',
  'Software Development': 'ការអភិវឌ្ឍន៍កម្មវិធី',
  'RESTful API Design': 'ការរចនា RESTful API',
  'Relational Database Design': 'ការរចនាមូលដ្ឋានទិន្នន័យ Relational',
  'Cloud Infrastructure (AWS)': 'ហេដ្ឋារចនាសម្ព័ន្ធ Cloud (AWS)',
  'CI/CD & GitHub Actions': 'CI/CD និង GitHub Actions',
  'Framework Architecture': 'ស្ថាបត្យកម្ម Framework',

  /* ── Skills ── */
  'title.skills': 'បច្ចេកវិទ្យា ដែលខ្ញុំប្រើប្រាស់',
  'Database': 'មូលដ្ឋានទិន្នន័យ',
  'DevOps & Cloud': 'DevOps និង Cloud',
  'Tools': 'ឧបករណ៍',
  'Database Design': 'ការរចនាមូលដ្ឋានទិន្នន័យ',

  /* ── Experience ── */
  'title.experience': 'ដំណើរអាជីព',
  'Present': 'បច្ចុប្បន្ន',
  'Building and maintaining software solutions, developing web applications, and collaborating with cross-functional teams to deliver high-quality products in a production environment.':
    'បង្កើត និងថែទាំដំណោះស្រាយកម្មវិធី អភិវឌ្ឍកម្មវិធីគេហទំព័រ និងសហការជាមួយក្រុមការងារផ្សេងៗ ដើម្បីផ្តល់ផលិតផលដែលមានគុណភាពខ្ពស់ក្នុងបរិយាកាសប្រើប្រាស់ជាក់ស្តែង។',
  'Web Applications': 'កម្មវិធីគេហទំព័រ',
  'System Design': 'ការរចនាប្រព័ន្ធ',
  'Team Collaboration': 'ការសហការជាក្រុម',
  'Full Stack Developer Intern': 'កម្មសិក្សាការី Full Stack Developer',
  'Nov 2024 – Feb 2025': 'វិច្ឆិកា 2024 – កុម្ភៈ 2025',
  'Completed a 3-month internship as a Full Stack Developer, where I designed, developed, and maintained a Course Management System. Collaborated with the development team to implement responsive user interfaces, RESTful APIs, database design, authentication, and core system features while following modern software development practices.':
    'បានបញ្ចប់កម្មសិក្សារយៈពេល ៣ ខែ ក្នុងតួនាទីជា Full Stack Developer ដោយបានរចនា អភិវឌ្ឍ និងថែទាំប្រព័ន្ធគ្រប់គ្រងវគ្គសិក្សា។ បានសហការជាមួយក្រុមអភិវឌ្ឍន៍ ដើម្បីបង្កើតចំណុចប្រទាក់អ្នកប្រើដែលបត់បែនតាមគ្រប់ឧបករណ៍ RESTful APIs ការរចនាមូលដ្ឋានទិន្នន័យ ការផ្ទៀងផ្ទាត់អត្តសញ្ញាណ និងមុខងារស្នូលរបស់ប្រព័ន្ធ ដោយអនុវត្តតាមវិធីសាស្ត្រអភិវឌ្ឍន៍កម្មវិធីទំនើប។',
  'Full Stack Development': 'ការអភិវឌ្ឍន៍ Full Stack',
  'Course Management System': 'ប្រព័ន្ធគ្រប់គ្រងវគ្គសិក្សា',
  'Computer Science Student': 'និស្សិតវិទ្យាសាស្ត្រកុំព្យូទ័រ',
  'Institute of Technology of Cambodia': 'វិទ្យាស្ថានបច្ចេកវិទ្យាកម្ពុជា',
  '2023 – Present': '2023 – បច្ចុប្បន្ន',
  'Studying computer science fundamentals, algorithms, operating systems, and software engineering. Building projects that apply theoretical knowledge to real-world problems.':
    'កំពុងសិក្សាមូលដ្ឋានគ្រឹះវិទ្យាសាស្ត្រកុំព្យូទ័រ ក្បួនដោះស្រាយ ប្រព័ន្ធប្រតិបត្តិការ និងវិស្វកម្មកម្មវិធី។ បង្កើតគម្រោងដែលយកចំណេះដឹងទ្រឹស្តីមកដោះស្រាយបញ្ហាជាក់ស្តែង។',
  'Algorithms': 'ក្បួនដោះស្រាយ (Algorithms)',
  'OS Concepts': 'គោលគំនិតប្រព័ន្ធប្រតិបត្តិការ',

  /* ── Certificates ── */
  'title.certificates': 'វិញ្ញាបនបត្រ ដែលបានផ្ទៀងផ្ទាត់',
  'Government Verified': 'ផ្ទៀងផ្ទាត់ដោយរដ្ឋាភិបាល',
  'Baccalaureate (Grade 12)': 'សញ្ញាបត្រមធ្យមសិក្សាទុតិយភូមិ (ថ្នាក់ទី១២)',
  'Ministry of Education, Youth and Sport, Cambodia': 'ក្រសួងអប់រំ យុវជន និងកីឡា',
  '05 Dec 2022': '05 ធ្នូ 2022',
  'Successfully passed the national upper-secondary examination (Bac II), a government-issued credential validating completion of secondary education in Cambodia.':
    'បានប្រឡងជាប់សញ្ញាបត្រមធ្យមសិក្សាទុតិយភូមិថ្នាក់ជាតិ (បាក់ឌុប) ដែលជាសញ្ញាបត្រចេញដោយរដ្ឋាភិបាល បញ្ជាក់ពីការបញ្ចប់ការសិក្សាកម្រិតមធ្យមសិក្សានៅកម្ពុជា។',
  'Biology': 'ជីវវិទ្យា',
  'Mathematics': 'គណិតវិទ្យា',
  'Chemistry': 'គីមីវិទ្យា',
  'Verify Official Credential': 'ផ្ទៀងផ្ទាត់សញ្ញាបត្រផ្លូវការ',

  /* ── Projects + GitHub stats ── */
  'title.projects': 'កម្មវិធីគេហទំព័រ APIs និង គម្រោងកូដចំហ',
  'Public repos': 'Repo សាធារណៈ',
  'Stars earned': 'ផ្កាយដែលទទួលបាន',
  'Languages': 'ភាសាកម្មវិធី',
  'Years on GitHub': 'ឆ្នាំនៅលើ GitHub',
  'Most-used languages': 'ភាសាដែលប្រើច្រើនបំផុត',
  'Other': 'ផ្សេងៗ',
  'Loading projects from GitHub...': 'កំពុងផ្ទុកគម្រោងពី GitHub...',
  'Unable to load GitHub projects.': 'មិនអាចផ្ទុកគម្រោងពី GitHub បានទេ។',
  '2026 · Live platform': '2026 · កំពុងដំណើរការ',
  'RIN Nairith — Professional Services Platform': 'RIN Nairith — វេទិកាសេវាកម្មវិជ្ជាជីវៈ',
  'Personal Product': 'ផលិតផលផ្ទាល់ខ្លួន',
  'My dedicated services website where visitors can explore my services, development process, transparent pricing, about, FAQ, and contact — a one-stop place to start a project with me.':
    'គេហទំព័រសេវាកម្មរបស់ខ្ញុំ ដែលអ្នកទស្សនាអាចស្វែងយល់ពីសេវាកម្ម ដំណើរការអភិវឌ្ឍន៍ តម្លៃច្បាស់លាស់ អំពីខ្ញុំ សំណួរញឹកញាប់ និងទំនាក់ទំនង — ជាកន្លែងតែមួយសម្រាប់ចាប់ផ្តើមគម្រោងជាមួយខ្ញុំ។',
  'Process': 'ដំណើរការ',
  'Pricing': 'តម្លៃ',
  'FAQ': 'សំណួរញឹកញាប់',
  'Visit Live Site': 'ចូលមើលគេហទំព័រ',
  'GitRadar – AI GitHub Portfolio Analysis': 'GitRadar – វិភាគ GitHub Portfolio ដោយ AI',
  'Unavailable': 'មិនទាន់អាចប្រើបាន',
  'Full-stack platform that connects to your GitHub account, analyzes repositories and development activity, and turns raw GitHub stats into a scored portfolio with actionable insights — built with user-specific OAuth and secure multi-user data isolation.':
    'វេទិកា Full-stack ដែលភ្ជាប់ទៅគណនី GitHub របស់អ្នក វិភាគ repositories និងសកម្មភាពអភិវឌ្ឍន៍ ហើយបំលែងស្ថិតិ GitHub ទៅជា portfolio ដែលមានពិន្ទុ និងការណែនាំដែលអាចអនុវត្តបាន — ប្រើ OAuth តាមអ្នកប្រើម្នាក់ៗ និងការបំបែកទិន្នន័យអ្នកប្រើច្រើននាក់ដោយសុវត្ថិភាព។',
  'AI Analysis': 'ការវិភាគដោយ AI',
  'View Live Site': 'មើលគេហទំព័រ',
  '08/2026 – Present': '08/2026 – បច្ចុប្បន្ន',
  '06/2026 – Present': '06/2026 – បច្ចុប្បន្ន',
  'GoKH – Cambodia Trip Planner': 'GoKH – កម្មវិធីរៀបចំដំណើរកម្សាន្តនៅកម្ពុជា',
  'Featured': 'លេចធ្លោ',
  'Cambodia-focused collaborative trip-planning product with a modern UI/UX. Plan destinations together, manage travelers and dates, and organize transport, accommodation, budget, and a day-by-day itinerary with live weather and directions — all shared instantly via a single share link.':
    'ផលិតផលរៀបចំដំណើរកម្សាន្តរួមគ្នាសម្រាប់កម្ពុជា ជាមួយ UI/UX ទំនើប។ ជ្រើសរើសគោលដៅជាមួយគ្នា គ្រប់គ្រងអ្នកដំណើរ និងកាលបរិច្ឆេទ ព្រមទាំងរៀបចំការធ្វើដំណើរ កន្លែងស្នាក់នៅ ថវិកា និងកម្មវិធីប្រចាំថ្ងៃ ជាមួយព័ត៌មានអាកាសធាតុ និងផ្លូវធ្វើដំណើរ — ចែករំលែកភ្លាមៗតាមតំណតែមួយ។',
  'Share Links': 'តំណចែករំលែក',
  'Live Site': 'គេហទំព័រ',
  'Case Study': 'ករណីសិក្សា',
  'Open-source PHP MVC framework with CLI scaffolding, custom ORM, service container, middleware pipeline, queue system, and full CI/CD deployment on Docker + AWS EC2.':
    'PHP MVC framework កូដចំហ ដែលមាន CLI scaffolding, ORM ផ្ទាល់ខ្លួន, service container, middleware pipeline, ប្រព័ន្ធ queue និងការដាក់ដំណើរការ CI/CD ពេញលេញលើ Docker + AWS EC2។',
  'Docs Site': 'គេហទំព័រឯកសារ',
  'PromptHub – AI Prompt Platform': 'PromptHub – វេទិកា AI Prompt',
  'Full-stack AI prompt sharing platform with user auth, public profiles, analytics, leaderboards, and avatar uploads. Deployed on AWS EC2 with Nginx, PHP-FPM, and SSL/HTTPS.':
    'វេទិកាចែករំលែក AI prompt ពេញលេញ មានការចូលគណនី ប្រវត្តិរូបសាធារណៈ ស្ថិតិ តារាងចំណាត់ថ្នាក់ និងការផ្ទុករូបតំណាង។ ដាក់ដំណើរការលើ AWS EC2 ជាមួយ Nginx, PHP-FPM និង SSL/HTTPS។',
  'AWS Todo App Deployment': 'ការដាក់ដំណើរការ Todo App លើ AWS',
  'Full-stack todo management app deployed on AWS EC2 with Apache2, SSL, custom domain, and GitHub deployment workflow. Features auth, comments, and profile management.':
    'កម្មវិធីគ្រប់គ្រងការងារ (todo) ពេញលេញ ដាក់ដំណើរការលើ AWS EC2 ជាមួយ Apache2, SSL, domain ផ្ទាល់ខ្លួន និង workflow ដាក់ដំណើរការពី GitHub។ មានមុខងារចូលគណនី មតិយោបល់ និងការគ្រប់គ្រងប្រវត្តិរូប។',
  'Coffee Aroma Full Stack App': 'Coffee Aroma – កម្មវិធី Full Stack',
  'Full-stack coffee ordering system with Spring Boot and MySQL. Integrated Telegram Bot API for real-time order notifications, product catalog, cart, and admin dashboard.':
    'ប្រព័ន្ធបញ្ជាទិញកាហ្វេពេញលេញ ជាមួយ Spring Boot និង MySQL។ ភ្ជាប់ Telegram Bot API សម្រាប់ជូនដំណឹងការបញ្ជាទិញភ្លាមៗ មានកាតាឡុកផលិតផល កន្ត្រកទំនិញ និងផ្ទាំងគ្រប់គ្រង។',
  'CPU Scheduling Visualizer': 'កម្មវិធីបង្ហាញ CPU Scheduling',
  'Interactive CPU scheduling simulator implementing FCFS, SJF, Round Robin, and Priority algorithms with real-time visualisation. Deployed on GitHub Pages.':
    'កម្មវិធីក្លែងធ្វើ CPU scheduling អន្តរកម្ម ដែលអនុវត្តក្បួន FCFS, SJF, Round Robin និង Priority ជាមួយការបង្ហាញជារូបភាពភ្លាមៗ។ ដាក់ដំណើរការលើ GitHub Pages។',
  'OS Algorithms': 'ក្បួនដោះស្រាយ OS',
  'File Extension Validator': 'កម្មវិធីផ្ទៀងផ្ទាត់កន្ទុយឯកសារ',
  'Mini Java tool to validate file names and extensions using regular expressions, with GUI interaction for testing edge cases and invalid format detection.':
    'ឧបករណ៍ Java តូចមួយសម្រាប់ផ្ទៀងផ្ទាត់ឈ្មោះ និងកន្ទុយឯកសារ ដោយប្រើ regular expressions ជាមួយ GUI សម្រាប់សាកល្បងករណីពិសេស និងរកទម្រង់មិនត្រឹមត្រូវ។',
  'Validation': 'ការផ្ទៀងផ្ទាត់',
  'View All on GitHub': 'មើលទាំងអស់នៅលើ GitHub',
  // GitHub-loaded High School Math card (text comes from script.js)
  'High School Math – Digital Textbook': 'High School Math – សៀវភៅសិក្សាឌីជីថល',
  'Free English & Khmer math textbook for Cambodian Grades 7–12, with 264 formulas, step-by-step worked examples, a 2D/3D Shape Lab, and Diploma & BacII exam practice.':
    'សៀវភៅគណិតវិទ្យាឥតគិតថ្លៃ ជាភាសាអង់គ្លេស និងខ្មែរ សម្រាប់សិស្សថ្នាក់ទី៧–១២ នៅកម្ពុជា មានរូបមន្ត 264 លំហាត់គំរូដោះស្រាយមួយជំហានម្តងៗ Shape Lab 2D/3D និងការហាត់ប្រឡងឌីប្លូម និងបាក់ឌុប។',
  'Khmer / English': 'ខ្មែរ / អង់គ្លេស',
  // Cards built from GitHub repo data (repo name + repo description)
  'No description available.': 'មិនទាន់មានការពិពណ៌នា។',
  'microsoft office learning': 'Office Academy – រៀន Microsoft Office',
  'Interactive beginner-friendly Microsoft Word & Excel learning platform for administrative skills.':
    'វេទិកាអន្តរកម្មសម្រាប់រៀន Microsoft Word និង Excel ងាយស្រួលសម្រាប់អ្នកចាប់ផ្តើម ដើម្បីពង្រឹងជំនាញការងាររដ្ឋបាល។',
  'motion lab': 'Motion Lab – មន្ទីរពិសោធន៍ចលនា',
  'Interactive creative technology laboratory for exploring, experimenting with, and customizing modern 3D animations, WebGL effects, particles, and motion experiences.':
    'មន្ទីរពិសោធន៍បច្ចេកវិទ្យាច្នៃប្រឌិតអន្តរកម្ម សម្រាប់ស្វែងយល់ សាកល្បង និងកែសម្រួលចលនា 3D ទំនើប បែបផែន WebGL ភាគល្អិត និងបទពិសោធន៍ចលនា។',
  'educore': 'EduCore – ប្រព័ន្ធរដ្ឋបាលសាកលវិទ្យាល័យ',
  'University digital administration platform built with Laravel and Vue.js.':
    'វេទិការដ្ឋបាលឌីជីថលសម្រាប់សាកលវិទ្យាល័យ បង្កើតដោយ Laravel និង Vue.js។',
  'omni academic telegram agent': 'Omni Academic – Telegram Bot',
  'Asynchronous Telegram Supergroup bot for university course management, thread-aware LLM assistance, document parsing, and technical message refactoring.':
    'Telegram bot អសមកាលសម្រាប់ Supergroup ដើម្បីគ្រប់គ្រងមុខវិជ្ជានៅសាកលវិទ្យាល័យ ជំនួយ LLM តាម thread ការវិភាគឯកសារ និងការកែសម្រួលសារបច្ចេកទេស។',
  'twintech': 'TwinTech – គ្រប់គ្រងសារពើភ័ណ្ឌកុំព្យូទ័រ',
  'TwinTech is an enterprise-grade computer inventory and service management platform featuring asset tracking, maintenance workflows, role-based access control, and analytics.':
    'TwinTech ជាវេទិកាគ្រប់គ្រងសារពើភ័ណ្ឌកុំព្យូទ័រ និងសេវាកម្មកម្រិតសហគ្រាស មានការតាមដានទ្រព្យសម្បត្តិ លំហូរការងារថែទាំ ការគ្រប់គ្រងសិទ្ធិតាមតួនាទី និងការវិភាគទិន្នន័យ។',
  'CCOP': 'CCOP – ឱកាសការងារនៅកម្ពុជា',
  'A web-based platform that centralizes career opportunities in Cambodia, helping students and job seekers discover, bookmark, and apply for jobs, internships, scholarships, and training programs.':
    'វេទិកាគេហទំព័រដែលប្រមូលឱកាសការងារនៅកម្ពុជាមកកន្លែងតែមួយ ជួយសិស្សនិស្សិត និងអ្នកស្វែងរកការងារ ឱ្យស្វែងរក រក្សាទុក និងដាក់ពាក្យការងារ កម្មសិក្សា អាហារូបករណ៍ និងវគ្គបណ្តុះបណ្តាល។',
  'notes app': 'Notes App – កម្មវិធីកត់ត្រា',
  'A full-stack Notes application built with ASP.NET Core Web API, Vue 3, TypeScript, Tailwind CSS, Dapper, and SQL Server.':
    'កម្មវិធីកត់ត្រា Full-stack បង្កើតដោយ ASP.NET Core Web API, Vue 3, TypeScript, Tailwind CSS, Dapper និង SQL Server។',
  'typing master': 'Typing Master – ហាត់វាយអក្សរ',
  'wedding': 'Wedding – គេហទំព័រអាពាហ៍ពិពាហ៍',
  'ecommerce project vue': 'E-commerce – Vue និង Spring Boot',
  'Build ecommerce webpage using vue with spring boot for ITC':
    'គេហទំព័រលក់ទំនិញអនឡាញ បង្កើតដោយ Vue និង Spring Boot សម្រាប់វិទ្យាស្ថានបច្ចេកវិទ្យាកម្ពុជា។',
  'chess with ai': 'Chess – អុកជាមួយ AI',
  'This web-based chess game uses HTML, CSS, and JavaScript to create an interactive experience. It features drag-and-drop gameplay, full rule enforcement, and a basic AI opponent for instant single-player practice.':
    'ល្បែងអុកលើគេហទំព័រ បង្កើតដោយ HTML, CSS និង JavaScript។ មានការអូសទម្លាក់កូនអុក អនុវត្តច្បាប់អុកពេញលេញ និងគូប្រកួត AI សម្រាប់ហាត់លេងម្នាក់ឯងភ្លាមៗ។',
  'terrain rental': 'Terrain Rental – ប្រព័ន្ធជួលដី',
  'Spring Boot terrain rental management system with MySQL, JPA, REST APIs, and testing.':
    'ប្រព័ន្ធគ្រប់គ្រងការជួលដី បង្កើតដោយ Spring Boot ជាមួយ MySQL, JPA, REST APIs និងការធ្វើតេស្ត។',
  'valor': 'VALOR – ហាងសម្លៀកបំពាក់បុរសដោយ AI',
  "VALOR - AI Powered Men's Fashion Ecommerce Platform Built With Flutter And Laravel":
    'VALOR – វេទិកាលក់សម្លៀកបំពាក់បុរសអនឡាញដែលប្រើ AI បង្កើតដោយ Flutter និង Laravel។',

  /* ── Services ── */
  'title.services': 'តោះ បង្កើតអ្វីមួយ ដែលដំណើរការបានពិតប្រាកដ។',
  'I design and build modern, scalable web applications and digital products — from idea to production. Explore the capabilities below, or visit my dedicated services platform for my full process, pricing, and ways to work with me.':
    'ខ្ញុំរចនា និងបង្កើតកម្មវិធីគេហទំព័រ និងផលិតផលឌីជីថលទំនើបដែលអាចពង្រីកបាន — ចាប់ពីគំនិតរហូតដល់ការប្រើប្រាស់ជាក់ស្តែង។ ស្វែងយល់ពីសមត្ថភាពខាងក្រោម ឬចូលមើលវេទិកាសេវាកម្មរបស់ខ្ញុំ ដើម្បីដឹងពីដំណើរការការងារ តម្លៃ និងវិធីធ្វើការជាមួយខ្ញុំ។',
  'Full-Stack Web Development': 'ការអភិវឌ្ឍន៍គេហទំព័រ Full-Stack',
  'Complete web applications — frontend, backend, database, and APIs working together end-to-end.':
    'កម្មវិធីគេហទំព័រពេញលេញ — frontend, backend, មូលដ្ឋានទិន្នន័យ និង APIs ដំណើរការរួមគ្នាពីដើមដល់ចប់។',
  'Backend Development & APIs': 'ការអភិវឌ្ឍន៍ Backend និង APIs',
  'RESTful APIs, business logic, authentication, and integrations with third-party services.':
    'RESTful APIs, តក្កវិជ្ជាអាជីវកម្ម ការផ្ទៀងផ្ទាត់អត្តសញ្ញាណ និងការភ្ជាប់ជាមួយសេវាកម្មភាគីទីបី។',
  'Modern Frontend Development': 'ការអភិវឌ្ឍន៍ Frontend ទំនើប',
  'Fast, responsive, accessible interfaces built with modern JavaScript and Vue.js.':
    'ចំណុចប្រទាក់ដែលលឿន បត់បែនតាមគ្រប់ឧបករណ៍ និងងាយស្រួលប្រើ បង្កើតដោយ JavaScript ទំនើប និង Vue.js។',
  'Relational modeling, schemas, and optimized queries for real products and data-heavy systems.':
    'ការរចនាគំរូទិន្នន័យ schema និង query ដែលមានប្រសិទ្ធភាព សម្រាប់ផលិតផលពិត និងប្រព័ន្ធដែលមានទិន្នន័យច្រើន។',
  'System Development': 'ការអភិវឌ្ឍន៍ប្រព័ន្ធ',
  'Complete software systems with clean architecture, tooling, and maintainable code.':
    'ប្រព័ន្ធកម្មវិធីពេញលេញ ជាមួយស្ថាបត្យកម្មស្អាត ឧបករណ៍ និងកូដដែលងាយថែទាំ។',
  'Deployment & Production Setup': 'ការដាក់ដំណើរការ និងរៀបចំ Production',
  'AWS, Docker, Nginx, SSL, and CI/CD pipelines for reliable, secure production releases.':
    'AWS, Docker, Nginx, SSL និង CI/CD pipelines សម្រាប់ការបញ្ចេញកម្មវិធីដែលទុកចិត្តបាន និងមានសុវត្ថិភាព។',
  'Custom Business Applications': 'កម្មវិធីអាជីវកម្មតាមតម្រូវការ',
  'Dashboards, admin systems, and tools tailored to your business workflow.':
    'ផ្ទាំងគ្រប់គ្រង ប្រព័ន្ធរដ្ឋបាល និងឧបករណ៍ដែលរៀបចំតាមលំហូរការងាររបស់អាជីវកម្មអ្នក។',
  'Need a Developer?': 'ត្រូវការអ្នកអភិវឌ្ឍន៍មែនទេ?',
  'Explore my services, process, pricing, and ways to work with me on my dedicated services platform.':
    'ស្វែងយល់ពីសេវាកម្ម ដំណើរការការងារ តម្លៃ និងវិធីធ្វើការជាមួយខ្ញុំ នៅលើវេទិកាសេវាកម្មរបស់ខ្ញុំ។',
  'View My Services': 'មើលសេវាកម្មរបស់ខ្ញុំ',

  /* ── Contact ── */
  'title.contact': 'តោះ ធ្វើការជាមួយគ្នា',
  "I'm open to full-time roles, freelance projects, and collaboration. Whether you have a specific idea or just want to connect — reach out.":
    'ខ្ញុំត្រៀមខ្លួនសម្រាប់ការងារពេញម៉ោង គម្រោង freelance និងកិច្ចសហការ។ មិនថាអ្នកមានគំនិតច្បាស់លាស់ ឬគ្រាន់តែចង់ស្គាល់គ្នា — សូមទាក់ទងមក។',
  'Email': 'អ៊ីមែល',
  'Phone': 'ទូរស័ព្ទ',
  'Location': 'ទីតាំង',
  '↗ map': '↗ ផែនទី',
  'Name': 'ឈ្មោះ',
  'Subject': 'ប្រធានបទ',
  'Message': 'សារ',
  'Send Message': 'ផ្ញើសារ',
  'Sending…': 'កំពុងផ្ញើ…',
  'Your name': 'ឈ្មោះរបស់អ្នក',
  "What's this about?": 'តើទាក់ទងអំពីអ្វី?',
  'Tell me about your project...': 'ប្រាប់ខ្ញុំអំពីគម្រោងរបស់អ្នក...',
  "Message sent! I'll get back to you soon.": 'បានផ្ញើសាររួចរាល់! ខ្ញុំនឹងឆ្លើយតបឆាប់ៗ។',
  "Couldn't send right now. Email me at nairithrin143@gmail.com": 'មិនអាចផ្ញើបានទេពេលនេះ។ សូមផ្ញើអ៊ីមែលមក nairithrin143@gmail.com',
  'Email not configured yet. Contact me at nairithrin143@gmail.com': 'អ៊ីមែលមិនទាន់បានកំណត់ទេ។ សូមទាក់ទងមក nairithrin143@gmail.com',
  'My Location': 'ទីតាំងរបស់ខ្ញុំ',

  /* ── Command palette ── */
  'Jump to a section, project or action…': 'ស្វែងរកផ្នែក គម្រោង ឬសកម្មភាព…',
  'navigate': 'រំកិល',
  'open': 'បើក',
  'close': 'បិទ',
  'Sections': 'ផ្នែក',
  'Actions': 'សកម្មភាព',
  'Links': 'តំណភ្ជាប់',
  'Toggle light / dark theme': 'ប្តូរពន្លឺ / ងងឹត',
  'Copy email address': 'ចម្លងអាសយដ្ឋានអ៊ីមែល',
  'Download CV (PDF)': 'ទាញយក CV (PDF)',
  'Send me a message': 'ផ្ញើសារមកខ្ញុំ',
  'Services website': 'គេហទំព័រសេវាកម្ម',
  'Case study': 'ករណីសិក្សា',
  'Live site': 'គេហទំព័រ',
  'No results': 'រកមិនឃើញ',
  'Email copied to clipboard': 'បានចម្លងអ៊ីមែលរួចរាល់',
};

/* Typing roles in the hero (same order as CONFIG.typingRoles) */
const KM_TYPING_ROLES = [
  'អ្នកអភិវឌ្ឍន៍កម្មវិធី',
  'អ្នកបង្កើត PHP Framework',
  'វិស្វករ Backend',
  'អ្នកអភិវឌ្ឍន៍ Frontend',
  'អ្នកសិក្សា Cloud និង DevOps',
  'អ្នកអភិវឌ្ឍន៍ API',
  'អ្នកបង្កើតកូដចំហ',
  'អ្នកដោះស្រាយបញ្ហា',
  'អ្នកអភិវឌ្ឍន៍ Java Spring Boot',
  'អ្នកចូលចិត្តការរចនាប្រព័ន្ធ',
];

const I18N = (() => {
  const SKIP = 'script, style, pre, code, kbd, textarea, .typing-text, [data-i18n], [data-no-i18n]';
  const ATTRS = ['placeholder', 'aria-label', 'title'];
  const norm = s => s.replace(/\s+/g, ' ').trim();

  let lang = 'en';
  const textOrig = new Map();   // Text node → original English value
  const attrOrig = new Map();   // Element → { attr: original }
  const htmlOrig = new Map();   // [data-i18n] element → original innerHTML
  let observer = null;
  let original = null;          // English <title> / description

  const t = en => (lang === 'km' && KM[en]) || en;

  function translateText(node) {
    if (textOrig.has(node)) return;
    const key = norm(node.nodeValue);
    const km = key && KM[key];
    if (!km) return;
    const parent = node.parentElement;
    if (!parent || parent.closest(SKIP)) return;
    textOrig.set(node, node.nodeValue);
    const lead = node.nodeValue.match(/^\s*/)[0];
    const trail = node.nodeValue.match(/\s*$/)[0];
    node.nodeValue = lead + km + trail;
  }

  function translateAttrs(el) {
    ATTRS.forEach(a => {
      const v = el.getAttribute(a);
      const km = v && KM[norm(v)];
      if (!km) return;
      const saved = attrOrig.get(el) || {};
      if (a in saved) return;
      saved[a] = v;
      attrOrig.set(el, saved);
      el.setAttribute(a, km);
    });
  }

  // Case-study links → Khmer versions (projects/x.html → projects/x.km.html)
  const CASE_LINK = 'a[href*="projects/"][href$=".html"]';
  function localizeLink(a) {
    const href = a.getAttribute('href');
    if (!/(^|\/)projects\/[\w-]+\.html$/.test(href) || /\.km\.html$/.test(href)) return;
    const saved = attrOrig.get(a) || {};
    if ('href' in saved) return;
    saved.href = href;
    attrOrig.set(a, saved);
    a.setAttribute('href', href.replace(/\.html$/, '.km.html'));
  }

  function translateKeyed(el) {
    if (htmlOrig.has(el)) return;
    const km = KM[el.dataset.i18n];
    if (!km) return;
    htmlOrig.set(el, el.innerHTML);
    el.innerHTML = km;
    if (el.matches('.section-title') && typeof splitTitleWords === 'function') splitTitleWords(el);
  }

  function translateTree(root) {
    if (root.nodeType === Node.TEXT_NODE) { translateText(root); return; }
    if (root.nodeType !== Node.ELEMENT_NODE) return;
    if (root.matches?.('[data-i18n]')) translateKeyed(root);
    root.querySelectorAll?.('[data-i18n]').forEach(translateKeyed);
    if (root.matches?.(ATTRS.map(a => `[${a}]`).join(','))) translateAttrs(root);
    root.querySelectorAll?.(ATTRS.map(a => `[${a}]`).join(',')).forEach(translateAttrs);
    if (root.matches?.(CASE_LINK)) localizeLink(root);
    root.querySelectorAll?.(CASE_LINK).forEach(localizeLink);
    const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
    const nodes = [];
    while (walker.nextNode()) nodes.push(walker.currentNode);
    nodes.forEach(translateText);
  }

  function restore() {
    textOrig.forEach((v, node) => { node.nodeValue = v; });
    textOrig.clear();
    attrOrig.forEach((saved, el) => Object.entries(saved).forEach(([a, v]) => el.setAttribute(a, v)));
    attrOrig.clear();
    htmlOrig.forEach((html, el) => {
      el.innerHTML = html;
      if (el.matches('.section-title') && typeof splitTitleWords === 'function') splitTitleWords(el);
    });
    htmlOrig.clear();
  }

  function setMeta() {
    const desc = document.querySelector('meta[name="description"]');
    if (!original) original = { title: document.title, desc: desc?.content };
    document.title = lang === 'km' ? KM['meta.title'] : original.title;
    if (desc) desc.content = lang === 'km' ? KM['meta.description'] : original.desc;
    const canonical = document.querySelector('link[rel="canonical"]');
    if (canonical) {
      const url = new URL(canonical.href);
      if (lang === 'km') url.searchParams.set('lang', 'km');
      else url.searchParams.delete('lang');
      canonical.href = url.toString();
    }
  }

  function setUrl() {
    const url = new URL(location.href);
    if (lang === 'km') url.searchParams.set('lang', 'km');
    else url.searchParams.delete('lang');
    history.replaceState(history.state, '', url);
  }

  function paintToggle() {
    const btn = document.getElementById('lang-toggle');
    if (!btn) return;
    btn.dataset.active = lang;
    btn.setAttribute('aria-label', lang === 'km' ? 'Switch to English' : 'ប្តូរទៅភាសាខ្មែរ (Switch to Khmer)');
    btn.setAttribute('aria-pressed', String(lang === 'km'));
  }

  function set(next, { persist = true } = {}) {
    next = next === 'km' ? 'km' : 'en';
    const changed = next !== lang;
    if (lang === 'km') { observer?.disconnect(); restore(); }
    lang = next;
    document.documentElement.lang = lang;
    if (lang === 'km') {
      translateTree(document.body);
      observer = observer || new MutationObserver(muts => {
        muts.forEach(m => m.addedNodes.forEach(translateTree));
      });
      observer.observe(document.body, { childList: true, subtree: true });
    }
    setMeta();
    paintToggle();
    if (persist) {
      try { localStorage.setItem('lang', lang); } catch { /* storage blocked */ }
      setUrl();
    }
    if (changed) document.dispatchEvent(new CustomEvent('langchange', { detail: { lang } }));
  }

  function init() {
    let initial = new URLSearchParams(location.search).get('lang');
    if (!initial) { try { initial = localStorage.getItem('lang'); } catch { /* ignore */ } }
    if (!initial) initial = (navigator.language || '').toLowerCase().startsWith('km') ? 'km' : 'en';
    set(initial, { persist: false });
    if (lang === 'km') setUrl();
    document.getElementById('lang-toggle')?.addEventListener('click', () => set(lang === 'km' ? 'en' : 'km'));
  }

  return { init, set, t, get lang() { return lang; }, typingRoles: () => (lang === 'km' ? KM_TYPING_ROLES : null) };
})();

window.I18N = I18N;

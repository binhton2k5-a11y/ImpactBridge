/**
 * ImpactBridge - Website Interactive Logic
 * Vanilla JavaScript implementation
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Mobile Menu Toggle
  const mobileToggle = document.getElementById('mobileToggle');
  const navMenu = document.getElementById('navMenu');
  const navLinks = document.querySelectorAll('.nav-link');

  if (mobileToggle && navMenu) {
    mobileToggle.addEventListener('click', () => {
      const isOpen = navMenu.classList.toggle('open');
      mobileToggle.classList.toggle('open');
      mobileToggle.setAttribute('aria-expanded', isOpen);
    });

    // Close menu when clicking any nav link
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('open');
        mobileToggle.classList.remove('open');
        mobileToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // 2. Header shadow on scroll & Active Link Spy
  const header = document.getElementById('navbar');
  const sections = document.querySelectorAll('section[id]');

  window.addEventListener('scroll', () => {
    // Add shadow when scrolled
    if (window.scrollY > 20) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }

    // Scroll Spy for navigation highlights
    let scrollPosition = window.scrollY + 120;
    sections.forEach(current => {
      const sectionHeight = current.offsetHeight;
      const sectionTop = current.offsetTop;
      const sectionId = current.getAttribute('id');

      if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${sectionId}`) {
            link.classList.add('active');
          }
        });
      }
    });
  });

  // 3. Approach 6-Step Pipeline Interactive Detail Switcher
  const approachSteps = [
    {
      step: 1,
      name: "Find",
      title: "Stage 1 — Strategic Project Discovery & Scoping",
      desc: "We scan communities across Vietnam through our trusted civil society network. We curate vetted social enterprises, accredited NGOs, and grassroots community organizations tackling pressing issues in education, clean water, healthcare, and climate resilience.",
      deliverables: [
        "Tailored shortlist aligned with Swiss corporate CSR & ESG targets",
        "Geographic feasibility assessment across Vietnamese provinces",
        "Community-driven impact baseline and needs analysis"
      ]
    },
    {
      step: 2,
      name: "Verify",
      title: "Stage 2 — Multi-Point Legal & Integrity Due Diligence",
      desc: "Before any proposal reaches your board, we run an intensive 35-point integrity audit. We verify Vietnamese ministry registration, tax and audit compliance, leadership background, and past financial track records.",
      deliverables: [
        "Full institutional due diligence report & background dossiers",
        "Anti-bribery, anti-money laundering (AML), and child safeguarding verification",
        "Direct interviews with community beneficiaries and local stakeholders"
      ]
    },
    {
      step: 3,
      name: "Connect",
      title: "Stage 3 — Swiss Governance Structuring & Agreement",
      desc: "We formalize the relationship under enforceable Swiss legal frameworks. We translate your company’s impact mandate into measurable milestones, escrow disbursement triggers, and defined KPIs.",
      deliverables: [
        "Trilingual Swiss grant or partnership contract (EN, DE, FR)",
        "Escrow-linked funding schedule tied to tangible project milestones",
        "Compliance with Swiss tax deduction guidelines for corporate philanthropy"
      ]
    },
    {
      step: 4,
      name: "Monitor",
      title: "Stage 4 — Real-Time Milestone Monitoring & Field Audits",
      desc: "Our native field team in Vietnam conducts regular unannounced spot-checks, photographs progress, reviews raw vendor receipts, and ensures funds directly reach the ground without leaks.",
      deliverables: [
        "Geotagged photographic and video documentation of all project phases",
        "Milestone audit sign-off before subsequent fund tranche releases",
        "Direct WhatsApp / Slack / Email field updates for corporate CSR leads"
      ]
    },
    {
      step: 5,
      name: "Measure",
      title: "Stage 5 — Scientific Impact Measurement & SDG Valuation",
      desc: "We apply recognized social return on investment (SROI) methodologies to quantify outcomes: school graduation rates, clean liters delivered, hectares protected, or female income gains.",
      deliverables: [
        "Certified UN SDG indicator mapping (e.g. SDG 4, 6, 8, 13)",
        "Quantified beneficiary count and socio-economic multiplier data",
        "Swiss Code of Best Practice & GRI-compliant data tables"
      ]
    },
    {
      step: 6,
      name: "Communicate",
      title: "Stage 6 — Executive Storytelling & Annual Reporting",
      desc: "We transform technical impact data into beautiful, inspiring corporate communications. Whether for your annual report, internal town hall, or external PR, your impact shines authentically.",
      deliverables: [
        "High-definition photo and video content library with full usage rights",
        "Executive PDF summary formatted for boardrooms and stakeholders",
        "Optional virtual or on-site field visits for Swiss executive delegations"
      ]
    }
  ];

  const approachCards = document.querySelectorAll('.approach-step-card');
  const approachTitle = document.getElementById('approachDetailTitle');
  const approachDesc = document.getElementById('approachDetailDesc');
  const approachDeliverables = document.getElementById('approachDetailDeliverables');

  approachCards.forEach(card => {
    card.addEventListener('click', () => {
      approachCards.forEach(c => c.classList.remove('active'));
      card.classList.add('active');

      const stepNum = parseInt(card.getAttribute('data-step'), 10);
      const data = approachSteps.find(s => s.step === stepNum);

      if (data && approachTitle && approachDesc && approachDeliverables) {
        approachTitle.innerHTML = `<span class="top-badge" style="background-color: var(--color-navy);">Stage ${data.step}</span> ${data.title}`;
        approachDesc.textContent = data.desc;

        approachDeliverables.innerHTML = data.deliverables.map(item => `
          <li>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg>
            ${item}
          </li>
        `).join('');
      }
    });
  });

  // 4. Project Category Filtering
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const category = btn.getAttribute('data-category');

      projectCards.forEach(card => {
        const cardCategory = card.getAttribute('data-category');
        if (category === 'all' || cardCategory === category) {
          card.style.display = 'flex';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });

  // 5. Project Detail Modal Data & Handling
  const projectDetails = {
    p1: {
      category: "Education & Youth",
      title: "Solar Tech Classrooms for Ethnic Minority Students",
      location: "Hà Giang Highland Province, Northern Vietnam",
      challenge: "Isolated highland communes lack stable electricity and access to quality learning tools, leading to high drop-out rates among ethnic minority children (H'Mong and Tay communities).",
      solution: "Installation of robust off-grid solar arrays, high-durability rugged tablet computers, and bilingual Vietnamese-ethnic digital curricula in 12 highland primary schools.",
      governance: [
        "Direct procurement oversight with verified Swiss-Vietnamese hardware suppliers",
        "Quarterly teacher utilization audits and maintenance logs",
        "Milestone 1: Solar installation; Milestone 2: Curriculum deployment; Milestone 3: Learning assessment"
      ],
      budget: "CHF 38,000 (Fully or partially fundable)"
    },
    p2: {
      category: "Clean Water & Climate",
      title: "Mekong Delta Coastal Mangrove & Clean Water Resilience",
      location: "Bến Tre Province, Mekong Delta",
      challenge: "Rising sea levels and severe saltwater intrusion have contaminated freshwater wells for over 15,000 farming families, destroying arable fruit land and creating acute water stress.",
      solution: "Replanting 45,000 climate-resilient native mangrove seedlings along vulnerable sea dykes, combined with 6 community-scale solar reverse osmosis desalination stations.",
      governance: [
        "Satellite and drone canopy monitoring every 6 months to certify mangrove survival rate >85%",
        "Digital water quality sensors transmitting live purity and volume data",
        "Community co-op committee trained and audited for long-term maintenance"
      ],
      budget: "CHF 65,000 (Available for co-sponsorship)"
    },
    p3: {
      category: "Economic Empowerment",
      title: "Fair-Trade Organic Herbal Farming for Women Artisans",
      location: "Quảng Nam Province, Central Vietnam",
      challenge: "Women in rural mountainous communes lack viable economic opportunities and remain vulnerable to exploitative middlemen for their wild herb harvests.",
      solution: "Establishment of a fair-trade certified cooperative with organic processing equipment, business management coaching, and micro-working capital for 320 female farmers.",
      governance: [
        "Direct audited fund flow through cooperative bank accounts",
        "Clear fair-trade minimum pricing contracts signed with international botanical buyers",
        "Independent annual socio-economic impact census on household living standards"
      ],
      budget: "CHF 42,000 (Tranche-based partnership)"
    },
    p4: {
      category: "Healthcare & Wellbeing",
      title: "Mobile Pediatric Care & Clean Nutrition Clinics",
      location: "Kon Tum Province, Central Highlands",
      challenge: "Severe child stunting and micronutrient deficiencies afflict over 31% of children under 5 in remote villages situated hours away from district hospitals.",
      solution: "Funding two custom-equipped mobile pediatric clinic vans staffed by licensed volunteer doctors providing monthly health screenings, vaccinations, and therapeutic nutrition.",
      governance: [
        "Direct oversight by certified provincial health department partners",
        "Patient registry verifying each medical consultation and treatment outcome",
        "Zero-waste pharmaceutical and medical supply custody tracking"
      ],
      budget: "CHF 55,000 (Annual operating grant)"
    },
    p5: {
      category: "Education & Youth",
      title: "Coding & STEM Scholarships for Disadvantaged Youth",
      location: "Đà Nẵng & Central Coast",
      challenge: "Disadvantaged youth from orphanage backgrounds and low-income families are locked out of Vietnam's rapid tech economy due to high tuition fees.",
      solution: "A 10-month intensive coding bootcamp providing full living stipends, English coaching, laptops, and hands-on software development training with industry mentors.",
      governance: [
        "Formal contract with verified NGO partner 'Passerelles Numériques / TechHope'",
        "Funding disbursed in tranches: Enrollment, Midterm Project, and Graduation/Job Placement",
        "Target metric: 90%+ graduate employment with minimum starting salary >CHF 400/month"
      ],
      budget: "CHF 32,000 (Cohorts of 30 students)"
    },
    p6: {
      category: "Clean Water & Climate",
      title: "Plastic Waste Interceptors & Upcycling Hubs",
      location: "Cần Thơ & Tiền Giang Rivers, Mekong Delta",
      challenge: "The Mekong River discharges significant plastic debris directly into the South China Sea, endangering marine biodiversity and riverine fishing communities.",
      solution: "Deploying 4 stationary smart river boom interceptors to trap floating plastic, combined with a sorting facility that employs local waste pickers with fair wages and health insurance.",
      governance: [
        "Monthly certified weigh-in logs for collected plastics",
        "Traceability chain-of-custody documentation from river capture to recycling re-processors",
        "Full occupational safety audit adherence"
      ],
      budget: "CHF 48,000 (Setup & 12-month pilot)"
    }
  };

  const projectModal = document.getElementById('projectModal');
  const modalCloseBtn = document.getElementById('modalCloseBtn');
  const modalCategoryTag = document.getElementById('modalCategoryTag');
  const modalProjectTitle = document.getElementById('modalProjectTitle');
  const modalProjectLocation = document.getElementById('modalProjectLocation');
  const modalChallenge = document.getElementById('modalChallenge');
  const modalSolution = document.getElementById('modalSolution');
  const modalGovernance = document.getElementById('modalGovernance');
  const modalBudget = document.getElementById('modalBudget');
  const modalInquireBtn = document.getElementById('modalInquireBtn');
  const openModalBtns = document.querySelectorAll('.open-modal-btn');

  function openModal(projectId) {
    const data = projectDetails[projectId];
    if (!data) return;

    modalCategoryTag.textContent = data.category;
    modalProjectTitle.textContent = data.title;
    modalProjectLocation.textContent = data.location;
    modalChallenge.textContent = data.challenge;
    modalSolution.textContent = data.solution;
    modalBudget.textContent = data.budget;

    modalGovernance.innerHTML = data.governance.map(item => `
      <li style="display: flex; align-items: flex-start; gap: 0.5rem;">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--color-navy)" stroke-width="2.5" style="flex-shrink: 0; margin-top: 3px;"><polyline points="20 6 9 17 4 12"/></svg>
        <span>${item}</span>
      </li>
    `).join('');

    projectModal.classList.add('open');
    projectModal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  function closeModal() {
    projectModal.classList.remove('open');
    projectModal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  openModalBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const pId = btn.getAttribute('data-project-id');
      openModal(pId);
    });
  });

  if (modalCloseBtn) {
    modalCloseBtn.addEventListener('click', closeModal);
  }

  if (projectModal) {
    projectModal.addEventListener('click', (e) => {
      if (e.target === projectModal) {
        closeModal();
      }
    });
  }

  if (modalInquireBtn) {
    modalInquireBtn.addEventListener('click', () => {
      closeModal();
      // Scroll to contact form smoothly
      const contactSection = document.getElementById('contact');
      if (contactSection) {
        contactSection.scrollIntoView({ behavior: 'smooth' });
      }
    });
  }

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && projectModal && projectModal.classList.contains('open')) {
      closeModal();
    }
  });

  // 6. Contact Form Submission Handling
  const contactForm = document.getElementById('contactForm');
  const formFeedback = document.getElementById('formFeedback');

  if (contactForm && formFeedback) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      // Basic form validation
      const fullName = document.getElementById('fullName').value.trim();
      const companyName = document.getElementById('companyName').value.trim();
      const workEmail = document.getElementById('workEmail').value.trim();

      if (!fullName || !companyName || !workEmail) {
        alert('Please fill in all required fields (Full Name, Company, Corporate Email).');
        return;
      }

      // Check email structure
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(workEmail)) {
        alert('Please enter a valid corporate email address.');
        return;
      }

      // Simulate sending inquiry
      const submitBtn = contactForm.querySelector('button[type="submit"]');
      const originalText = submitBtn.textContent;
      submitBtn.disabled = true;
      submitBtn.textContent = 'Transmitting securely...';

      setTimeout(() => {
        submitBtn.disabled = false;
        submitBtn.textContent = originalText;
        formFeedback.className = 'form-feedback success';
        formFeedback.innerHTML = `
          <strong>Thank you, ${fullName}!</strong><br>
          Your inquiry on behalf of <strong>${companyName}</strong> has been transmitted. Our Swiss-Vietnam advisory desk in Zurich will review your profile and follow up at <em>${workEmail}</em> within 24 hours.
        `;

        contactForm.reset();

        // Optional scroll to feedback
        formFeedback.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }, 1000);
    });
  }

  // 7. Newsletter Form Handler
  const newsletterForm = document.getElementById('newsletterForm');
  if (newsletterForm) {
    newsletterForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const input = newsletterForm.querySelector('input[type="email"]');
      if (input && input.value) {
        alert(`Thank you for subscribing! Quarterly Swiss-Vietnam ESG insights will be delivered to: ${input.value}`);
        newsletterForm.reset();
      }
    });
  }
});

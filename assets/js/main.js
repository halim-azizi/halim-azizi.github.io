/**
 * Halim Azizi — Senior Front-End & Full-Stack Engineer Portfolio
 * Main Interactive Controller
 */
(function () {
  "use strict";

  /* ==========================================================================
   * 1. THEME TOGGLE (DARK / LIGHT MODE)
   * ========================================================================== */
  const htmlEl = document.documentElement;
  const themeToggleBtn = document.getElementById("themeToggle");
  const savedTheme = localStorage.getItem("halim-theme");

  if (savedTheme === "light" || savedTheme === "dark") {
    htmlEl.setAttribute("data-theme", savedTheme);
  }

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener("click", () => {
      const current = htmlEl.getAttribute("data-theme") || "dark";
      const next = current === "dark" ? "light" : "dark";
      htmlEl.setAttribute("data-theme", next);
      localStorage.setItem("halim-theme", next);
    });
  }

  /* ==========================================================================
   * 2. HEADER SCROLL & ACTIVE NAVIGATION LINK
   * ========================================================================== */
  const siteHeader = document.getElementById("siteHeader");
  const sections = document.querySelectorAll("main section[id]");
  const navLinks = document.querySelectorAll(".nav-links a");

  function onScrollUpdate() {
    const scrollY = window.scrollY;

    if (siteHeader) {
      if (scrollY > 30) {
        siteHeader.classList.add("scrolled");
      } else {
        siteHeader.classList.remove("scrolled");
      }
    }

    if (sections.length && navLinks.length) {
      const headerOffset = siteHeader ? siteHeader.offsetHeight + 80 : 120;
      let currentId = "hero";

      sections.forEach((sec) => {
        if (scrollY >= sec.offsetTop - headerOffset) {
          currentId = sec.getAttribute("id");
        }
      });

      navLinks.forEach((link) => {
        link.classList.toggle("active", link.getAttribute("href") === `#${currentId}`);
      });
    }
  }

  window.addEventListener("scroll", onScrollUpdate, { passive: true });
  onScrollUpdate();

  /* ==========================================================================
   * 3. MOBILE NAVIGATION DRAWER
   * ========================================================================== */
  const mobileMenuOpen = document.getElementById("mobileMenuOpen");
  const mobileMenuClose = document.getElementById("mobileMenuClose");
  const mobileDrawer = document.getElementById("mobileDrawer");
  const mobileNavLinks = document.querySelectorAll(".mobile-nav-list a");

  function setDrawerState(isOpen) {
    if (!mobileDrawer) return;
    mobileDrawer.classList.toggle("open", isOpen);
    mobileDrawer.setAttribute("aria-hidden", String(!isOpen));
    document.body.style.overflow = isOpen ? "hidden" : "";
  }

  if (mobileMenuOpen) {
    mobileMenuOpen.addEventListener("click", () => setDrawerState(true));
  }
  if (mobileMenuClose) {
    mobileMenuClose.addEventListener("click", () => setDrawerState(false));
  }
  mobileNavLinks.forEach((link) => {
    link.addEventListener("click", () => setDrawerState(false));
  });

  /* ==========================================================================
   * 4. SMOOTH SCROLLING FOR ANCHOR LINKS
   * ========================================================================== */
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      const targetId = this.getAttribute("href");
      if (!targetId || targetId === "#") return;
      const targetEl = document.querySelector(targetId);
      if (targetEl) {
        e.preventDefault();
        const headerHeight = siteHeader ? siteHeader.offsetHeight : 70;
        const top = targetEl.getBoundingClientRect().top + window.scrollY - headerHeight;
        window.scrollTo({ top, behavior: "smooth" });
      }
    });
  });

  /* ==========================================================================
   * 5. HERO ARCHITECTURE CONSOLE TABS
   * ========================================================================== */
  const consoleTabs = document.querySelectorAll(".console-tab");
  const consolePanes = document.querySelectorAll(".console-pane");

  consoleTabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      const targetId = tab.getAttribute("data-tab");
      consoleTabs.forEach((t) => {
        t.classList.remove("active");
        t.setAttribute("aria-selected", "false");
      });
      consolePanes.forEach((p) => p.classList.remove("active"));

      tab.classList.add("active");
      tab.setAttribute("aria-selected", "true");
      const targetPane = document.getElementById(targetId);
      if (targetPane) targetPane.classList.add("active");
    });
  });

  /* ==========================================================================
   * 6. TECHNICAL EXPERTISE CATEGORY FILTER & INSTANT SEARCH
   * ========================================================================== */
  const skillFilterBtns = document.querySelectorAll(".skill-filter-btn");
  const expertiseCols = document.querySelectorAll(".expertise-col");
  const skillSearchInput = document.getElementById("skillSearchInput");
  const allTechTags = document.querySelectorAll(".tech-tag");

  skillFilterBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      const cat = btn.getAttribute("data-category");
      skillFilterBtns.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");

      expertiseCols.forEach((col) => {
        const colCat = col.getAttribute("data-category");
        if (cat === "all" || colCat === cat) {
          col.style.display = "";
        } else {
          col.style.display = "none";
        }
      });
    });
  });

  if (skillSearchInput) {
    skillSearchInput.addEventListener("input", () => {
      const query = skillSearchInput.value.trim().toLowerCase();
      allTechTags.forEach((tag) => {
        if (!query) {
          tag.classList.remove("search-match", "search-dim");
          return;
        }
        const text = tag.textContent.toLowerCase();
        if (text.includes(query)) {
          tag.classList.add("search-match");
          tag.classList.remove("search-dim");
        } else {
          tag.classList.remove("search-match");
          tag.classList.add("search-dim");
        }
      });
    });
  }

  /* ==========================================================================
   * 7. PORTFOLIO SYSTEMS FILTER
   * ========================================================================== */
  const pfFilterBtns = document.querySelectorAll(".pf-filter-btn");
  const systemCards = document.querySelectorAll(".system-case-card");

  pfFilterBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      const filter = btn.getAttribute("data-filter");
      pfFilterBtns.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");

      systemCards.forEach((card) => {
        const groups = (card.getAttribute("data-groups") || "").split(" ");
        if (filter === "all" || groups.includes(filter)) {
          card.style.display = "";
        } else {
          card.style.display = "none";
        }
      });
    });
  });

  /* ==========================================================================
   * 8. PROJECT ARCHITECTURE DEEP-DIVE MODAL
   * ========================================================================== */
  const projectSpecs = {
    "alive-health": {
      meta: "Enterprise Healthcare & Assessment SaaS (3+ Years) • ONINE / dev909",
      title: "1. Alive Health & CST Enterprise Survey Platform",
      overview:
        "Large-scale enterprise health assessment, biometric analytics, and operational survey platform architected and continuously evolved over 3+ years using Angular (modernized up to v21), Nebular, SurveyJS, and .NET Core REST services.",
      stack: [
        "Angular 21", "TypeScript", "RxJS", "SurveyJS (survey-core, survey-angular-ui, survey-creator)",
        "Nebular 17", "CoreUI 5", "Azure AD MSAL", "Apache ECharts", "Swimlane ngx-charts",
        "CKEditor 5", "TinyMCE", "jsPDF", "html2canvas", "JSZip", "angularx-qrcode",
        "ngx-translate", "Google & Bing Translate APIs", ".NET / ASP.NET Core REST APIs"
      ],
      highlights: [
        "<strong>Complex SurveyJS &amp; JSON Form Engine:</strong> Engineered schema-driven clinical questionnaires using <code>survey-angular-ui</code> and <code>survey-creator-angular</code> with multi-stage conditional branching, custom validation rules, calculated biometric expressions, and role/task-specific rendering.",
        "<strong>Health &amp; Biometric Analytics Dashboards:</strong> Built interactive visual analytics modules using Apache ECharts, Swimlane ngx-charts, and Chart.js—including contrast analysis dashboards, dynamic health plots, body measurement tracking, and integrated audio/podcast media players.",
        "<strong>AI Text Generation &amp; Multilingual Localization:</strong> Implemented AI-assisted dynamic health tip generation with prompt caching and filter pipelines, paired with automated multi-language translation workflows using <code>@ngx-translate/core</code>, Google Translate API, and Bing Translate API.",
        "<strong>Enterprise Security, Reporting &amp; Rich Media:</strong> Integrated Azure Active Directory (MSAL) authentication and Nebular RBAC; engineered client-side PDF/ZIP report exports (jsPDF, html2canvas, JSZip), QR code workflows (angularx-qrcode), and rich text authoring via CKEditor 5 and TinyMCE.",
        "<strong>Framework Modernization:</strong> Led framework migrations up to Angular 21 and optimized high-memory AOT production build pipelines deployed to Linux Nginx servers."
      ]
    },
    "bau-leader": {
      meta: "Construction Site & Defect Management SaaS Platform • Full-Stack SaaS",
      title: "2. BAU Leader (SiteWise Pro)",
      overview:
        "A comprehensive 23-page multi-tenant construction management and defect tracking SaaS platform engineered with React 18, TypeScript, Tailwind CSS, shadcn/ui, and Supabase (PostgreSQL, Auth, RLS, Storage, Deno Edge Functions).",
      stack: [
        "React 18", "TypeScript", "Vite", "Tailwind CSS", "shadcn/ui (Radix UI)",
        "Supabase (PostgreSQL, Auth, RLS, Storage, Edge Functions)", "TanStack React Query",
        "React Hook Form", "Zod", "@dnd-kit", "Leaflet / React-Leaflet", "Recharts",
        "jsPDF-AutoTable", "SheetJS (xlsx)", "i18next (EN/DE)", "Polar.sh Billing", "Cloudflare", "Vitest"
      ],
      highlights: [
        "<strong>23-Page Construction SaaS Architecture:</strong> Engineered 30+ custom React Query hooks, bilingual German/English (<code>i18next</code>) localization, role-based project workspaces, and Web Push notifications.",
        "<strong>Defect Folder Hierarchy &amp; Multi-Image Evidence:</strong> Built a structured defect reporting engine enabling site engineers to organize defects into custom building/unit folders (e.g., House A, House B), attach multi-image photo evidence via Supabase Storage, and export structured PDF &amp; Excel site reports.",
        "<strong>Geolocation GIS, Whiteboards &amp; Billing:</strong> Integrated interactive Leaflet site geolocation maps, drag-and-drop kanban boards (<code>@dnd-kit</code>), collaborative project whiteboards, document management tabs, and automated subscription billing via Polar.sh Deno Edge Functions."
      ]
    },
    "ai-autoapply": {
      meta: "Autonomous AI Job Discovery & Browser Automation Platform • Full-Stack Monorepo",
      title: "3. AI AutoApply & Job Tinder",
      overview:
        "Full-stack TypeScript monorepo combining a 14-page reactive Angular 19 (Standalone Components, Signals) dashboard with a modular NestJS REST API, Prisma/PostgreSQL, Redis/BullMQ job queues, and headless Playwright browser automation workers.",
      stack: [
        "Angular 19 (Standalone, Signals)", "Tailwind CSS", "NestJS", "Swagger / OpenAPI",
        "Prisma ORM", "PostgreSQL", "Supabase", "Redis", "BullMQ",
        "Playwright (Chromium)", "Google Gemini API", "OpenAI API", "Docker Compose", "Nginx"
      ],
      highlights: [
        "<strong>14-Page Angular 19 SaaS Dashboard &amp; NestJS API:</strong> Built a reactive Angular Signals dashboard, Small Company Explorer, Analytics funnel, and a modular NestJS REST API with Prisma ORM.",
        "<strong>AI Matching &amp; Document Tailoring Engine:</strong> Implemented provider-agnostic LLM integration (Google Gemini &amp; OpenAI) with 7-factor explainable match scoring, hard work-authorization eligibility gates, prompt-injection sanitization, and automated ATS single-column resume &amp; cover letter synthesis.",
        "<strong>Playwright ATS Automation Worker:</strong> Engineered headless Chromium adapters for Greenhouse, Lever, Ashby, and generic HTML forms with automated screening question resolution, CAPTCHA/login-wall safety halts, and screenshot confirmation verification."
      ]
    },
    "inframind": {
      meta: "AI-Powered Data Center & Infrastructure Operations Platform • Enterprise AI & Telemetry",
      title: "4. InfraMind AI",
      overview:
        "Real-time enterprise data center operations and anomaly management platform uniting an Angular front-end with a .NET Core Web API (C#), SignalR WebSockets, Apache ECharts, and an Agentic AI Root-Cause Analysis (RCA) Copilot.",
      stack: [
        "Angular", "TypeScript", "Apache ECharts", ".NET Core Web API (C#)",
        "SignalR (Real-Time WebSockets)", "PostgreSQL", "Agentic AI Copilot", "Docker & Docker Compose"
      ],
      highlights: [
        "<strong>Real-Time Data Center Telemetry:</strong> Developed an enterprise operations platform combining an Angular UI with a .NET Web API and SignalR to stream live rack, server, CPU, RAM, GPU, and thermal cooling metrics into interactive ECharts visualizations.",
        "<strong>Automated Incident Desk &amp; AI Operations Copilot:</strong> Built a background infrastructure anomaly simulator that triggers service-desk incidents, paired with an LLM Copilot that inspects server telemetry and performs automated root-cause analysis (RCA)."
      ]
    },
    "commercial-suite": {
      meta: "Commercial Web & Automation Projects • Multi-Stack Delivery",
      title: "5. Wedora Marketplace, SaaS POS, BuzzQo Automator & Atelier AA",
      overview:
        "Suite of production commercial marketplaces, Point-of-Sale & warehouse modules, media automation pipelines, and architectural showcase portals delivered across Next.js 16, React 19, Angular/Ionic, and Python.",
      stack: [
        "Next.js 16", "React 19", "TypeScript", "Tailwind CSS v4", "Framer Motion",
        "Angular", "Ionic", ".NET APIs", "Python", "HTML5 / SCSS", "Hetzner VPS", "Nginx", "Cloudflare R2"
      ],
      highlights: [
        "<strong>Wedora Wedding Marketplace:</strong> Built a modern vendor discovery and booking platform using Next.js 16, React 19, Tailwind CSS v4, and Framer Motion with rich animations and category filtering.",
        "<strong>SaaS POS, Workforce &amp; Warehouse Systems:</strong> Designed high-converting SaaS Point-of-Sale interfaces and delivered cross-platform enterprise modules (Angular &amp; Ionic) covering employee time tracking, warehouse inventory workflows, and automated PDF invoice generation.",
        "<strong>BuzzQo Flow Automator &amp; Atelier AA:</strong> Engineered a Python-backed media variant &amp; export automation server (<em>BuzzQo</em>) and delivered pixel-perfect architectural showcase portals (<em>stage.atelier-aa.ch</em>)."
      ]
    }
  };

  const modalBackdrop = document.getElementById("archModalBackdrop");
  const modalCloseBtn = document.getElementById("archModalClose");
  const modalMetaEl = document.getElementById("modalProjectMeta");
  const modalTitleEl = document.getElementById("modalProjectTitle");
  const modalBodyEl = document.getElementById("modalProjectBody");

  function openProjectModal(projectId) {
    const spec = projectSpecs[projectId];
    if (!spec || !modalBackdrop) return;

    modalMetaEl.textContent = spec.meta;
    modalTitleEl.textContent = spec.title;

    const stackBadges = spec.stack
      .map((s) => `<span class="tech-tag">${s}</span>`)
      .join("");
    const bulletItems = spec.highlights.map((h) => `<li>${h}</li>`).join("");

    modalBodyEl.innerHTML = `
      <div class="modal-spec-section">
        <h4>System Overview</h4>
        <p class="profile-paragraph mb-0">${spec.overview}</p>
      </div>
      <div class="modal-spec-section">
        <h4>Architecture &amp; Engineering Highlights</h4>
        <ul class="exp-bullet-list">${bulletItems}</ul>
      </div>
      <div class="modal-spec-section mb-0">
        <h4>Complete Technology Stack</h4>
        <div class="tech-tags-wrap">${stackBadges}</div>
      </div>
    `;

    modalBackdrop.classList.add("open");
    modalBackdrop.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
  }

  function closeProjectModal() {
    if (!modalBackdrop) return;
    modalBackdrop.classList.remove("open");
    modalBackdrop.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
  }

  document.querySelectorAll("[data-project]").forEach((btn) => {
    btn.addEventListener("click", () => {
      openProjectModal(btn.getAttribute("data-project"));
    });
  });

  if (modalCloseBtn) {
    modalCloseBtn.addEventListener("click", closeProjectModal);
  }
  if (modalBackdrop) {
    modalBackdrop.addEventListener("click", (e) => {
      if (e.target === modalBackdrop) closeProjectModal();
    });
  }
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      closeProjectModal();
      setDrawerState(false);
    }
  });

  /* ==========================================================================
   * 9. COPY EMAIL BUTTON & DIRECT CONTACT FORM
   * ========================================================================== */
  const copyEmailBtn = document.getElementById("copyEmailBtn");
  if (copyEmailBtn) {
    copyEmailBtn.addEventListener("click", () => {
      const email = copyEmailBtn.getAttribute("data-email") || "halimazizi111@hotmail.com";
      navigator.clipboard.writeText(email).then(() => {
        copyEmailBtn.innerHTML = '<i class="bi bi-check2"></i>';
        setTimeout(() => {
          copyEmailBtn.innerHTML = '<i class="bi bi-clipboard"></i>';
        }, 2000);
      });
    });
  }

  const directContactForm = document.getElementById("directContactForm");
  const formStatusMsg = document.getElementById("formStatusMsg");

  if (directContactForm) {
    directContactForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const name = document.getElementById("senderName").value.trim();
      const company = document.getElementById("senderCompany").value.trim();
      const email = document.getElementById("senderEmail").value.trim();
      const inquiry = document.getElementById("inquiryType").value;
      const message = document.getElementById("senderMessage").value.trim();

      const subject = encodeURIComponent(
        `[${inquiry}] Inquiry from ${name}${company ? " (" + company + ")" : ""}`
      );
      const body = encodeURIComponent(
        `Name: ${name}\nCompany: ${company || "N/A"}\nReply Email: ${email}\nInquiry Type: ${inquiry}\n\nMessage:\n${message}`
      );

      window.location.href = `mailto:halimazizi111@hotmail.com?subject=${subject}&body=${body}`;

      if (formStatusMsg) {
        formStatusMsg.textContent = "Email draft opened in your mail client!";
        formStatusMsg.style.color = "var(--accent-emerald)";
      }
    });
  }

  /* ==========================================================================
   * 10. SCROLL REVEAL OBSERVER
   * ========================================================================== */
  const faders = document.querySelectorAll(".fade-in-up");
  if ("IntersectionObserver" in window && faders.length) {
    const observer = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("appear");
            obs.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -40px 0px" }
    );
    faders.forEach((el) => observer.observe(el));
  } else {
    faders.forEach((el) => el.classList.add("appear"));
  }
})();

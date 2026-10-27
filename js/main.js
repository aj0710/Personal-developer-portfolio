/**
 * Main Application Logic
 * Skills filter, Contact validation & Toast.
 */

document.addEventListener("DOMContentLoaded", () => {
  initTheme();
  initHeader();
  initMobileNav();
  initTypewriter();
  renderProjects("all");
  initProjectFilters();
  initSkillFilters();
  initProjectModal();
  initContactForm();
  initScrollTop();
  initCardSpotlight();
});

/* ==========================================================================
   1. Theme Management (Dark / Light)
   ========================================================================== */
function initTheme() {
  const themeToggleBtn = document.getElementById("theme-toggle-btn");
  const storedTheme = localStorage.getItem("dev-portfolio-theme");
  const systemPrefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;

  const currentTheme = storedTheme || (systemPrefersDark ? "dark" : "dark");
  document.documentElement.setAttribute("data-theme", currentTheme);

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener("click", () => {
      const activeTheme = document.documentElement.getAttribute("data-theme");
      const nextTheme = activeTheme === "dark" ? "light" : "dark";

      document.documentElement.setAttribute("data-theme", nextTheme);
      localStorage.setItem("dev-portfolio-theme", nextTheme);
      showToast(`Switched to ${nextTheme} theme`);
    });
  }
}

/* ==========================================================================
   2. Header Scroll & Nav Active Spy
   ========================================================================== */
function initHeader() {
  const header = document.querySelector(".site-header");
  const navLinks = document.querySelectorAll(".nav-link, .mobile-nav-link");
  const sections = document.querySelectorAll("section[id]");

  window.addEventListener("scroll", () => {
    if (window.scrollY > 40) {
      header.classList.add("scrolled");
    } else {
      header.classList.remove("scrolled");
    }

    // Active section spy
    let currentId = "";
    sections.forEach((sec) => {
      const top = sec.offsetTop - 120;
      const height = sec.offsetHeight;
      if (window.scrollY >= top && window.scrollY < top + height) {
        currentId = sec.getAttribute("id");
      }
    });

    navLinks.forEach((link) => {
      link.classList.remove("active");
      if (link.getAttribute("href") === `#${currentId}`) {
        link.classList.add("active");
      }
    });
  });
}

/* ==========================================================================
   3. Mobile Navigation Drawer
   ========================================================================== */
function initMobileNav() {
  const toggleBtn = document.getElementById("mobile-toggle-btn");
  const drawer = document.getElementById("mobile-drawer");
  const backdrop = document.getElementById("mobile-drawer-backdrop");
  const mobileLinks = document.querySelectorAll(".mobile-nav-link, .mobile-drawer .btn");

  if (!toggleBtn || !drawer || !backdrop) return;

  function openDrawer() {
    toggleBtn.classList.add("active");
    drawer.classList.add("open");
    backdrop.classList.add("active");
    document.body.style.overflow = "hidden";
    toggleBtn.setAttribute("aria-expanded", "true");
  }

  function closeDrawer() {
    toggleBtn.classList.remove("active");
    drawer.classList.remove("open");
    backdrop.classList.remove("active");
    document.body.style.overflow = "";
    toggleBtn.setAttribute("aria-expanded", "false");
  }

  toggleBtn.addEventListener("click", () => {
    const isOpen = drawer.classList.contains("open");
    if (isOpen) {
      closeDrawer();
    } else {
      openDrawer();
    }
  });

  backdrop.addEventListener("click", closeDrawer);

  mobileLinks.forEach((link) => {
    link.addEventListener("click", closeDrawer);
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && drawer.classList.contains("open")) {
      closeDrawer();
    }
  });
}

/* ==========================================================================
   4. Hero Role Typewriter Effect
   ========================================================================== */
function initTypewriter() {
  const typewriterElem = document.getElementById("hero-typewriter");
  if (!typewriterElem) return;

  const roles = [
    "Full-Stack Developer (MERN)",
    "Frontend & Web Developer",
    "MCA Student & Software Engineer",
    "Java & SQL Backend Builder"
  ];

  let roleIdx = 0;
  let charIdx = 0;
  let isDeleting = false;
  let typingSpeed = 90;

  function typeLoop() {
    const currentRole = roles[roleIdx];

    if (isDeleting) {
      typewriterElem.textContent = currentRole.substring(0, charIdx - 1);
      charIdx--;
      typingSpeed = 45;
    } else {
      typewriterElem.textContent = currentRole.substring(0, charIdx + 1);
      charIdx++;
      typingSpeed = 90;
    }

    if (!isDeleting && charIdx === currentRole.length) {
      typingSpeed = 2200; // Pause at end of text
      isDeleting = true;
    } else if (isDeleting && charIdx === 0) {
      isDeleting = false;
      roleIdx = (roleIdx + 1) % roles.length;
      typingSpeed = 500; // Pause before typing next word
    }

    setTimeout(typeLoop, typingSpeed);
  }

  typeLoop();
}



/* ==========================================================================
   5. Projects Showcase & Filtering
   ========================================================================== */
function renderProjects(filterCategory = "all") {
  const grid = document.getElementById("projects-grid");
  if (!grid || typeof projectsData === "undefined") return;

  const filtered = filterCategory === "all"
    ? projectsData
    : projectsData.filter((p) => p.category === filterCategory);

  grid.innerHTML = "";

  filtered.forEach((p) => {
    const card = document.createElement("article");
    card.className = "project-card";
    card.setAttribute("data-id", p.id);
    card.setAttribute("data-category", p.category);

    const tagsHtml = p.tags.map((t) => `<span class="tech-tag">${t}</span>`).join("");

    card.innerHTML = `
      <div class="project-media">
        <img src="${p.image}" alt="${p.title}" class="project-img" loading="lazy">
        <div class="project-badge-pill">${p.badge}</div>
      </div>
      <div class="project-content">
        <h3 class="project-title">${p.title}</h3>
        <p class="project-desc">${p.summary}</p>
        <div class="project-tech-stack">
          ${tagsHtml}
        </div>
        <div class="project-footer-actions">
          <button class="btn btn-outline btn-sm btn-open-modal" data-id="${p.id}" aria-label="View architecture details for ${p.title}">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"></path>
              <circle cx="12" cy="12" r="3"></circle>
            </svg>
            Case Study
          </button>
          <div style="display: flex; gap: 0.5rem;">
            <a href="${p.githubUrl}" target="_blank" rel="noopener noreferrer" class="btn-icon" aria-label="GitHub Repository" title="Source Code">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
              </svg>
            </a>
            <a href="${p.demoUrl}" target="_blank" rel="noopener noreferrer" class="btn-icon" aria-label="Live Demo" title="Live Preview">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                <polyline points="15 3 21 3 21 9"></polyline>
                <line x1="10" y1="14" x2="21" y2="3"></line>
              </svg>
            </a>
          </div>
        </div>
      </div>
    `;

    grid.appendChild(card);
  });

  initCardSpotlight();
}

function initProjectFilters() {
  const filterButtons = document.querySelectorAll(".projects-filter-nav .filter-btn");

  filterButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      filterButtons.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");
      const category = btn.getAttribute("data-filter");
      renderProjects(category);
    });
  });
}

/* ==========================================================================
   6. Skills Category Filtering
   ========================================================================== */
function initSkillFilters() {
  const skillBtns = document.querySelectorAll(".skills-filter-nav .filter-btn");
  const skillCards = document.querySelectorAll(".skill-card");

  skillBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      skillBtns.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");

      const filter = btn.getAttribute("data-filter");

      skillCards.forEach((card) => {
        const cardCat = card.getAttribute("data-category");
        if (filter === "all" || cardCat === filter) {
          card.style.display = "block";
        } else {
          card.style.display = "none";
        }
      });
    });
  });
}

/* ==========================================================================
   7. Project Details Modal System
   ========================================================================== */
function initProjectModal() {
  const overlay = document.getElementById("project-modal-overlay");
  const closeBtn = document.getElementById("modal-close-btn");
  const modalBanner = document.getElementById("modal-banner");
  const modalBadge = document.getElementById("modal-badge");
  const modalTitle = document.getElementById("modal-title");
  const modalOverview = document.getElementById("modal-overview");
  const modalProblem = document.getElementById("modal-problem");
  const modalFeatures = document.getElementById("modal-features");
  const modalArchitecture = document.getElementById("modal-architecture");
  const modalTechStack = document.getElementById("modal-tech-stack");
  const modalDemoLink = document.getElementById("modal-demo-link");
  const modalGithubLink = document.getElementById("modal-github-link");

  if (!overlay || !closeBtn) return;

  function openModal(projectId) {
    if (typeof projectsData === "undefined") return;
    const project = projectsData.find((p) => p.id === projectId);
    if (!project) return;

    modalBanner.src = project.image;
    modalBanner.alt = project.title;
    modalBadge.textContent = project.badge;
    modalTitle.textContent = project.title;
    modalOverview.textContent = project.details.overview;
    modalProblem.textContent = project.details.problem;

    // Features list
    modalFeatures.innerHTML = project.details.highlights
      .map(
        (h) => `
        <li class="modal-feature-item">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
            <polyline points="20 6 9 17 4 12"></polyline>
          </svg>
          <span>${h}</span>
        </li>`
      )
      .join("");

    // Architecture list
    modalArchitecture.innerHTML = project.details.architecture
      .map(
        (a) => `
        <li class="modal-feature-item">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
            <polygon points="12 2 2 7 12 12 22 7 12 2"></polygon>
            <polyline points="2 17 12 22 22 17"></polyline>
            <polyline points="2 12 12 17 22 12"></polyline>
          </svg>
          <span>${a}</span>
        </li>`
      )
      .join("");

    // Tech tags
    modalTechStack.innerHTML = project.tags
      .map((t) => `<span class="tech-tag">${t}</span>`)
      .join("");

    // Links
    modalDemoLink.href = project.demoUrl;
    modalGithubLink.href = project.githubUrl;

    overlay.classList.add("active");
    overlay.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
  }

  function closeModal() {
    overlay.classList.remove("active");
    overlay.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
  }

  // Delegated click listener for modal trigger buttons
  document.addEventListener("click", (e) => {
    const btn = e.target.closest(".btn-open-modal");
    if (btn) {
      const id = btn.getAttribute("data-id");
      openModal(id);
    }
  });

  closeBtn.addEventListener("click", closeModal);

  overlay.addEventListener("click", (e) => {
    if (e.target === overlay) {
      closeModal();
    }
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && overlay.classList.contains("active")) {
      closeModal();
    }
  });
}

/* ==========================================================================
   8. Contact Form & Clipboard Copy
   ========================================================================== */
function initContactForm() {
  const form = document.getElementById("portfolio-contact-form");
  const copyBtn = document.getElementById("copy-email-btn");

  if (copyBtn) {
    copyBtn.addEventListener("click", () => {
      const email = "kumarajaya41685@gmail.com";
      navigator.clipboard.writeText(email).then(() => {
        showToast("Email address copied to clipboard! 📋");
        const originalText = copyBtn.textContent;
        copyBtn.textContent = "Copied!";
        setTimeout(() => {
          copyBtn.textContent = originalText;
        }, 2000);
      }).catch(() => {
        showToast("Press Ctrl+C to copy: " + email);
      });
    });
  }

  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();

      const name = document.getElementById("contact-name").value.trim();
      const email = document.getElementById("contact-email").value.trim();
      const message = document.getElementById("contact-message").value.trim();
      const submitBtn = form.querySelector("button[type='submit']");

      if (!name || !email || !message) {
        showToast("Please fill in all required fields.");
        return;
      }

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        showToast("Please enter a valid email address.");
        return;
      }

      // Simulate sending state
      const originalBtnText = submitBtn.innerHTML;
      submitBtn.disabled = true;
      submitBtn.innerHTML = `
        <svg class="spin-animation" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <line x1="12" y1="2" x2="12" y2="6"></line>
          <line x1="12" y1="18" x2="12" y2="22"></line>
          <line x1="4.93" y1="4.93" x2="7.76" y2="7.76"></line>
          <line x1="16.24" y1="16.24" x2="19.07" y2="19.07"></line>
          <line x1="2" y1="12" x2="6" y2="12"></line>
          <line x1="18" y1="12" x2="22" y2="12"></line>
          <line x1="4.93" y1="19.07" x2="7.76" y2="16.24"></line>
          <line x1="16.24" y1="7.76" x2="19.07" y2="4.93"></line>
        </svg>
        Sending Message...
      `;

      setTimeout(() => {
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalBtnText;
        form.reset();
        showToast("Thank you, " + name + "! Your message was received successfully. ✨");
      }, 1200);
    });
  }
}

/* ==========================================================================
   9. Scroll To Top Button
   ========================================================================== */
function initScrollTop() {
  const scrollTopBtn = document.getElementById("scroll-top-btn");
  if (!scrollTopBtn) return;

  window.addEventListener("scroll", () => {
    if (window.scrollY > 450) {
      scrollTopBtn.classList.add("visible");
    } else {
      scrollTopBtn.classList.remove("visible");
    }
  });

  scrollTopBtn.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  });
}

/* ==========================================================================
   10. Interactive Card Mouse Spotlight
   ========================================================================== */
function initCardSpotlight() {
  const cards = document.querySelectorAll(".skill-card, .pillar-card, .timeline-card, .contact-card, .project-card");

  cards.forEach((card) => {
    if (card._hasSpotlight) return;
    card._hasSpotlight = true;

    card.addEventListener("mousemove", (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      card.style.setProperty("--mouse-x", `${x}px`);
      card.style.setProperty("--mouse-y", `${y}px`);
    });
  });
}

/* ==========================================================================
   11. Toast Notifications Utility
   ========================================================================== */
let toastTimeout;
function showToast(message) {
  let toast = document.getElementById("global-toast");
  if (!toast) {
    toast = document.createElement("div");
    toast.id = "global-toast";
    toast.className = "toast-notification";
    toast.innerHTML = `
      <svg class="toast-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
        <polyline points="22 4 12 14.01 9 11.01"></polyline>
      </svg>
      <span id="toast-message-text"></span>
    `;
    document.body.appendChild(toast);
  }

  const msgSpan = document.getElementById("toast-message-text");
  msgSpan.textContent = message;

  clearTimeout(toastTimeout);
  toast.classList.add("active");

  toastTimeout = setTimeout(() => {
    toast.classList.remove("active");
  }, 3500);
}

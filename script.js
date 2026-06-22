// =========================================================
// Small, beginner-friendly interactions. No build step needed —
// this file is loaded directly by index.html with <script src="script.js">.
// =========================================================

document.addEventListener('DOMContentLoaded', () => {

  // ---- Footer year ------------------------------------------------
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  const linesToType = [
    "Turning coffee into commits",
    "Connecting with people",
    "Building Projects"
  ];
  const typedTextEl = document.getElementById('typedText');
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const TYPE_SPEED = 38;     // ms per character while typing
  const ERASE_SPEED = 22;    // ms per character while erasing
  const HOLD_TIME = 1800;    // ms to pause after a line is fully typed

  if (typedTextEl) {
    if (prefersReducedMotion) {
      // Skip the animation entirely if the user prefers reduced motion —
      // just show the first line.
      typedTextEl.textContent = linesToType[0];
    } else {
      cycleLines(typedTextEl, linesToType);
    }
  }

  function cycleLines(el, lines) {
    let lineIndex = 0;

    function typeCurrentLine() {
      const text = lines[lineIndex];
      let i = 0;

      function typeStep() {
        if (i <= text.length) {
          el.textContent = text.slice(0, i);
          i++;
          setTimeout(typeStep, TYPE_SPEED);
        } else {
          // Fully typed — wait, then erase.
          setTimeout(eraseCurrentLine, HOLD_TIME);
        }
      }
      typeStep();
    }

    function eraseCurrentLine() {
      const text = lines[lineIndex];
      let i = text.length;

      function eraseStep() {
        if (i >= 0) {
          el.textContent = text.slice(0, i);
          i--;
          setTimeout(eraseStep, ERASE_SPEED);
        } else {
          // Fully erased — move to the next line and type it.
          lineIndex = (lineIndex + 1) % lines.length;
          typeCurrentLine();
        }
      }
      eraseStep();
    }

    typeCurrentLine();
  }

  // ---- Mobile nav toggle ---------------------------------------------
  const menuBtn = document.getElementById('menuBtn');
  const tabsNav = document.querySelector('.tabs');

  if (menuBtn && tabsNav) {
    menuBtn.addEventListener('click', () => {
      const isOpen = tabsNav.classList.toggle('is-open');
      menuBtn.setAttribute('aria-expanded', String(isOpen));
    });

    // Close the mobile menu after a link is tapped.
    tabsNav.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        tabsNav.classList.remove('is-open');
        menuBtn.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // ---- Highlight the active tab while scrolling -----------------------
  const tabs = document.querySelectorAll('[data-tab]');
  const sections = Array.from(tabs).map(tab => {
    const id = tab.getAttribute('href').slice(1);
    return document.getElementById(id);
  }).filter(Boolean);

  if ('IntersectionObserver' in window && sections.length) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const id = entry.target.id;
          tabs.forEach(tab => {
            tab.classList.toggle('is-active', tab.getAttribute('href') === `#${id}`);
          });
        }
      });
    }, { rootMargin: '-40% 0px -50% 0px', threshold: 0 });

    sections.forEach(section => observer.observe(section));
  }

  // ---- Copy email button ------------------------------------------------
  const copyBtn = document.getElementById('copyBtn');
  const emailText = document.getElementById('emailText');

  if (copyBtn && emailText) {
    copyBtn.addEventListener('click', async () => {
      try {
        await navigator.clipboard.writeText(emailText.textContent.trim());
        const original = copyBtn.textContent;
        copyBtn.textContent = 'Copied!';
        setTimeout(() => { copyBtn.textContent = original; }, 1800);
      } catch (err) {
        // Clipboard API can fail (e.g. older browsers, no HTTPS) — fail quietly.
        console.error('Could not copy email:', err);
      }
    });
  }

});

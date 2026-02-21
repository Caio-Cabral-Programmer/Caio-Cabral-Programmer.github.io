/* ===================================================
   Caio Cabral — Portfolio Scripts
   =================================================== */

document.addEventListener("DOMContentLoaded", () => {
  // ---- AOS Init ----
  AOS.init({
    duration: 700,
    easing: "ease-out-cubic",
    once: true,
    offset: 80,
  });

  // ---- Navbar scroll effect ----
  const nav = document.getElementById("mainNav");
  const handleScroll = () => {
    if (!nav) return;
    nav.classList.toggle("scrolled", window.scrollY > 50);
  };
  handleScroll();
  window.addEventListener("scroll", handleScroll, { passive: true });

  // ---- Custom ScrollSpy (manual) ----
  const navLinks = document.querySelectorAll("#mainNav .nav-link");
  const sections = [];
  navLinks.forEach((link) => {
    const id = link.getAttribute("href");
    if (id && id.startsWith("#")) {
      const section = document.querySelector(id);
      if (section) sections.push({ el: section, link });
    }
  });

  function updateActiveNav() {
    const scrollY = window.scrollY;
    const navHeight = nav ? nav.offsetHeight : 70;
    let current = null;

    for (const { el, link } of sections) {
      const top = el.offsetTop - navHeight - 80;
      if (scrollY >= top) {
        current = link;
      }
    }

    navLinks.forEach((l) => l.classList.remove("active"));
    if (current) current.classList.add("active");
  }

  window.addEventListener("scroll", updateActiveNav, { passive: true });
  updateActiveNav();

  // ---- Collapse navbar on link click (mobile) ----
  const toggler = document.querySelector(".navbar-toggler");
  document.querySelectorAll("#navbarResponsive .nav-link").forEach((link) => {
    link.addEventListener("click", () => {
      if (toggler && window.getComputedStyle(toggler).display !== "none") {
        toggler.click();
      }
    });
  });

  // ---- Typing Animation ----
  const phrases = [
    "1% better every day. (James Clear)",
    "The man who loves walking",
    "will walk further",
    "than the man who loves the destination. (Lao Tzu)",
    "A journey of a thousand miles",
    "begins with a single step. (Lao Tzu)",
  ];
  const typingEl = document.getElementById("typingText");
  let phraseIndex = 0;
  let charIndex = 0;
  let deleting = false;
  const TYPE_SPEED = 80;
  const DELETE_SPEED = 40;
  const PAUSE_END = 2000;
  const PAUSE_START = 400;

  function typeLoop() {
    if (!typingEl) return;
    const current = phrases[phraseIndex];

    if (!deleting) {
      typingEl.textContent = current.substring(0, charIndex + 1);
      charIndex++;
      if (charIndex === current.length) {
        deleting = true;
        setTimeout(typeLoop, PAUSE_END);
        return;
      }
      setTimeout(typeLoop, TYPE_SPEED);
    } else {
      typingEl.textContent = current.substring(0, charIndex - 1);
      charIndex--;
      if (charIndex === 0) {
        deleting = false;
        phraseIndex = (phraseIndex + 1) % phrases.length;
        setTimeout(typeLoop, PAUSE_START);
        return;
      }
      setTimeout(typeLoop, DELETE_SPEED);
    }
  }
  typeLoop();

  // ---- Portfolio Filter ----
  const filterBtns = document.querySelectorAll(".btn-filter");
  const cards = document.querySelectorAll(".portfolio-card");

  filterBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      filterBtns.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");

      const filter = btn.dataset.filter;

      cards.forEach((card) => {
        if (filter === "all" || card.dataset.category === filter) {
          card.classList.remove("hide");
        } else {
          card.classList.add("hide");
        }
      });
    });
  });

  // ---- Smooth scroll for anchor links ----
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", (e) => {
      const href = anchor.getAttribute("href");
      if (href === "#" || href === "#page-top") return;
      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        const navHeight =
          document.getElementById("mainNav")?.offsetHeight || 70;
        const top =
          target.getBoundingClientRect().top + window.scrollY - navHeight;
        window.scrollTo({ top, behavior: "smooth" });
      }
    });
  });

  // ---- Copy email to clipboard & show toast ----
  const emailLink = document.getElementById("emailCopy");
  const copyToastEl = document.getElementById("copyToast");
  let copyToastInstance = null;
  if (copyToastEl && window.bootstrap) {
    copyToastInstance = new bootstrap.Toast(copyToastEl);
  }

  // ---- Copy email to clipboard & show toast (attach to all mailto links) ----
  const mailtoLinks = Array.from(
    document.querySelectorAll('a[href^="mailto:"], a[data-email]'),
  );
  mailtoLinks.forEach(attachEmailCopy);

  function attachEmailCopy(el) {
    el.addEventListener("click", async (e) => {
      e.preventDefault();
      const href = el.dataset.email || el.getAttribute("href") || "";
      const m = href.match(/mailto:(.*)/);
      const toCopy = m ? m[1] : href;
      try {
        await navigator.clipboard.writeText(toCopy);
        if (copyToastEl) {
          const body = copyToastEl.querySelector(".toast-body");
          if (body)
            body.textContent = `E-mail copiado para a área de transferência`;
          copyToastInstance?.show();
        } else {
          alert("E-mail copiado para a área de transferência");
        }
      } catch (err) {
        console.error("Clipboard error", err);
        alert("Não foi possível copiar o e-mail");
      }
    });
  }

  // ---- Atualiza o ano no rodapé automaticamente ----
  // Este bloco define o conteúdo do elemento com id `currentYear` para o
  // ano atual. Mantemos isso em `js/scripts.js` para evitar esquecer de
  // atualizar o ano manualmente no HTML.
  (function setFooterYear() {
    const yearEl = document.getElementById("currentYear");
    if (yearEl) {
      yearEl.textContent = new Date().getFullYear();
    }
  })();

  // ---- Timeline date formatter (like LinkedIn) ----
  function formatMonthYear(date) {
    return date.toLocaleString("en-US", { month: "short", year: "numeric" });
  }

  function parseLocalDate(dateRaw) {
    if (!dateRaw) return null;
    const parts = dateRaw.split("-");
    if (parts.length >= 3) {
      const y = Number(parts[0]);
      const m = Number(parts[1]) - 1;
      const d = Number(parts[2]);
      const parsed = new Date(y, m, d);
      if (!isNaN(parsed.getTime())) return parsed;
    }
    const fallback = new Date(dateRaw);
    if (!isNaN(fallback.getTime())) return fallback;
    return null;
  }

  function computeDuration(start, end) {
    let startYear = start.getFullYear();
    let startMonth = start.getMonth();
    let endYear = end.getFullYear();
    let endMonth = end.getMonth();

    // base difference in months (endMonth and startMonth are 0-based)
    let totalMonths = (endYear - startYear) * 12 + (endMonth - startMonth);
    // If the end day is on/after the start day, count the current month as in-progress
    // This makes the calculation inclusive (e.g., Jun 1 -> Feb 21 counts as 9 months)
    if (end.getDate() >= start.getDate()) totalMonths += 1;
    if (totalMonths < 0) totalMonths = 0;

    const years = Math.floor(totalMonths / 12);
    const months = totalMonths % 12;
    const parts = [];
    if (years > 0) parts.push(`${years} ${years === 1 ? "year" : "years"}`);
    if (months > 0)
      parts.push(`${months} ${months === 1 ? "month" : "months"}`);
    return parts.join(" ") || "0 months";
  }

  function updateTimelineDates() {
    const items = document.querySelectorAll(".timeline-item[data-start]");
    items.forEach((item) => {
      const startRaw = item.getAttribute("data-start");
      if (!startRaw) return;
      const start = parseLocalDate(startRaw);
      if (!start) return;

      const endRaw = item.getAttribute("data-end");
      const end = parseLocalDate(endRaw) || new Date();

      const formattedStart = formatMonthYear(start);
      const formattedEnd = endRaw ? formatMonthYear(end) : "Present";
      const duration = computeDuration(start, end);
      const dateEl = item.querySelector(".timeline-date");
      if (dateEl) {
        dateEl.innerHTML = `<i class="far fa-calendar-alt me-1"></i>${formattedStart} — ${formattedEnd} · ${duration}`;
      }
    });
  }

  // Run once on load to update items with data-start
  updateTimelineDates();
});

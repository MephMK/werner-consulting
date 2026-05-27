async function loadSiteContent() {
  try {
    const response = await fetch("assets/data/site-content.json");
    if (!response.ok) {
      throw new Error("Unable to load site content JSON.");
    }
    const data = await response.json();
    document.querySelectorAll("[data-content]").forEach((element) => {
      const key = element.getAttribute("data-content");
      if (data[key]) {
        element.textContent = data[key];
      }
    });
  } catch (error) {
    console.error(error);
  }
}

async function loadTestimonials() {
  const container = document.querySelector("[data-testimonials='home']");
  if (!container) return;

  try {
    const response = await fetch("assets/data/testimonials.json");
    if (!response.ok) {
      throw new Error("Unable to load testimonial JSON.");
    }
    const testimonials = await response.json();
    container.innerHTML = testimonials.map((item) => `
      <article class="testimonial-card reveal">
        <img class="testimonial-portrait" src="${item.image}" alt="Illustrative placeholder portrait for ${item.name}">
        <p class="testimonial-badge">Placeholder testimonial</p>
        <blockquote>${item.quote}</blockquote>
        <p class="testimonial-meta">${item.name} <span>${item.role}</span></p>
      </article>
    `).join("");
    initRevealObserver();
  } catch (error) {
    console.error(error);
    container.innerHTML = "<p class='status-box status-box--error'>Testimonials could not be loaded.</p>";
  }
}

function initMobileNavigation() {
  const toggle = document.querySelector(".nav-toggle");
  const nav = document.querySelector(".site-nav");
  if (!toggle || !nav) return;

  toggle.addEventListener("click", () => {
    const expanded = toggle.getAttribute("aria-expanded") === "true";
    toggle.setAttribute("aria-expanded", String(!expanded));
    nav.classList.toggle("is-open");
  });
}

function initSmoothScroll() {
  document.querySelectorAll("a[href^='#']").forEach((anchor) => {
    anchor.addEventListener("click", (event) => {
      const targetId = anchor.getAttribute("href");
      const target = targetId ? document.querySelector(targetId) : null;
      if (!target) return;
      event.preventDefault();
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  });
}

function markActiveNavigation() {
  const page = document.body.dataset.page;
  if (!page) return;
  document.querySelectorAll("[data-nav]").forEach((link) => {
    if (link.getAttribute("data-nav") === page) {
      link.classList.add("is-active");
      link.setAttribute("aria-current", "page");
    }
  });
}

function initRevealObserver() {
  const items = document.querySelectorAll(".reveal");
  if (!items.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("revealed");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  items.forEach((item) => observer.observe(item));
}

document.addEventListener("DOMContentLoaded", () => {
  initMobileNavigation();
  initSmoothScroll();
  markActiveNavigation();
  initRevealObserver();
  loadSiteContent();
  loadTestimonials();
});

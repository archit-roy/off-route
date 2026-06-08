const navLinks = document.querySelectorAll("nav a");
const sections = [...document.querySelectorAll("section[id]")];
const revealItems = document.querySelectorAll(
  ".hero-copy, .hero-visual, .intro, .services article, .process li, .contact"
);
const heroVisual = document.querySelector(".hero-visual");

revealItems.forEach((item) => item.classList.add("reveal", "is-visible"));

if ("IntersectionObserver" in window) {
  document.documentElement.classList.add("can-reveal");

  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.18 }
  );

  revealItems.forEach((item) => {
    item.classList.remove("is-visible");
    revealObserver.observe(item);
  });
}

const navObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;

      navLinks.forEach((link) => {
        const isActive = link.getAttribute("href") === `#${entry.target.id}`;
        link.classList.toggle("is-active", isActive);
      });
    });
  },
  {
    rootMargin: "-35% 0px -55% 0px",
    threshold: 0
  }
);

sections.forEach((section) => navObserver.observe(section));

if (heroVisual) {
  heroVisual.addEventListener("pointermove", (event) => {
    const rect = heroVisual.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width - 0.5;
    const y = (event.clientY - rect.top) / rect.height - 0.5;

    heroVisual.style.setProperty("--tilt-x", `${y * -6}deg`);
    heroVisual.style.setProperty("--tilt-y", `${x * 6}deg`);
  });

  heroVisual.addEventListener("pointerleave", () => {
    heroVisual.style.setProperty("--tilt-x", "0deg");
    heroVisual.style.setProperty("--tilt-y", "0deg");
  });
}

// ─── CUSTOM CURSOR ───────────────────────────────────────
const cursorDot  = document.getElementById("cursorDot");
const cursorRing = document.getElementById("cursorRing");

let dotX = 0, dotY = 0;
let ringX = 0, ringY = 0;

// Dot follows instantly
document.addEventListener("mousemove", (e) => {
  dotX = e.clientX;
  dotY = e.clientY;
  cursorDot.style.left = dotX + "px";
  cursorDot.style.top  = dotY + "px";
});

// Ring lerps behind with smooth lag
function lerpRing() {
  ringX += (dotX - ringX) * 0.12;
  ringY += (dotY - ringY) * 0.12;
  cursorRing.style.left = ringX + "px";
  cursorRing.style.top  = ringY + "px";
  requestAnimationFrame(lerpRing);
}
lerpRing();

// Hover state on interactive elements
const hoverTargets = document.querySelectorAll(
  "a, button, .button, .service-list article, .process li, .contact-link, .hero-visual"
);

hoverTargets.forEach((el) => {
  el.addEventListener("mouseenter", () => document.body.classList.add("cursor-hover"));
  el.addEventListener("mouseleave", () => document.body.classList.remove("cursor-hover"));
});
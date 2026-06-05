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

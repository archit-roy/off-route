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


// ── PIXEL HAND CURSOR ────────────────────────────
(function () {
  const cur = document.getElementById("pxCursor");
  if (!cur) return;

  // Pixel hand SVG — 3D style matching the reference
  cur.innerHTML = `<svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" shape-rendering="crispEdges">
    <!-- shadow/depth layers (dark) -->
    <rect x="3" y="28" width="3" height="2" fill="#1a1a1a"/>
    <rect x="6" y="27" width="2" height="2" fill="#1a1a1a"/>
    <rect x="8" y="25" width="2" height="3" fill="#1a1a1a"/>
    <rect x="10" y="24" width="2" height="2" fill="#1a1a1a"/>
    <rect x="12" y="23" width="2" height="2" fill="#1a1a1a"/>
    <rect x="14" y="22" width="14" height="2" fill="#1a1a1a"/>
    <rect x="26" y="10" width="2" height="12" fill="#1a1a1a"/>
    <rect x="24" y="8" width="2" height="2" fill="#1a1a1a"/>
    <!-- outline (black) -->
    <rect x="2" y="26" width="3" height="2" fill="#0c0c0c"/>
    <rect x="5" y="25" width="2" height="2" fill="#0c0c0c"/>
    <rect x="7" y="23" width="2" height="3" fill="#0c0c0c"/>
    <rect x="9" y="22" width="2" height="2" fill="#0c0c0c"/>
    <rect x="11" y="21" width="2" height="2" fill="#0c0c0c"/>
    <rect x="13" y="20" width="12" height="2" fill="#0c0c0c"/>
    <rect x="24" y="8" width="2" height="12" fill="#0c0c0c"/>
    <rect x="22" y="6" width="2" height="2" fill="#0c0c0c"/>
    <rect x="20" y="4" width="2" height="2" fill="#0c0c0c"/>
    <!-- finger tops outline -->
    <rect x="14" y="4" width="2" height="2" fill="#0c0c0c"/>
    <rect x="16" y="2" width="2" height="2" fill="#0c0c0c"/>
    <rect x="18" y="4" width="2" height="2" fill="#0c0c0c"/>
    <!-- left side outline -->
    <rect x="2" y="14" width="2" height="12" fill="#0c0c0c"/>
    <rect x="4" y="12" width="2" height="2" fill="#0c0c0c"/>
    <rect x="6" y="10" width="2" height="2" fill="#0c0c0c"/>
    <rect x="8" y="8" width="2" height="2" fill="#0c0c0c"/>
    <rect x="10" y="6" width="2" height="2" fill="#0c0c0c"/>
    <rect x="12" y="4" width="2" height="2" fill="#0c0c0c"/>
    <rect x="14" y="2" width="2" height="2" fill="#0c0c0c"/>
    <!-- white fill — finger pointing up -->
    <rect x="14" y="4" width="2" height="16" fill="#ffffff"/>
    <rect x="16" y="4" width="2" height="16" fill="#ffffff"/>
    <!-- white fill — hand body -->
    <rect x="4" y="14" width="20" height="8" fill="#ffffff"/>
    <rect x="6" y="12" width="16" height="2" fill="#ffffff"/>
    <rect x="8" y="10" width="12" height="2" fill="#ffffff"/>
    <!-- finger knuckle detail -->
    <rect x="15" y="10" width="1" height="1" fill="#cccccc"/>
    <!-- white finger top -->
    <rect x="16" y="2" width="2" height="2" fill="#ffffff"/>
    <rect x="14" y="4" width="4" height="2" fill="#ffffff"/>
    <!-- 3D depth on right side -->
    <rect x="24" y="10" width="2" height="10" fill="#888888"/>
    <rect x="22" y="8" width="2" height="2" fill="#888888"/>
    <!-- 3D depth on bottom -->
    <rect x="4" y="22" width="20" height="2" fill="#888888"/>
    <rect x="3" y="24" width="2" height="2" fill="#888888"/>
  </svg>`;

  let mx = -80, my = -80;
  let cx = -80, cy = -80;

  document.addEventListener("mousemove", function (e) {
    mx = e.clientX;
    my = e.clientY;
  });

  (function tick() {
    cx += (mx - cx) * 0.18;
    cy += (my - cy) * 0.18;
    cur.style.transform = "translate(" + (cx - 6) + "px, " + (cy - 4) + "px)";
    requestAnimationFrame(tick);
  })();

  document.addEventListener("mousedown", function () { cur.classList.add("clicking"); });
  document.addEventListener("mouseup",   function () { cur.classList.remove("clicking"); });
})();
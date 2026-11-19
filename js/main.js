// Menu mobile
const toggle = document.querySelector(".menu-toggle");
const nav = document.querySelector(".nav");
if (toggle) {
  toggle.addEventListener("click", () => {
    const open = nav.classList.toggle("open");
    toggle.setAttribute("aria-expanded", open);
  });
}

// Lien actif dans la navigation
const page = location.pathname.split("/").pop() || "index.html";
document.querySelectorAll(".nav a").forEach((a) => {
  if (a.getAttribute("href") === page) a.classList.add("active");
});

// Filtre des projets
const filterBtns = document.querySelectorAll(".filter-btn");
filterBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    filterBtns.forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");
    const cat = btn.dataset.filter;
    document.querySelectorAll(".card[data-cat]").forEach((card) => {
      card.hidden = cat !== "all" && card.dataset.cat !== cat;
    });
  });
});

// Formulaire de contact (ouvre le client mail ; à remplacer par Formspree/Netlify si besoin)
const form = document.querySelector("#contact-form");
if (form) {
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const d = new FormData(form);
    const subject = encodeURIComponent(`Contact portfolio — ${d.get("nom")}`);
    const body = encodeURIComponent(`${d.get("message")}\n\n${d.get("nom")} — ${d.get("email")}`);
    location.href = `mailto:${form.dataset.email}?subject=${subject}&body=${body}`;
    document.querySelector(".form-status").textContent = "Merci ! Votre messagerie va s'ouvrir.";
  });
}

// Animation d'apparition au scroll
const io = new IntersectionObserver((entries) => {
  entries.forEach((e) => {
    if (e.isIntersecting) { e.target.classList.add("visible"); io.unobserve(e.target); }
  });
}, { threshold: 0.1 });
document.querySelectorAll(".reveal").forEach((el) => io.observe(el));

// Carrousels : flèches précédent / suivant
document.querySelectorAll("[data-carrousel]").forEach((c) => {
  const piste = c.querySelector(".car-piste");
  const pas = () => piste.clientWidth * 0.8;
  c.querySelector(".prec").addEventListener("click", () => piste.scrollBy({ left: -pas() }));
  c.querySelector(".suiv").addEventListener("click", () => piste.scrollBy({ left: pas() }));
});

// Année du footer
document.querySelectorAll(".year").forEach((el) => (el.textContent = new Date().getFullYear()));

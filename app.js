(function () {
  "use strict";

  var DATA = window.PORTFOLIO;
  var page = document.body.dataset.page || "home";
  var currentLang = localStorage.getItem("portfolio-language") || "zh";
  if (!DATA.translations[currentLang]) currentLang = "zh";

  function esc(value) {
    return String(value).replace(/[&<>"']/g, function (char) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#039;" }[char];
    });
  }

  function getPath(object, path) {
    return path.split(".").reduce(function (value, key) {
      return value && value[key] !== undefined ? value[key] : "";
    }, object);
  }

  function artSVG(key, mode) {
    var uid = (key + "-" + mode).replace(/[^a-z0-9]/gi, "");
    var common = 'xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 900" preserveAspectRatio="xMidYMid slice"';
    var grain = '<filter id="grain' + uid + '"><feTurbulence type="fractalNoise" baseFrequency=".82" numOctaves="3" stitchTiles="stitch"/><feColorMatrix type="saturate" values="0"/><feComponentTransfer><feFuncA type="table" tableValues="0 .13"/></feComponentTransfer></filter>';
    var defs = '<defs><linearGradient id="bg' + uid + '" x1="0" y1="0" x2="1" y2="1"><stop stop-color="#303236"/><stop offset=".52" stop-color="#151617"/><stop offset="1" stop-color="#050505"/></linearGradient><linearGradient id="light' + uid + '" x1="0" y1="0" x2="1" y2="0"><stop stop-color="#f2f2ed" stop-opacity=".76"/><stop offset="1" stop-color="#8a9aaa" stop-opacity=".08"/></linearGradient>' + grain + '</defs>';
    var base = '<rect width="1200" height="900" fill="url(#bg' + uid + ')"/>';
    var grainLayer = '<rect width="1200" height="900" filter="url(#grain' + uid + ')" opacity=".55"/>';
    var drawing = "";

    if (key === "hero") {
      drawing = '<path d="M0 730L190 610V245H420V545L565 470V132H905V620L1200 472V900H0Z" fill="#111214"/>' +
        '<path d="M565 132H905L790 245H650Z" fill="#e4e4df" opacity=".66"/><path d="M650 245H790V620H650Z" fill="#060606"/>' +
        '<g stroke="#c7c7c1" stroke-opacity=".34"><path d="M190 245H420M190 332H420M190 419H420M565 132V620M678 132V620M791 132V620M904 132V620"/></g>' +
        '<path d="M0 730L1200 472" stroke="#89aacc" stroke-opacity=".32"/><circle cx="930" cy="186" r="72" fill="#efefe9" opacity=".12"/>';
    } else if (key === "contact") {
      drawing = '<g opacity=".74"><path d="M0 640L220 410H480L650 245H950L1200 420V900H0Z" fill="#111"/><path d="M220 410h260v330H220z" fill="#202020"/>' +
        '<path d="M650 245h300v495H650z" fill="#171717"/><g fill="#aeb3b6" opacity=".22"><rect x="258" y="458" width="54" height="155"/><rect x="348" y="458" width="54" height="155"/><rect x="696" y="301" width="72" height="264"/><rect x="814" y="301" width="72" height="264"/></g></g>';
    } else if (key.indexOf("courtyard") === 0) {
      drawing = '<path d="M0 190H360V900H0ZM840 110H1200V900H840Z" fill="#151515"/><path d="M360 310H840V900H360Z" fill="#262626"/>' +
        '<path d="M430 375H770V900H430Z" fill="#050505"/><path d="M430 375L770 375 694 482H506Z" fill="url(#light' + uid + ')"/>' +
        '<g stroke="#ddd" stroke-opacity=".18"><path d="M0 190H360M840 110H1200M360 310H840"/><path d="M120 190V900M240 190V900M960 110V900M1080 110V900"/></g>';
    } else if (key.indexOf("cliff") === 0) {
      drawing = '<path d="M0 250L210 168 368 294 565 104 740 215 958 120 1200 268V900H0Z" fill="#292929"/>' +
        '<path d="M-30 630L1230 400V530L-30 760Z" fill="#111"/><path d="M100 597L1100 415" stroke="#e7e7e1" stroke-width="20" opacity=".68"/>' +
        '<g fill="#050505"><rect x="302" y="520" width="190" height="86" transform="rotate(-10 302 520)"/><rect x="690" y="444" width="210" height="88" transform="rotate(-10 690 444)"/></g>' +
        '<path d="M0 760Q300 675 590 748T1200 704V900H0Z" fill="#0a1115" opacity=".8"/>';
    } else if (key.indexOf("market") === 0) {
      drawing = '<rect x="80" y="140" width="1040" height="620" fill="#1d1d1d"/><g stroke="#d8d8d1" stroke-opacity=".3" fill="none"><path d="M80 260H1120M80 380H1120M80 500H1120M80 620H1120"/>' +
        '<path d="M210 140V760M340 140V760M470 140V760M600 140V760M730 140V760M860 140V760M990 140V760"/></g>' +
        '<g fill="#050505"><rect x="115" y="535" width="190" height="225"/><rect x="375" y="415" width="190" height="345"/><rect x="635" y="295" width="190" height="465"/><rect x="895" y="535" width="190" height="225"/></g>' +
        '<path d="M0 760H1200" stroke="#89aacc" stroke-opacity=".42" stroke-width="2"/>';
    } else if (key.indexOf("kiln") === 0) {
      drawing = '<path d="M120 720V330Q120 145 305 145t185 185v390Z" fill="#242424"/><path d="M680 720V270Q680 90 860 90t180 180v450Z" fill="#1c1c1c"/>' +
        '<path d="M210 720V365q0-95 95-95t95 95v355ZM770 720V300q0-90 90-90t90 90v420Z" fill="#070707"/>' +
        '<rect x="518" y="50" width="72" height="670" fill="#111"/><path d="M0 720H1200V900H0Z" fill="#0b0b0b"/>' +
        '<path d="M120 330H490M680 270H1040" stroke="#d6d6d0" stroke-opacity=".22"/>';
    } else if (key === "photo-1") {
      drawing = '<rect x="95" y="90" width="1010" height="720" fill="#181818"/><g stroke="#bfc1c2" stroke-opacity=".28"><path d="M95 230H1105M95 370H1105M95 510H1105M95 650H1105"/>' +
        '<path d="M240 90V810M385 90V810M530 90V810M675 90V810M820 90V810M965 90V810"/></g><path d="M0 760Q300 680 600 760T1200 745V900H0Z" fill="#20282d" opacity=".72"/>';
    } else if (key === "photo-2") {
      drawing = '<rect x="0" y="0" width="1200" height="900" fill="#060606"/><path d="M0 610H1200V900H0Z" fill="#111"/><path d="M60 610L310 270H860L1140 610Z" fill="#202020"/>' +
        '<path d="M270 610L420 370H750L930 610Z" fill="#050505"/><g fill="#e2e2db"><circle cx="184" cy="610" r="8"/><circle cx="1018" cy="610" r="8"/></g><path d="M420 370H750" stroke="#89aacc" stroke-width="4" opacity=".7"/>';
    } else if (key.indexOf("graphic") === 0) {
      drawing = '<rect x="105" y="85" width="990" height="730" fill="#ecece6"/><rect x="160" y="140" width="440" height="620" fill="#0a0a0a"/>' +
        '<circle cx="820" cy="340" r="180" fill="none" stroke="#111" stroke-width="2"/><path d="M640 520H1000M640 565H920M640 610H980" stroke="#111" stroke-width="13"/>' +
        '<path d="M160 205H600" stroke="#89aacc" stroke-width="12"/><text x="185" y="710" font-family="Arial" font-size="74" fill="#eee">0' + (key === "graphic-1" ? "7" : "3") + '</text>';
    } else {
      drawing = '<rect x="130" y="100" width="940" height="700" fill="#111"/><path d="M240 700L440 240H760L965 700Z" fill="none" stroke="#d7d7d1" stroke-opacity=".55" stroke-width="3"/>' +
        '<path d="M380 610H820M415 520H785M455 430H745M490 340H710" stroke="#d7d7d1" stroke-opacity=".35"/>' +
        '<path d="M590 180V760" stroke="#89aacc" stroke-width="4" opacity=".62"/><circle cx="600" cy="450" r="110" fill="#c9c9c2" opacity=".13"/>';
    }

    if (mode === "drawing") {
      drawing += '<g stroke="#e6e6df" stroke-opacity=".22" fill="none"><path d="M45 45H1155V855H45Z"/><path d="M45 450H1155M600 45V855"/></g>';
    }
    if (mode === "model") {
      drawing += '<path d="M150 790L590 610 1080 760 620 860Z" fill="#d7d7d0" opacity=".13"/>';
    }
    return '<svg ' + common + ' aria-hidden="true">' + defs + base + drawing + grainLayer + '</svg>';
  }

  function applyLanguage() {
    var t = DATA.translations[currentLang];
    document.documentElement.lang = currentLang === "zh" ? "zh-CN" : "en";
    document.querySelectorAll("[data-i18n]").forEach(function (el) {
      el.textContent = getPath(t, el.dataset.i18n);
    });
    document.querySelectorAll("[data-i18n-html]").forEach(function (el) {
      el.innerHTML = getPath(t, el.dataset.i18nHtml);
    });
    document.querySelectorAll("[data-lang-option]").forEach(function (el) {
      el.classList.toggle("active", el.dataset.langOption === currentLang);
    });
    if (page === "home") {
      renderProjects();
      renderOthers();
      setupRoleCycle(true);
      buildMarquee();
    } else {
      renderProjectPage();
    }
  }

  function setupLanguageButtons() {
    document.querySelectorAll("[data-lang-toggle]").forEach(function (button) {
      button.addEventListener("click", function () {
        currentLang = currentLang === "zh" ? "en" : "zh";
        localStorage.setItem("portfolio-language", currentLang);
        applyLanguage();
      });
    });
  }

  function renderStaticArt() {
    document.querySelectorAll("[data-art]").forEach(function (el) {
      el.innerHTML = artSVG(el.dataset.art, el.dataset.mode || "default");
    });
  }

  function renderProjects() {
    var grid = document.getElementById("projectGrid");
    if (!grid) return;
    grid.innerHTML = DATA.projects.map(function (project) {
      var item = project[currentLang];
      return '<article class="project-card reveal">' +
        '<a href="' + project.slug + '" aria-label="' + esc(item.title) + '">' +
        '<div class="project-art">' + (project.cover ? '<img src="' + esc(project.cover) + '" alt="' + esc(item.title) + '" loading="lazy">' : artSVG(project.art, "default")) + '</div>' +
        '<div class="project-info"><div><span class="project-number">PROJECT / ' + project.number + '</span>' +
        '<h3 class="font-display">' + esc(item.title) + '</h3><p>' + esc(item.type) + ' · ' + esc(item.location) + ' · ' + esc(item.year) + '</p></div>' +
        '<span class="project-arrow" aria-hidden="true">↗</span></div></a></article>';
    }).join("");
    observeReveals();
  }

  function renderOthers() {
    var grid = document.getElementById("othersGrid");
    if (!grid) return;
    var cols = [[], []];
    DATA.others.forEach(function (item, index) {
      var text = item[currentLang];
      var card = '<article class="other-card">' +
        '<div class="other-caption"><strong>' + esc(text.title) + '</strong><span>' + esc(text.type) + ' / ' + esc(text.year) + '</span></div></article>';
      cols[index % 2].push(card);
    });
    grid.innerHTML = '<div class="others-col">' + cols[0].join("") + '</div><div class="others-col">' + cols[1].join("") + '</div>';
    parallaxCards = [];
  }

  var roleTimer;
  function setupRoleCycle(reset) {
    var el = document.getElementById("roleWord");
    if (!el) return;
    clearInterval(roleTimer);
    var roles = DATA.translations[currentLang].hero.roles;
    var index = 0;
    el.textContent = roles[0];
    if (reset && window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    roleTimer = setInterval(function () {
      index = (index + 1) % roles.length;
      el.textContent = roles[index];
      el.style.animation = "none";
      void el.offsetWidth;
      el.style.animation = "roleIn .45s ease";
    }, 2200);
  }

  function observeReveals() {
    var nodes = document.querySelectorAll(".reveal:not(.in)");
    if (!("IntersectionObserver" in window)) {
      nodes.forEach(function (node) { node.classList.add("in"); });
      return;
    }
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("in");
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: .1, rootMargin: "0px 0px -60px" });
    nodes.forEach(function (node) { observer.observe(node); });
  }

  var parallaxCards = [];
  function prepareParallax() {
    parallaxCards = Array.prototype.slice.call(document.querySelectorAll(".other-card"));
    parallaxCards.forEach(function (card, index) {
      card.dataset.rotate = index % 2 === 0 ? "-1.6" : "1.4";
    });
    updateParallax();
  }

  function updateParallax() {
    if (!parallaxCards.length || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    var section = document.querySelector(".others");
    if (!section) return;
    var rect = section.getBoundingClientRect();
    var total = Math.max(1, rect.height - window.innerHeight);
    var progress = Math.min(1, Math.max(0, -rect.top / total));
    var mobile = window.innerWidth < 680;
    parallaxCards.forEach(function (card, index) {
      var right = card.closest(".others-col") && card.closest(".others-col").matches(":nth-child(2)");
      var amount = (mobile ? 45 : 110) + (index % 3) * (mobile ? 14 : 38);
      var direction = right ? 1 : -1;
      card.style.transform = "translateY(" + (progress * amount * direction) + "px) rotate(" + card.dataset.rotate + "deg)";
    });
  }

  function bindLightbox() {
    var dialog = document.getElementById("lightbox");
    if (!dialog) return;
    document.querySelectorAll(".other-card").forEach(function (card) {
      function open() {
        var item = DATA.others[Number(card.dataset.other)];
        var text = item[currentLang];
        document.getElementById("lightboxArt").innerHTML = artSVG(item.art, "default");
        document.getElementById("lightboxTitle").textContent = text.title;
        document.getElementById("lightboxMeta").textContent = text.type + " / " + text.year;
        dialog.showModal();
        document.body.classList.add("lightbox-open");
      }
      card.addEventListener("click", open);
      card.addEventListener("keydown", function (event) {
        if (event.key === "Enter" || event.key === " ") { event.preventDefault(); open(); }
      });
    });
    if (!dialog.dataset.bound) {
      dialog.dataset.bound = "true";
      dialog.querySelector(".lightbox-close").addEventListener("click", function () { dialog.close(); });
      dialog.addEventListener("click", function (event) { if (event.target === dialog) dialog.close(); });
      dialog.addEventListener("close", function () { document.body.classList.remove("lightbox-open"); });
    }
  }

  var marqueeFrame;
  function buildMarquee() {
    var track = document.getElementById("marqueeTrack");
    if (!track) return;
    cancelAnimationFrame(marqueeFrame);
    var phrase = DATA.translations[currentLang].contact.marquee;
    var unit = "";
    for (var i = 0; i < 8; i++) unit += "<span>" + esc(phrase) + "</span>";
    track.innerHTML = unit + unit;
    var x = 0;
    function tick() {
      if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        x -= .35;
        var half = track.scrollWidth / 2;
        if (half && -x >= half) x += half;
        track.style.transform = "translateX(" + x + "px)";
      }
      marqueeFrame = requestAnimationFrame(tick);
    }
    tick();
  }

  function setupLoader() {
    var loader = document.getElementById("loader");
    if (!loader) return;
    var count = document.getElementById("loaderCount");
    var bar = document.getElementById("loaderBar");
    var words = document.querySelectorAll(".loader-words span");
    if (sessionStorage.getItem("portfolio-loaded")) {
      loader.classList.add("done");
      return;
    }
    var start;
    var duration = window.matchMedia("(prefers-reduced-motion: reduce)").matches ? 250 : 2200;
    var wordIndex = 0;
    function showWord() {
      words.forEach(function (word, index) {
        word.style.opacity = index === wordIndex ? "1" : "0";
        word.style.transform = index === wordIndex ? "translateY(0)" : "translateY(18px)";
      });
    }
    showWord();
    var wordInterval = setInterval(function () { wordIndex = (wordIndex + 1) % words.length; showWord(); }, 720);
    function frame(time) {
      if (!start) start = time;
      var progress = Math.min(1, (time - start) / duration);
      var value = Math.round(progress * 100);
      count.textContent = String(value).padStart(3, "0");
      bar.style.transform = "scaleX(" + progress + ")";
      if (progress < 1) requestAnimationFrame(frame);
      else {
        clearInterval(wordInterval);
        sessionStorage.setItem("portfolio-loaded", "true");
        setTimeout(function () { loader.classList.add("done"); }, 240);
      }
    }
    requestAnimationFrame(frame);
  }

  function setupHomeNavigation() {
    var header = document.getElementById("siteHeader");
    var sections = Array.prototype.slice.call(document.querySelectorAll("main > section[id]"));
    function onScroll() {
      if (header) header.classList.toggle("scrolled", window.scrollY > 70);
      updateParallax();
      var position = window.scrollY + window.innerHeight * .35;
      var active = sections[0] && sections[0].id;
      sections.forEach(function (section) { if (position >= section.offsetTop) active = section.id; });
      document.querySelectorAll(".nav-links a").forEach(function (link) {
        link.classList.toggle("active", link.getAttribute("href") === "#" + active);
      });
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", updateParallax);
    onScroll();
  }

  function projectTemplate(project, index) {
    var t = DATA.translations[currentLang];
    var item = project[currentLang];
    var prevIndex = (index - 1 + DATA.projects.length) % DATA.projects.length;
    var nextIndex = (index + 1) % DATA.projects.length;
    var prev = DATA.projects[prevIndex];
    var next = DATA.projects[nextIndex];
    var media = project.images || [];
    return '<div class="project-page">' +
      '<header class="project-topbar"><a class="back-link" href="index.html#architecture">← <span>' + esc(t.common.back) + '</span></a>' +
      '<button class="lang-toggle" type="button" data-lang-toggle aria-label="Switch language"><span data-lang-option="zh">中</span><i></i><span data-lang-option="en">EN</span></button></header>' +
      '<section class="project-hero"><div class="project-hero-art">' + (project.cover ? '<img src="' + esc(project.cover) + '" alt="">' : artSVG(project.art, "default")) + '</div>' +
      '<div class="project-hero-content"><div><p class="eyebrow">PROJECT / ' + project.number + '</p><h1 class="font-display">' + esc(item.title) + '</h1><p class="subtitle">' + esc(item.subtitle) + ' · ' + esc(item.location) + '</p></div><span class="project-count">' + project.number + ' / 04</span></div></section>' +
      '<section class="project-summary"><div class="container">' +
      '<div class="project-brief reveal">' +
      briefRow(t.projectPage.type, item.type) +
      briefRow(t.projectPage.description, item.intro) +
      briefRow(t.projectPage.format, item.role) +
      '</div>' +
      '<div class="project-media">' + media.map(function (src, mediaIndex) {
        return '<figure class="media-frame reveal"><img src="' + esc(src) + '" alt="' + esc(item.title) + ' ' + (mediaIndex + 1) + '" loading="lazy">' +
          '<figcaption class="media-label">' + esc(t.projectPage.placeholder) + ' / ' + String(mediaIndex + 1).padStart(2, "0") + '</figcaption></figure>';
      }).join("") + '</div>' +
      '</div></section>' +
      '<nav class="project-next"><a href="' + prev.slug + '"><span>← ' + esc(t.common.previous) + '</span><strong>' + esc(prev[currentLang].title) + '</strong></a>' +
      '<a href="' + next.slug + '"><span>' + esc(t.common.next) + ' →</span><strong>' + esc(next[currentLang].title) + '</strong></a></nav></div>';
  }

  function briefRow(label, value) {
    return '<div class="brief-row"><span>' + esc(label) + '</span><p>' + esc(value) + '</p></div>';
  }

  function renderProjectPage() {
    var root = document.getElementById("projectRoot");
    if (!root) return;
    document.documentElement.lang = currentLang === "zh" ? "zh-CN" : "en";
    var index = Number(document.body.dataset.project || 0);
    var project = DATA.projects[index] || DATA.projects[0];
    root.innerHTML = projectTemplate(project, index);
    document.title = project[currentLang].title + " | Cynthia Zhong";
    setupLanguageButtons();
    document.querySelectorAll("[data-lang-option]").forEach(function (el) {
      el.classList.toggle("active", el.dataset.langOption === currentLang);
    });
    observeReveals();
  }

  function init() {
    if (page === "home") {
      renderStaticArt();
      setupLoader();
      setupHomeNavigation();
      applyLanguage();
      setupLanguageButtons();
      observeReveals();
    } else {
      renderProjectPage();
    }
  }

  document.addEventListener("DOMContentLoaded", init);
})();

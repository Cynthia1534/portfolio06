(function () {
  "use strict";

  var DATA = window.PORTFOLIO;
  var page = document.body.dataset.page || "home";
  var currentLang = localStorage.getItem("portfolio-language") || "zh";
  var ACCENTS = ["#FFD600", "#F05A49", "#EA86B2", "#29AEE1", "#08AE68"];
  var GUIDE_ROLES = [
    "assets/portfolio/guide-character-0.png",
    "assets/portfolio/guide-character-1.png",
    "assets/portfolio/guide-character-2.png",
    "assets/portfolio/guide-character-3.png",
    "assets/portfolio/guide-character-4.png",
    "assets/portfolio/guide-character-5.png"
  ];
  var guideButton = null;
  var activeGuideState = "home";
  var activeGuideRole = 0;
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

  function bearSVG() {
    return '<img class="bear-svg bear-character" data-guide-character src="' + GUIDE_ROLES[0] + '" alt="">';
  }

  function guideLabel(state) {
    var zh = {
      home: "前往个人简介", about: "前往建筑设计项目", architecture: "前往荣誉奖项",
      others: "前往实习经历", experience: "前往联系部分", contact: "返回首页", hero: "前往项目说明", brief: "前往项目图片",
      media: "前往项目导航", next: "进入下一个项目"
    };
    var en = {
      home: "Go to profile", about: "Go to architecture projects", architecture: "Go to honors",
      others: "Go to experience", experience: "Go to contact", contact: "Back to home", hero: "Go to project brief", brief: "Go to project images",
      media: "Go to project navigation", next: "Open next project"
    };
    return (currentLang === "zh" ? zh : en)[state] || (currentLang === "zh" ? "继续浏览" : "Continue");
  }

  function setGuideState(state, colorIndex) {
    if (!guideButton) return;
    activeGuideState = state;
    guideButton.dataset.state = state;
    setGuideCharacter(colorIndex % GUIDE_ROLES.length, false);
    guideButton.style.setProperty("--bear-accent", ACCENTS[colorIndex % ACCENTS.length]);
    guideButton.setAttribute("aria-label", guideLabel(state));
    guideButton.title = guideLabel(state);
    var hint = guideButton.querySelector(".guide-hint");
    if (hint) hint.textContent = guideLabel(state);
    guideButton.querySelectorAll(".guide-step").forEach(function (step, index) {
      step.classList.toggle("active", index === colorIndex % 5);
    });
  }

  function setGuideCharacter(index, animate) {
    if (!guideButton) return;
    var img = guideButton.querySelector("[data-guide-character]");
    if (!img) return;
    activeGuideRole = (index + GUIDE_ROLES.length) % GUIDE_ROLES.length;
    var nextSrc = GUIDE_ROLES[activeGuideRole];
    if (img.getAttribute("src") !== nextSrc) img.setAttribute("src", nextSrc);
    guideButton.dataset.role = String(activeGuideRole);
    if (animate) {
      guideButton.classList.remove("is-switching");
      void guideButton.offsetWidth;
      guideButton.classList.add("is-switching");
      window.setTimeout(function () {
        if (guideButton) guideButton.classList.remove("is-switching");
      }, 460);
    }
  }

  function setupSectionDots() {
    document.querySelectorAll(".section-accent-dots").forEach(function (layer) { layer.remove(); });
    var targets = page === "home"
      ? Array.prototype.slice.call(document.querySelectorAll("main > section[id]"))
      : Array.prototype.slice.call(document.querySelectorAll(".project-brief, .project-media, .project-next"));
    targets.forEach(function (target, sectionIndex) {
      var layer = document.createElement("span");
      layer.className = "section-accent-dots accent-scene-" + ((sectionIndex % 5) + 1);
      layer.setAttribute("aria-hidden", "true");
      ["solid", "ring", "halftone"].forEach(function (type, shapeIndex) {
        var shape = document.createElement("i");
        shape.className = "accent-shape accent-" + type;
        shape.style.setProperty("--shape-color", ACCENTS[(sectionIndex + shapeIndex * 2) % ACCENTS.length]);
        layer.appendChild(shape);
      });
      target.appendChild(layer);
    });
    setupAccentParallax(targets);
  }

  function setupAccentParallax(targets) {
    targets.forEach(function (target) {
      if (target.dataset.accentBound) return;
      target.dataset.accentBound = "true";
      target.addEventListener("pointermove", function (event) {
        if (event.pointerType === "touch" || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
        var layer = target.querySelector(".section-accent-dots");
        if (!layer) return;
        var rect = target.getBoundingClientRect();
        var x = ((event.clientX - rect.left) / rect.width - .5) * 2;
        var y = ((event.clientY - rect.top) / rect.height - .5) * 2;
        layer.style.setProperty("--move-x-1", (x * 8).toFixed(1) + "px");
        layer.style.setProperty("--move-y-1", (y * 8).toFixed(1) + "px");
        layer.style.setProperty("--move-x-2", (x * -13).toFixed(1) + "px");
        layer.style.setProperty("--move-y-2", (y * -13).toFixed(1) + "px");
        layer.style.setProperty("--move-x-3", (x * 18).toFixed(1) + "px");
        layer.style.setProperty("--move-y-3", (y * 18).toFixed(1) + "px");
      });
      target.addEventListener("pointerleave", function () {
        var layer = target.querySelector(".section-accent-dots");
        if (layer) layer.removeAttribute("style");
      });
    });
  }

  function setupProjectCardInteractions() {
    var cards = document.querySelectorAll(".project-card");
    cards.forEach(function (card, index) {
      card.style.setProperty("--card-accent", ACCENTS[index % ACCENTS.length]);
      if (card.dataset.tiltBound) return;
      card.dataset.tiltBound = "true";
      card.addEventListener("pointermove", function (event) {
        if (event.pointerType === "touch" || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
        card.classList.add("is-pointing");
        var rect = card.getBoundingClientRect();
        var x = (event.clientX - rect.left) / rect.width - .5;
        var y = (event.clientY - rect.top) / rect.height - .5;
        card.style.setProperty("--tilt-x", (-y * 1.2).toFixed(2) + "deg");
        card.style.setProperty("--tilt-y", (x * 1.2).toFixed(2) + "deg");
        var art = card.querySelector(".project-art");
        if (art) {
          var artRect = art.getBoundingClientRect();
          card.style.setProperty("--lens-x", (event.clientX - artRect.left).toFixed(1) + "px");
          card.style.setProperty("--lens-y", (event.clientY - artRect.top).toFixed(1) + "px");
        }
      });
      card.addEventListener("pointerleave", function () {
        card.classList.remove("is-pointing");
        card.style.setProperty("--tilt-x", "0deg");
        card.style.setProperty("--tilt-y", "0deg");
      });
    });
  }

  function setupImageInteractions() {
    if (page === "project") return;
    document.querySelectorAll(".project-hero-art, .media-frame").forEach(function (frame, index) {
      frame.style.setProperty("--image-accent", ACCENTS[index % ACCENTS.length]);
      if (!frame.querySelector(".image-lens")) {
        var lens = document.createElement("span");
        lens.className = "image-lens";
        lens.setAttribute("aria-hidden", "true");
        frame.appendChild(lens);
      }
      if (frame.dataset.lensBound) return;
      frame.dataset.lensBound = "true";
      frame.addEventListener("pointermove", function (event) {
        if (event.pointerType === "touch" || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
        frame.classList.add("is-pointing");
        var rect = frame.getBoundingClientRect();
        frame.style.setProperty("--image-x", (event.clientX - rect.left).toFixed(1) + "px");
        frame.style.setProperty("--image-y", (event.clientY - rect.top).toFixed(1) + "px");
      });
      frame.addEventListener("pointerleave", function () {
        frame.classList.remove("is-pointing");
      });
    });
  }

  function setupHeroMotion() {
    var hero = document.getElementById("home");
    if (!hero || hero.dataset.motionBound) return;
    hero.dataset.motionBound = "true";
    var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    var isDragging = false;
    var startX = 0;
    var startY = 0;
    var baseRotY = -32;
    var baseRotX = -12;
    var currentRotY = baseRotY;
    var currentRotX = baseRotX;
    function applyRotation(rotX, rotY) {
      currentRotX = Math.max(-34, Math.min(12, rotX));
      currentRotY = rotY;
      hero.style.setProperty("--model-rot-y", currentRotY.toFixed(2) + "deg");
      hero.style.setProperty("--model-rot-x", currentRotX.toFixed(2) + "deg");
    }
    function update(clientX, clientY) {
      if (reduceMotion.matches) return;
      var rect = hero.getBoundingClientRect();
      var x = ((clientX - rect.left) / rect.width - .5) * 2;
      var y = ((clientY - rect.top) / rect.height - .5) * 2;
      hero.style.setProperty("--hero-x", Math.max(-1, Math.min(1, x)).toFixed(3));
      hero.style.setProperty("--hero-y", Math.max(-1, Math.min(1, y)).toFixed(3));
      if (!isDragging) applyRotation(baseRotX - y * 9, baseRotY + x * 28);
    }
    hero.addEventListener("pointermove", function (event) {
      if (event.pointerType === "touch") return;
      if (isDragging) {
        applyRotation(baseRotX - (event.clientY - startY) * .12, baseRotY + (event.clientX - startX) * .38);
      }
      update(event.clientX, event.clientY);
    });
    hero.addEventListener("pointerdown", function (event) {
      if (event.pointerType === "touch" || reduceMotion.matches) return;
      isDragging = true;
      startX = event.clientX;
      startY = event.clientY;
      baseRotY = currentRotY;
      baseRotX = currentRotX;
      hero.classList.add("is-dragging");
      hero.setPointerCapture(event.pointerId);
    });
    hero.addEventListener("pointerup", function (event) {
      if (!isDragging) return;
      isDragging = false;
      baseRotY = currentRotY;
      baseRotX = currentRotX;
      hero.classList.remove("is-dragging");
      if (hero.hasPointerCapture(event.pointerId)) hero.releasePointerCapture(event.pointerId);
    });
    hero.addEventListener("pointerleave", function () {
      if (isDragging) return;
      hero.style.setProperty("--hero-x", "0");
      hero.style.setProperty("--hero-y", "0");
      applyRotation(baseRotX, baseRotY);
    });
  }

  function setupGuide() {
    document.querySelectorAll(".bear-guide").forEach(function (node) { node.remove(); });
    guideButton = null;
    return;
    if (!guideButton) {
      guideButton = document.createElement("button");
      guideButton.type = "button";
      guideButton.className = "bear-guide";
      guideButton.innerHTML = '<span class="guide-orbit" aria-hidden="true"></span>' +
        '<span class="guide-hint" aria-hidden="true"></span>' +
        bearSVG() +
        '<span class="guide-progress" aria-hidden="true">' +
        ACCENTS.map(function (color) { return '<i class="guide-step" style="--step-color:' + color + '"></i>'; }).join("") +
        '</span>';
      document.body.appendChild(guideButton);
      guideButton.addEventListener("click", function () {
        setGuideCharacter(activeGuideRole + 1, true);
        navigateWithGuide();
      });
      guideButton.addEventListener("pointermove", function (event) {
        if (event.pointerType === "touch") return;
        var rect = guideButton.getBoundingClientRect();
        var x = (event.clientX - rect.left) / rect.width - .5;
        var y = (event.clientY - rect.top) / rect.height - .5;
        guideButton.style.setProperty("--guide-ry", (x * 10).toFixed(2) + "deg");
        guideButton.style.setProperty("--guide-rx", (-y * 8).toFixed(2) + "deg");
      });
      guideButton.addEventListener("pointerleave", function () {
        guideButton.style.setProperty("--guide-rx", "0deg");
        guideButton.style.setProperty("--guide-ry", "0deg");
      });
    }
    if (page === "home") updateHomeGuide();
    else updateProjectGuide();
  }

  function navigateWithGuide() {
    if (page === "home") {
      var order = ["home", "about", "architecture", "others", "experience", "contact"];
      var index = order.indexOf(activeGuideState);
      var targetId = activeGuideState === "contact" ? "home" : order[Math.min(index + 1, order.length - 1)];
      var target = document.getElementById(targetId);
      if (target) target.scrollIntoView({ behavior: "smooth", block: "start" });
      return;
    }
    var targets = Array.prototype.slice.call(document.querySelectorAll(".project-brief, .project-media, .project-next"));
    var nextTarget = targets.find(function (target) {
      return target.getBoundingClientRect().top > window.innerHeight * .28;
    });
    if (nextTarget) {
      nextTarget.scrollIntoView({ behavior: "smooth", block: "start" });
      return;
    }
    var nextLink = document.querySelector(".project-next a:last-child");
    if (nextLink) window.location.href = nextLink.href;
  }

  function updateHomeGuide() {
    var sections = Array.prototype.slice.call(document.querySelectorAll("main > section[id]"));
    var position = window.scrollY + window.innerHeight * .38;
    var active = sections[0] ? sections[0].id : "home";
    sections.forEach(function (section) { if (position >= section.offsetTop) active = section.id; });
    var index = Math.max(0, ["home", "about", "architecture", "others", "experience", "contact"].indexOf(active));
    setGuideState(active, index);
  }

  function updateProjectGuide() {
    var brief = document.querySelector(".project-brief");
    var media = document.querySelector(".project-media");
    var next = document.querySelector(".project-next");
    if (!brief || !media || !next) return;
    var position = window.scrollY + window.innerHeight * .42;
    var state = "hero";
    var colorIndex = Number(document.body.dataset.project || 0) % 5;
    if (position >= brief.offsetTop) state = "brief";
    if (position >= media.offsetTop) state = "media";
    if (position >= next.offsetTop) state = "next";
    setGuideState(state, state === "hero" ? colorIndex : state === "brief" ? colorIndex + 1 : state === "media" ? colorIndex + 2 : colorIndex + 3);
  }

  function setupAmbientUI() {
    setupHeroMotion();
    setupSectionDots();
    setupProjectCardInteractions();
    setupImageInteractions();
    setupGuide();
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
      renderExperience();
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
      var cardCover = project.cardCover || project.cover;
      return '<article class="project-card reveal">' +
        '<a href="' + project.slug + '" aria-label="' + esc(item.title) + '">' +
        '<div class="project-art">' + (cardCover ? '<img src="' + esc(cardCover) + '" alt="' + esc(item.title) + '" loading="lazy">' : artSVG(project.art, "default")) + '</div>' +
        '<div class="project-info"><div><span class="project-number">PROJECT / ' + project.number + '</span>' +
        '<h3 class="font-display">' + esc(item.title) + '</h3><p>' + esc(item.type) + ' · ' + esc(item.location) + '</p></div>' +
        '<span class="project-arrow" aria-hidden="true">↗</span></div></a></article>';
    }).join("");
    setupProjectCardInteractions();
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

  function renderExperience() {
    var list = document.getElementById("experienceList");
    if (!list) return;
    list.innerHTML = DATA.experiences.map(function (experience, index) {
      var item = experience[currentLang];
      var highlights = (item.highlights || []).slice(0, 5).map(function (label) {
        return '<span>' + esc(label) + '</span>';
      }).join("");
      var usedTerms = {};
      var detailParagraphs = (item.details || [item.detail]).map(function (paragraph) {
        return '<p>' + highlightExperienceText(paragraph, item.highlights || [], usedTerms) + '</p>';
      }).join("");
      return '<article class="experience-item reveal" style="--experience-accent:' + ACCENTS[index % ACCENTS.length] + '">' +
        '<span class="experience-period">' + esc(experience.period) + '</span>' +
        '<div><h3>' + esc(item.company) + '</h3><p class="experience-role">' + esc(item.role) + '</p>' +
        '<div class="experience-tags" aria-hidden="true">' + highlights + '</div>' +
        '<p class="experience-detail">' + esc(item.detail) + '</p>' +
        '<button class="experience-more" type="button" data-experience="' + index + '" aria-expanded="false" aria-controls="experience-panel-' + index + '">' + (currentLang === "zh" ? "查看详细经历" : "View details") + '<span aria-hidden="true">⌄</span></button>' +
        '<div class="experience-inline-detail" id="experience-panel-' + index + '">' + detailParagraphs + '</div></div>' +
        '</article>';
    }).join("");
    bindExperienceDetails();
    observeReveals();
  }

  function highlightExperienceText(text, terms, usedTerms) {
    var html = esc(text);
    (terms || []).forEach(function (term) {
      var safe = esc(term);
      if (!safe || usedTerms[safe]) return;
      var index = html.indexOf(safe);
      if (index < 0) return;
      usedTerms[safe] = true;
      html = html.slice(0, index) + '<mark>' + safe + '</mark>' + html.slice(index + safe.length);
    });
    return html;
  }

  function ensureExperienceDialog() {
    var dialog = document.getElementById("experienceDialog");
    if (dialog) return dialog;
    dialog = document.createElement("dialog");
    dialog.className = "experience-dialog";
    dialog.id = "experienceDialog";
    dialog.innerHTML = '<button type="button" class="experience-dialog-close" aria-label="Close">×</button>' +
      '<div class="experience-dialog-inner">' +
      '<p class="experience-dialog-period" id="experienceDialogPeriod"></p>' +
      '<h3 id="experienceDialogTitle"></h3>' +
      '<p class="experience-dialog-role" id="experienceDialogRole"></p>' +
      '<div class="experience-dialog-tags" id="experienceDialogTags"></div>' +
      '<div class="experience-dialog-body" id="experienceDialogBody"></div>' +
      '</div>';
    document.body.appendChild(dialog);
    dialog.querySelector(".experience-dialog-close").addEventListener("click", function () { dialog.close(); });
    dialog.addEventListener("click", function (event) { if (event.target === dialog) dialog.close(); });
    dialog.addEventListener("close", function () { document.body.classList.remove("lightbox-open"); });
    return dialog;
  }

  function bindExperienceDetails() {
    document.querySelectorAll("[data-experience]").forEach(function (button) {
      if (button.dataset.bound) return;
      button.dataset.bound = "true";
      button.addEventListener("click", function () {
        var item = button.closest(".experience-item");
        if (!item) return;
        var isOpen = item.classList.contains("is-open");
        document.querySelectorAll(".experience-item.is-open").forEach(function (openItem) {
          openItem.classList.remove("is-open");
          var openButton = openItem.querySelector("[data-experience]");
          if (openButton) {
            openButton.setAttribute("aria-expanded", "false");
            openButton.firstChild.nodeValue = currentLang === "zh" ? "查看详细经历" : "View details";
          }
        });
        if (!isOpen) {
          item.classList.add("is-open");
          button.setAttribute("aria-expanded", "true");
          button.firstChild.nodeValue = currentLang === "zh" ? "收起详细经历" : "Hide details";
        }
      });
    });
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

  function ensureLightbox() {
    var dialog = document.getElementById("lightbox");
    if (dialog) return dialog;
    dialog = document.createElement("dialog");
    dialog.className = "lightbox";
    dialog.id = "lightbox";
    dialog.innerHTML = '<button type="button" class="lightbox-close" aria-label="' + esc(DATA.translations[currentLang].common.close) + '">×</button>' +
      '<button type="button" class="lightbox-nav lightbox-prev" aria-label="' + esc(DATA.translations[currentLang].common.previous) + '">‹</button>' +
      '<button type="button" class="lightbox-nav lightbox-next" aria-label="' + esc(DATA.translations[currentLang].common.next) + '">›</button>' +
      '<div class="lightbox-art" id="lightboxArt"></div>' +
      '<div class="lightbox-caption"><strong id="lightboxTitle"></strong><span id="lightboxMeta"></span></div>';
    document.body.appendChild(dialog);
    return dialog;
  }

  function bindProjectImageLightbox() {
    if (page !== "project") return;
    var dialog = ensureLightbox();
    var frames = Array.prototype.slice.call(document.querySelectorAll(".project-hero-art, .media-frame"));
    var images = frames.map(function (frame) { return frame.querySelector("img"); }).filter(Boolean);
    function showProjectImage(index) {
      if (!images.length) return;
      var nextIndex = (index + images.length) % images.length;
      var image = images[nextIndex];
      dialog.dataset.currentIndex = String(nextIndex);
      document.getElementById("lightboxArt").innerHTML = '<img src="' + esc(image.src) + '" alt="' + esc(image.alt || "") + '">';
      document.getElementById("lightboxTitle").textContent = image.alt || document.title;
      document.getElementById("lightboxMeta").textContent = String(nextIndex + 1).padStart(2, "0") + " / " + String(images.length).padStart(2, "0");
    }
    dialog.__showProjectImage = showProjectImage;
    frames.forEach(function (frame, index) {
      var image = frame.querySelector("img");
      if (!image || frame.dataset.lightboxBound) return;
      frame.dataset.lightboxBound = "true";
      frame.setAttribute("tabindex", "0");
      frame.setAttribute("role", "button");
      frame.setAttribute("aria-label", currentLang === "zh" ? "单独查看图片" : "View image");
      function openImage() {
        showProjectImage(index);
        dialog.showModal();
        document.body.classList.add("lightbox-open");
      }
      frame.addEventListener("click", openImage);
      frame.addEventListener("keydown", function (event) {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          openImage();
        }
      });
    });
    if (!dialog.dataset.bound) {
      dialog.dataset.bound = "true";
      dialog.querySelector(".lightbox-close").addEventListener("click", function () { dialog.close(); });
      dialog.querySelector(".lightbox-prev").addEventListener("click", function (event) {
        event.stopPropagation();
        var index = Number(dialog.dataset.currentIndex || 0);
        if (dialog.__showProjectImage) dialog.__showProjectImage(index - 1);
      });
      dialog.querySelector(".lightbox-next").addEventListener("click", function (event) {
        event.stopPropagation();
        var index = Number(dialog.dataset.currentIndex || 0);
        if (dialog.__showProjectImage) dialog.__showProjectImage(index + 1);
      });
      dialog.addEventListener("keydown", function (event) {
        if (!dialog.open) return;
        if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
          event.preventDefault();
          var index = Number(dialog.dataset.currentIndex || 0);
          if (dialog.__showProjectImage) dialog.__showProjectImage(index + (event.key === "ArrowLeft" ? -1 : 1));
        }
      });
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
    document.querySelectorAll('.nav-links a[href^="#"], .brand[href^="#"]').forEach(function (link) {
      link.addEventListener("click", function (event) {
        var target = document.querySelector(link.getAttribute("href"));
        if (!target) return;
        event.preventDefault();
        history.pushState(null, "", link.getAttribute("href"));
        target.scrollIntoView({ behavior: "smooth", block: "start" });
      });
    });
    function onScroll() {
      if (header) header.classList.toggle("scrolled", window.scrollY > 70);
      var about = document.getElementById("about");
      var hideCue = window.scrollY > window.innerHeight * .42;
      if (about) hideCue = hideCue || about.getBoundingClientRect().top < window.innerHeight * .48;
      document.body.classList.toggle("hide-scroll-cue", hideCue);
      updateParallax();
      var position = window.scrollY + window.innerHeight * .35;
      var active = sections[0] && sections[0].id;
      sections.forEach(function (section) { if (position >= section.offsetTop) active = section.id; });
      document.querySelectorAll(".nav-links a").forEach(function (link) {
        link.classList.toggle("active", link.getAttribute("href") === "#" + active);
      });
      updateHomeGuide();
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", updateParallax);
    window.addEventListener("hashchange", onScroll);
    onScroll();
    requestAnimationFrame(onScroll);
    setTimeout(onScroll, 180);
  }

  function projectTemplate(project, index) {
    var t = DATA.translations[currentLang];
    var item = project[currentLang];
    var prevIndex = (index - 1 + DATA.projects.length) % DATA.projects.length;
    var nextIndex = (index + 1) % DATA.projects.length;
    var prev = DATA.projects[prevIndex];
    var next = DATA.projects[nextIndex];
    var media = project.images || [];
    var firstMedia = media[0];
    var restMedia = media.slice(1);
    var firstFigure = firstMedia ? '<figure class="media-frame project-featured-frame reveal"><img src="' + esc(firstMedia) + '" alt="' + esc(item.title) + ' 1" loading="eager">' +
      '<figcaption class="media-label">' + esc(item.title) + ' / 01</figcaption></figure>' : "";
    return '<div class="project-page">' +
      '<header class="project-topbar"><a class="back-link" href="index.html#architecture">← <span>' + esc(t.common.back) + '</span></a>' +
      '<button class="lang-toggle" type="button" data-lang-toggle aria-label="Switch language"><span data-lang-option="zh">中</span><i></i><span data-lang-option="en">EN</span></button></header>' +
      '<section class="project-hero project-hero-title-only">' +
      '<div class="project-hero-content"><div><p class="eyebrow">PROJECT / ' + project.number + '</p><h1 class="font-display">' + esc(item.title) + '</h1><p class="subtitle">' + esc(item.subtitle) + ' · ' + esc(item.location) + '</p></div><span class="project-count">' + project.number + ' / 04</span></div></section>' +
      '<section class="project-summary"><div class="container">' +
      '<div class="project-intro-media">' +
      '<div class="project-brief reveal">' +
      briefRow(t.projectPage.type, item.type) +
      briefRow(t.projectPage.description, item.intro) +
      briefRow(t.projectPage.format, item.role) +
      '</div>' + firstFigure +
      '</div>' +
      '<div class="project-media">' + restMedia.map(function (src, mediaIndex) {
        var imageNumber = mediaIndex + 2;
        return '<figure class="media-frame reveal"><img src="' + esc(src) + '" alt="' + esc(item.title) + ' ' + imageNumber + '" loading="lazy">' +
          '<figcaption class="media-label">' + esc(item.title) + ' / ' + String(imageNumber).padStart(2, "0") + '</figcaption></figure>';
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
    setupAmbientUI();
    bindProjectImageLightbox();
  }

  function init() {
    if (page === "home") {
      renderStaticArt();
      setupLoader();
      setupHomeNavigation();
      applyLanguage();
      setupLanguageButtons();
      observeReveals();
      setupAmbientUI();
    } else {
      renderProjectPage();
    }
  }

  document.addEventListener("DOMContentLoaded", init);
})();

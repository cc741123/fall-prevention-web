(function () {
  const C = window.SITE_CONTENT;

  const ICONS = {
    check: "assets/icons/check.svg",
    alert: "assets/icons/alert.svg",
    siren: "assets/icons/siren.svg"
  };

  function el(tag, props, ...children) {
    const node = document.createElement(tag);
    for (const [key, value] of Object.entries(props || {})) {
      if (value == null || value === false) continue;
      if (key === "class") node.className = value;
      else if (key === "text") node.textContent = value;
      else if (key.startsWith("on")) node.addEventListener(key.slice(2), value);
      else node.setAttribute(key, value === true ? "" : value);
    }
    for (const child of children.flat()) {
      if (child != null && child !== false) node.append(child);
    }
    return node;
  }

  function getLight(id) {
    return C.lights.find((light) => light.id === id);
  }

  function thresholdForScore(score) {
    return C.thresholds.find((t) => score <= t.max);
  }

  function lightForScore(score) {
    return getLight(thresholdForScore(score).light);
  }

  function lightAlt(light) {
    return `${light.name}｜${light.title}。${light.subtitle}。症狀表現：${light.symptoms}照護重點：${light.care.join("")}`;
  }

  function renderLightCard(light) {
    if (light.figure) {
      return el(
        "figure",
        { class: `light-figure light--${light.id} fade-in` },
        el("img", { src: light.figure, alt: lightAlt(light) })
      );
    }
    return el(
      "article",
      { class: `card light-card light--${light.id} fade-in`, "aria-label": `${light.name}｜${light.title}` },
      el(
        "div",
        { class: "light-card__head" },
        el("div", { class: "light-card__icon" }, el("img", { src: ICONS[light.icon], alt: "" })),
        el(
          "div",
          {},
          el("h2", { class: "card__title", text: `${light.name}｜${light.title}` }),
          el("p", { class: "card__subtitle", text: light.subtitle })
        )
      ),
      el("h3", { class: "section-label", text: "症狀表現" }),
      el("p", { text: light.symptoms }),
      el("h3", { class: "section-label", text: "照護重點" }),
      el("ul", { class: "bullets" }, light.care.map((line) => el("li", { text: line })))
    );
  }

  function mountShell() {
    const isHome = document.body.dataset.page === "home";
    const header = document.getElementById("site-header");
    const notice = document.getElementById("site-notice");
    const footer = document.getElementById("site-footer");

    header.className = "site-header";
    header.append(
      el(
        "a",
        { class: "brand", href: "index.html" },
        el("img", { class: "brand__signal", src: "assets/images/traffic-signal.svg", alt: "" }),
        C.site.title
      )
    );
    if (!isHome) header.append(el("a", { class: "back-link", href: "index.html", text: "← 回首頁" }));

    if (notice) notice.hidden = true;

    footer.className = "site-footer";
    footer.setAttribute("role", "note");
    footer.append(
      el("p", { class: "site-footer__alert", text: C.site.emergencyNotice }),
      el("p", { class: "site-footer__note", text: C.site.disclaimer })
    );
  }

  mountShell();

  window.Site = { el, getLight, thresholdForScore, lightForScore, renderLightCard };
})();

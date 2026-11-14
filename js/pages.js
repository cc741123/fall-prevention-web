(function () {
  const C = window.SITE_CONTENT;
  const { el, renderLightCard } = window.Site;
  const main = document.getElementById("main");

  const ARROW_SVG =
    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m9 18 6-6-6-6"/></svg>';

  function pageHead(eyebrow, title, lead) {
    return el(
      "div",
      { class: "page-head" },
      el("p", { class: "eyebrow", text: eyebrow }),
      el("h1", { class: "page-title", text: title }),
      lead ? el("p", { class: "page-lead", text: lead }) : null
    );
  }

  function emptyState() {
    return el(
      "div",
      { class: "empty" },
      el("p", { class: "empty__title", text: "內容準備中" }),
      el("p", { text: "這個單元的內容正在整理，完成後會放在這裡。" })
    );
  }

  function renderHome() {
    const arrow = () => {
      const span = el("span", { class: "entry__arrow", "aria-hidden": "true" });
      span.innerHTML = ARROW_SVG;
      return span;
    };

    main.append(
      el(
        "div",
        { class: "hero" },
        el("div", { class: "hero__lights", "aria-hidden": "true" }, el("span"), el("span"), el("span")),
        el("h1", { class: "hero__title", text: C.site.title }),
        el("p", { class: "page-lead", text: C.site.subtitle })
      ),
      el(
        "ul",
        { class: "entries" },
        C.sections.map((section, i) =>
          el(
            "li",
            {},
            el(
              "a",
              { class: "entry", href: section.href },
              el("span", { class: "entry__no", text: String(i + 1) }),
              el(
                "span",
                { class: "entry__body" },
                el("span", { class: "entry__title", text: section.title }),
                el("span", { class: "entry__desc", text: section.desc })
              ),
              arrow()
            )
          )
        )
      )
    );
  }

  function renderLights() {
    main.append(
      pageHead("安全紅綠燈", "酒精戒斷防跌照護紅綠燈", "依照病人目前的狀況，對照燈號做好照護。"),
      ...C.lights.map(renderLightCard),
      el("a", { class: "btn btn--ghost", href: "assessment.html", text: "去做自我評估" })
    );
  }

  function renderSymptoms() {
    main.append(
      pageHead("酒癮症狀", "突然停酒後，可能發生什麼事", C.symptomsIntro),
      el(
        "ol",
        { class: "timeline" },
        C.timeline.map((step) =>
          el(
            "li",
            { class: `card timeline__item${step.alert ? " is-alert" : ""}` },
            el("p", { class: "timeline__range", text: step.range }),
            el(
              "h2",
              { class: "timeline__title" },
              step.title,
              step.alert ? el("span", { class: "alert-tag", text: "高風險" }) : null
            ),
            el("p", { class: "timeline__body", text: step.body })
          )
        )
      ),
      el("a", { class: "btn btn--ghost", href: "traffic-light.html", text: "查看安全紅綠燈" })
    );
  }

  function youtubeEmbedUrl(url) {
    const match = url.match(/(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/|shorts\/))([\w-]{11})/);
    return match ? `https://www.youtube-nocookie.com/embed/${match[1]}` : null;
  }

  function renderVideo(url) {
    const embed = youtubeEmbedUrl(url);
    if (!embed) {
      return el("div", { class: "media" }, el("a", { class: "video-link", href: url, target: "_blank", rel: "noopener", text: "觀看影片" }));
    }
    return el(
      "div",
      { class: "media video" },
      el("iframe", {
        src: embed,
        title: "衛教影片",
        loading: "lazy",
        allow: "encrypted-media; picture-in-picture",
        allowfullscreen: true
      })
    );
  }

  function renderFallCare() {
    main.append(pageHead("跌倒嚴重性與照護措施", "跌倒可能造成的傷害與照護", "了解跌倒的嚴重性，以及照顧者可以怎麼做。"));

    if (C.fallCare.length === 0) {
      main.append(emptyState());
      return;
    }

    C.fallCare.forEach((part) => {
      main.append(
        el(
          "article",
          { class: "card" },
          part.severity ? el("span", { class: "severity", text: part.severity }) : null,
          el("h3", { class: "section-label", text: "發生什麼事" }),
          el("p", { text: part.whatHappens }),
          part.caregiverActions && part.caregiverActions.length
            ? [
                el("h3", { class: "section-label", text: "照顧者可以做什麼" }),
                el("ul", { class: "bullets" }, part.caregiverActions.map((line) => el("li", { text: line })))
              ]
            : null,
          part.image && part.image.src
            ? el(
                "figure",
                { class: "media" },
                el("img", { src: part.image.src, alt: part.image.alt || "", loading: "lazy" }),
                part.image.alt ? el("figcaption", { text: part.image.alt }) : null
              )
            : null,
          part.videoUrl ? renderVideo(part.videoUrl) : null
        )
      );
    });
  }

  function renderScenario(scenario, index) {
    const explain = el(
      "div",
      { class: "explain", hidden: true },
      el("h3", { class: "section-label", text: "較合適的做法" }),
      el("p", { text: scenario.bestPractice }),
      el("h3", { class: "section-label", text: "為什麼" }),
      el("p", { text: scenario.why })
    );

    const buttons = scenario.options.map((option) =>
      el("button", {
        type: "button",
        class: "option",
        text: option.text,
        onclick: (event) => {
          buttons.forEach((button, i) => {
            button.disabled = true;
            if (scenario.options[i].isBest) button.classList.add("is-best");
          });
          event.currentTarget.classList.add("is-chosen");
          explain.hidden = false;
        }
      })
    );

    return el(
      "article",
      { class: "card" },
      el("p", { class: "eyebrow", text: `情境 ${index + 1}` }),
      el("p", { class: "card__title", text: scenario.situation }),
      el("div", { class: "options" }, buttons),
      explain
    );
  }

  function renderScenarios() {
    main.append(pageHead("情境挑戰", "遇到這些狀況，怎麼做比較安全", "先選你會怎麼做，再看較合適的做法與原因。"));

    if (C.scenarios.length === 0) {
      main.append(emptyState());
      return;
    }

    C.scenarios.forEach((scenario, i) => main.append(renderScenario(scenario, i)));
  }

  const renderers = {
    home: renderHome,
    lights: renderLights,
    symptoms: renderSymptoms,
    fall: renderFallCare,
    scenarios: renderScenarios
  };

  renderers[document.body.dataset.page]();
})();

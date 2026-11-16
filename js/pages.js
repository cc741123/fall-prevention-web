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

  function renderFallCare() {
    const data = C.fallCare;
    main.append(pageHead("跌倒嚴重性與照護措施", "跌倒可能造成的傷害與照護", "了解跌倒的嚴重性，以及照顧者可以怎麼做。"));

    if (!data || !data.intro) {
      main.append(emptyState());
      return;
    }

    main.append(
      el(
        "article",
        { class: "card" },
        el("h2", { class: "card__title", text: data.introTitle }),
        el("p", { class: "prose", text: data.intro })
      ),
      el(
        "section",
        { class: "card" },
        el("h2", { class: "card__title", text: data.injuriesTitle }),
        el(
          "div",
          { class: "injury-list" },
          data.injuries.map((item) =>
            el(
              "article",
              { class: "injury" },
              el("img", { class: "injury__icon", src: item.icon, alt: "" }),
              el(
                "div",
                {},
                el("h3", { class: "injury__title", text: item.title }),
                el("p", { text: item.body })
              )
            )
          )
        )
      ),
      el(
        "section",
        { class: "card" },
        el("h2", { class: "card__title", text: data.preventionTitle }),
        el(
          "figure",
          { class: "poster" },
          el("img", { src: data.preventionImage.src, alt: data.preventionImage.alt, loading: "lazy" })
        )
      )
    );
  }

  function renderScenario(scenario, index) {
    const explain = el(
      "div",
      { class: "explain", hidden: true },
      el("h3", { class: "section-label", text: "正確答案" }),
      el("p", { text: scenario.bestPractice }),
      el("h3", { class: "section-label", text: "解析" }),
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
      scenario.title ? el("h2", { class: "card__title", text: scenario.title }) : null,
      el("p", { class: "prose", text: scenario.situation }),
      el("div", { class: "options" }, buttons),
      explain
    );
  }

  function renderScenarios() {
    main.append(pageHead("情境挑戰", "遇到這些狀況，怎麼做比較安全", "先選你會怎麼做，再看正確答案與解析。"));

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

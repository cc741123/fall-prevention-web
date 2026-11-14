(function () {
  const C = window.SITE_CONTENT;
  const { el, lightForScore, thresholdForScore, renderLightCard } = window.Site;
  const items = C.assessment.items;
  const maxScore = items.reduce((sum, item) => sum + (item.type === "slider" ? item.max : item.options.length - 1), 0);

  const answers = new Map();
  const list = document.getElementById("items");
  const submit = document.getElementById("submit");
  const submitHint = document.getElementById("submit-hint");
  const result = document.getElementById("result");
  const progressDone = document.getElementById("progress-done");
  const progressScore = document.getElementById("progress-score");
  const progressBar = document.getElementById("progress-bar");

  document.getElementById("intro").textContent = C.assessment.intro;
  document.getElementById("progress-max").textContent = String(maxScore);

  function describe(anchors, value) {
    if (anchors[value]) return anchors[value];
    const keys = Object.keys(anchors).map(Number).sort((a, b) => a - b);
    const lower = Math.max(...keys.filter((k) => k < value));
    const upper = Math.min(...keys.filter((k) => k > value));
    return `介於「${anchors[lower]}」與「${anchors[upper]}」之間`;
  }

  function totalScore() {
    let total = 0;
    answers.forEach((value) => (total += value));
    return total;
  }

  function update() {
    const done = answers.size;
    progressDone.textContent = `已完成 ${done} / ${items.length} 題`;
    progressScore.textContent = String(totalScore());
    progressBar.style.setProperty("--done", `${(done / items.length) * 100}%`);

    const remaining = items.length - done;
    submit.disabled = remaining > 0;
    submitHint.textContent = remaining > 0 ? `還有 ${remaining} 題尚未作答` : "已全部作答，可以查看結果";
    result.hidden = true;
  }

  function itemHeader(item, index, score) {
    return el(
      "div",
      { class: "item__head" },
      el(
        "div",
        {},
        el("p", { class: "item__no", text: `${index + 1} / ${items.length}` }),
        el("h2", { class: "card__title" }, item.title, item.proxy ? el("span", { class: "tag", text: "由照顧者代填" }) : null)
      ),
      score
    );
  }

  function renderSlider(item, index) {
    const card = el("section", { class: "card item is-unanswered", id: `item-${item.id}` });
    const score = el("output", { class: "item__score", text: "–", "aria-hidden": "true" });
    const desc = el("p", { class: "item__desc", text: "尚未作答，請拖拉拉條" });
    const range = el("input", {
      type: "range",
      class: "range",
      min: item.min,
      max: item.max,
      step: 1,
      value: item.min,
      "aria-label": `${item.title}，0 到 ${item.max} 分`
    });

    const anchorValues = Object.keys(item.anchors).map(Number);

    const ticks = [];
    for (let v = item.min; v <= item.max; v++) {
      ticks.push(
        el("span", {
          class: anchorValues.includes(v) ? "is-anchor" : null,
          style: `left: ${((v - item.min) / (item.max - item.min)) * 100}%`,
          text: String(v)
        })
      );
    }

    function choose(value) {
      range.value = String(value);
      const text = describe(item.anchors, value);
      card.classList.remove("is-unanswered");
      card.classList.add("is-answered");
      range.style.setProperty("--pct", `${((value - item.min) / (item.max - item.min)) * 100}%`);
      range.setAttribute("aria-valuetext", `${value} 分，${text}`);
      score.textContent = String(value);
      desc.textContent = text;
      answers.set(item.id, value);
      update();
    }

    const commit = () => choose(Number(range.value));
    range.addEventListener("input", commit);
    range.addEventListener("change", commit);
    range.addEventListener("pointerup", commit);
    range.addEventListener("keyup", (event) => {
      if (event.key !== "Tab" && event.key !== "Shift") commit();
    });

    card.append(
      itemHeader(item, index, score),
      el("div", { class: "slider" }, range, el("div", { class: "ticks", "aria-hidden": "true" }, ticks)),
      desc
    );
    return card;
  }

  function renderChoice(item, index) {
    const card = el("section", { class: "card item is-unanswered", id: `item-${item.id}` });
    const score = el("output", { class: "item__score", text: "–", "aria-hidden": "true" });

    const buttons = item.options.map((option) =>
      el(
        "button",
        { type: "button", class: "segment", "aria-pressed": "false", onclick: () => choose(option.value) },
        el("b", { text: String(option.value) }),
        el("span", { text: option.label })
      )
    );

    function choose(value) {
      card.classList.remove("is-unanswered");
      card.classList.add("is-answered");
      score.textContent = String(value);
      buttons.forEach((button, i) => button.setAttribute("aria-pressed", String(item.options[i].value === value)));
      answers.set(item.id, value);
      update();
    }

    card.append(
      itemHeader(item, index, score),
      el("p", { class: "item__hint", text: item.hint }),
      el("div", { class: "segments", role: "group", "aria-label": item.title }, buttons)
    );
    return card;
  }

  function renderItems() {
    list.replaceChildren(...items.map((item, i) => (item.type === "slider" ? renderSlider(item, i) : renderChoice(item, i))));
  }

  function showResult() {
    const total = totalScore();
    const light = lightForScore(total);
    const threshold = thresholdForScore(total);

    result.replaceChildren(
      el(
        "div",
        { class: `result__summary light--${light.id} fade-in` },
        el("p", { class: "eyebrow", text: "本次總分" }),
        el("p", { class: "result__score" }, String(total), el("small", { text: ` / ${maxScore}` })),
        el("p", { class: "result__light", text: `${light.name}｜${light.title}` }),
        el("p", { class: "result__range", text: `${light.name}範圍：${threshold.min}–${threshold.max} 分` })
      ),
      renderLightCard(light),
      el(
        "div",
        { class: "result__actions" },
        el("a", { class: "btn btn--ghost", href: "index.html", text: "回首頁" }),
        el("button", { type: "button", class: "btn btn--ghost", text: "重新評估", onclick: reset })
      )
    );
    result.hidden = false;
    result.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  function reset() {
    answers.clear();
    renderItems();
    update();
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  submit.addEventListener("click", showResult);

  renderItems();
  update();
})();

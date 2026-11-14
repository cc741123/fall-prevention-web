window.SITE_CONTENT = {
  site: {
    title: "酒精戒斷防跌照護",
    subtitle: "給住院病人與照顧者的床邊衛教，認識戒斷症狀，一起預防跌倒。",
    emergencyNotice: "出現紅燈、抽搐或意識混亂時，立即按鈴通知護理人員。",
    disclaimer: "本網頁為自我觀察與照護參考，不能取代醫護評估。"
  },

  sections: [
    { href: "assessment.html", title: "自我評估", desc: "10 題症狀觀察，算出今天的安全燈號" },
    { href: "symptoms.html", title: "酒癮症狀", desc: "突然停酒或減量後，身體可能出現的變化" },
    { href: "traffic-light.html", title: "安全紅綠燈", desc: "綠、黃、紅三種燈號的意義與照護重點" },
    { href: "fall-care.html", title: "跌倒嚴重性與照護措施", desc: "跌倒可能造成的傷害與預防方法" },
    { href: "scenarios.html", title: "情境挑戰", desc: "遇到這些狀況時，怎麼做比較安全" }
  ],

  lights: [
    {
      id: "green",
      name: "綠燈",
      title: "症狀穩定",
      subtitle: "持續做好基本防跌措施",
      icon: "check",
      symptoms: "意識清楚、情緒平穩，沒有明顯手抖、頭暈或躁動。",
      care: [
        "床欄拉起使用。",
        "下床前先按鈴，請護理人員協助。",
        "穿著防滑鞋，保持地面乾燥。",
        "照顧者需要外出，請主動告知護理人員。"
      ]
    },
    {
      id: "yellow",
      name: "黃燈",
      title: "出現不適症狀",
      subtitle: "提高警覺，加強安全照護",
      icon: "alert",
      symptoms: "出現手抖、冒汗、頭暈、焦慮、坐立不安或睡不好等情況。",
      care: [
        "主動告知護理人員身體出現的變化。",
        "不要讓病人獨自下床或上廁所。",
        "家屬加強陪伴，注意病人是否突然想下床。",
        "保持環境安靜、減少不必要的刺激。"
      ]
    },
    {
      id: "red",
      name: "紅燈",
      title: "出現危險警訊",
      subtitle: "立即通知護理人員",
      icon: "siren",
      symptoms: "出現幻覺、明顯躁動、意識混亂、抽搐，或不顧安全反覆試圖自行下床。",
      care: [
        "立即按鈴通知護理人員。",
        "不要讓病人獨自站立或行走。",
        "保持周圍安全，移開可能造成碰撞的物品。",
        "不要與病人爭辯幻覺內容，也不要自行強行約束。",
        "若發生抽搐，不要壓制四肢或塞東西進嘴巴，立即求助。"
      ]
    }
  ],

  thresholds: [
    { min: 0, max: 8, light: "green" },
    { min: 9, max: 18, light: "yellow" },
    { min: 19, max: 67, light: "red" }
  ],

  assessment: {
    intro: "請依照病人「現在」的狀況，拖拉每一題的拉條。0 到 7 每一分都可以選，介於兩個描述之間時，選中間的分數即可。",
    items: [
      {
        id: "nausea",
        title: "想吐、嘔吐",
        type: "slider",
        min: 0,
        max: 7,
        anchors: { 0: "沒有不舒服", 1: "有點想吐", 4: "一直反胃、偶爾乾嘔", 7: "頻繁乾嘔或嘔吐" }
      },
      {
        id: "tremor",
        title: "手抖",
        type: "slider",
        min: 0,
        max: 7,
        anchors: { 0: "沒有手抖", 1: "看不出來但摸得到輕微顫抖", 4: "雙手伸直時明顯發抖", 7: "手沒伸直也明顯發抖" }
      },
      {
        id: "sweats",
        title: "冒汗",
        type: "slider",
        min: 0,
        max: 7,
        anchors: { 0: "沒有冒汗", 1: "手掌微濕", 4: "額頭出現明顯汗珠", 7: "全身大量冒汗" }
      },
      {
        id: "anxiety",
        title: "緊張不安",
        type: "slider",
        min: 0,
        max: 7,
        anchors: { 0: "心情平靜", 1: "有點緊張", 4: "明顯焦慮、難以放鬆", 7: "極度恐慌" }
      },
      {
        id: "agitation",
        title: "坐立不安",
        type: "slider",
        min: 0,
        max: 7,
        anchors: { 0: "活動正常", 1: "比平常多動一點", 4: "明顯坐不住", 7: "不停走動或躁動" }
      },
      {
        id: "tactile",
        title: "皮膚異常感覺",
        type: "slider",
        min: 0,
        max: 7,
        anchors: { 0: "沒有異常", 1: "輕微刺刺麻麻", 4: "明顯刺痛、灼熱", 7: "出現嚴重觸覺幻覺" }
      },
      {
        id: "auditory",
        title: "聽覺異常",
        type: "slider",
        min: 0,
        max: 7,
        anchors: { 0: "聽起來正常", 1: "對聲音稍微敏感", 4: "聲音明顯刺耳、容易受驚", 7: "持續出現嚴重幻聽" }
      },
      {
        id: "visual",
        title: "視覺異常",
        type: "slider",
        min: 0,
        max: 7,
        anchors: { 0: "看東西正常", 1: "對光線稍微敏感", 4: "對光線明顯敏感", 7: "持續出現嚴重幻視" }
      },
      {
        id: "headache",
        title: "頭痛、頭脹",
        type: "slider",
        min: 0,
        max: 7,
        anchors: { 0: "沒有不舒服", 1: "輕微頭痛", 4: "明顯頭痛或頭脹", 7: "極度嚴重、難以忍受" }
      },
      {
        id: "orientation",
        title: "定向感",
        type: "choice",
        proxy: true,
        hint: "請照顧者詢問：「你是誰」「你在哪裡」「今天是幾月幾日」「加法計算」，依答錯的項目數選擇。",
        options: [
          { value: 0, label: "全部正確" },
          { value: 1, label: "錯 1 項" },
          { value: 2, label: "錯 2 項" },
          { value: 3, label: "錯 3 項" },
          { value: 4, label: "全錯" }
        ]
      }
    ]
  },

  symptomsIntro: "酒精戒斷症狀通常於停止或減少飲酒後 6 至 24 小時開始出現。不同症狀出現的時間不一樣，越後面出現的症狀通常越危險，也越容易造成跌倒。",

  timeline: [
    {
      range: "6–24 小時",
      title: "初期症狀",
      body: "焦慮、失眠、噁心、震顫、出汗及心跳加快等。",
      alert: false
    },
    {
      range: "8–48 小時",
      title: "戒斷性癲癇",
      body: "可能發生戒斷性癲癇（抽搐）。",
      alert: true
    },
    {
      range: "12–24 小時",
      title: "幻覺",
      body: "可能出現聽幻覺或視幻覺。",
      alert: false
    },
    {
      range: "72–96 小時",
      title: "酒精戒斷性譫妄",
      body: "可能發生酒精戒斷性譫妄，伴隨意識混亂、定向感障礙及躁動等症狀。",
      alert: true
    }
  ],

  // 每一段格式：
  // { severity: "", whatHappens: "", caregiverActions: [""], image: { src: "assets/images/xxx.jpg", alt: "" }, videoUrl: "https://www.youtube.com/watch?v=..." }
  // image 與 videoUrl 可以省略。
  fallCare: [],

  // 每一題格式：
  // { situation: "", options: [ { text: "", isBest: false } ], bestPractice: "", why: "" }
  scenarios: []
};

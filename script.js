// ARVEA by Mohamed
// تحميل صور المنتجات الموجودة مباشرة في مستودع GitHub

const GITHUB_API =
  "https://api.github.com/repos/medlain111-beep/ARVEA-By-Mohamed/contents/";

const GITHUB_RAW =
  "https://raw.githubusercontent.com/medlain111-beep/ARVEA-By-Mohamed/main/";

let products = [];
let active = "all";
let cart = [];
// أسعار المنتجات
const productPrices = {
  // =========================
  // العطور
  // =========================
  "collection nude": 4300,
  "collection pink": 4300,
  "collection apricot": 4300,
  "alura": 3700,
  "harem": 5300,
  "veloria": 3700,
  "inspiration": 3700,
  "oriental women": 5350,
  "girl": 3050,
  "mystery girl": 5500,
  "l_extreme": 3950,
  "l_eclat d_or": 4600,
  "glamour": 4200,
  "gentleman": 5400,
  "vulcanis": 3700,
  "aldan": 3700,
  "boy": 3050,
  "audace": 3700,
  "actor": 3900,
  "free spirit": 3500,
  "homme moderne": 4600,
  "harem box": 5600,
  "gentleman box": 5500,
  "body splash queen flower": 2050,
  "body splash crunchy caramel": 2050,
  "body splash sweet crambola": 2050,
  "body splash sweet carambola": 2050,
  "shiny vanilla": 2400,
  // =========================
  // العناية بالبشرة
  // =========================
  "anti tache": 3750,
  "anti spot": 3750,
  "bb cream": 3600,
  "creme visage peaux seche": 3450,
  "face cream hydra deep": 3450,
  "serum hydra deep": 5400,
  "face serum hydra deep": 5400,
  "mousse nettoyante visage": 2400,
  "cleansing foam": 2400,
  "eau-micellaire": 2400,
  "micellaire": 2400,
  "micellar": 2400,
  "cleansing gel": 1450,
  "mask exfoliant": 2100,
  "exfoliating mask": 2100,
  "creme de jour 50": 2050,
  "creme-de-jour-50": 2050,
  "creme de nuit 50": 2750,
  "creme-de-nuit-50": 2750,
  "creme de jour for men": 1900,
  "ecran mineral teinte t1": 4300,
  "ecran mineral teinte t2": 4300,
  "ecran minéral teinte": 4300,
  "ecran solaire invisible": 3600,
  "invisible sunscreen": 3600,
  "fluide solaire invisible": 3100,
  "invisible sun fluid": 3100,
  "lait solaire": 4150,
  "invisible sunscreen lotion": 4150,
  "brume rafra": 900,
  "after sun": 900,
  // =========================
  // العناية بالجسم
  // =========================
  "body cream miracle": 2100,
  "creme miracle 250": 2100,
  "creme miracle - mini": 900,
  "body cream mini miracle": 900,
  "body butter fruited": 1250,
  "body butter fresh": 1250,
  "body lotion sweet carambola": 1550,
  "body lotion queen flower": 1550,
  "body lotion crunchy caramel": 1550,
  "creme mains flower bloom": 1050,
  "creme mains ocean bloom": 1050,
  "creme mains oriental bloom": 1050,
  "cream main floral": 1050,
  "cream main ocean": 1050,
  "cream main oriental": 1050,
  "creme pieds": 1100,
  "cream pieds": 1100,
  "aloe vera gel": 1850,
  "argan oil": 3100,
  "huil-d'argan": 3100,
  "beurre royal": 1200,
  "royal butter": 1200,
  "pain relief cream 100": 1400,
  "cream-apaisante-100": 1400,
  "pain relief cream 200": 2300,
  "cream-apaisante-200": 2300,
  "mosquito repellent pure defense": 1450,
  "anti-moustiques pure defense": 1450,
  "anti moustique": 800,
  "anti-moustiques": 800,
  // =========================
  // النظافة والاستحمام
  // =========================
  "roll-on soft sensation": 1050,
  "roll-on citrus": 1050,
  "roll-on recharge agrumes": 750,
  "roll-on vanilla": 1050,
  "roll-on recharge vanilla": 750,
  "roll-on recharge soft sensation": 750,
  "roll-on ocean": 1050,
  "roll-on recharge ocean": 750,
  "roll-on miracle": 1050,
  "roll-on recharge miracle": 750,
  "roll-on fresh sensation": 1050,
  "roll-on recharge fresh sensation": 750,
  "cooling shower gel": 1150,
  "gel-douche-ocean": 1100,
  "gel douche ocean": 1100,
  "gel-douche-oriental": 1100,
  "gel douche oriental": 1100,
  "gel-douche-tropical": 1100,
  "gel douche tropical": 1100,
  "gel-douche-coco": 1100,
  "gel douche coco": 1100,
  "gel-douche-mojito": 1100,
  "gel douche mojito": 1100,
  "gel-douche-vanille": 1100,
  "gel douche vanilla": 1100,
  "black soap": 1550,
  "savon-masson": 1150,
  "miracle soap": 1150,
  "miracle massage soap": 1150,
  "shea soap": 560,
  "savon karite": 560,
  "soft soap": 620,
  "aloe vera soap": 560,
  "argan oil soap": 560,
  "savon argan": 560,
  "honey and wheat bran soap": 620,
  "gel intime": 1250,
  "gel-intime": 1250,
  "intimate gel": 1250,
  "gel dentaire": 1550,
  "dentifrice": 1550,
  "toothpaste": 1550,
  "bain de bouche": 1550,
  // =========================
  // العناية بالشعر
  // =========================
  "care & repaire shampoo": 1790,
  "care & repair shampoo": 1790,
  "care & repaire shampoo 2026": 1790,
  "care & repaire mask": 1850,
  "care & repair mask 2026": 1850,
  "masque nourrissant sans sulfat": 1350,
  "masque-cheveux-nourissant": 1350,
  "oil replacement": 1550,
  "oil-replacement": 1550,
  "protective hair oil": 2500,
  "huile protectrice": 2500,
  "anti hairfall shampoo": 1500,
  "shampoing anti chute": 1500,
  "anti-dandruff shampoo": 1450,
  "shampoing anti pelliculaire": 1450,
  "dry hair shampoo": 1050,
  "shampoing cheveux sec": 1050,
  "oily hair shampoo": 1050,
  "shampoing cheveux gras": 1050,
  // =========================
  // المكياج
  // =========================
  "lipgloss brillant 1": 1550,
  "lipgloss brillant 2": 1550,
  "lipgloss brillant 3": 1550,
  "lipgloss glossy 1": 1550,
  "lipgloss glossy 2": 1550,
  "lipgloss glossy 3": 1550,
  "lipgloss mat 1": 1550,
  "lipgloss mat 2": 1550,
  "lipgloss mat 3": 1550,
  "lipgloss mat 4": 1550,
  "lipgloss mat 5": 1550,
  "lipgloss semi mat 1": 1550,
  "lipgloss semi mat 2": 1550,
  "lipgloss semi mat 3": 1550,
  "lipgloss semi mat 4": 1550,
  "lipgloss semi mat 5": 1550,
  "lipstick r13": 1500,
  "lipstick r14": 1500,
  "lipstick r16": 1500,
  "baume levres intense": 1050,
  "baume a levre intense": 1050,
  "lip balm": 950,
  "mascara long lash vegan": 2000,
  "concealer cn1": 1500,
  "concealer cn2": 1500,
  "so perfect foundation sp1": 2050,
  "so perfect foundation sp2": 2050,
  "so perfect foundation sp3": 2050,
  "so perfect foundation sp4": 2050,
  "so perfect foundation sp5": 2050,
  "so perfect foundation sp6": 2050,
  "so perfect foundation sp7": 2050,
  "so perfect foundation sp8": 2050,
  "so perfect foundation sp9": 2050,
  "so perfect foundation sp10": 2050,
  "foundation-n°2": 3650,
  "foundation-n°3": 3650,
  "foundation-n°4": 3650,
  "foundation-n°5": 3650,
  "foundation-n°6": 3650,
  // =========================
  // الصحة والمكملات
  // =========================
  "collagen": 5150,
  "collagen tube": 5150,
  "ashwagandha": 4150,
  "ashwaghanda": 4150,
  "seven x protein chocolate": 4950,
  "seven x protein cookies": 4950,
  "seven x slim boost": 4100,
  "multivitamins": 2350,
  "multi vitamin": 2350,
  "seven x fiber": 3650,
  "seven x fibre": 3650,
  "deven x psyllium": 3650,
  "sleep & zen": 1550,
  "slimy 3": 2750,
  "spirulina": 2500,
  "tri maca": 3650,
  "coup faim": 2250
};
// تحديد قسم المنتج تلقائيًا من اسم الصورة
function detectCategory(name) {
  const n = name.toLowerCase();

  // =========================
  // العطور
  // =========================
  if (
    n.includes("parfum") ||
    n.includes("perfume") ||
    n.includes("eau de parfum") ||
    n.includes("velvet") ||
    n.includes("glamour") ||
    n.includes("harem") ||
    n.includes("gentleman") ||
    n.includes("girl") ||
    n.includes("actor") ||
    n.includes("audace") ||
    n.includes("alura") ||
    n.includes("aldan") ||
    n.includes("mystery") ||
    n.includes("veloria") ||
    n.includes("vulcanis")
  ) {
    return "perfume";
  }

  // =========================
  // العناية بالشعر
  // =========================
  if (
    n.includes("shampoo") ||
    n.includes("shampoing") ||
    n.includes("hair") ||
    n.includes("cheveux") ||
    n.includes("capillaire") ||
    n.includes("coloration") ||
    n.includes("teinture") ||
    n.includes("amcolor") ||
    n.includes("color") ||
    n.includes("blond") ||
    n.includes("anti-chute") ||
    n.includes("antichute") ||
    n.includes("masque cheveux") ||
    n.includes("huile cheveux")
  ) {
    return "hair";
  }

  // =========================
  // العناية بالجسم
  // =========================
  if (
    n.includes("body") ||
    n.includes("corps") ||
    n.includes("savon") ||
    n.includes("gel douche") ||
    n.includes("gel-douche") ||
    n.includes("shower") ||
    n.includes("lait de douche") ||
    n.includes("body butter") ||
    n.includes("body splash") ||
    n.includes("gommage corps") ||
    n.includes("gommage corporel") ||
    n.includes("deodorant") ||
    n.includes("déodorant") ||
    n.includes("roll-on") ||
    n.includes("roll on") ||
    n.includes("recharge-roll-on") ||
    n.includes("anti moustique") ||
    n.includes("anti-moustique")
  ) {
    return "body";
  }

  // =========================
  // المكياج
  // =========================
  if (
    n.includes("makeup") ||
    n.includes("maquillage") ||
    n.includes("lipstick") ||
    n.includes("lip gloss") ||
    n.includes("lipgloss") ||
    n.includes("lip balm") ||
    n.includes("baume levres") ||
    n.includes("baume lèvres") ||
    n.includes("foundation") ||
    n.includes("fond de teint") ||
    n.includes("concealer") ||
    n.includes("correcteur") ||
    n.includes("mascara") ||
    n.includes("eyeliner") ||
    n.includes("eye liner") ||
    n.includes("eyeshadow") ||
    n.includes("fard") ||
    n.includes("blush") ||
    n.includes("rouge") ||
    n.includes("crayon") ||
    n.includes("bb cream")
  ) {
    return "makeup";
  }

  // =========================
  // الصحة
  // =========================
  if (
    n.includes("ashwagandha") ||
    n.includes("ashwaghanda") ||
    n.includes("collagen") ||
    n.includes("spirulina") ||
    n.includes("psyllium") ||
    n.includes("slim") ||
    n.includes("fiber") ||
    n.includes("fibre") ||
    n.includes("vitamin") ||
    n.includes("vitamine") ||
    n.includes("omega") ||
    n.includes("magnesium") ||
    n.includes("zinc") ||
    n.includes("sleep") ||
    n.includes("seven x") ||
    n.includes("protein") ||
    n.includes("shaker") ||
    n.includes("push up") ||
    n.includes("coup faim") ||
    n.includes("bain de bouche") ||
    n.includes("dentifrice")
  ) {
    return "health";
  }

  // =========================
  // العناية بالبشرة
  // =========================
  if (
    n.includes("skin") ||
    n.includes("visage") ||
    n.includes("face") ||
    n.includes("anti tache") ||
    n.includes("anti-tache") ||
    n.includes("tache") ||
    n.includes("serum") ||
    n.includes("sérum") ||
    n.includes("gel nettoyant") ||
    n.includes("gel-nettoyant") ||
    n.includes("nettoyant") ||
    n.includes("moistur") ||
    n.includes("hydrat") ||
    n.includes("sun protect") ||
    n.includes("sun protection") ||
    n.includes("écran solaire") ||
    n.includes("ecran solaire") ||
    n.includes("spf") ||
    n.includes("anti age") ||
    n.includes("anti-age") ||
    n.includes("anti aging")
  ) {
    return "skin";
  }

  // =========================
  // العروض
  // =========================
  if (
    n.includes("offer") ||
    n.includes("offre") ||
    n.includes("promo") ||
    n.includes("promotion") ||
    n.includes("pack") ||
    n.includes("coffret") ||
    n.includes("box")
  ) {
    return "offers";
  }

  // إذا لم نتعرف على المنتج
  return "skin";
}
  
function categoryName(category) {
  const names = {
    skin: "العناية بالبشرة",
    hair: "العناية بالشعر",
    body: "العناية بالجسم",
    perfume: "العطور",
    offers: "العروض"
  };

  return names[category] || "منتجات ARVEA";
}
function getProductPrice(productName) {

  const name = productName.toLowerCase();

  for (const key in productPrices) {
    if (name.includes(key.toLowerCase())) {
      return productPrices[key];
    }
  }

  return null;
}
function formatPrice(price) {
  if (price === null || price === undefined) {
    return "السعر عند الطلب";
  }

  return Number(price).toLocaleString("fr-DZ") + " دج";
}

function escapeHTML(value) {
  return String(value).replace(/[&<>"']/g, function (char) {
    const entities = {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#039;"
    };

    return entities[char];
  });
}

// تحميل جميع الصور الموجودة في المستودع
async function loadProducts() {
  const grid = document.getElementById("productGrid");

  if (grid) {
    grid.innerHTML = `
      <div style="
        grid-column:1/-1;
        text-align:center;
        padding:50px 20px;
        background:white;
        border-radius:18px;
      ">
        جاري تحميل المنتجات والصور...
      </div>
    `;
  }

  try {
    const response = await fetch(GITHUB_API);

    if (!response.ok) {
      throw new Error("تعذر الوصول إلى ملفات GitHub");
    }

    const files = await response.json();

 const imageFiles = files.filter(function (file) {
  return (
    file.type === "file" &&
    /\.(jpg|jpeg|png|webp)$/i.test(file.name) &&
    file.name !== "hair-background.jpg.PNG"
  );
});

// تصفية الصور المكررة الواضحة دون حذف أي ملف من GitHub
function duplicateKey(filename) {
  return filename
    .replace(/\.[^.]+$/, "")
    .toLowerCase()
    .replace(/[()]/g, " ")
    .replace(/[_-]+/g, " ")
    .replace(/\b(ancien|new|opened|closed|front|back|top|prespective|perspective)\b/g, " ")
    .replace(/\bcap\b/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .replace(/\s+\d+$/, "");
}

function duplicateScore(filename) {
  const n = filename.toLowerCase();
  let score = 0;

  if (n.includes("new")) score += 5;
  if (n.includes("2026")) score += 4;
  if (n.includes("2025")) score += 3;
  if (n.includes("ancien")) score -= 5;
  if (n.includes("opened") || n.includes("closed")) score -= 2;
  if (n.includes("front") || n.includes("back") || n.includes("top")) score -= 1;
  if (n.includes("perspective") || n.includes("prespective")) score -= 1;

  return score;
}

const uniqueFiles = [];

imageFiles.forEach(function (file) {
  const key = duplicateKey(file.name);

  const existingIndex = uniqueFiles.findIndex(function (item) {
    return duplicateKey(item.name) === key;
  });

  if (existingIndex === -1) {
    uniqueFiles.push(file);
    return;
  }

  if (
    duplicateScore(file.name) >
    duplicateScore(uniqueFiles[existingIndex].name)
  ) {
    uniqueFiles[existingIndex] = file;
  }
});
// إنشاء المنتجات من الصور الموجودة في الكتالوج فقط
products = uniqueFiles
  .filter(function (file) {
    // المنتج لا يظهر في المتجر إلا إذا كان له سعر
    // داخل قائمة منتجات الكتالوج المعتمدة
    return getProductPrice(file.name) !== null;
  })
  .map(function (file, index) {
    const category = detectCategory(file.name);

    return {
      id: index + 1,
      name: file.name.replace(/\.[^.]+$/, ""),
      cat: category,
      tag: categoryName(category),
      price: getProductPrice(file.name),
      image:
        GITHUB_RAW +
        encodeURIComponent(file.name).replace(/%2F/g, "/")
    };
  });
    renderProducts();
  } catch (error) {
    console.error(error);

    if (grid) {
      grid.innerHTML = `
        <div style="
          grid-column:1/-1;
          text-align:center;
          padding:50px 20px;
          background:white;
          border-radius:18px;
        ">
          حدث خطأ أثناء تحميل المنتجات.
          <br>
          حاول تحديث الصفحة.
        </div>
      `;
    }
  }
}

function filterProducts(category) {
  active = category;

  renderProducts();

  document.getElementById("products")?.scrollIntoView({
    behavior: "smooth"
  });
}

function renderProducts() {
  const grid = document.getElementById("productGrid");

  if (!grid) return;

  const search =
    document.getElementById("search")?.value.trim().toLowerCase() || "";

  const list = products.filter(function (product) {
    const categoryMatch =
      active === "all" || product.cat === active;

    const searchMatch =
      !search ||
      product.name.toLowerCase().includes(search) ||
      product.tag.toLowerCase().includes(search);

    return categoryMatch && searchMatch;
  });

  if (!list.length) {
    grid.innerHTML = `
      <div style="
        grid-column:1/-1;
        text-align:center;
        padding:50px 20px;
        background:white;
        border-radius:18px;
      ">
        لا توجد منتجات مطابقة للبحث.
      </div>
    `;

    return;
  }

  grid.innerHTML = list.map(function (product) {
    return `
<article class="card ${product.cat === "hair" ? "hair-card" : ""}">

        <div class="product-img">
          <img
            src="${product.image}"
            alt="${escapeHTML(product.name)}"
            loading="lazy"
          >
        </div>

        <div class="card-body">

          <span class="tag">
            ${escapeHTML(product.tag)}
          </span>

          <h3>
            ${escapeHTML(product.name)}
          </h3>

          <div class="price">
            ${formatPrice(product.price)}
          </div>

          <button
            class="add"
            onclick="addToCart(${product.id})"
          >
            🛒 أضف إلى السلة
          </button>

        </div>

      </article>
    `;
  }).join("");
}

function addToCart(id) {
  const product = products.find(function (item) {
    return item.id === id;
  });

  if (!product) return;

  cart.push(product);

  updateCartCount();
  renderCart();

  document.getElementById("cart")?.scrollIntoView({
    behavior: "smooth"
  });
}

function removeFromCart(index) {
  cart.splice(index, 1);

  updateCartCount();
  renderCart();
}

function updateCartCount() {
  const count = document.getElementById("cartCount");

  if (count) {
    count.textContent = cart.length;
  }
}

function renderCart() {
  const box = document.getElementById("cartItems");
  const whatsapp = document.getElementById("whatsappBtn");

  if (!box || !whatsapp) return;

  if (!cart.length) {
    box.textContent = "السلة فارغة حاليًا.";
    whatsapp.href = "https://wa.me/213797072478";
    return;
  }

  box.innerHTML = cart.map(function (product, index) {
    return `
      <div class="cart-row">

        <span>
          ${index + 1}. ${escapeHTML(product.name)}
        </span>

        <b>
          ${formatPrice(product.price)}
        </b>

        <button
          onclick="removeFromCart(${index})"
          style="
            border:0;
            background:#f1e9df;
            color:#60452f;
            padding:6px 10px;
            border-radius:8px;
            cursor:pointer;
            font-weight:bold;
          "
        >
          حذف
        </button>

      </div>
    `;
  }).join("");

  const orderText =
    "السلام عليكم، أريد الطلب من ARVEA by Mohamed:\n\n" +
    cart.map(function (product, index) {
      return (
        (index + 1) +
        "- " +
        product.name +
        " — " +
        formatPrice(product.price)
      );
    }).join("\n");

  whatsapp.href =
    "https://wa.me/213797072478?text=" +
    encodeURIComponent(orderText);
}

// تشغيل المتجر
loadProducts();
updateCartCount();
renderCart();

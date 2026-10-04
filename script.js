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
  "parfum collection nude": 4300,
  "parfum collection pink": 4300,
  "parfum collection apricot": 4300,
  "parfum alura": 3100,
  "parfum harem": 4300,
  "parfum vulcanis": 3100,
  "parfum gentleman": 4450,
  "parfum aldan": 3100,
  "parfum boy": 3050,
  "parfum audace": 3100,
  "parfum veloria": 3100,
  "parfum actor": 3100,
  "parfum girl": 3100,
  "parfum glamour": 3100,
  "parfum velvet bloom": 3100,
  "parfum insolite": 4100,
  "parfum inspiration": 4100,
  "parfum l_eclat": 4100,
  "parfum l_extreme": 4100,
  "parfum homme moderne": 4100,
  "parfum oriental men": 4100,
  "parfum oriental women": 4100,
  "parfum free spirit": 4100,

  "harem box": 5600,
  "gentleman box": 5500,

  "body splash queen flower": 2050,
  "body splash crunchy caramel": 2050,
  "body splash sweet crambola": 2050,
  "body splash sweet carambola": 2050,

  // =========================
  // العناية بالبشرة
  // =========================
  "anti tache cream": 3450,
  "bb cream": 3350,
  "face serum hydra deep": 5400,
  "creme visage peaux seche": 3450,
  "creme de jour for men": 1900,
  "creme de jour 50": 2050,
  "creme de nuit 50": 2750,

  "cleansing foam hydra deep": 2400,
  "mousse nettoyante visage": 2400,
  "eau-micellaire": 2150,
  "micellar": 2150,
  "cleansing gel": 1250,
  "mask exfoliant": 2100,
  "exfoliating mask": 2100,

  "after sun": 900,
  "invisible sunscreen": 3600,
  "invisible sun fluid": 3100,
  "invisible sunscreen lotion": 4150,
  "brume rafra": 900,

  "intimate gel": 1050,
  "after shave": 950,
  "slimming gel": 2500,
  "push-up cream": 2850,

  // =========================
  // العناية بالجسم
  // =========================
  "body cream miracle": 2100,
  "creme miracle 250": 2100,
  "creme miracle - mini": 900,

  "body butter fruited": 1050,
  "body butter fresh": 1050,
  "body butter sugar kiss": 1050,
  "royal butter": 1200,

  "body lotion sweet carambola": 1550,
  "body lotion queen flower": 1550,
  "body lotion crunchy caramel": 1550,

  "creme mains flower bloom": 900,
  "creme mains ocean bloom": 900,
  "creme mains oriental bloom": 900,
  "creme pieds": 1000,

  "aloe vera gel": 1850,
  "argan oil 30": 2800,

  "pain relief cream 100": 1300,
  "pain relief cream 200": 2150,

  "mosquito repellent pure defense": 1450,
  "anti moustiques pure defense": 1450,
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
  "shower gel ocean": 1100,
  "shower gel oriental": 1100,
  "shower gel tropical cocktail mangue": 1100,
  "shower gel tropical cocktail coco": 1100,
  "shower gel mojito": 1100,
  "shower gel vanilla": 1100,

  "black soap": 1550,
  "honey and wheat bran soap": 620,
  "miracle soap": 1050,
  "shea soap": 560,
  "soft soap": 620,
  "aloe vera soap": 560,
  "argan oil soap": 560,
  "miracle massage soap": 990,

  // =========================
  // العناية بالشعر
  // =========================
  "care & repaire shampoo": 1790,
  "care & repair shampoo": 1790,
  "care & repaire shampoo 2026": 1790,
  "care & repair shampoo 2026": 1790,

  "care & repaire mask": 1850,
  "care & repair - sulfate-free mask": 1850,
  "care & repaire mask 2026": 1850,

  "masque nourrissant sans sulfat": 1350,
  "masque-cheveux-nourissant": 1350,

  "oil replacement": 1400,
  "protective hair oil": 2500,
  "protective hair cream": 1850,
  "men's hair styling cream": 1200,

  "anti hairfall shampoo": 1300,
  "anti-dandruff shampoo": 1200,
  "dry hair shampoo": 1050,
  "oily hair shampoo": 1050,

  // صبغات الشعر الأساسية 1200 دج
  "light natural brown": 1200,
  "platinum blonde": 1200,
  "light natural blonde": 1200,
  "dark natural blonde": 1200,
  "natural blonde": 1200,
  "very light natural blonde": 1200,
  "light beige blonde": 1200,
  "intense dark red blonde": 1200,
  "extra creamy chocolate": 1200,
  "very light beige blonde": 1200,
  "sand blonde": 1200,
  "very light sand blonde": 1200,
  "very light violet ash blonde": 1200,
  "intense platinum ash blonde": 1200,
  "light violet brown": 1200,
  "platinum ash blonde": 1200,
  "intense very light ash blonde": 1200,
  "light sand blonde": 1200,
  "intense light ash blonde": 1200,
  "intense ash blonde": 1200,
  "ash blonde": 1200,
  "light ash blonde": 1200,
  "intense very light blonde": 1200,
  "intense red blonde": 1200,
  "super platinum blonde": 1200,
  "platinum violet ash blonde": 1200,
  "very light ash blonde": 1200,
  "intense platinum blonde": 1200,

  // =========================
  // المكياج
  // =========================
  "lipgloss glossy 1": 1250,
  "lipgloss glossy 2": 1250,
  "lipgloss glossy 3": 1250,

  "lipgloss mat 1": 1250,
  "lipgloss mat 2": 1250,
  "lipgloss mat 3": 1250,
  "lipgloss mat 4": 1250,
  "lipgloss mat 5": 1250,

  "lipgloss semi mat 1": 1250,
  "lipgloss semi mat 2": 1250,
  "lipgloss semi mat 3": 1250,
  "lipgloss semi mat 4": 1250,
  "lipgloss semi mat 5": 1250,

  "baume levres intense": 1050,
  "baume a levre intense": 1050,
  "lip balm": 950,

  "so glam": 1500,
  "mascara long lash vegan": 2000,

  "concealer cn1": 1500,
  "concealer cn2": 1500,
  "concealer cn4": 1500,

  "so perfect foundation": 2050,

  "fond de teint beige ivoire": 3650,
  "fond de teint beige ble": 3650,
  "fond de teint beige rose": 3650,

  // =========================
  // الصحة والمكملات
  // =========================
  "seven x slim boost": 4100,
  "ashwagandha": 4150,
  "ashwaghanda": 4150,
  "seven x protein chocolate": 4950,
  "seven x protein cookies": 4950,
  "7x protein": 4950,
  "multivitamins": 2200,
  "seven x fiber": 3650,
  "seven x fibre": 3650,
  "deven x psyllium": 3650,
  "collagen": 4600,
  "sleep & zen": 1550,
  "slimy 3": 2750,
  "spirulina": 2500,
  "tri maca": 3650,
  "coup faim": 2250,
  "bain de bouche": 1350,
  "dentifrice": 1250
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

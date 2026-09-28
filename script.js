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

  // أمثلة (عدّل الأسماء حسب أسماء الصور عندك)

  "veloria": 4500,
  "vulcanis": 4200,
  "mystery": 3900,
  "gentleman": 4800,

  "ashwagandha": 3500,
  "collagen": 3900,
  "spirulina": 2800,

  "shampoo": 1800,
  "amcolor": 1200,

  "serum": 2200,
  "bb cream": 2400
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
    products = imageFiles.map(function (file, index) {
      const category = detectCategory(file.name);

      return {
        id: index + 1,
        name: file.name.replace(/\.[^.]+$/, ""),
        cat: category,
        tag: categoryName(category),
        price: getProductPrice(file.name),,
        image: GITHUB_RAW + encodeURIComponent(file.name).replace(/%2F/g, "/")
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

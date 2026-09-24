// ARVEA by Mohamed
// تحميل صور المنتجات الموجودة مباشرة في مستودع GitHub

const GITHUB_API =
  "https://api.github.com/repos/medlain111-beep/ARVEA-By-Mohamed/contents/";

const GITHUB_RAW =
  "https://raw.githubusercontent.com/medlain111-beep/ARVEA-By-Mohamed/main/";

let products = [];
let active = "all";
let cart = [];

// تحديد قسم المنتج تلقائيًا من اسم الصورة
function detectCategory(name) {
  const n = name.toLowerCase();

  if (
    n.includes("parfum") ||
    n.includes("perfume") ||
    n.includes("velvet") ||
    n.includes("glamour") ||
    n.includes("harem") ||
    n.includes("gentleman") ||
    n.includes("girl") ||
    n.includes("actor") ||
    n.includes("audace") ||
    n.includes("alura") ||
    n.includes("aldan") ||
    n.includes("mystery")
  ) {
    return "perfume";
  }

  if (
    n.includes("shampoo") ||
    n.includes("shampoing") ||
    n.includes("hair") ||
    n.includes("cheveux") ||
    n.includes("huile") ||
    n.includes("oil") ||
    n.includes("olymiel") ||
    n.includes("capillaire")
  ) {
    return "hair";
  }

  if (
    n.includes("savon") ||
    n.includes("gel douche") ||
    n.includes("gel-douche") ||
    n.includes("shower") ||
    n.includes("lait de douche") ||
    n.includes("roll-on") ||
    n.includes("roll on")
  ) {
    return "body";
  }

  if (
    n.includes("lipstick") ||
    n.includes("lipgloss") ||
    n.includes("lip balm") ||
    n.includes("foundation") ||
    n.includes("cream") ||
    n.includes("serum") ||
    n.includes("masque") ||
    n.includes("mask") ||
    n.includes("mousse") ||
    n.includes("sun protect") ||
    n.includes("gel-nettoyant")
  ) {
    return "skin";
  }

  if (
    n.includes("seven x") ||
    n.includes("spirulina") ||
    n.includes("psyllium") ||
    n.includes("slim") ||
    n.includes("fiber") ||
    n.includes("sleep") ||
    n.includes("vitamin") ||
    n.includes("push up")
  ) {
    return "offers";
  }

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
        /\.(jpg|jpeg|png|webp)$/i.test(file.name)
      );
    });

    products = imageFiles.map(function (file, index) {
      const category = detectCategory(file.name);

      return {
        id: index + 1,
        name: file.name.replace(/\.[^.]+$/, ""),
        cat: category,
        tag: categoryName(category),
        price: null,
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

const products = [
  {
    id: 1,
    name: "منتج العناية بالبشرة",
    cat: "skin",
    price: 0,
    tag: "العناية بالبشرة"
  },
  {
    id: 2,
    name: "منتج العناية بالشعر",
    cat: "hair",
    price: 0,
    tag: "العناية بالشعر"
  },
  {
    id: 3,
    name: "منتج العناية بالجسم",
    cat: "body",
    price: 0,
    tag: "العناية بالجسم"
  },
  {
    id: 4,
    name: "عطر ARVEA",
    cat: "perfume",
    price: 0,
    tag: "العطور"
  },
  {
    id: 5,
    name: "منتج مميز",
    cat: "offers",
    price: 0,
    tag: "عرض خاص"
  },
  {
    id: 6,
    name: "منتج جديد",
    cat: "skin",
    price: 0,
    tag: "جديد"
  },
  {
    id: 7,
    name: "منتج جديد",
    cat: "body",
    price: 0,
    tag: "جديد"
  },
  {
    id: 8,
    name: "منتج مميز",
    cat: "perfume",
    price: 0,
    tag: "مميز"
  }
];

let active = "all";
let cart = [];

function filterProducts(cat) {
  active = cat;
  renderProducts();

  document
    .getElementById("products")
    .scrollIntoView({ behavior: "smooth" });
}

function renderProducts() {
  const search =
    document.getElementById("search")?.value.trim().toLowerCase() || "";

  const list = products.filter(product => {
    const categoryMatch =
      active === "all" || product.cat === active;

    const searchMatch =
      !search ||
      product.name.toLowerCase().includes(search) ||
      product.tag.toLowerCase().includes(search);

    return categoryMatch && searchMatch;
  });

  const grid = document.getElementById("productGrid");

  if (!list.length) {
    grid.innerHTML = `
      <div style="grid-column:1/-1;text-align:center;padding:40px">
        لا توجد منتجات مطابقة للبحث.
      </div>
    `;
    return;
  }

  grid.innerHTML = list.map(product => `
    <article class="card">

      <div class="product-img">
        ARVEA
      </div>

      <div class="card-body">

        <span class="tag">
          ${product.tag}
        </span>

        <h3>
          ${product.name}
        </h3>

        <div class="price">
          ${product.price > 0
            ? product.price.toLocaleString("fr-DZ") + " دج"
            : "السعر قريبًا"}
        </div>

        <button
          class="add"
          onclick="addToCart(${product.id})">
          أضف إلى السلة
        </button>

      </div>

    </article>
  `).join("");
}

function addToCart(id) {
  const product = products.find(item => item.id === id);

  if (!product) return;

  cart.push(product);

  renderCart();

  document.getElementById("cartCount").textContent = cart.length;
}

function removeFromCart(index) {
  cart.splice(index, 1);

  renderCart();

  document.getElementById("cartCount").textContent = cart.length;
}

function renderCart() {
  const box = document.getElementById("cartItems");

  if (!cart.length) {
    box.textContent = "السلة فارغة حاليًا.";

    document.getElementById("whatsappBtn").href =
      "https://wa.me/213797072478";

    return;
  }

  box.innerHTML = cart.map((product, index) => `
    <div class="cart-row">

      <span>
        ${index + 1}. ${product.name}
      </span>

      <b>
        ${product.price > 0
          ? product.price.toLocaleString("fr-DZ") + " دج"
          : "السعر قريبًا"}
      </b>

      <button
        onclick="removeFromCart(${index})"
        style="
          border:0;
          background:#f1e9df;
          color:#60452f;
          padding:5px 9px;
          border-radius:8px;
          cursor:pointer;
        ">
        حذف
      </button>

    </div>
  `).join("");

  const message =
    "السلام عليكم، أريد الطلب من ARVEA by Mohamed:%0A%0A" +
    cart
      .map((product, index) =>
        `${index + 1}- ${product.name}`
      )
      .join("%0A");

  document.getElementById("whatsappBtn").href =
    "https://wa.me/213797072478?text=" + message;
}

renderProducts();
renderCart();

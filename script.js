const products = [
  {
    id: 1,
    name: "كريم العناية بالبشرة",
    cat: "skin",
    price: 3200,
    tag: "العناية بالبشرة",
    image: ""
  },
  {
    id: 2,
    name: "شامبو العناية بالشعر",
    cat: "hair",
    price: 2800,
    tag: "العناية بالشعر",
    image: ""
  },
  {
    id: 3,
    name: "كريم العناية بالجسم",
    cat: "body",
    price: 3000,
    tag: "العناية بالجسم",
    image: ""
  },
  {
    id: 4,
    name: "عطر ARVEA",
    cat: "perfume",
    price: 4500,
    tag: "العطور",
    image: ""
  },
  {
    id: 5,
    name: "مجموعة عناية مميزة",
    cat: "offers",
    price: 5200,
    tag: "عرض خاص",
    image: ""
  },
  {
    id: 6,
    name: "سيروم العناية بالبشرة",
    cat: "skin",
    price: 3900,
    tag: "جديد",
    image: ""
  },
  {
    id: 7,
    name: "لوشن الجسم",
    cat: "body",
    price: 3500,
    tag: "جديد",
    image: ""
  },
  {
    id: 8,
    name: "عطر مميز",
    cat: "perfume",
    price: 4800,
    tag: "مميز",
    image: ""
  }
];

let active = "all";
let cart = [];

function formatPrice(price) {
  return price.toLocaleString("fr-DZ") + " دج";
}

function filterProducts(cat) {
  active = cat;
  renderProducts();

  document
    .getElementById("products")
    .scrollIntoView({
      behavior: "smooth"
    });
}

function renderProducts() {
  const search =
    document
      .getElementById("search")
      ?.value
      .trim()
      .toLowerCase() || "";

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

  grid.innerHTML = list.map(product => `
    <article class="card">

      <div class="product-img">
        ${
          product.image
            ? `<img
                src="${product.image}"
                alt="${product.name}"
                style="
                  width:100%;
                  height:100%;
                  object-fit:contain;
                "
              >`
            : `<span>ARVEA</span>`
        }
      </div>

      <div class="card-body">

        <span class="tag">
          ${product.tag}
        </span>

        <h3>
          ${product.name}
        </h3>

        <div class="price">
          ${formatPrice(product.price)}
        </div>

        <button
          class="add"
          onclick="addToCart(${product.id})">
          🛒 أضف إلى السلة
        </button>

      </div>

    </article>
  `).join("");
}

function addToCart(id) {
  const product = products.find(
    item => item.id === id
  );

  if (!product) return;

  cart.push(product);

  renderCart();

  document.getElementById("cartCount").textContent =
    cart.length;

  document
    .getElementById("cart")
    .scrollIntoView({
      behavior: "smooth"
    });
}

function removeFromCart(index) {
  cart.splice(index, 1);

  renderCart();

  document.getElementById("cartCount").textContent =
    cart.length;
}

function renderCart() {
  const box =
    document.getElementById("cartItems");

  const whatsapp =
    document.getElementById("whatsappBtn");

  if (!cart.length) {
    box.textContent =
      "السلة فارغة حاليًا.";

    whatsapp.href =
      "https://wa.me/213797072478";

    return;
  }

  box.innerHTML = cart.map((product, index) => `
    <div class="cart-row">

      <span>
        ${index + 1}. ${product.name}
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
        ">
        حذف
      </button>

    </div>
  `).join("");

  const total =
    cart.reduce(
      (sum, product) =>
        sum + product.price,
      0
    );

  box.innerHTML += `
    <div style="
      display:flex;
      justify-content:space-between;
      align-items:center;
      margin-top:20px;
      padding-top:18px;
      border-top:2px solid #e3e8e2;
      font-size:19px;
    ">
      <strong>
        المجموع
      </strong>

      <strong style="color:#60452f">
        ${formatPrice(total)}
      </strong>
    </div>
  `;

  const message =
    "السلام عليكم، أريد الطلب من ARVEA by Mohamed:%0A%0A" +

    cart.map((product, index) =>
      `${index + 1}- ${product.name} — ${formatPrice(product.price)}`
    ).join("%0A") +

    `%0A%0Aالمجموع: ${formatPrice(total)}`;

  whatsapp.href =
    "https://wa.me/213797072478?text=" +
    encodeURIComponent(
      "السلام عليكم، أريد الطلب من ARVEA by Mohamed:\n\n" +
      cart.map((product, index) =>
        `${index + 1}- ${product.name} — ${formatPrice(product.price)}`
      ).join("\n") +
      `\n\nالمجموع: ${formatPrice(total)}`
    );
}

renderProducts();
renderCart();

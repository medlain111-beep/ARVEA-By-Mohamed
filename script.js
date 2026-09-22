const products=[
 {id:1,name:"منتج عناية بالبشرة",cat:"skin",price:"—",tag:"عناية بالبشرة"},
 {id:2,name:"منتج عناية بالشعر",cat:"hair",price:"—",tag:"العناية بالشعر"},
 {id:3,name:"منتج للعناية بالجسم",cat:"body",price:"—",tag:"العناية بالجسم"},
 {id:4,name:"عطر ARVEA",cat:"perfume",price:"—",tag:"العطور"},
 {id:5,name:"منتج مميز",cat:"offers",price:"—",tag:"عرض خاص"},
 {id:6,name:"منتج جديد",cat:"skin",price:"—",tag:"جديد"},
 {id:7,name:"منتج جديد",cat:"body",price:"—",tag:"جديد"},
 {id:8,name:"منتج مميز",cat:"perfume",price:"—",tag:"مميز"}
];
let active="all",cart=[];
function filterProducts(cat){active=cat;renderProducts();document.getElementById("products").scrollIntoView({behavior:"smooth"})}
function renderProducts(){
 const q=(document.getElementById("search")?.value||"").trim().toLowerCase();
 const list=products.filter(p=>(active==="all"||p.cat===active)&&(!q||p.name.toLowerCase().includes(q)||p.tag.toLowerCase().includes(q)));
 document.getElementById("productGrid").innerHTML=list.map(p=>`
 <article class="card"><div class="product-img">ARVEA</div><div class="card-body">
 <span class="tag">${p.tag}</span><h3>${p.name}</h3><div class="price">${p.price} دج</div>
 <button class="add" onclick="addToCart(${p.id})">أضف إلى السلة</button></div></article>`).join("");
}
function addToCart(id){const p=products.find(x=>x.id===id);cart.push(p);renderCart();document.getElementById("cartCount").textContent=cart.length}
function renderCart(){
 const box=document.getElementById("cartItems");
 if(!cart.length){box.textContent="السلة فارغة حاليًا.";return}
 box.innerHTML=cart.map((p,i)=>`<div class="cart-row"><span>${i+1}. ${p.name}</span><b>${p.price} دج</b></div>`).join("");
 const msg="السلام عليكم، أريد الطلب من ARVEA by Mohamed:%0A"+cart.map((p,i)=>`${i+1}- ${p.name}`).join("%0A");
 document.getElementById("whatsappBtn").href="https://wa.me/213797072478?text="+msg;
}
renderProducts();renderCart();

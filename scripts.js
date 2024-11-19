console.log("Welcome to ShopEase!");document.getElementById("login-form").addEventListener("submit",function(e){e.preventDefault();const email=document.getElementById("email").value.trim();const password=document.getElementById("password").value.trim();if(!email||!password){alert("Please fill in both fields.");return}if(email==="test@shop.com"&&password==="12345"){alert("Login successful!");window.location.href="products.html"}else{alert("Invalid email or password. Try again.")}});const cart=[];document.querySelectorAll(".add-to-cart-btn").forEach(button=>{button.addEventListener("click",function(){const productId=this.getAttribute("data-id");cart.push(productId);alert(`Product ${productId} added to cart!`);console.log(cart)})});const products={1:{name:"Product 1",price:10,img:"https://via.placeholder.com/150"},2:{name:"Product 2",price:20,img:"https://via.placeholder.com/150"},3:{name:"Product 3",price:30,img:"https://via.placeholder.com/150"}};let cart=JSON.parse(localStorage.getItem("cart"))||[];function displayCart(){const cartItemsContainer=document.getElementById("cart-items");const cartTotal=document.getElementById("cart-total");cartItemsContainer.innerHTML="";let total=0;cart.forEach(item=>{const product=products[item.id];const itemTotal=product.price*item.quantity;total+=itemTotal;const row=`
    <tr>
      <td><img src="${product.img}" alt="${product.name}"> ${product.name}</td>
      <td>$${product.price.toFixed(2)}</td>
      <td>
        <button class="qty-btn" onclick="updateQuantity(${item.id}, -1)">-</button>
        ${item.quantity}
        <button class="qty-btn" onclick="updateQuantity(${item.id}, 1)">+</button>
      </td>
      <td>$${itemTotal.toFixed(2)}</td>
      <td><button class="remove-btn" onclick="removeItem(${item.id})">Remove</button></td>
    </tr>
  `;cartItemsContainer.innerHTML+=row});cartTotal.textContent=total.toFixed(2)}function updateQuantity(id,delta){const item=cart.find(item=>item.id===id);if(item){item.quantity+=delta;if(item.quantity<=0){removeItem(id)}else{saveCart();displayCart()}}}function removeItem(id){cart=cart.filter(item=>item.id!==id);saveCart();displayCart()}function saveCart(){localStorage.setItem("cart",JSON.stringify(cart))}window.onload=function(){displayCart()};document.getElementById("checkout-btn").addEventListener("click",function(){alert("Checkout feature is under development!");cart=[];saveCart();displayCart()});document.getElementById("checkout-form").addEventListener("submit",function(e){e.preventDefault();const name=document.getElementById("name").value.trim();const email=document.getElementById("email").value.trim();const address=document.getElementById("address").value.trim();if(!name||!email||!address){alert("Please fill in all the fields.");return}sessionStorage.setItem("orderDetails",JSON.stringify(cart));sessionStorage.setItem("orderTotal",calculateTotal());alert(`Thank you for your order, ${name}!`);cart=[];saveCart();window.location.href="confirmation.html"});if(window.location.pathname.includes("confirmation.html")){const orderDetails=JSON.parse(sessionStorage.getItem("orderDetails"))||[];const orderTotal=sessionStorage.getItem("orderTotal")||"0.00";const orderDetailsContainer=document.getElementById("order-details");const orderTotalContainer=document.getElementById("order-total");orderDetailsContainer.innerHTML="";orderDetails.forEach(item=>{const product=products[item.id];const itemTotal=product.price*item.quantity;const row=`
    <tr>
      <td>${product.name}</td>
      <td>${item.quantity}</td>
      <td>$${itemTotal.toFixed(2)}</td>
    </tr>
  `;orderDetailsContainer.innerHTML+=row});orderTotalContainer.textContent=parseFloat(orderTotal).toFixed(2)}function calculateTotal(){return cart.reduce((total,item)=>{const product=products[item.id];return total+product.price*item.quantity},0).toFixed(2)}const observerOptions={threshold:.2};const scrollObserver=new IntersectionObserver((entries,observer)=>{entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add("visible");observer.unobserve(entry.target)}})},observerOptions);document.querySelectorAll(".animatable").forEach(el=>{scrollObserver.observe(el)});function showNotification(message,type="info"){const notificationContainer=document.getElementById("notification-container");const notification=document.createElement("div");notification.classList.add("notification",type);notification.textContent=message;notificationContainer.appendChild(notification);setTimeout(()=>{notification.remove()},4e3)}function addToCart(productId){const product=products[productId];const existingItem=cart.find(item=>item.id===productId);if(existingItem){existingItem.quantity+=1;showNotification(`${product.name} quantity updated in cart.`,"info")}else{cart.push({id:productId,quantity:1});showNotification(`${product.name} added to cart!`,"success")}saveCart();updateCartCount()}function removeFromCart(productId){const productIndex=cart.findIndex(item=>item.id===productId);if(productIndex!==-1){const product=products[cart[productIndex].id];cart.splice(productIndex,1);showNotification(`${product.name} removed from cart.`,"error")}saveCart();displayCart()}document.getElementById("checkout-form").addEventListener("submit",function(e){e.preventDefault();const name=document.getElementById("name").value.trim();const email=document.getElementById("email").value.trim();const address=document.getElementById("address").value.trim();if(!name||!email||!address){showNotification("Please fill in all the fields.","error");return}sessionStorage.setItem("orderDetails",JSON.stringify(cart));sessionStorage.setItem("orderTotal",calculateTotal());showNotification("Order placed successfully!","success");cart=[];saveCart();window.location.href="confirmation.html"});const menuToggle=document.getElementById("menu-toggle");const navLinks=document.querySelector(".nav-links");menuToggle.addEventListener("click",()=>{navLinks.classList.toggle("hidden")});let lazyLoaded=false;window.addEventListener("scroll",()=>{const scrollTop=window.scrollY+window.innerHeight;const docHeight=document.documentElement.scrollHeight;if(!lazyLoaded&&scrollTop>docHeight-100){loadMoreProducts();lazyLoaded=true}});function loadMoreProducts(){const productSection=document.querySelector(".product-section");for(let i=0;i<5;i++){const productCard=document.createElement("div");productCard.classList.add("product-card");productCard.innerHTML=`
  <img src="lazy-product-${i+1}.jpg" alt="Product ${i+1}" loading="lazy">
  <h3>Product ${i+1}</h3>
  <p>$${(i+1)*10}.00</p>
  <button class="add-to-cart-btn">Add to Cart</button>
`;productSection.appendChild(productCard)}}
// Add to Cart and Redirect
function addToCartAndRedirect(productId) {
    addToCart(productId); // Add product to cart
    window.location.href = 'cart.html'; // Redirect to cart page
  }
  
  // Attach Event Listener to Buttons
  document.querySelectorAll('.add-to-cart-btn').forEach(button => {
    button.addEventListener('click', function () {
      const productId = this.dataset.id; // Get product ID from button data
      addToCartAndRedirect(productId);
    });
  });
  // Debugging - Test if Script Works
console.log("Scripts loaded!");

// Attach Event Listener to Add to Cart Buttons
document.querySelectorAll('.add-to-cart-btn').forEach(button => {
  button.addEventListener('click', function () {
    const productId = this.dataset.id; // Get product ID from button data
    console.log(`Button clicked! Product ID: ${productId}`);
    alert(`Add to Cart clicked for Product ID: ${productId}`);
    addToCart(productId); // Add to cart
    window.location.href = 'cart.html'; // Redirect to cart
  });
});
// Example product data
const products = {
    1: { name: "Product 1", price: 10 },
    2: { name: "Product 2", price: 15 },
    3: { name: "Product 3", price: 20 },
  };
  
  // Cart Array
  let cart = JSON.parse(localStorage.getItem('cart')) || [];
  
  // Save Cart to Local Storage
  function saveCart() {
    localStorage.setItem('cart', JSON.stringify(cart));
  }
  
  // Add Product to Cart
  function addToCart(productId) {
    const product = products[productId];
    const existingItem = cart.find(item => item.id == productId);
  
    if (existingItem) {
      existingItem.quantity += 1; // Increment quantity if already in cart
    } else {
      cart.push({ id: productId, name: product.name, price: product.price, quantity: 1 });
    }
  
    saveCart(); // Save updated cart
    alert(`${product.name} added to cart!`); // Feedback
  }
  
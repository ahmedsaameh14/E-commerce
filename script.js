// Fetch API
async function getProducts() {
  try {
    const response = await fetch("https://fakestoreapi.com/products");
    const products = await response.json();
    console.log(products);

    const cart = [];
    let totalPrice = 0;
    let totalQuantity = 0;

    // INIT
    const productsDiv = document.getElementById("products");
    const cartDiv = document.getElementById("cart");
    const totalPriceDiv = document.getElementById("totalPrice");
    const totalQuantityDiv = document.getElementById("totalQuantity");




    // const searchInput = document.getElementById("searchInput");

    // Added products to web page
    products.forEach((product, index) => {
      const div = document.createElement("div");
      div.className = "product-card";
      div.innerHTML = `
        <img src="${product.image}" alt="${product.title}">
        <div class="title"> <h3>${product.title}</h3> </div>
        <p>$ ${product.price}</p>
        <p>Rate: ${product.rating.rate}⭐</p>
        <p>Count: ${product.rating.count}</p>
        <button onclick="addToCart(${index})">Add to Cart</button>
        <button onclick="moreDetails(${index})">More Details</button>
      `;
      productsDiv.appendChild(div);
    });

    // Add to Cart
      window.addToCart =function(index) {
      const productInCart = products[index];
      cart.push(productInCart);
      totalPrice += productInCart.price;
      totalQuantity = cart.length;
      updateCart();
    }

    // Update Cart 
    function updateCart() {
      cartDiv.innerHTML = `
      <h2>Cart</h2>
      <div id="totalQuantity">Total Quantity : ${totalQuantity}</div>
      <div id="totalPrice">Total Price : $${totalPrice}</div>`;
      cart.forEach(item => {
        const div = document.createElement('div');
        div.className = 'cart-item';
        div.innerHTML = `
          
          <p>${item.title}</p>
          <p>$${item.price}</p>
        `;
        cartDiv.appendChild(div);
      });

      totalPriceDiv.textContent = `Total Price: $${totalPrice}`;
      totalQuantityDiv.textContent = `Total Quantity : ${totalQuantity}`;
    }


  } catch (error) {
    console.error("Error fetching user:", error);
  }
}

getProducts();

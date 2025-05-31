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
    const popUpPage = document.getElementById("popUp");
    const dropback = document.getElementById("dropback");
    const searchBar = document.getElementById("searchInput");
    const categoryBar = document.getElementById("selectCategory");
    const sortBar = document.getElementById("selectSort");
    const filterBtn = document.getElementById("filter");
    const minPriceBar = document.getElementById("minPrice");
    const maxPriceBar = document.getElementById("maxPrice");

    // Added products to web page
    products.forEach((product, index) => {
      const div = document.createElement("div");
      div.className = "product-card";
      div.innerHTML = `
        <img src="${product.image}" alt="${product.title}">
        <div class="title"> <h3>${product.title}</h3> </div>
        <p>$ ${product.price}</p>
        <p>Rate: ${product.rating.rate}⭐ (${product.rating.count})</p>
        <button onclick="addToCart(${index})">Add to Cart</button>
        <button onclick="moreDetails(${index})">More Details</button>
      `;
      productsDiv.appendChild(div);
    });

    // Add to Cart
    window.addToCart = function (index) {
      const productInCart = products[index];
      cart.push(productInCart);
      totalPrice += productInCart.price;
      totalQuantity = cart.length;
      updateCart();
    };

    // Update Cart
    function updateCart() {
      cartDiv.innerHTML = `
        <h2>Cart</h2>
        <div id="totalQuantity">Total Quantity : ${totalQuantity}</div>
        <div id="totalPrice">Total Price : $${totalPrice.toFixed(2)}</div>
      `;
      cart.forEach((item, index) => {
        const div = document.createElement("div");
        div.className = "cart-products";
        div.innerHTML = `
          <img src="${item.image}" alt="${item.title}">
          <p>${item.title}</p>
          <p>$${item.price}</p>
          <button onclick="removeProduct(${index})">Remove</button>
        `;
        cartDiv.appendChild(div);
      });
    }

    // Remove from Cart
    window.removeProduct = function (index) {
      totalPrice -= cart[index].price;
      cart.splice(index, 1);
      totalQuantity = cart.length;
      updateCart();
    };

    // More Details Popup
    window.moreDetails = function (index) {
      const product = products[index];
      popUpPage.innerHTML = `
      <div class="popup-content">
      <span class="close-btn" id="closePopup">&times;</span>
      <img src="${product.image}" alt="${product.title}">
      <h2>${product.title}</h2>
      <p><strong>Category:</strong> ${product.category}</p>
      <p><strong>Description:</strong> ${product.description}</p>
      <p><strong>Price:</strong> $${product.price}</p>
      <p><strong>Rating:</strong> ${product.rating.rate} ⭐</p>
      </div>
      `;
      // Show popup
      popUpPage.classList.add("active");
      dropback.classList.add("active");
      // Add close logic
      document.getElementById("closePopup").onclick = () => {
        popUpPage.classList.remove("active");
        dropback.classList.remove("active");
      };
    };
    // Close if user clicks outside popup
    dropback.addEventListener("click", () => {
      popUpPage.classList.remove("active");
      dropback.classList.remove("active");
    });

    // Sort products based on selected criteria
    function sortProducts(products, criteria) {
      const sortArr = [...products];

      switch (criteria) {
        case "name":
          sortArr.sort((a, b) => a.title.localeCompare(b.title));
          break;
        case "price":
          sortArr.sort((a, b) => a.price - b.price);
          break;
        case "rating":
          sortArr.sort((a, b) => b.rating.rate - a.rating.rate);
          break;
      }

      return sortArr;
    }

    // Filtering
    filterBtn.addEventListener('click', () => {
      const searchValue = searchBar.value.toLowerCase();
      const categoryValue = categoryBar.value;
      const sortBy = sortBar.value;
      const minPrice = parseFloat(minPriceBar.value);
      const maxPrice = parseFloat(maxPriceBar.value);

      const filter = products.filter(product => {
        const matchSearch = product.title.toLowerCase().includes(searchValue);
        const matchCategory = categoryValue === "all" || product.category === categoryValue;
        const matchMin = isNaN(minPrice) || product.price >= minPrice;
        const matchMax = isNaN(maxPrice) || product.price <= maxPrice;
        return matchSearch && matchCategory && matchMin && matchMax;
      });
      const sorted = sortProducts(filter, sortBy);

      productsDiv.innerHTML = '';
      sorted.forEach(product => {
        const div = document.createElement("div");
        div.className = "product-card";
        div.innerHTML = `
        <img src="${product.image}" alt="${product.title}">
        <div class="title"> <h3>${product.title}</h3> </div>
        <p>$ ${product.price}</p>
        <p>Rate: ${product.rating.rate}⭐ (${product.rating.count})</p>
        <button onclick="addToCart(${products.indexOf(product)})">Add to Cart</button>
        <button onclick="moreDetails(${products.indexOf(product)})">More Details</button>
      `;
        productsDiv.appendChild(div);
      });
    });



  } catch (error) {
    console.error("Error fetching user:", error);
  }
}

getProducts();

async function getProducts() {
  try {
    const response = await fetch("https://fakestoreapi.com/products");
    const products = await response.json();
    console.log(products);

    const productsDiv = document.getElementById("products");

    products.forEach((product, index) => {
      const div = document.createElement("div");
      div.className = "product-card";
      div.innerHTML = `
        <img src="${product.image}" alt="${product.title}">
        <h3>${product.title}</h3>
        <p>$ ${product.price}</p>
        <p>Rate: ${product.rating.rate}⭐</p>
        <p>Count: ${product.rating.count}</p>
        <button onclick="addToCart(${index})">Add to Cart</button>
        <button onclick="addToCart(${index})">More Details</button>
      `;
      productsDiv.appendChild(div);
    });

  } catch (error) {
    console.error("Error fetching user:", error);
  }
}

getProducts();

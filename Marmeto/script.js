// Handle anchor clicks
document.querySelectorAll('.tab').forEach(tab => {
    tab.addEventListener('click', function (event) {
        event.preventDefault();
        const category = this.getAttribute('href').substring(1); // Remove the '#' symbol
        showProducts(category);
    });
});

// Initial display
showProducts('men');

function showProducts(category) {
    // Fetch data from the provided link
    
    fetch('https://cdn.shopify.com/s/files/1/0564/3685/0790/files/multiProduct.json')
        .then(response => response.json())
        .then(data => {
            // Find the category in the data
            console.log(data);
            const categoryData = data.categories.find(cat => {
                return cat.category_name.toLowerCase() === category.toLowerCase()
            });
            // console.log(categoryData);

            // Hide all product cards
            document.querySelectorAll('.product-wrapper').forEach(card => {
                card.style.display = 'none';
            });

            // Show the selected product card
            console.log(`#product${category[0].toUpperCase() + category.slice(1)}`);

            const productWrapper = document.querySelector(`#product${category[0].toUpperCase() + category.slice(1)}`);
            console.log(productWrapper);
            productWrapper.style.display = 'block';
            productWrapper.innerHTML = ''; // Clear previous content

            // Display products in the selected category
            const productCard = document.querySelector('.product-card');
            productCard.innerHTML = '';
            console.log(categoryData);
            categoryData.category_products.forEach(product => {
                const productDiv = document.createElement('div');
                productDiv.classList.add('card');
                productDiv.innerHTML = `
                    <div
                        style="position: relative; width: 100%; overflow: hidden; height: 25rem;"
                    >
                        <img style="position: absolute; width: 100%; object-fit: contain;" src="${product.image}" alt="Product Image">
                    </div>
                    <span class="badge">${product.badge_text !== null ? product.badge_text : '' }</span>
                    <div 
                        style="display:flex; align-items:center; justify-content:space-between;"
                    >
                        <h3 style="white-space: nowrap; overflow: hidden; text-overflow: ellipsis; max-width: 150px;">${product.title}</h3>
                        <p class="big-dot">  ${product.vendor}</p>
                    </div>
                    <div
                        style="display:flex; align-items:center; justify-content:space-between;"
                    >
                        <div style="font-weight: bold;">Rs $${product.price}</div>
                        <div style="text-decoration: line-through; color: #444"> $${product.compare_at_price}</div>
                        <div style="color: red"> 50% Off </div>
                    </div>
                    <button onclick="addToCart('${category}')">Add to Cart</button>
                `;
                productCard.appendChild(productDiv);
            });

            productWrapper.appendChild(productCard)
            // Calculate and display percentage off
            // document.querySelector(`#percentOff${category.charAt(0).toUpperCase() + category.slice(1)}`).innerText = '';
        })
        .catch(error => console.error('Error fetching data:', error));
}

function addToCart(category) {
    // Add to cart logic here
    alert(`Product in ${category} category added to cart!`);
}
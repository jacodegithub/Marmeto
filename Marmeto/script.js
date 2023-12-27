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
            document.querySelectorAll('.product-card').forEach(card => {
                card.style.display = 'block';
            });

            // Show the selected product card
            console.log(`#product${category[0].toUpperCase() + category.slice(1)}`);
            const productCard = document.querySelector(`#product${category[0].toUpperCase() + category.slice(1)}`);
            productCard.innerHTML = ''; // Clear previous content

            // Display products in the selected category
            console.log(categoryData);
            categoryData.category_products.forEach(product => {
                const productDiv = document.createElement('div');
                productDiv.classList.add('card');
                productDiv.innerHTML = `
                    <img src="${product.image}" alt="Product Image">
                    <span class="badge">${product.badge_text}</span>
                    <h3>${product.title}</h3>
                    <p>Vendor: ${product.vendor}</p>
                    <p>Price: $${product.price}</p>
                    <p>Compare at Price: $${product.compare_at_price}</p>
                    <button onclick="addToCart('${category}')">Add to Cart</button>
                `;
                productCard.appendChild(productDiv);
            });

            // Calculate and display percentage off
            // document.querySelector(`#percentOff${category.charAt(0).toUpperCase() + category.slice(1)}`).innerText = '';
        })
        .catch(error => console.error('Error fetching data:', error));
}

function addToCart(category) {
    // Add to cart logic here
    alert(`Product in ${category} category added to cart!`);
}
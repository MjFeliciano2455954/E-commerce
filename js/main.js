// Mock Product Data (Simulated Database)
const products = [
  { id: '1', name: 'The Aurelia Dress', price: 50, category: 'Formal', image: '1.jpeg', desc: 'A timeless silhouette for special occasions.' },
    { id: '2', name: 'Ethereal Tulle', price: 65, category: 'Mini', image: '2.jpeg', desc: 'Lightweight and elegant evening dress.' },
      { id: '3', name: 'Velvet Nocturne', price: 75, category: 'Maxi', image: 'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=500', desc: 'Deep velvet fabric with sophisticated cut.' },
        { id: '4', name: 'Rose Cocktail', price: 45, category: 'Mini', image: 'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=500', desc: 'Charming outfit for parties and casual events.' }
        ];

        // LocalStorage State Management
        let cart = JSON.parse(localStorage.getItem('cart')) || [];

        function updateCartCount() {
          const countEl = document.getElementById('cart-count');
            if (countEl) {
                const totalQty = cart.reduce((sum, item) => sum + item.quantity, 0);
                    countEl.textContent = totalQty;
                      }
                      }

                      function saveCart() {
                        localStorage.setItem('cart', JSON.stringify(cart));
                          updateCartCount();
                          }

                          function addToCart(productId) {
                            const product = products.find(p => p.id === productId);
                              if (!product) return;
                                
                                  const existingIndex = cart.findIndex(item => item.id === productId);
                                    if (existingIndex > -1) {
                                        cart[existingIndex].quantity += 1;
                                          } else {
                                              cart.push({ ...product, quantity: 1 });
                                                }
                                                  
                                                    saveCart();
                                                      alert(`${product.name} added to cart!`);
                                                      }

                                                      // Render Products for Shop Page (PLP)
                                                      function renderShopProducts(items) {
                                                        const container = document.getElementById('product-container');
                                                          if (!container) return;

                                                            if (items.length === 0) {
                                                                container.innerHTML = '<p>No products found matching your search.</p>';
                                                                    return;
                                                                      }

                                                                        container.innerHTML = items.map(p => `
                                                                            <article class="card">
                                                                                  <img src="${p.image}" alt="${p.name}" loading="lazy">
                                                                                        <div class="card-body">
                                                                                                <h3 class="card-title">${p.name}</h3>
                                                                                                        <p class="card-price">$${p.price}.00</p>
                                                                                                                <button class="btn-primary" onclick="addToCart('${p.id}')">Add to Cart</button>
                                                                                                                        <a href="product.html?id=${p.id}" style="text-align:center; margin-top:0.5rem; color:var(--text-muted);">View Details</a>
                                                                                                                              </div>
                                                                                                                                  </article>
                                                                                                                                    `).join('');
                                                                                                                                    }

                                                                                                                                    // Filter and Search Logic
                                                                                                                                    function setupSearchAndFilter() {
                                                                                                                                      const searchInput = document.getElementById('search-input');
                                                                                                                                        const categoryFilter = document.getElementById('category-filter');
                                                                                                                                          
                                                                                                                                            if (!searchInput || !categoryFilter) return;

                                                                                                                                              function applyFilters() {
                                                                                                                                                  const query = searchInput.value.toLowerCase();
                                                                                                                                                      const cat = categoryFilter.value;

                                                                                                                                                          const filtered = products.filter(p => {
                                                                                                                                                                const matchesSearch = p.name.toLowerCase().includes(query);
                                                                                                                                                                      const matchesCat = cat === 'all' || p.category === cat;
                                                                                                                                                                            return matchesSearch && matchesCat;
                                                                                                                                                                                });

                                                                                                                                                                                    renderShopProducts(filtered);
                                                                                                                                                                                      }

                                                                                                                                                                                        searchInput.addEventListener('input', applyFilters);
                                                                                                                                                                                          categoryFilter.addEventListener('change', applyFilters);
                                                                                                                                                                                          }

                                                                                                                                                                                          // Render Product Detail Page (PDP)
                                                                                                                                                                                          function renderPDP() {
                                                                                                                                                                                            const container = document.getElementById('pdp-container');
                                                                                                                                                                                              if (!container) return;

                                                                                                                                                                                                const params = new URLSearchParams(window.location.search);
                                                                                                                                                                                                  const productId = params.get('id') || '1';
                                                                                                                                                                                                    const product = products.find(p => p.id === productId) || products[0];

                                                                                                                                                                                                      container.innerHTML = `
                                                                                                                                                                                                          <div style="display:flex; gap:2rem; flex-wrap:wrap; background:white; padding:2rem; border-radius:12px;">
                                                                                                                                                                                                                <img src="${product.image}" alt="${product.name}" style="max-width:400px; width:100%; border-radius:8px;">
                                                                                                                                                                                                                      <div style="flex:1;">
                                                                                                                                                                                                                              <h2>${product.name}</h2>
                                                                                                                                                                                                                                      <p style="font-size:1.5rem; font-weight:bold; color:var(--primary-color); margin:1rem 0;">$${product.price}.00</p>
                                                                                                                                                                                                                                              <p>${product.desc}</p>
                                                                                                                                                                                                                                                      <br>
                                                                                                                                                                                                                                                              <button class="btn-primary" style="max-width:200px;" onclick="addToCart('${product.id}')">Add to Cart</button>
                                                                                                                                                                                                                                                                    </div>
                                                                                                                                                                                                                                                                        </div>
                                                                                                                                                                                                                                                                          `;
                                                                                                                                                                                                                                                                          }

                                                                                                                                                                                                                                                                          // Initialization on DOM Load
                                                                                                                                                                                                                                                                          document.addEventListener('DOMContentLoaded', () => {
                                                                                                                                                                                                                                                                            updateCartCount();
                                                                                                                                                                                                                                                                              renderShopProducts(products);
                                                                                                                                                                                                                                                                                setupSearchAndFilter();
                                                                                                                                                                                                                                                                                  renderPDP();
                                                                                                                                                                                                                                                                                  });
                                                                                                                                                                                                                                                                                  
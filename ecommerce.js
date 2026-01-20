// E-commerce Functionality for Bhilai Shopping Store

// Global state management
let currentUser = null;
let currentPage = 'home';
let currentFilters = {
  category: '',
  priceRange: { min: 0, max: 20000 },
  rating: [],
  search: ''
};
let currentSort = 'name';
let currentProductId = null;
let cartItems = [];
let wishlistItems = [];

// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
  initializeApp();
});

function initializeApp() {
  loadUserData();
  loadCartData();
  loadWishlistData();
  setupEventListeners();
  renderHomePage();
  // Don't hide loading screen here - let Three.js handle it
  // hideLoadingScreen();
}

// Load data from localStorage
function loadUserData() {
  const userData = localStorage.getItem('bhilaiStore_user');
  if (userData) {
    currentUser = JSON.parse(userData);
    updateUserUI();
  }
}

function loadCartData() {
  const cartData = localStorage.getItem('bhilaiStore_cart');
  if (cartData) {
    cartItems = JSON.parse(cartData);
    updateCartCount();
  }
}

function loadWishlistData() {
  const wishlistData = localStorage.getItem('bhilaiStore_wishlist');
  if (wishlistData) {
    wishlistItems = JSON.parse(wishlistData);
    updateWishlistCount();
  }
}

// Save data to localStorage
function saveUserData() {
  if (currentUser) {
    localStorage.setItem('bhilaiStore_user', JSON.stringify(currentUser));
  } else {
    localStorage.removeItem('bhilaiStore_user');
  }
}

function saveCartData() {
  localStorage.setItem('bhilaiStore_cart', JSON.stringify(cartItems));
}

function saveWishlistData() {
  localStorage.setItem('bhilaiStore_wishlist', JSON.stringify(wishlistItems));
}

// UI Update Functions
function updateUserUI() {
  const guestMenu = document.getElementById('guest-menu');
  const userInfo = document.getElementById('user-info');
  const userName = document.getElementById('user-name');

  if (currentUser) {
    guestMenu.style.display = 'none';
    userInfo.style.display = 'block';
    userName.textContent = `Hello, ${currentUser.name.split(' ')[0]}`;
  } else {
    guestMenu.style.display = 'block';
    userInfo.style.display = 'none';
  }
}

function updateCartCount() {
  const cartCount = document.getElementById('cart-count');
  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  cartCount.textContent = totalItems;
  cartCount.style.display = totalItems > 0 ? 'block' : 'none';
}

function updateWishlistCount() {
  const wishlistCount = document.getElementById('wishlist-count');
  wishlistCount.textContent = wishlistItems.length;
  wishlistCount.style.display = wishlistItems.length > 0 ? 'block' : 'none';
}

// Event Listeners Setup
function setupEventListeners() {
  // Navigation
  document.getElementById('search-btn').addEventListener('click', performSearch);
  document.getElementById('search-input').addEventListener('keypress', function(e) {
    if (e.key === 'Enter') performSearch();
  });
  document.getElementById('search-input').addEventListener('input', handleSearchInput);

  // Filters
  document.getElementById('filter-btn').addEventListener('click', toggleFilters);
  document.getElementById('close-filters').addEventListener('click', closeFilters);
  document.getElementById('apply-filters').addEventListener('click', applyFilters);
  document.getElementById('clear-filters').addEventListener('click', clearFilters);

  // Sort
  document.getElementById('sort-select').addEventListener('change', function(e) {
    currentSort = e.target.value;
    renderProductsPage();
  });

  // Price range
  document.getElementById('price-min').addEventListener('input', updatePriceDisplay);
  document.getElementById('price-max').addEventListener('input', updatePriceDisplay);

  // Modals
  document.querySelectorAll('.close-modal').forEach(btn => {
    btn.addEventListener('click', closeModals);
  });

  // Cart sidebar
  document.querySelector('.close-cart').addEventListener('click', closeCart);

  // Wishlist sidebar
  document.querySelector('.close-wishlist').addEventListener('click', closeWishlist);

  // Mobile menu
  document.querySelector('.nav-toggle').addEventListener('click', toggleMobileMenu);

  // Outside click for sidebars
  document.addEventListener('click', handleOutsideClick);
}

// Page Navigation
function showPage(pageName, productId = null) {
  // Hide all pages
  document.querySelectorAll('.page').forEach(page => {
    page.classList.remove('active');
  });

  // Show selected page
  document.getElementById(pageName + '-page').classList.add('active');

  // Update navigation
  document.querySelectorAll('.nav-link').forEach(link => {
    link.classList.remove('active');
  });

  currentPage = pageName;
  currentProductId = productId;

  // Render page content
  switch(pageName) {
    case 'home':
      renderHomePage();
      break;
    case 'products':
      renderProductsPage();
      break;
    case 'product-detail':
      renderProductDetailPage(productId);
      break;
    case 'cart':
      renderCartPage();
      break;
    case 'checkout':
      renderCheckoutPage();
      break;
    case 'dashboard':
      renderDashboardPage();
      break;
    case 'contact':
      renderContactPage();
      break;
  }

  // Close mobile menu if open
  closeMobileMenu();
}

// Home Page Rendering
function renderHomePage() {
  renderCategories();
  renderFeaturedProducts();
  renderFooterCategories();
}

function renderCategories() {
  const categoriesGrid = document.getElementById('categories-grid');
  categoriesGrid.innerHTML = '';

  productsData.categories.forEach(category => {
    const categoryCard = document.createElement('div');
    categoryCard.className = 'category-card';
    categoryCard.onclick = () => {
      currentFilters.category = category.id;
      showPage('products');
    };

    categoryCard.innerHTML = `
      <div class="category-icon">
        <i class="${category.icon}"></i>
      </div>
      <h3>${category.name}</h3>
      <p>${category.description}</p>
    `;

    categoriesGrid.appendChild(categoryCard);
  });
}

function renderFeaturedProducts() {
  const featuredProducts = getFeaturedProducts();
  const featuredContainer = document.getElementById('featured-products');
  featuredContainer.innerHTML = '';

  featuredProducts.forEach(product => {
    const productCard = createProductCard(product);
    featuredContainer.appendChild(productCard);
  });
}

function renderFooterCategories() {
  const footerCategories = document.getElementById('footer-categories');
  footerCategories.innerHTML = '';

  productsData.categories.forEach(category => {
    const li = document.createElement('li');
    li.innerHTML = `<a href="#" onclick="showPage('products'); currentFilters.category = '${category.id}'; renderProductsPage();">${category.name}</a>`;
    footerCategories.appendChild(li);
  });
}

// Products Page Rendering
function renderProductsPage() {
  renderCategoryFilters();
  renderProductsGrid();
  updatePriceDisplay();
}

function renderCategoryFilters() {
  const categoryFilters = document.getElementById('category-filters');
  categoryFilters.innerHTML = '';

  productsData.categories.forEach(category => {
    const label = document.createElement('label');
    label.innerHTML = `
      <input type="checkbox" value="${category.id}"
             ${currentFilters.category === category.id ? 'checked' : ''}>
      ${category.name}
    `;
    categoryFilters.appendChild(label);
  });
}

function renderProductsGrid() {
  const productsGrid = document.getElementById('products-grid');
  const filteredProducts = getFilteredProducts();
  const sortedProducts = sortProducts(filteredProducts);

  productsGrid.innerHTML = '';

  if (sortedProducts.length === 0) {
    productsGrid.innerHTML = `
      <div class="no-products">
        <i class="fas fa-search"></i>
        <h3>No products found</h3>
        <p>Try adjusting your filters or search terms</p>
      </div>
    `;
    return;
  }

  sortedProducts.forEach(product => {
    const productCard = createProductCard(product);
    productsGrid.appendChild(productCard);
  });
}

function createProductCard(product) {
  const productCard = document.createElement('div');
  productCard.className = 'product-card';

  const isInWishlist = wishlistItems.some(item => item.id === product.id);
  const isInCart = cartItems.some(item => item.id === product.id);

  productCard.innerHTML = `
    <div class="product-image">
      <img src="${product.images[0]}" alt="${product.name}" loading="lazy">
      <div class="product-actions">
        <button class="wishlist-btn ${isInWishlist ? 'active' : ''}"
                onclick="toggleWishlist(${product.id})">
          <i class="fas fa-heart"></i>
        </button>
        <button class="quick-view-btn" onclick="showQuickView(${product.id})">
          <i class="fas fa-eye"></i>
        </button>
      </div>
      ${product.discount > 0 ? `<div class="discount-badge">${product.discount}% OFF</div>` : ''}
    </div>
    <div class="product-info">
      <h3 class="product-title" onclick="showPage('product-detail', ${product.id})">${product.name}</h3>
      <div class="product-rating">
        ${generateStarRating(product.rating)}
        <span class="rating-count">(${product.reviews})</span>
      </div>
      <div class="product-price">
        ${product.originalPrice && product.originalPrice > product.price ?
          `<span class="original-price">₹${product.originalPrice}</span>` : ''}
        <span class="current-price">₹${product.price}</span>
        <span class="unit">${product.unit}</span>
      </div>
      <div class="product-stock ${product.stock > 0 ? 'in-stock' : 'out-of-stock'}">
        ${product.stock > 0 ? `${product.stock} in stock` : 'Out of stock'}
      </div>
      <button class="btn btn-primary add-to-cart-btn"
              onclick="addToCart(${product.id})"
              ${product.stock === 0 ? 'disabled' : ''}>
        ${isInCart ? 'Add More' : 'Add to Cart'}
      </button>
    </div>
  `;

  return productCard;
}

// Product Detail Page
function renderProductDetailPage(productId) {
  const product = getProductById(productId);
  if (!product) {
    showPage('products');
    return;
  }

  const productDetail = document.getElementById('product-detail');
  productDetail.innerHTML = `
    <div class="product-detail-layout">
      <div class="product-gallery">
        <div class="main-image">
          <img id="main-product-image" src="${product.images[0]}" alt="${product.name}">
        </div>
        <div class="thumbnail-images">
          ${product.images.map((image, index) =>
            `<img src="${image}" alt="${product.name}" onclick="changeMainImage('${image}')" class="${index === 0 ? 'active' : ''}">`
          ).join('')}
        </div>
      </div>

      <div class="product-details">
        <h1>${product.name}</h1>
        <div class="product-rating">
          ${generateStarRating(product.rating)}
          <span class="rating-count">(${product.reviews} reviews)</span>
        </div>

        <div class="product-price">
          ${product.originalPrice && product.originalPrice > product.price ?
            `<span class="original-price">₹${product.originalPrice}</span>` : ''}
          <span class="current-price">₹${product.price}</span>
          <span class="unit">${product.unit}</span>
          ${product.discount > 0 ? `<span class="discount">${product.discount}% OFF</span>` : ''}
        </div>

        <div class="product-stock ${product.stock > 0 ? 'in-stock' : 'out-of-stock'}">
          ${product.stock > 0 ? `✓ ${product.stock} in stock` : '✗ Out of stock'}
        </div>

        <div class="product-description">
          <h3>Description</h3>
          <p>${product.longDescription}</p>
        </div>

        ${product.specifications ? `
          <div class="product-specifications">
            <h3>Specifications</h3>
            <ul>
              ${Object.entries(product.specifications).map(([key, value]) =>
                `<li><strong>${key}:</strong> ${value}</li>`
              ).join('')}
            </ul>
          </div>
        ` : ''}

        <div class="product-actions">
          <div class="quantity-selector">
            <button onclick="updateQuantity(-1)">-</button>
            <input type="number" id="quantity-input" value="1" min="1" max="${product.stock}">
            <button onclick="updateQuantity(1)">+</button>
          </div>
          <button class="btn btn-primary" onclick="addToCart(${product.id}, parseInt(document.getElementById('quantity-input').value))">
            Add to Cart - ₹${product.price}
          </button>
          <button class="btn btn-secondary wishlist-btn" onclick="toggleWishlist(${product.id})">
            <i class="fas fa-heart"></i> Add to Wishlist
          </button>
        </div>
      </div>
    </div>

    <div class="product-reviews">
      <h3>Customer Reviews</h3>
      <div class="reviews-list">
        ${product.reviews.map(review => `
          <div class="review-item">
            <div class="review-header">
              <strong>${review.user}</strong>
              <div class="review-rating">
                ${generateStarRating(review.rating)}
              </div>
            </div>
            <p>${review.comment}</p>
            <small>${review.date}</small>
          </div>
        `).join('')}
      </div>
    </div>
  `;
}

// Cart Functions
function addToCart(productId, quantity = 1) {
  const product = getProductById(productId);
  if (!product || product.stock === 0) return;

  const existingItem = cartItems.find(item => item.id === productId);

  if (existingItem) {
    existingItem.quantity += quantity;
    if (existingItem.quantity > product.stock) {
      existingItem.quantity = product.stock;
    }
  } else {
    cartItems.push({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.images[0],
      quantity: quantity,
      stock: product.stock
    });
  }

  saveCartData();
  updateCartCount();
  showNotification(`Added ${product.name} to cart!`, 'success');

  if (document.getElementById('cart-sidebar').classList.contains('active')) {
    renderCartSidebar();
  }
}

function removeFromCart(productId) {
  cartItems = cartItems.filter(item => item.id !== productId);
  saveCartData();
  updateCartCount();
  renderCartPage();
  renderCartSidebar();
}

function updateCartQuantity(productId, newQuantity) {
  const item = cartItems.find(item => item.id === productId);
  if (item) {
    item.quantity = Math.max(1, Math.min(newQuantity, item.stock));
    saveCartData();
    updateCartCount();
    renderCartPage();
    renderCartSidebar();
  }
}

function showCart() {
  renderCartSidebar();
  document.getElementById('cart-sidebar').classList.add('active');
}

function closeCart() {
  document.getElementById('cart-sidebar').classList.remove('active');
}

function renderCartSidebar() {
  const cartItemsContainer = document.getElementById('cart-items');
  const cartFooter = document.getElementById('cart-footer');

  if (cartItems.length === 0) {
    cartItemsContainer.innerHTML = `
      <div class="empty-cart">
        <i class="fas fa-shopping-cart"></i>
        <p>Your cart is empty</p>
        <button class="btn btn-primary" onclick="showPage('products'); closeCart();">Continue Shopping</button>
      </div>
    `;
    cartFooter.innerHTML = '';
    return;
  }

  cartItemsContainer.innerHTML = cartItems.map(item => `
    <div class="cart-item">
      <img src="${item.image}" alt="${item.name}">
      <div class="cart-item-info">
        <h4>${item.name}</h4>
        <div class="cart-item-price">₹${item.price}</div>
        <div class="cart-item-quantity">
          <button onclick="updateCartQuantity(${item.id}, ${item.quantity - 1})">-</button>
          <span>${item.quantity}</span>
          <button onclick="updateCartQuantity(${item.id}, ${item.quantity + 1})">+</button>
        </div>
      </div>
      <button class="remove-item" onclick="removeFromCart(${item.id})">
        <i class="fas fa-trash"></i>
      </button>
    </div>
  `).join('');

  const total = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  cartFooter.innerHTML = `
    <div class="cart-total">
      <strong>Total: ₹${total}</strong>
    </div>
    <button class="btn btn-primary" onclick="showPage('cart'); closeCart();">View Cart</button>
    <button class="btn btn-secondary" onclick="showPage('checkout'); closeCart();">Checkout</button>
  `;
}

// Wishlist Functions
function toggleWishlist(productId) {
  const index = wishlistItems.findIndex(item => item.id === productId);

  if (index > -1) {
    wishlistItems.splice(index, 1);
    showNotification('Removed from wishlist', 'info');
  } else {
    const product = getProductById(productId);
    wishlistItems.push({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.images[0],
      rating: product.rating
    });
    showNotification('Added to wishlist!', 'success');
  }

  saveWishlistData();
  updateWishlistCount();

  // Re-render current page if needed
  if (currentPage === 'products') {
    renderProductsGrid();
  }
}

function showWishlist() {
  renderWishlistSidebar();
  document.getElementById('wishlist-sidebar').classList.add('active');
}

function closeWishlist() {
  document.getElementById('wishlist-sidebar').classList.remove('active');
}

function renderWishlistSidebar() {
  const wishlistItemsContainer = document.getElementById('wishlist-items');

  if (wishlistItems.length === 0) {
    wishlistItemsContainer.innerHTML = `
      <div class="empty-wishlist">
        <i class="fas fa-heart"></i>
        <p>Your wishlist is empty</p>
        <button class="btn btn-primary" onclick="showPage('products'); closeWishlist();">Browse Products</button>
      </div>
    `;
    return;
  }

  wishlistItemsContainer.innerHTML = wishlistItems.map(item => `
    <div class="wishlist-item">
      <img src="${item.image}" alt="${item.name}">
      <div class="wishlist-item-info">
        <h4 onclick="showPage('product-detail', ${item.id}); closeWishlist();">${item.name}</h4>
        <div class="wishlist-item-price">₹${item.price}</div>
        <div class="wishlist-item-rating">
          ${generateStarRating(item.rating)}
        </div>
      </div>
      <div class="wishlist-item-actions">
        <button class="btn btn-sm" onclick="addToCart(${item.id}); closeWishlist();">
          <i class="fas fa-cart-plus"></i>
        </button>
        <button class="btn btn-sm remove-wishlist" onclick="toggleWishlist(${item.id})">
          <i class="fas fa-trash"></i>
        </button>
      </div>
    </div>
  `).join('');
}

// Utility Functions
function generateStarRating(rating) {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 !== 0;
  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

  return `
    ${'<i class="fas fa-star"></i>'.repeat(fullStars)}
    ${hasHalfStar ? '<i class="fas fa-star-half-alt"></i>' : ''}
    ${'<i class="far fa-star"></i>'.repeat(emptyStars)}
  `;
}

function getFilteredProducts() {
  let filtered = productsData.products;

  // Category filter
  if (currentFilters.category) {
    filtered = filtered.filter(product => product.category === currentFilters.category);
  }

  // Price range filter
  filtered = filtered.filter(product =>
    product.price >= currentFilters.priceRange.min &&
    product.price <= currentFilters.priceRange.max
  );

  // Rating filter
  if (currentFilters.rating.length > 0) {
    filtered = filtered.filter(product =>
      currentFilters.rating.some(rating => product.rating >= parseInt(rating))
    );
  }

  // Search filter
  if (currentFilters.search) {
    const searchTerm = currentFilters.search.toLowerCase();
    filtered = filtered.filter(product =>
      product.name.toLowerCase().includes(searchTerm) ||
      product.description.toLowerCase().includes(searchTerm) ||
      product.tags.some(tag => tag.toLowerCase().includes(searchTerm))
    );
  }

  return filtered;
}

function sortProducts(products) {
  return products.sort((a, b) => {
    switch (currentSort) {
      case 'price-low':
        return a.price - b.price;
      case 'price-high':
        return b.price - a.price;
      case 'rating':
        return b.rating - a.rating;
      case 'newest':
        return b.id - a.id; // Assuming higher ID = newer
      default:
        return a.name.localeCompare(b.name);
    }
  });
}

function performSearch() {
  const query = document.getElementById('search-input').value.trim();
  currentFilters.search = query;

  if (currentPage !== 'products') {
    showPage('products');
  } else {
    renderProductsGrid();
  }
}

function handleSearchInput() {
  const query = document.getElementById('search-input').value.trim();
  const resultsContainer = document.getElementById('search-results');

  if (query.length < 2) {
    resultsContainer.style.display = 'none';
    return;
  }

  const results = searchProducts(query).slice(0, 5);
  resultsContainer.innerHTML = '';

  if (results.length > 0) {
    results.forEach(product => {
      const resultItem = document.createElement('div');
      resultItem.className = 'search-result-item';
      resultItem.innerHTML = `
        <img src="${product.images[0]}" alt="${product.name}">
        <div class="search-result-info">
          <div class="search-result-name">${product.name}</div>
          <div class="search-result-price">₹${product.price}</div>
        </div>
      `;
      resultItem.onclick = () => {
        showPage('product-detail', product.id);
        document.getElementById('search-input').value = '';
        resultsContainer.style.display = 'none';
      };
      resultsContainer.appendChild(resultItem);
    });
    resultsContainer.style.display = 'block';
  } else {
    resultsContainer.style.display = 'none';
  }
}

// Additional functions would go here (authentication, checkout, etc.)
// For brevity, I'll implement the core functionality first

function showNotification(message, type = 'success') {
  // This function should already exist in shopping-store.js
  // If not, we'll need to add it
}

// hideLoadingScreen is defined in shopping-store.js

// Checkout Process Implementation
let checkoutStep = 1;
let checkoutData = {
  shipping: {},
  payment: {},
  order: {}
};

function renderCartPage() {
  if (cartItems.length === 0) {
    document.getElementById('cart-content').innerHTML = `
      <div class="empty-cart-page">
        <i class="fas fa-shopping-cart"></i>
        <h2>Your cart is empty</h2>
        <p>Add some products to get started!</p>
        <button class="btn btn-primary" onclick="showPage('products')">Continue Shopping</button>
      </div>
    `;
    return;
  }

  const cartContent = document.getElementById('cart-content');
  const total = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  cartContent.innerHTML = `
    <div class="cart-items-list">
      ${cartItems.map(item => `
        <div class="cart-page-item">
          <img src="${item.image}" alt="${item.name}">
          <div class="cart-page-item-info">
            <h3>${item.name}</h3>
            <p class="cart-page-price">₹${item.price} each</p>
            <div class="cart-page-quantity">
              <button onclick="updateCartQuantity(${item.id}, ${item.quantity - 1})">-</button>
              <span>${item.quantity}</span>
              <button onclick="updateCartQuantity(${item.id}, ${item.quantity + 1})">+</button>
            </div>
          </div>
          <div class="cart-page-item-total">
            <p>₹${item.price * item.quantity}</p>
            <button class="remove-btn" onclick="removeFromCart(${item.id})">
              <i class="fas fa-trash"></i>
            </button>
          </div>
        </div>
      `).join('')}
    </div>

    <div class="cart-summary">
      <div class="cart-totals">
        <div class="total-row">
          <span>Subtotal:</span>
          <span>₹${total}</span>
        </div>
        <div class="total-row">
          <span>Shipping:</span>
          <span>₹50</span>
        </div>
        <div class="total-row final-total">
          <span>Total:</span>
          <span>₹${total + 50}</span>
        </div>
      </div>
      <button class="btn btn-primary checkout-btn" onclick="showPage('checkout')">
        Proceed to Checkout
      </button>
      <button class="btn btn-secondary" onclick="showPage('products')">
        Continue Shopping
      </button>
    </div>
  `;
}

function renderCheckoutPage() {
  if (cartItems.length === 0) {
    showPage('cart');
    return;
  }

  const checkoutContent = document.getElementById('checkout-content');
  const total = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  // Step 1: Cart Review
  if (checkoutStep === 1) {
    checkoutContent.innerHTML = `
      <div class="checkout-step">
        <h2>Review Your Order</h2>
        <div class="checkout-items">
          ${cartItems.map(item => `
            <div class="checkout-item">
              <img src="${item.image}" alt="${item.name}">
              <div class="checkout-item-info">
                <h4>${item.name}</h4>
                <p>Quantity: ${item.quantity}</p>
                <p>Price: ₹${item.price * item.quantity}</p>
              </div>
            </div>
          `).join('')}
        </div>
        <div class="checkout-totals">
          <p>Subtotal: ₹${total}</p>
          <p>Shipping: ₹50</p>
          <h3>Total: ₹${total + 50}</h3>
        </div>
        <button class="btn btn-primary" onclick="nextCheckoutStep()">Continue to Shipping</button>
      </div>
    `;
  }

  // Step 2: Shipping Information
  else if (checkoutStep === 2) {
    checkoutContent.innerHTML = `
      <div class="checkout-step">
        <h2>Shipping Information</h2>
        <form id="shipping-form" class="checkout-form">
          <div class="form-row">
            <div class="form-group">
              <label for="first-name">First Name *</label>
              <input type="text" id="first-name" required>
            </div>
            <div class="form-group">
              <label for="last-name">Last Name *</label>
              <input type="text" id="last-name" required>
            </div>
          </div>
          <div class="form-group">
            <label for="email">Email Address *</label>
            <input type="email" id="email" required>
          </div>
          <div class="form-group">
            <label for="phone">Phone Number *</label>
            <input type="tel" id="phone" required>
          </div>
          <div class="form-group">
            <label for="address">Street Address *</label>
            <input type="text" id="address" required>
          </div>
          <div class="form-row">
            <div class="form-group">
              <label for="city">City *</label>
              <input type="text" id="city" required>
            </div>
            <div class="form-group">
              <label for="pincode">Pincode *</label>
              <input type="text" id="pincode" required>
            </div>
          </div>
          <div class="form-group">
            <label for="state">State *</label>
            <select id="state" required>
              <option value="">Select State</option>
              <option value="chhattisgarh">Chhattisgarh</option>
              <option value="maharashtra">Maharashtra</option>
              <option value="madhya-pradesh">Madhya Pradesh</option>
              <option value="odisha">Odisha</option>
            </select>
          </div>
          <div class="checkout-actions">
            <button type="button" class="btn btn-secondary" onclick="prevCheckoutStep()">Back</button>
            <button type="submit" class="btn btn-primary">Continue to Payment</button>
          </div>
        </form>
      </div>
    `;

    // Pre-fill form if user is logged in
    if (currentUser) {
      document.getElementById('first-name').value = currentUser.name.split(' ')[0] || '';
      document.getElementById('last-name').value = currentUser.name.split(' ')[1] || '';
      document.getElementById('email').value = currentUser.email || '';
      document.getElementById('phone').value = currentUser.phone || '';
      if (currentUser.address) {
        const addressParts = currentUser.address.split(', ');
        document.getElementById('address').value = addressParts[0] || '';
        document.getElementById('city').value = addressParts[1] || '';
      }
    }

    document.getElementById('shipping-form').addEventListener('submit', function(e) {
      e.preventDefault();
      if (validateShippingForm()) {
        saveShippingData();
        nextCheckoutStep();
      }
    });
  }

  // Step 3: Payment Information
  else if (checkoutStep === 3) {
    checkoutContent.innerHTML = `
      <div class="checkout-step">
        <h2>Payment Information</h2>
        <div class="payment-methods">
          <div class="payment-method active" data-method="card">
            <i class="fas fa-credit-card"></i>
            <span>Credit/Debit Card</span>
          </div>
          <div class="payment-method" data-method="upi">
            <i class="fas fa-mobile-alt"></i>
            <span>UPI</span>
          </div>
          <div class="payment-method" data-method="cod">
            <i class="fas fa-truck"></i>
            <span>Cash on Delivery</span>
          </div>
        </div>

        <form id="payment-form" class="checkout-form">
          <div id="card-payment" class="payment-details">
            <div class="form-row">
              <div class="form-group">
                <label for="card-number">Card Number *</label>
                <input type="text" id="card-number" placeholder="1234 5678 9012 3456" required>
              </div>
            </div>
            <div class="form-row">
              <div class="form-group">
                <label for="expiry">Expiry Date *</label>
                <input type="text" id="expiry" placeholder="MM/YY" required>
              </div>
              <div class="form-group">
                <label for="cvv">CVV *</label>
                <input type="text" id="cvv" placeholder="123" required>
              </div>
            </div>
            <div class="form-group">
              <label for="card-name">Name on Card *</label>
              <input type="text" id="card-name" required>
            </div>
          </div>

          <div id="upi-payment" class="payment-details" style="display: none;">
            <div class="form-group">
              <label for="upi-id">UPI ID *</label>
              <input type="text" id="upi-id" placeholder="yourname@upi" required>
            </div>
          </div>

          <div id="cod-payment" class="payment-details" style="display: none;">
            <p>You will pay ₹${total + 50} in cash when your order is delivered.</p>
          </div>

          <div class="checkout-actions">
            <button type="button" class="btn btn-secondary" onclick="prevCheckoutStep()">Back</button>
            <button type="submit" class="btn btn-primary">Place Order</button>
          </div>
        </form>
      </div>
    `;

    // Payment method switching
    document.querySelectorAll('.payment-method').forEach(method => {
      method.addEventListener('click', function() {
        document.querySelectorAll('.payment-method').forEach(m => m.classList.remove('active'));
        this.classList.add('active');

        document.querySelectorAll('.payment-details').forEach(detail => {
          detail.style.display = 'none';
        });
        document.getElementById(this.dataset.method + '-payment').style.display = 'block';
      });
    });

    document.getElementById('payment-form').addEventListener('submit', function(e) {
      e.preventDefault();
      if (validatePaymentForm()) {
        savePaymentData();
        nextCheckoutStep();
      }
    });
  }

  // Step 4: Order Confirmation
  else if (checkoutStep === 4) {
    const orderId = 'ORD' + Date.now();
    const orderDate = new Date().toLocaleDateString();

    checkoutContent.innerHTML = `
      <div class="checkout-step order-confirmation">
        <div class="success-icon">
          <i class="fas fa-check-circle"></i>
        </div>
        <h2>Order Placed Successfully!</h2>
        <div class="order-details">
          <div class="order-info">
            <p><strong>Order ID:</strong> ${orderId}</p>
            <p><strong>Order Date:</strong> ${orderDate}</p>
            <p><strong>Total Amount:</strong> ₹${total + 50}</p>
            <p><strong>Estimated Delivery:</strong> 3-5 business days</p>
          </div>
          <div class="delivery-info">
            <h3>Delivery Address</h3>
            <p>${checkoutData.shipping.firstName} ${checkoutData.shipping.lastName}</p>
            <p>${checkoutData.shipping.address}</p>
            <p>${checkoutData.shipping.city}, ${checkoutData.shipping.state} ${checkoutData.shipping.pincode}</p>
            <p>${checkoutData.shipping.phone}</p>
          </div>
        </div>
        <div class="order-actions">
          <button class="btn btn-primary" onclick="showPage('dashboard')">Track Order</button>
          <button class="btn btn-secondary" onclick="showPage('home')">Continue Shopping</button>
        </div>
      </div>
    `;

    // Save order to user's history
    saveOrder(orderId, orderDate, total + 50);

    // Clear cart and reset checkout
    cartItems = [];
    saveCartData();
    updateCartCount();
    checkoutStep = 1;
    checkoutData = { shipping: {}, payment: {}, order: {} };
  }

  updateCheckoutProgress();
}

function nextCheckoutStep() {
  if (checkoutStep < 4) {
    checkoutStep++;
    renderCheckoutPage();
  }
}

function prevCheckoutStep() {
  if (checkoutStep > 1) {
    checkoutStep--;
    renderCheckoutPage();
  }
}

function updateCheckoutProgress() {
  document.querySelectorAll('.progress-step').forEach(step => {
    const stepNum = parseInt(step.dataset.step);
    step.classList.toggle('active', stepNum <= checkoutStep);
    step.classList.toggle('completed', stepNum < checkoutStep);
  });
}

function validateShippingForm() {
  const required = ['first-name', 'last-name', 'email', 'phone', 'address', 'city', 'pincode', 'state'];
  let isValid = true;

  required.forEach(field => {
    const element = document.getElementById(field);
    if (!element.value.trim()) {
      element.style.borderColor = 'red';
      isValid = false;
    } else {
      element.style.borderColor = '#ddd';
    }
  });

  if (!isValid) {
    showNotification('Please fill in all required fields', 'error');
  }

  return isValid;
}

function validatePaymentForm() {
  const activeMethod = document.querySelector('.payment-method.active').dataset.method;
  let isValid = true;

  if (activeMethod === 'card') {
    const required = ['card-number', 'expiry', 'cvv', 'card-name'];
    required.forEach(field => {
      const element = document.getElementById(field);
      if (!element.value.trim()) {
        element.style.borderColor = 'red';
        isValid = false;
      } else {
        element.style.borderColor = '#ddd';
      }
    });
  } else if (activeMethod === 'upi') {
    const upiId = document.getElementById('upi-id');
    if (!upiId.value.trim()) {
      upiId.style.borderColor = 'red';
      isValid = false;
    } else {
      upiId.style.borderColor = '#ddd';
    }
  }

  if (!isValid) {
    showNotification('Please fill in all payment details', 'error');
  }

  return isValid;
}

function saveShippingData() {
  checkoutData.shipping = {
    firstName: document.getElementById('first-name').value,
    lastName: document.getElementById('last-name').value,
    email: document.getElementById('email').value,
    phone: document.getElementById('phone').value,
    address: document.getElementById('address').value,
    city: document.getElementById('city').value,
    pincode: document.getElementById('pincode').value,
    state: document.getElementById('state').value
  };
}

function savePaymentData() {
  const activeMethod = document.querySelector('.payment-method.active').dataset.method;
  checkoutData.payment = { method: activeMethod };

  if (activeMethod === 'card') {
    checkoutData.payment.details = {
      cardNumber: document.getElementById('card-number').value.slice(-4), // Only save last 4 digits
      expiry: document.getElementById('expiry').value,
      cardName: document.getElementById('card-name').value
    };
  } else if (activeMethod === 'upi') {
    checkoutData.payment.details = {
      upiId: document.getElementById('upi-id').value
    };
  }
}

function saveOrder(orderId, orderDate, total) {
  if (!currentUser) return;

  const order = {
    id: orderId,
    date: orderDate,
    items: [...cartItems],
    total: total,
    shipping: checkoutData.shipping,
    payment: checkoutData.payment,
    status: 'Processing'
  };

  if (!currentUser.orders) currentUser.orders = [];
  currentUser.orders.unshift(order);
  saveUserData();
}

// Implemented functions
function toggleFilters() {
  document.getElementById('filters-sidebar').classList.toggle('active');
}

function closeFilters() {
  document.getElementById('filters-sidebar').classList.remove('active');
}

function applyFilters() {
  const categoryCheckboxes = document.querySelectorAll('#category-filters input[type="checkbox"]:checked');
  const ratingCheckboxes = document.querySelectorAll('.rating-filters input[type="checkbox"]:checked');

  currentFilters.category = Array.from(categoryCheckboxes).map(cb => cb.value).join(',');
  currentFilters.rating = Array.from(ratingCheckboxes).map(cb => cb.value);

  currentFilters.priceRange.min = parseInt(document.getElementById('price-min').value);
  currentFilters.priceRange.max = parseInt(document.getElementById('price-max').value);

  renderProductsGrid();
  closeFilters();
}

function clearFilters() {
  document.querySelectorAll('#category-filters input[type="checkbox"]').forEach(cb => cb.checked = false);
  document.querySelectorAll('.rating-filters input[type="checkbox"]').forEach(cb => cb.checked = false);
  document.getElementById('price-min').value = 0;
  document.getElementById('price-max').value = 20000;

  currentFilters = {
    category: '',
    priceRange: { min: 0, max: 20000 },
    rating: [],
    search: ''
  };

  updatePriceDisplay();
  renderProductsGrid();
  closeFilters();
}

function updatePriceDisplay() {
  const minVal = document.getElementById('price-min').value;
  const maxVal = document.getElementById('price-max').value;
  document.getElementById('price-min-display').textContent = '₹' + minVal;
  document.getElementById('price-max-display').textContent = '₹' + maxVal;
}

function closeModals() {
  document.querySelectorAll('.modal').forEach(modal => {
    modal.classList.remove('active');
  });
}

function toggleMobileMenu() {
  document.querySelector('.nav-menu').classList.toggle('active');
}

function closeMobileMenu() {
  document.querySelector('.nav-menu').classList.remove('active');
}

function handleOutsideClick(e) {
  // Close cart sidebar
  if (!document.getElementById('cart-sidebar').contains(e.target) &&
      !e.target.closest('.nav-cart')) {
    closeCart();
  }

  // Close wishlist sidebar
  if (!document.getElementById('wishlist-sidebar').contains(e.target) &&
      !e.target.closest('.nav-wishlist')) {
    closeWishlist();
  }

  // Close search results
  if (!document.getElementById('search-input').contains(e.target) &&
      !document.getElementById('search-results').contains(e.target)) {
    document.getElementById('search-results').style.display = 'none';
  }
}

function renderDashboardPage() {
  if (!currentUser) {
    showAuthModal('login');
    return;
  }

  const dashboardContent = document.getElementById('dashboard-content');
  dashboardContent.innerHTML = `
    <div id="profile-section" class="dashboard-section active">
      <h2>My Profile</h2>
      <div class="profile-info">
        <div class="profile-avatar">
          <i class="fas fa-user"></i>
        </div>
        <div class="profile-details">
          <h3>${currentUser.name}</h3>
          <p>${currentUser.email}</p>
          <p>${currentUser.phone}</p>
          <p>${currentUser.address}</p>
        </div>
      </div>
    </div>

    <div id="orders-section" class="dashboard-section">
      <h2>Order History</h2>
      ${currentUser.orders && currentUser.orders.length > 0 ?
        currentUser.orders.map(order => `
          <div class="order-card">
            <div class="order-header">
              <span class="order-id">${order.id}</span>
              <span class="order-date">${order.date}</span>
              <span class="order-status ${order.status.toLowerCase()}">${order.status}</span>
            </div>
            <div class="order-items">
              ${order.items.map(item => `
                <div class="order-item">
                  <img src="${item.image}" alt="${item.name}">
                  <div class="order-item-info">
                    <h4>${item.name}</h4>
                    <p>Quantity: ${item.quantity}</p>
                    <p>₹${item.price * item.quantity}</p>
                  </div>
                </div>
              `).join('')}
            </div>
            <div class="order-total">
              <strong>Total: ₹${order.total}</strong>
            </div>
          </div>
        `).join('') :
        '<p>No orders yet.</p>'
      }
    </div>

    <div id="wishlist-section" class="dashboard-section">
      <h2>My Wishlist</h2>
      <div class="wishlist-dashboard">
        ${wishlistItems.map(item => `
          <div class="wishlist-dashboard-item">
            <img src="${item.image}" alt="${item.name}">
            <div class="wishlist-dashboard-info">
              <h4>${item.name}</h4>
              <p>₹${item.price}</p>
              <div class="wishlist-actions">
                <button class="btn btn-sm" onclick="addToCart(${item.id})">Add to Cart</button>
                <button class="btn btn-sm remove" onclick="toggleWishlist(${item.id})">Remove</button>
              </div>
            </div>
          </div>
        `).join('')}
      </div>
    </div>

    <div id="addresses-section" class="dashboard-section">
      <h2>My Addresses</h2>
      <div class="address-card">
        <h3>Home Address</h3>
        <p>${currentUser.address || 'No address saved'}</p>
        <button class="btn btn-sm">Edit Address</button>
      </div>
    </div>
  `;

  showDashboardSection('profile');
}

function renderContactPage() {
  const contactPage = document.getElementById('contact-page');
  contactPage.innerHTML = `
    <div class="container">
      <div class="contact-container">
        <div class="contact-info">
          <h1>Contact Us</h1>
          <div class="contact-details">
            <div class="contact-item">
              <i class="fas fa-map-marker-alt"></i>
              <div>
                <h3>Address</h3>
                <p>123 Main Road, Sector 5<br>Bhilai, Chhattisgarh 490006</p>
              </div>
            </div>
            <div class="contact-item">
              <i class="fas fa-phone"></i>
              <div>
                <h3>Phone</h3>
                <p>+91 98765 43210</p>
              </div>
            </div>
            <div class="contact-item">
              <i class="fas fa-envelope"></i>
              <div>
                <h3>Email</h3>
                <p>info@bhilai-store.com</p>
              </div>
            </div>
            <div class="contact-item">
              <i class="fas fa-clock"></i>
              <div>
                <h3>Hours</h3>
                <p>Mon-Sun: 8:00 AM - 10:00 PM</p>
              </div>
            </div>
          </div>
        </div>
        <div class="contact-form">
          <h2>Send us a Message</h2>
          <form id="contact-form">
            <div class="form-row">
              <div class="form-group">
                <label for="contact-name">Name *</label>
                <input type="text" id="contact-name" required>
              </div>
              <div class="form-group">
                <label for="contact-email">Email *</label>
                <input type="email" id="contact-email" required>
              </div>
            </div>
            <div class="form-group">
              <label for="contact-subject">Subject *</label>
              <input type="text" id="contact-subject" required>
            </div>
            <div class="form-group">
              <label for="contact-message">Message *</label>
              <textarea id="contact-message" rows="5" required></textarea>
            </div>
            <button type="submit" class="btn btn-primary">Send Message</button>
          </form>
        </div>
      </div>
    </div>
  `;

  document.getElementById('contact-form').addEventListener('submit', function(e) {
    e.preventDefault();
    showNotification('Thank you for your message! We\'ll get back to you soon.', 'success');
    this.reset();
  });
}

function showAuthModal(type = 'login') {
  const authForms = document.getElementById('auth-forms');
  const authTitle = document.getElementById('auth-title');

  if (type === 'login') {
    authTitle.textContent = 'Login';
    authForms.innerHTML = `
      <form id="login-form" class="auth-form">
        <div class="form-group">
          <label for="login-email">Email *</label>
          <input type="email" id="login-email" required>
        </div>
        <div class="form-group">
          <label for="login-password">Password *</label>
          <input type="password" id="login-password" required>
        </div>
        <button type="submit" class="btn btn-primary">Login</button>
        <p class="auth-switch">Don't have an account? <a href="#" onclick="showAuthModal('register')">Register</a></p>
      </form>
    `;

    document.getElementById('login-form').addEventListener('submit', function(e) {
      e.preventDefault();
      handleLogin();
    });
  } else {
    authTitle.textContent = 'Register';
    authForms.innerHTML = `
      <form id="register-form" class="auth-form">
        <div class="form-row">
          <div class="form-group">
            <label for="reg-name">Full Name *</label>
            <input type="text" id="reg-name" required>
          </div>
        </div>
        <div class="form-group">
          <label for="reg-email">Email *</label>
          <input type="email" id="reg-email" required>
        </div>
        <div class="form-group">
          <label for="reg-phone">Phone *</label>
          <input type="tel" id="reg-phone" required>
        </div>
        <div class="form-group">
          <label for="reg-password">Password *</label>
          <input type="password" id="reg-password" required>
        </div>
        <div class="form-group">
          <label for="reg-address">Address</label>
          <textarea id="reg-address" rows="3"></textarea>
        </div>
        <button type="submit" class="btn btn-primary">Register</button>
        <p class="auth-switch">Already have an account? <a href="#" onclick="showAuthModal('login')">Login</a></p>
      </form>
    `;

    document.getElementById('register-form').addEventListener('submit', function(e) {
      e.preventDefault();
      handleRegister();
    });
  }

  document.getElementById('auth-modal').classList.add('active');
}

function handleLogin() {
  const email = document.getElementById('login-email').value;
  const password = document.getElementById('login-password').value;

  // Simple mock authentication (in real app, this would be server-side)
  const user = productsData.users.find(u => u.email === email);
  if (user && password === 'password') { // Mock password check
    currentUser = user;
    saveUserData();
    updateUserUI();
    closeModals();
    showNotification(`Welcome back, ${user.name.split(' ')[0]}!`, 'success');
  } else {
    showNotification('Invalid email or password', 'error');
  }
}

function handleRegister() {
  const name = document.getElementById('reg-name').value;
  const email = document.getElementById('reg-email').value;
  const phone = document.getElementById('reg-phone').value;
  const password = document.getElementById('reg-password').value;
  const address = document.getElementById('reg-address').value;

  // Check if user already exists
  if (productsData.users.find(u => u.email === email)) {
    showNotification('Email already registered', 'error');
    return;
  }

  const newUser = {
    id: Date.now(),
    name,
    email,
    phone,
    address,
    orders: []
  };

  productsData.users.push(newUser);
  currentUser = newUser;
  saveUserData();
  updateUserUI();
  closeModals();
  showNotification('Registration successful! Welcome to Bhilai Store!', 'success');
}

function logout() {
  currentUser = null;
  saveUserData();
  updateUserUI();
  showPage('home');
  showNotification('Logged out successfully', 'info');
}

function showQuickView(productId) {
  const product = getProductById(productId);
  if (!product) return;

  const quickViewContent = document.getElementById('quick-view-content');
  quickViewContent.innerHTML = `
    <div class="quick-view-layout">
      <div class="quick-view-image">
        <img src="${product.images[0]}" alt="${product.name}">
      </div>
      <div class="quick-view-details">
        <h2>${product.name}</h2>
        <div class="product-rating">
          ${generateStarRating(product.rating)}
          <span>(${product.reviews} reviews)</span>
        </div>
        <div class="product-price">
          ${product.originalPrice ? `<span class="original-price">₹${product.originalPrice}</span>` : ''}
          <span class="current-price">₹${product.price}</span>
          ${product.discount ? `<span class="discount">${product.discount}% OFF</span>` : ''}
        </div>
        <p class="product-description">${product.description}</p>
        <div class="quick-view-actions">
          <button class="btn btn-primary" onclick="addToCart(${product.id}); closeModals();">
            Add to Cart - ₹${product.price}
          </button>
          <button class="btn btn-secondary" onclick="showPage('product-detail', ${product.id}); closeModals();">
            View Details
          </button>
        </div>
      </div>
    </div>
  `;

  document.getElementById('quick-view-modal').classList.add('active');
}

function updateQuantity(change) {
  const quantityInput = document.getElementById('quantity-input');
  const currentValue = parseInt(quantityInput.value);
  const newValue = Math.max(1, currentValue + change);
  quantityInput.value = newValue;
}

function changeMainImage(imageSrc) {
  document.getElementById('main-product-image').src = imageSrc;
  document.querySelectorAll('.thumbnail-images img').forEach(img => {
    img.classList.toggle('active', img.src.includes(imageSrc));
  });
}

function showDashboardSection(sectionName) {
  document.querySelectorAll('.dashboard-section').forEach(section => {
    section.classList.remove('active');
  });
  document.getElementById(sectionName + '-section').classList.add('active');
}
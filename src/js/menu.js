document.addEventListener('click', function(e) {
  if (e.target.classList.contains('add-to-cart-btn')) {
    addToCart();
  }
  if (e.target.classList.contains('close-btn')) {
    closePopup();
  }
});
document.addEventListener("DOMContentLoaded", function () {
  // Function to load navbar HTML
  function loadNavbar() {
    fetch("./src/components/navbar/navbar.html")
      .then((response) => response.text())
      .then((data) => {
        document.getElementById("navbar").innerHTML = data;
        addActiveClass(); // Add active class to current page link
        setupToggleButton(); // Setup toggle button click event
        setupScrollBehavior(); // Setup scroll behavior
      })
      .catch((error) => console.log("Error loading navbar:", error));
  }

  // Function to add active class to current page link
  function addActiveClass() {
    var currentLocation = window.location.href;
    var navLinks = document.querySelectorAll("#navbar a");

    navLinks.forEach(function (link) {
      if (link.href === currentLocation) {
        link.classList.add("active");
      }
    });
  }

  function setupToggleButton() {
    const mobileMenu = document.querySelector("header nav .mobile-menu");
    const menu = document.querySelector("header nav .menu");
    mobileMenu.addEventListener("click", function () {
      menu.classList.toggle("show");
    });
    // Remove class kalau diklik diluar
    document.addEventListener("click", function (event) {
      if (!menu.contains(event.target) && !mobileMenu.contains(event.target)) {
        menu.classList.remove("show");
      }
    });
  }

  function setupScrollBehavior() {
    const header = document.querySelector("header");
    window.onscroll = function () {
      if (document.documentElement.scrollTop >= 200) {
        console.log("test");
        header.classList.add("scrolled");
      } else {
        header.classList.remove("scrolled");
      }
    };
  }

  // Load the navbar when the DOM is ready
  //loadNavbar();
  const products = document.querySelectorAll(".product");
  products.forEach((product) => {
    product.addEventListener('click', (e) => {
      e.stopPropagation();
      const popup = document.querySelector('.popup');
      showProductPopup(product);
    
    });
  });
  console.log('Produk diklik');
  updateCartUI();
  
  // Event listener untuk tombol cart
  document.querySelector('.cart-button').addEventListener('click', function() {
    document.getElementById('cartModal').style.display = 'flex';
  });
  
  // Close modal
  document.querySelector('.modal .close').addEventListener('click', function() {
    document.getElementById('cartModal').style.display = 'none';
  });
  
  // Checkout sederhana
  document.getElementById('checkout-btn').addEventListener('click', function() {
    const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    
    if (cartItems.length === 0) {
      alert('Keranjang kosong!');
      return;
    }
    
    const total = cartItems.reduce((sum, item) => {
      return sum + parseInt(item.price.replace('Rp', '').replace(/\./g, ''));
    }, 0);
    
    alert(`Pesanan berhasil! Total: Rp ${total.toLocaleString('id-ID')}`);
    
    localStorage.removeItem('cartItems');
    updateCartUI();
  });

  document.querySelectorAll('.remove-btn').forEach(btn => {
    btn.addEventListener('click', function() {
      const itemId = parseInt(this.closest('.cart-item').dataset.id);
      removeFromCart(itemId);
    });
  });

});

function showProductPopup(product){
  const popup = document.querySelector('.popup');
  const ov = document.querySelector('.overlay');
  const originalPrice = product.querySelector('.price').textContent || 0;
  popup.innerHTML = `
    <div class="popup-content">
      <div class="popup-header">
        <h3>${product.querySelector('h3').textContent}</h3>
        <p class="category">${product.querySelector('.category').textContent}</p>
      </div>
      
      <div class="popup-image">
        <img src="${product.querySelector('.img img').src}" alt="${product.querySelector('h3').textContent}">
      </div>
      
       <div class="popup-options">
      <div class="option-row">
        <label>Name</label>
        <input type="text" id="nameInput" placeholder="Example: Agung Galuh Pambudi Utomo">
      </div>
      
      <div class="option-row">
        <label>Brand</label>
        <input type="text" id="brandInput" placeholder="Example: Nike">
      </div>
      
      <div class="option-row">
        <label>Note</label>
        <input type="text" id="noteInput" placeholder="Example: Make it clean">
      </div>
    </div>
      
      <div class="popup-price">
        <span>Total:</span>
        <span class="price" id="totalPrice">${originalPrice.toLocaleString('id-ID')}</span>
      </div>
      
      <div class="popup-actions">
        <button class="add-to-cart-btn">Add to cart</button>
        <button class="close-btn" onclick="closePopup()">✕</button>
      </div>
    </div>
  `;

  popup.classList.add("show");
  ov.classList.add("show");
  document.body.classList.add("ov");
    console.log('Popup ditampilkan');
}

var body = document.querySelector("body");
var ov = document.querySelector(".overlay");
document.querySelector(".tab").innerHTML = `<p class="all">All Menu</p>${[
  ...new Set(
    [...document.querySelectorAll(".category")].map(
      (c) =>
        `<p class="${c.textContent.toLowerCase().replace(" ", "")}">${
          c.textContent
        }</p>`
    )
  ),
].join("")}`;

const products = document.querySelectorAll(".product");

for (var i = 0; i < products.length; i++) {
  var product = products[i];
  var category = product.getElementsByClassName("category")[0];
  var categoryText = category.innerText.toLowerCase().replace(" ", "");
  product.classList.add(categoryText);
}

var tabs = document.querySelectorAll(".tab > p");

tabs.forEach(function (tab) {
  tab.addEventListener("click", function () {
    if (!this.classList.contains("active")) {
      var tabClass = this.className;
      tabs.forEach(function (tab) {
        tab.classList.remove("active");
      });
      this.classList.add("active");
      Array.from(products).forEach(function (product) {
        var productClass = product.classList;
        var shouldDisplay =
          tabClass === "all" || productClass.contains(tabClass);

        product.style.display = shouldDisplay ? "block" : "none";
      });
    }
  });
});

// Mengatur tab "All Menu" sebagai tab default yang aktif
tabs[0].classList.add("active");



function closePopup() {
  document.querySelector(".popup").classList.remove("show");
  document.querySelector(".overlay").classList.remove("show");
  fadeOut(document.querySelector(".overlay"));
  body.classList.remove("ov");
}

function appendHTML(selector, html) {
  var elements = document.querySelectorAll(selector);
  elements.forEach(function (element) {
    element.innerHTML += html;
  });
}

function beforeHTML(selector, html) {
  var elements = document.querySelectorAll(selector);
  elements.forEach(function (element) {
    element.insertAdjacentHTML("beforebegin", html);
  });
}

function addToCart() {
  const popup = document.querySelector('.popup');
  if (!popup) return;

  // Ambil data dari popup
  const newProductData = {
    name : document.querySelector('.popup h3')?.textContent || 'Unknown',
    category : document.querySelector('.popup p')?.textContent || 'Unknown',
    price : document.getElementById('totalPrice')?.textContent || 'Rp 0',
    image : document.querySelector('.popup img')?.src || '',
    nameInput : document.getElementById('nameInput')?.value || '-',
    brand : document.getElementById('brandInput')?.value || '-',
    note : document.getElementById('noteInput')?.value || '-',
    id: new Date().getTime() // ID unik berdasarkan timestamp
  };
  

  let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
  cartItems.push(newProductData);
  localStorage.setItem('cartItems', JSON.stringify(cartItems));

  // Update UI
  updateCartUI();
  alert(`${newProductData.name} ditambahkan ke keranjang!`);
  closePopup();
}

function updateCartUI() {
  const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
  const cartContainer = document.getElementById('cartItemsContainer');
  
  cartContainer.innerHTML = `
    <div class="cart-header-container">
      
    </div>
    ${cartItems.map(item => `
      <div class="item-container" data-id="${item.id}">
        <div class="item-details">
          <div class="item-image">
            <img src="${item.image}" alt="${product.querySelector('h3').textContent}">
          </div>
          <div class="item">
            <h5>${item.name}</h5>
            <p>${item.category || ''}</p>
            <div class="customization-summary">
              <p><i class="fas fa-id-card"></i> Name: ${item.nameInput || '-'}</p>
              <p><i class="fas fa-clipboard-list"></i> Brand: ${item.brand || '-'}</p>
              <p><i class="fas fa-sticky-note"></i> Note: ${item.note || '-'}</p>
            </div>
            <p class="item-price-1">${item.price}</p>
          </div>
        </div>
      </div>
      <!--
      <div class="cart-menu-item" data-id="${item.id}">
        <div class="menu-item-info">
          <div class="item-image">
            <img src="${item.image}" alt="${product.querySelector('h3').textContent}">
          </div>  
          <div class="item-name"><h3>${item.name}</h3></div>
          <div class="item-category">${item.category || ''}</div>
          
          <div class="customization-summary">
            <p><i class="fas fa-id-card"></i> Name: ${cartItems[0]?.nameInput || '-'}</p>
            <p><i class="fas fa-clipboard-list"></i> Brand: ${cartItems[0]?.brand || '-'}</p>
            <p><i class="fas fa-sticky-note"></i> Note: ${cartItems[0]?.note || '-'}</p>
          </div>
        </div>
        <div class="menu-item-price">${item.price}</div>
      </div>
      -->
    `).join('')}
  `;

  // Tambahkan tombol hapus
  document.querySelectorAll('.item-container').forEach(item => {
    const removeBtn = document.createElement('button');
    removeBtn.className = 'remove-btn';
    removeBtn.innerHTML = '<i class="fas fa-trash"></i>';
    removeBtn.addEventListener('click', () => {
      removeFromCart(parseInt(item.dataset.id));
    });
    item.appendChild(removeBtn);
  });
}

function removeFromCart(itemId) {
  let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
  cartItems = cartItems.filter(item => item.id !== itemId);
  localStorage.setItem('cartItems', JSON.stringify(cartItems));
  updateCartUI();
}

function closeCartModal() {
  document.getElementById('cartModal').style.display = 'none';
}

// Event listener untuk tombol close
document.addEventListener('click', function(e) {
  // Tombol close (×) di header
  if (e.target.classList.contains('close-btn')) {
    closeCartModal();
  }
  // Tombol "Keluar" di footer
  if (e.target.classList.contains('close-cart-btn')) {
    closeCartModal();
  }
});


// Event listener untuk tombol close


beforeHTML(
  ".price",
  `
  <div class="amount">
      <span>Amount</span>
      <div class="number">
        <div class="minus" onclick="decreaseValue()"><i class="fas fa-minus"></i></div>
        <div class="value"><input id="product-amount" value="1"/></div>
        <div class="plus" onclick="increaseValue()"><i class="fas fa-plus"></i></div>
      </div>
  </div>
`
);

Array.from(document.getElementsByClassName("price")).forEach((e) =>
  e.setAttribute(
    "value",
    e.textContent.replace("Rp", "").replace(/\s/g, "").replace(/\./g, "")
  )
);

function decreaseValue() {
  const inputElement = document.getElementById("product-amount");
  let currentValue = parseInt(inputElement.value);
  if (currentValue > 1) {
    currentValue--;
    inputElement.value = currentValue;
    updatePrice(currentValue);
  }
}

function increaseValue() {
  const inputElement = document.getElementById("product-amount");
  let currentValue = parseInt(inputElement.value);
  currentValue++;
  inputElement.value = currentValue;
  updatePrice(currentValue);
}

function stillValue() {
  const inputElement = document.getElementById("product-amount");
  let currentValue = parseInt(inputElement.value);
  inputElement.value = currentValue;
  updatePrice(currentValue);
}

// Function to update the hidden input based on the selected option
function updateHiddenInput(inputId, value) {
  const hiddenInput = document.getElementById(inputId);
  hiddenInput.value = value;
  console.log(`Hidden input ${inputId} updated to:`, hiddenInput.value);
}

function updatePrice(quantity) {
  const priceElement = document.querySelector(".price");
  const originalPrice = parseInt(priceElement.getAttribute("value"));
  const sizeSelect = document.getElementById('sizeSelect');
  const multiplier = parseFloat(sizeSelect.value) || 1;
  const totalPrice = originalPrice * quantity;
  
  priceElement.textContent = "Rp " + totalPrice.toLocaleString("id-ID");
  priceElement.setAttribute("priceValue", totalPrice);

  //document.getElementById('totalPrice').textContent = `Rp ${totalPrice.toLocaleString('id-ID')}`;
}


function fadeOut(el) {
  el.style.opacity = 1;
  (function fade() {
    if ((el.style.opacity -= 0.08) < 0) {
      el.style.display = "none";
    } else {
      requestAnimationFrame(fade);
    }
  })();
}

function fadeIn(el, display) {
  el.style.opacity = 0;
  el.style.display = display || "block";
  (function fade() {
    var val = parseFloat(el.style.opacity);
    if (!((val += 0.08) > 1)) {
      el.style.opacity = val;
      requestAnimationFrame(fade);
    }
  })();
}

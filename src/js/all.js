document.addEventListener("DOMContentLoaded", function () {
  // ============================
  // 1. WhatsApp Submit Button
  // ============================
  const submitBtn = document.querySelector("button.submit");
  if (submitBtn) {
    submitBtn.addEventListener("click", function () {
      const name = encodeURIComponent(document.querySelector(".name input").value);
      const email = encodeURIComponent(document.querySelector(".email input").value);
      const text = encodeURIComponent(document.querySelector(".msg textarea").value);
      const message = `Hello, Sengkuclean! I'm ${name}.%0A%0A${text}%0A%0ARegards, ${name}%0A%0A${email}`;
      const url = `https://api.whatsapp.com/send?phone=6285692203764&text=${message}`;
      window.open(url);
    });
  }

  // ============================
  // 2. Mobile Nav Toggle
  // ============================
  const mobileNavBtn = document.querySelector(".mobile-nav");
  const navMenu = document.querySelector("header nav");
  if (mobileNavBtn && navMenu) {
    mobileNavBtn.addEventListener("click", () => {
      navMenu.classList.toggle("show");
    });
  }

  // ============================
  // 3. Update Cart Count
  // ============================
  function updateCartCount() {
    const cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
    const cartCount = document.getElementById("cart-count");
    if (cartCount) {
      cartCount.textContent = cartItems.length;
    }
  }
  updateCartCount();

  // ============================
  // 4. Cart Modal Functionality
  // ============================
  const cartButton = document.querySelector(".cart-button");
  const modal = document.getElementById("cartModal");
  const closeButton = document.querySelector(".close");

  if (cartButton && modal && closeButton) {
    cartButton.addEventListener("click", displayCartModal);
    
    closeButton.addEventListener("click", closeModal);
  }

  function openModal() {
    modal.style.display = "flex";
  }

  function closeModal() {
    modal.style.display = "none";
  }

  function deleteCartItem(index) {
    const cartItemsData = JSON.parse(localStorage.getItem("cartItems")) || [];
    cartItemsData.splice(index, 1);
    localStorage.setItem("cartItems", JSON.stringify(cartItemsData));
    displayCartModal();
  }

  function updateTotalPrice(cartItemsData) {
    const totalPriceElement = document.getElementById("total-price");
    const total = cartItemsData.reduce((sum, item) => sum + (item.originalPrice * (item.quantity || 1)), 0);
    if (totalPriceElement) {
      totalPriceElement.textContent = "Rp " + total.toLocaleString("id-ID");
    }
  }

  function displayCartModal() {
    const cartItemsData = JSON.parse(localStorage.getItem("cartItems")) || [];
    const cartItemsContainer = document.getElementById("cartItemsContainer");
    const totalPriceElement = document.getElementById("total-price");

    if (!cartItemsContainer) return;
    console.log(cartItemsData)

    cartItemsContainer.innerHTML = "";

    cartItemsData.forEach((item, index) => {
      const itemContainer = document.createElement("div");
      itemContainer.classList.add("item-container");

      const itemHTML = `
        <div class="item-details">
          <div class="item-image"><img src="${item.image}" /></div>
          <div class="item">
            <h5>${item.name}</h5>
            <div class="item-description">
              <p>Name: ${item.nameInput}</p>
              <p>Brand: ${item.brand}</p>
              <p>Note: ${item.note}</p>
            </div>
            <p class="item-price-${index}" value="${item.price}">${item.price.toLocaleString("id-ID")}</p>
          </div>
        </div>
        <div class="button-container">
          <!--<div class="item-quantity">
            <div class="minus" data-index="${index}"><i class="fas fa-minus"></i></div>
            <div class="value"><input id="product-amount-${index}" value="${item.quantity || 1}" /></div>
            <div class="plus" data-index="${index}"><i class="fas fa-plus"></i></div>
          </div>-->
          <div class="delete-container" data-index="${index}">
            <i class="fas fa-trash"></i>
          </div>
        </div>
      `;

      itemContainer.innerHTML = itemHTML;
      cartItemsContainer.appendChild(itemContainer);
    });

    // Attach events
    cartItemsContainer.querySelectorAll(".plus").forEach(btn => {
      btn.addEventListener("click", () => {
        const index = btn.dataset.index;
        const input = document.getElementById(`product-amount-${index}`);
        let quantity = parseInt(input.value);
        quantity++;
        input.value = quantity;
        updateItemPrice(index, quantity);
      });
    });

    cartItemsContainer.querySelectorAll(".minus").forEach(btn => {
      btn.addEventListener("click", () => {
        const index = btn.dataset.index;
        const input = document.getElementById(`product-amount-${index}`);
        let quantity = parseInt(input.value);
        if (quantity > 1) {
          quantity--;
          input.value = quantity;
          updateItemPrice(index, quantity);
        }
      });
    });

    cartItemsContainer.querySelectorAll(".delete-container").forEach(btn => {
      btn.addEventListener("click", () => {
        const index = btn.dataset.index;
        deleteCartItem(index);
      });
    });

    updateTotalPrice(cartItemsData);
    openModal();
  }

  function updateItemPrice(index, quantity) {
    const cartItemsData = JSON.parse(localStorage.getItem("cartItems")) || [];
    const item = cartItemsData[index];
    item.quantity = quantity;
    item.price = "Rp " + (item.originalPrice * quantity).toLocaleString("id-ID");
    localStorage.setItem("cartItems", JSON.stringify(cartItemsData));
    displayCartModal(); // Rerender
  }

  // ============================
  // 5. Dropdown (Optional)
  // ============================
  const dropbtn = document.getElementById("dropbtn");
  const dropdownContent = document.getElementById("dropdown-content");

  if (dropbtn && dropdownContent) {
    dropbtn.addEventListener("click", () => {
      dropdownContent.style.display = dropdownContent.style.display === "block" ? "none" : "block";
    });

    dropdownContent.addEventListener("click", function (event) {
      const selectedValue = event.target.getAttribute("data-value");
      if (selectedValue) {
        dropbtn.textContent = selectedValue;
        dropdownContent.style.display = "none";
      }
    });

    window.addEventListener("click", function (event) {
      if (!event.target.matches("#dropbtn")) {
        dropdownContent.style.display = "none";
      }
    });
  }
});

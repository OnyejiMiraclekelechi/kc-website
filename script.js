// Shopping Cart Data
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// Menu Toggle
function menutoggle() {
    var MenueItems = document.getElementById("MenueItems");
    if (MenueItems.style.maxHeight == "0px" || MenueItems.style.maxHeight == "") {
        MenueItems.style.maxHeight = "200px";
    } else {
        MenueItems.style.maxHeight = "0px";
    }
}

// Account Form Toggle
function register() {
    var RegForm = document.getElementById("RegForm");
    var LoginForm = document.getElementById("LoginForm");
    var Indicator = document.getElementById("Indicator");
    
    if (RegForm && LoginForm && Indicator) {
        RegForm.style.transform = "translateX(0px)";
        LoginForm.style.transform = "translateX(300px)";
        Indicator.style.transform = "translateX(100px)";
    }
}

function login() {
    var RegForm = document.getElementById("RegForm");
    var LoginForm = document.getElementById("LoginForm");
    var Indicator = document.getElementById("Indicator");
    
    if (RegForm && LoginForm && Indicator) {
        RegForm.style.transform = "translateX(300px)";
        LoginForm.style.transform = "translateX(0px)";
        Indicator.style.transform = "translateX(0px)";
    }
}

// Add to Cart
function addToCart(productName, price) {
    var quantityInput = document.querySelector('input[type="number"]');
    var quantity = quantityInput ? parseInt(quantityInput.value) : 1;
    
    var existingItem = cart.find(item => item.name === productName);
    
    if (existingItem) {
        existingItem.quantity += quantity;
    } else {
        cart.push({
            name: productName,
            price: price,
            quantity: quantity
        });
    }
    
    localStorage.setItem('cart', JSON.stringify(cart));
    alert(quantity + ' item(s) added to cart!');
    
    // Navigate to cart
    setTimeout(() => {
        window.location.href = 'cart.html';
    }, 500);
}

// Product Filter/Sort
function filterProducts() {
    var selectElement = document.querySelector('select');
    if (selectElement) {
        var selectedCategory = selectElement.value;
        console.log('Selected category: ' + selectedCategory);
        alert('Filtering by: ' + selectedCategory + '\n(Feature coming soon)');
    }
}

// Coupon Apply
function applyCoupon() {
    var couponInput = document.querySelector('#coupon input[type="text"]');
    if (couponInput && couponInput.value) {
        alert('Coupon "' + couponInput.value + '" applied successfully!');
    } else {
        alert('Please enter a coupon code');
    }
}

// Proceed to Checkout
function proceedCheckout() {
    if (cart.length === 0) {
        alert('Your cart is empty!');
    } else {
        alert('Proceeding to checkout with ' + cart.length + ' item(s)');
        // Redirect to checkout page (if it exists)
        window.location.href = 'checkout.html';
    }
}

// Login Form Submit
function handleLoginSubmit(event) {
    event.preventDefault();
    var username = document.querySelector('#LoginForm input[type="text"]').value;
    var password = document.querySelector('#LoginForm input[type="password"]').value;
    
    if (username && password) {
        alert('Login successful! Welcome ' + username);
        localStorage.setItem('user', username);
        // Redirect to home page
        setTimeout(() => {
            window.location.href = 'index.html';
        }, 500);
    } else {
        alert('Please enter both username and password');
    }
}

// Register Form Submit
function handleRegisterSubmit(event) {
    event.preventDefault();
    var username = document.querySelector('#RegForm input[type="text"]').value;
    var email = document.querySelector('#RegForm input[type="email"]').value;
    var password = document.querySelector('#RegForm input[type="password"]').value;
    
    if (username && email && password) {
        alert('Registration successful! Welcome ' + username);
        localStorage.setItem('user', username);
        localStorage.setItem('email', email);
        // Switch to login form
        setTimeout(() => {
            login();
        }, 500);
    } else {
        alert('Please fill in all fields');
    }
}

// Contact Form Submit
function handleContactSubmit(event) {
    event.preventDefault();
    var name = document.querySelector('#contact-form input[name="name"]').value;
    var email = document.querySelector('#contact-form input[name="email"]').value;
    var message = document.querySelector('#contact-form textarea[name="message"]').value;
    
    if (name && email && message) {
        alert('Thank you for your message! We will get back to you soon.');
        document.querySelector('#contact-form').reset();
    } else {
        alert('Please fill in all fields');
    }
}

// Initialize event listeners when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    // Add event listeners for buttons
    var addToCartBtn = document.querySelector('.btn');
    if (addToCartBtn && addToCartBtn.textContent.includes('Add To Cart')) {
        addToCartBtn.style.cursor = 'pointer';
        addToCartBtn.onclick = function(e) {
            e.preventDefault();
            var productName = document.querySelector('h1').textContent || 'Product';
            var price = document.querySelector('H4').textContent || '0';
            addToCart(productName, price);
        };
    }
    
    // Filter dropdown
    var selectElement = document.querySelector('select');
    if (selectElement && selectElement.textContent.includes('Cooker')) {
        selectElement.addEventListener('change', filterProducts);
    }
    
    // Coupon button
    var couponBtn = document.querySelector('#coupon button');
    if (couponBtn) {
        couponBtn.onclick = applyCoupon;
    }
    
    // Checkout button
    var checkoutBtn = document.querySelector('#subtotal button');
    if (checkoutBtn) {
        checkoutBtn.onclick = proceedCheckout;
    }
    
    // Form submissions
    var loginForm = document.getElementById('LoginForm');
    if (loginForm) {
        loginForm.onsubmit = handleLoginSubmit;
    }
    
    var regForm = document.getElementById('RegForm');
    if (regForm) {
        regForm.onsubmit = handleRegisterSubmit;
    }
    
    var contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.onsubmit = handleContactSubmit;
    }
});

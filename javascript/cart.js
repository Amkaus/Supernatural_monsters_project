let cart = [];
function saveCart() {
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
}

function loadCart() {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
        cart = JSON.parse(savedCart);
    } else {
        cart = [];
    }
    updateCartCount();
}

function updateCartCount() {
    const counters = document.querySelectorAll('#cart-count');
    counters.forEach(counter => {
        counter.textContent = cart.length;
    });
}

function addToCart(product) {
    cart.push(product);
    saveCart();
    alert(`Товар "${product.name}" добавлен в корзину`);
}

function removeFromCart(index) {
    cart.splice(index, 1);
    saveCart();
    renderCart();
}

function clearCart() {
    if (confirm('Очистить корзину?')) {
        cart = [];
        saveCart();
        renderCart();
    }
}

function renderCart() {
    const container = document.getElementById('cart-items');
    if (!container) return;
    container.innerHTML = '';
    if (cart.length === 0) {
        container.innerHTML = '<p class="col-12">Корзина пуста</p>';
        return;
    }
    cart.forEach((item, index) => {
        const col = document.createElement('div');
        col.className = 'col-md-4 mb-3';
        col.innerHTML = `
            <div class="card h-100">
                <img src="${item.image}" class="card-img-top" alt="${item.name}">
                <div class="card-body">
                    <h5 class="card-title">${item.name}</h5>
                    <button class="btn btn-danger btn-sm remove-item" data-index="${index}">Удалить</button>
                </div>
            </div>
        `;
        container.appendChild(col);
    });
    document.querySelectorAll('.remove-item').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const index = e.target.dataset.index;
            removeFromCart(index);
        });
    });
}

document.addEventListener('DOMContentLoaded', () => {
    loadCart();
    document.querySelectorAll('.add-to-cart').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const product = {
                name: e.target.dataset.name,
                image: e.target.dataset.image
            };
            addToCart(product);
        });
    });

    const clearBtn = document.getElementById('clear-cart');
    if (clearBtn) {
        clearBtn.addEventListener('click', clearCart);
    }
    if (document.getElementById('cart-items')) {
        renderCart();
    }
});
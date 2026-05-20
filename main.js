document.addEventListener('DOMContentLoaded', () => {
    // Scroll Animation Observer
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.animate-on-scroll, .product-card').forEach(el => {
        el.classList.add('animate-on-scroll');
        observer.observe(el);
    });

    // Cart Logic
    let cartCount = localStorage.getItem('cartCount') ? parseInt(localStorage.getItem('cartCount')) : 0;
    const cartCountEl = document.querySelector('.cart-count');
    
    function updateCartUI() {
        if (cartCountEl) {
            cartCountEl.textContent = cartCount;
        }
    }
    updateCartUI();

    document.querySelectorAll('.add-to-cart').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation(); // Prevent triggering product card click
            cartCount++;
            localStorage.setItem('cartCount', cartCount);
            updateCartUI();
            
            // Visual feedback
            const originalText = btn.textContent;
            btn.textContent = '已加入！';
            btn.style.background = 'var(--accent-gold)';
            btn.style.color = 'var(--bg-dark)';
            
            setTimeout(() => {
                btn.textContent = originalText;
                btn.style.background = 'transparent';
                btn.style.color = 'var(--text-main)';
            }, 1000);
        });
    });

    // Product Navigation Logic
    document.querySelectorAll('.product-card').forEach(card => {
        card.addEventListener('click', () => {
            const productInfo = {
                title: card.querySelector('.product-title').textContent,
                price: card.querySelector('.product-price').textContent,
                category: card.querySelector('.product-category').textContent,
                image: card.querySelector('.product-image').src
            };
            localStorage.setItem('currentProduct', JSON.stringify(productInfo));
            window.location.href = 'product.html';
        });
    });

    // Product Detail Page Loader
    if (window.location.pathname.includes('product.html')) {
        const productInfo = JSON.parse(localStorage.getItem('currentProduct'));
        if (productInfo) {
            document.getElementById('detail-title').textContent = productInfo.title;
            document.getElementById('detail-price').textContent = productInfo.price;
            document.getElementById('detail-category').textContent = productInfo.category;
            document.getElementById('detail-image').src = productInfo.image;
            document.title = `${productInfo.title} | Lumina Spirits`;
        } else {
            // Fallback
            window.location.href = 'index.html';
        }
    }
});

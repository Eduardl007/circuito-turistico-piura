/**
 * CIRCUITO TURÍSTICO PIURA - CATACAOS
 * JavaScript Principal - Funcionalidad Completa
 * Con integración de Analytics para Google Sheets
 */

// ============================================
// 1. INICIALIZACIÓN Y CONFIGURACIÓN
// ============================================

document.addEventListener('DOMContentLoaded', function() {
    // Inicializar AOS (Animate On Scroll)
    AOS.init({
        duration: 800,
        easing: 'ease-out',
        once: true,
        offset: 100
    });

    // Ocultar preloader
    setTimeout(() => {
        const preloader = document.getElementById('preloader');
        if (preloader) {
            preloader.classList.add('hidden');
        }
    }, 1500);

    // Inicializar componentes
    initNavigation();
    initHeroSlider();
    initCounters();
    initExperienciasFilter();
    initGastronomia();
    initTestimonios();
    initChatbot();
    initCart();
    initModals();
    initForms();
    initMapPlaceholder();
    initScrollEffects();

    // Log de inicio para analytics
    console.log('🚀 Circuito Turístico Piura-Catacaos iniciado');
});

// ============================================
// 2. NAVEGACIÓN
// ============================================

function initNavigation() {
    const header = document.getElementById('header');
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');
    const navLinks = document.querySelectorAll('.nav-link');

    // Scroll effect
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // Mobile menu toggle
    navToggle.addEventListener('click', () => {
        navToggle.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Active link on scroll
    const sections = document.querySelectorAll('section[id]');

    window.addEventListener('scroll', () => {
        const scrollY = window.pageYOffset;

        sections.forEach(section => {
            const sectionHeight = section.offsetHeight;
            const sectionTop = section.offsetTop - 150;
            const sectionId = section.getAttribute('id');
            const navLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);

            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                navLinks.forEach(link => link.classList.remove('active'));
                if (navLink) navLink.classList.add('active');
            }
        });
    });

    // Smooth scroll
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            const targetSection = document.querySelector(targetId);

            if (targetSection) {
                targetSection.scrollIntoView({ behavior: 'smooth' });
                navMenu.classList.remove('active');
                navToggle.classList.remove('active');
            }
        });
    });
}

// ============================================
// 3. HERO SLIDER
// ============================================

function initHeroSlider() {
    const slides = document.querySelectorAll('.hero-slide');
    let currentSlide = 0;

    function nextSlide() {
        slides[currentSlide].classList.remove('active');
        currentSlide = (currentSlide + 1) % slides.length;
        slides[currentSlide].classList.add('active');
    }

    setInterval(nextSlide, 5000);

    // Hero search
    const btnSearch = document.getElementById('btnSearch');
    if (btnSearch) {
        btnSearch.addEventListener('click', () => {
            const search = document.getElementById('heroSearch').value;
            const date = document.getElementById('heroDate').value;
            const guests = document.getElementById('heroGuests').value;

            if (search || date || guests) {
                showToast('success', 'Buscando...', `Encontrando experiencias${search ? ` para "${search}"` : ''}`);

                // 📊 ANALYTICS: Tracking de búsqueda
                if (window.trackUserInteraction) {
                    trackUserInteraction('search', {
                        query: search,
                        filters: { date: date, guests: guests }
                    });
                }

                // Scroll to experiencias
                document.getElementById('experiencias').scrollIntoView({ behavior: 'smooth' });
            } else {
                showToast('info', 'Búsqueda', 'Ingresa algún criterio de búsqueda');
            }
        });
    }
}

// ============================================
// 4. CONTADORES ANIMADOS
// ============================================

function initCounters() {
    const counters = document.querySelectorAll('.stat-number');
    const options = {
        threshold: 0.5
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                const target = parseFloat(counter.getAttribute('data-count'));
                animateCounter(counter, target);
                observer.unobserve(counter);
            }
        });
    }, options);

    counters.forEach(counter => observer.observe(counter));
}

function animateCounter(element, target) {
    const duration = 2000;
    const start = 0;
    const increment = target / (duration / 16);
    let current = start;

    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            current = target;
            clearInterval(timer);
        }

        if (target >= 1000) {
            element.textContent = formatNumber(Math.floor(current));
        } else if (target < 10) {
            element.textContent = current.toFixed(1);
        } else {
            element.textContent = Math.floor(current);
        }
    }, 16);
}

function formatNumber(num) {
    if (num >= 1000000) {
        return (num / 1000000).toFixed(1) + 'M';
    } else if (num >= 1000) {
        return (num / 1000).toFixed(0) + 'K';
    }
    return num.toString();
}

// ============================================
// 5. FILTRO DE EXPERIENCIAS
// ============================================

function initExperienciasFilter() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const expCards = document.querySelectorAll('.exp-card');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Update active button
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const filter = btn.getAttribute('data-filter');

            expCards.forEach(card => {
                const categories = card.getAttribute('data-category');

                if (filter === 'all' || categories.includes(filter)) {
                    card.style.display = 'block';
                    card.style.animation = 'fadeIn 0.5s ease';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });

    // Wishlist buttons
    const wishlistBtns = document.querySelectorAll('.btn-wishlist');
    wishlistBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            btn.classList.toggle('active');
            const icon = btn.querySelector('i');
            const productId = btn.getAttribute('data-id');
            const card = btn.closest('.exp-card');
            const productName = card ? card.querySelector('h3')?.textContent : '';

            if (btn.classList.contains('active')) {
                icon.classList.remove('far');
                icon.classList.add('fas');
                showToast('success', 'Guardado', 'Añadido a favoritos');

                // 📊 ANALYTICS: Tracking de wishlist
                if (window.trackUserInteraction) {
                    trackUserInteraction('wishlist', {
                        action: 'add',
                        productId: productId,
                        productName: productName
                    });
                }
            } else {
                icon.classList.remove('fas');
                icon.classList.add('far');
                showToast('info', 'Eliminado', 'Removido de favoritos');

                // 📊 ANALYTICS: Tracking de wishlist remove
                if (window.trackUserInteraction) {
                    trackUserInteraction('wishlist', {
                        action: 'remove',
                        productId: productId,
                        productName: productName
                    });
                }
            }
        });
    });

    // Reservar buttons
    const reservarBtns = document.querySelectorAll('.btn-reservar, .btn-taller, .btn-paquete');
    reservarBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const id = btn.getAttribute('data-id');
            const name = btn.getAttribute('data-name');
            const price = btn.getAttribute('data-price');

            // Determinar categoría
            let category = 'Experiencia';
            if (btn.classList.contains('btn-taller')) category = 'Taller';
            if (btn.classList.contains('btn-paquete')) category = 'Paquete';

            // 📊 ANALYTICS: Tracking de producto visto/clic en reservar
            if (window.trackUserInteraction) {
                trackUserInteraction('product_view', {
                    id: id,
                    name: name,
                    category: category,
                    price: parseFloat(price)
                });
            }

            openReservaModal(id, name, price);
        });
    });

    // Filtros de experiencias - Analytics
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const filter = btn.getAttribute('data-filter');
            // 📊 ANALYTICS: Tracking de filtro aplicado
            if (window.trackUserInteraction) {
                trackUserInteraction('filter', {
                    filterType: 'experiencias',
                    filterValue: filter
                });
            }
        });
    });
}

// ============================================
// 6. GALERÍA GASTRONÓMICA
// ============================================

function initGastronomia() {
    const gastroItems = document.querySelectorAll('.gastro-item');
    const gastroImage = document.getElementById('gastroImage');
    const gastroTitle = document.getElementById('gastroTitle');
    const gastroDesc = document.getElementById('gastroDesc');

    gastroItems.forEach(item => {
        item.addEventListener('click', () => {
            // Update active state
            gastroItems.forEach(i => i.classList.remove('active'));
            item.classList.add('active');

            // Get data
            const image = item.getAttribute('data-image');
            const title = item.getAttribute('data-title');
            const desc = item.getAttribute('data-desc');

            // Animate transition
            gastroImage.style.opacity = '0';

            setTimeout(() => {
                gastroImage.src = image;
                gastroTitle.textContent = title;
                gastroDesc.textContent = desc;
                gastroImage.style.opacity = '1';
            }, 300);
        });
    });

    // Restaurant reservation buttons
    const restBtns = document.querySelectorAll('.btn-reservar-rest');
    restBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const restaurant = btn.getAttribute('data-rest');
            const card = btn.closest('.rest-card');
            const restaurantName = card ? card.querySelector('h4')?.textContent : restaurant;

            // 📊 ANALYTICS: Tracking de reserva de restaurante
            if (window.trackUserInteraction) {
                trackUserInteraction('restaurant', {
                    name: restaurantName
                });
            }

            showToast('success', 'Reserva', `Redirigiendo a reserva en restaurante...`);
        });
    });
}

// ============================================
// 7. SLIDER DE TESTIMONIOS
// ============================================

function initTestimonios() {
    const track = document.getElementById('testimoniosTrack');
    const cards = track.querySelectorAll('.testimonio-card');
    const dotsContainer = document.getElementById('testimoniosDots');
    const prevBtn = document.getElementById('testPrev');
    const nextBtn = document.getElementById('testNext');

    let currentIndex = 0;
    let cardsPerView = getCardsPerView();

    // Create dots
    const totalSlides = Math.ceil(cards.length / cardsPerView);
    for (let i = 0; i < totalSlides; i++) {
        const dot = document.createElement('span');
        dot.classList.add('dot');
        if (i === 0) dot.classList.add('active');
        dot.addEventListener('click', () => goToSlide(i));
        dotsContainer.appendChild(dot);
    }

    function getCardsPerView() {
        if (window.innerWidth <= 768) return 1;
        if (window.innerWidth <= 1024) return 2;
        return 3;
    }

    function updateSlider() {
        const cardWidth = cards[0].offsetWidth + 24; // Include gap
        track.style.transform = `translateX(-${currentIndex * cardWidth}px)`;

        // Update dots
        const dots = dotsContainer.querySelectorAll('.dot');
        dots.forEach((dot, i) => {
            dot.classList.toggle('active', i === Math.floor(currentIndex / cardsPerView));
        });
    }

    function goToSlide(index) {
        currentIndex = index * cardsPerView;
        updateSlider();
    }

    function nextSlide() {
        if (currentIndex < cards.length - cardsPerView) {
            currentIndex++;
        } else {
            currentIndex = 0;
        }
        updateSlider();
    }

    function prevSlide() {
        if (currentIndex > 0) {
            currentIndex--;
        } else {
            currentIndex = cards.length - cardsPerView;
        }
        updateSlider();
    }

    prevBtn.addEventListener('click', prevSlide);
    nextBtn.addEventListener('click', nextSlide);

    // Auto slide
    setInterval(nextSlide, 6000);

    // Update on resize
    window.addEventListener('resize', () => {
        cardsPerView = getCardsPerView();
        updateSlider();
    });
}

// ============================================
// 8. CHATBOT
// ============================================

function initChatbot() {
    const toggle = document.getElementById('chatbotToggle');
    const window_chat = document.getElementById('chatbotWindow');
    const close = document.getElementById('chatbotClose');
    const messages = document.getElementById('chatbotMessages');
    const input = document.getElementById('chatInput');
    const sendBtn = document.getElementById('btnSendChat');
    const suggestions = document.querySelectorAll('.suggestion-btn');

    // Toggle chatbot
    toggle.addEventListener('click', () => {
        window_chat.classList.toggle('active');
        toggle.querySelector('.chatbot-badge').style.display = 'none';
    });

    close.addEventListener('click', () => {
        window_chat.classList.remove('active');
    });

    // Send message
    function sendMessage(text) {
        if (!text.trim()) return;

        // Add user message
        addMessage(text, 'user');
        input.value = '';

        // Hide suggestions
        const suggestionsDiv = messages.querySelector('.chat-suggestions');
        if (suggestionsDiv) suggestionsDiv.style.display = 'none';

        // Simulate bot response
        setTimeout(() => {
            const response = getBotResponse(text);
            addMessage(response, 'bot');

            // 📊 ANALYTICS: Tracking de interacción con chatbot
            if (window.trackUserInteraction) {
                // Detectar intención del usuario
                let intent = 'general';
                const lowerText = text.toLowerCase();
                if (lowerText.includes('tour') || lowerText.includes('disponible')) intent = 'tours';
                else if (lowerText.includes('taller')) intent = 'talleres';
                else if (lowerText.includes('paquete')) intent = 'paquetes';
                else if (lowerText.includes('reserva')) intent = 'reserva';
                else if (lowerText.includes('gastronom') || lowerText.includes('comida')) intent = 'gastronomia';
                else if (lowerText.includes('precio') || lowerText.includes('costo')) intent = 'precios';

                trackUserInteraction('chatbot', {
                    userMessage: text,
                    botResponse: response.substring(0, 200),
                    intent: intent
                });
            }
        }, 1000);
    }

    function addMessage(text, type) {
        const messageDiv = document.createElement('div');
        messageDiv.classList.add('chat-message', type);

        const now = new Date();
        const time = now.getHours() + ':' + String(now.getMinutes()).padStart(2, '0');

        messageDiv.innerHTML = `
            <div class="message-avatar">
                <img src="https://via.placeholder.com/30x30/${type === 'bot' ? 'D4A574' : '2C3E50'}/fff?text=${type === 'bot' ? 'CP' : 'TU'}" alt="${type}">
            </div>
            <div class="message-content">
                <p>${text}</p>
                <div class="message-time">${time}</div>
            </div>
        `;

        messages.appendChild(messageDiv);
        messages.scrollTop = messages.scrollHeight;
    }

    function getBotResponse(text) {
        const lowerText = text.toLowerCase();

        // Respuestas del chatbot IA
        const responses = {
            tours: `¡Tenemos tours increíbles! Nuestros más populares son:

• <strong>Circuito Artesanal Completo</strong> (6h) - S/120
• <strong>Tour Gastronómico</strong> (4h) - S/95
• <strong>Catacaos de Noche</strong> (4h) - S/85
• <strong>Narihualá Ancestral</strong> (3h) - S/75

¿Te interesa alguno en especial?`,

            talleres: `¡Nuestros talleres son únicos! Puedes convertirte en artesano por un día:

• <strong>Filigrana en Plata</strong> - S/200 (3h)
• <strong>Tejido Paja Toquilla</strong> - S/80 (2h)
• <strong>Cocina Piurana</strong> - S/150 (4h)
• <strong>Cerámica Tallán</strong> - S/100 (3h)

¡Te llevas lo que creas! ¿Cuál te llama la atención?`,

            paquetes: `Tenemos 3 paquetes diseñados para ti:

• <strong>Catacaos Express</strong> (1 día) - S/149
• <strong>Experiencia Total</strong> (2D/1N) - S/379 ⭐ Más popular
• <strong>Piura Completo</strong> (4D/3N) - S/999

El paquete "Experiencia Total" incluye taller, tour gastronómico y hospedaje. ¿Quieres más detalles?`,

            reserva: `¡Perfecto! Para hacer una reserva necesito algunos datos:

1. ¿Qué experiencia te interesa?
2. ¿Para qué fecha?
3. ¿Cuántas personas?

También puedes reservar directamente en nuestra web haciendo clic en "Reservar" en la experiencia que te interese. ¿Te ayudo con algo más?`,

            filigrana: `La <strong>filigrana de Catacaos</strong> es Patrimonio Cultural de la Nación desde 2010.

Es una técnica ancestral donde se crean joyas con hilos de plata más finos que un cabello humano. Los maestros artesanos te enseñarán paso a paso y te llevarás tu creación.

<strong>Taller de Filigrana:</strong>
• Duración: 3 horas
• Precio: S/200 por persona
• Incluye: Materiales, instructor y certificado

¿Te gustaría reservar?`,

            gastronomia: `¡La gastronomía piurana es increíble! No te puedes perder:

• <strong>Seco de Chabelo</strong> - Plato bandera de Piura
• <strong>Ceviche de Mero</strong> - El original piurano
• <strong>Malarrabia</strong> - Tradicional de Semana Santa
• <strong>Chicha de Jora</strong> - Bebida ancestral

Nuestro Tour Gastronómico (S/95) incluye 5 paradas culinarias. ¿Te animas?`,

            semana_santa: `La <strong>Semana Santa de Catacaos</strong> es la más importante del norte peruano y Patrimonio Cultural de la Nación.

En 2025 será del 11 al 20 de abril. Incluye:
• Procesiones tradicionales
• Los siete potajes del Jueves Santo
• Alfombras de flores
• Música y tradición

Tenemos un paquete especial de 3D/2N desde S/650. ¿Te interesa?`,

            default: `¡Gracias por tu mensaje! Soy el Cholo Piurano, tu asistente virtual.

Puedo ayudarte con:
• Información sobre tours y experiencias
• Reservas y disponibilidad
• Talleres artesanales
• Gastronomía local
• Paquetes turísticos

¿En qué puedo ayudarte?`
        };

        // Determine response
        if (lowerText.includes('tour') || lowerText.includes('disponible')) {
            return responses.tours;
        } else if (lowerText.includes('taller') || lowerText.includes('filigrana')) {
            return responses.talleres;
        } else if (lowerText.includes('paquete') || lowerText.includes('incluye')) {
            return responses.paquetes;
        } else if (lowerText.includes('reserva') || lowerText.includes('reservar')) {
            return responses.reserva;
        } else if (lowerText.includes('comida') || lowerText.includes('gastronom') || lowerText.includes('comer')) {
            return responses.gastronomia;
        } else if (lowerText.includes('semana santa') || lowerText.includes('abril')) {
            return responses.semana_santa;
        } else if (lowerText.includes('precio') || lowerText.includes('costo') || lowerText.includes('cuanto')) {
            return responses.paquetes;
        } else if (lowerText.includes('hola') || lowerText.includes('buenos') || lowerText.includes('buenas')) {
            return `¡Hola! Bienvenido al Circuito Turístico Piura-Catacaos. Soy el Cholo Piurano, tu asistente virtual. ¿En qué puedo ayudarte hoy?`;
        } else {
            return responses.default;
        }
    }

    sendBtn.addEventListener('click', () => sendMessage(input.value));

    input.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            sendMessage(input.value);
        }
    });

    suggestions.forEach(btn => {
        btn.addEventListener('click', () => {
            const message = btn.getAttribute('data-message');
            sendMessage(message);
        });
    });
}

// ============================================
// 9. CARRITO DE COMPRAS
// ============================================

let cart = [];

function initCart() {
    const cartBtn = document.getElementById('btnCart');
    const cartSidebar = document.getElementById('cartSidebar');
    const cartClose = document.getElementById('cartClose');
    const overlay = document.getElementById('overlay');

    cartBtn.addEventListener('click', () => {
        cartSidebar.classList.add('active');
        overlay.classList.add('active');
    });

    cartClose.addEventListener('click', closeCart);
    overlay.addEventListener('click', () => {
        closeCart();
        closeModal();
    });

    function closeCart() {
        cartSidebar.classList.remove('active');
        overlay.classList.remove('active');
    }

    // Checkout button
    const checkoutBtn = document.getElementById('btnCheckout');
    checkoutBtn.addEventListener('click', () => {
        if (cart.length > 0) {
            // 📊 ANALYTICS: Tracking de inicio de checkout
            if (window.trackUserInteraction) {
                const totalValue = cart.reduce((sum, item) => sum + item.total, 0);
                trackUserInteraction('checkout', {
                    items: cart.map(item => ({
                        name: item.name,
                        price: item.total,
                        date: item.date
                    })),
                    total: totalValue
                });
            }

            showToast('success', 'Checkout', 'Redirigiendo al proceso de pago...');
            // Here would go the payment integration
        }
    });
}

function addToCart(item) {
    cart.push(item);
    updateCart();
    showToast('success', 'Añadido', `${item.name} agregado al carrito`);

    // 📊 ANALYTICS: Tracking de agregar al carrito
    if (window.trackUserInteraction) {
        trackUserInteraction('add_to_cart', {
            id: item.id || item.name,
            name: item.name,
            price: item.price || item.total,
            quantity: parseInt(item.persons) || 1,
            date: item.date
        });
    }
}

function removeFromCart(index) {
    cart.splice(index, 1);
    updateCart();
}

function updateCart() {
    const cartItems = document.getElementById('cartItems');
    const cartEmpty = document.getElementById('cartEmpty');
    const cartFooter = document.getElementById('cartFooter');
    const cartCount = document.getElementById('cartCount');
    const cartTotal = document.getElementById('cartTotal');

    cartCount.textContent = cart.length;

    if (cart.length === 0) {
        cartItems.style.display = 'none';
        cartEmpty.style.display = 'flex';
        cartFooter.style.display = 'none';
    } else {
        cartItems.style.display = 'block';
        cartEmpty.style.display = 'none';
        cartFooter.style.display = 'block';

        cartItems.innerHTML = cart.map((item, index) => `
            <div class="cart-item">
                <div class="cart-item-image">
                    <img src="https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=100" alt="${item.name}">
                </div>
                <div class="cart-item-info">
                    <h4>${item.name}</h4>
                    <p>${item.date} - ${item.persons} persona(s)</p>
                    <span class="cart-item-price">S/${item.total}</span>
                </div>
                <button class="cart-item-remove" onclick="removeFromCart(${index})">
                    <i class="fas fa-trash"></i>
                </button>
            </div>
        `).join('');

        const total = cart.reduce((sum, item) => sum + item.total, 0);
        cartTotal.textContent = `S/${total}`;
    }
}

// ============================================
// 10. MODALES
// ============================================

function initModals() {
    const modal = document.getElementById('reservaModal');
    const modalClose = document.getElementById('modalClose');

    modalClose.addEventListener('click', closeModal);

    // Close on outside click
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeModal();
        }
    });

    // Price calculation
    const personasSelect = document.getElementById('modalPersonas');
    personasSelect.addEventListener('change', updateModalPrice);
}

function openReservaModal(id, name, price) {
    const modal = document.getElementById('reservaModal');
    const overlay = document.getElementById('overlay');

    document.getElementById('modalExperiencia').value = name;
    document.getElementById('modalPrecio').textContent = `S/${price}`;

    // Set minimum date to today
    const today = new Date().toISOString().split('T')[0];
    document.getElementById('modalFecha').min = today;

    // Store price for calculation
    modal.setAttribute('data-price', price);

    modal.classList.add('active');
    overlay.classList.add('active');
}

function closeModal() {
    const modal = document.getElementById('reservaModal');
    const overlay = document.getElementById('overlay');
    const cartSidebar = document.getElementById('cartSidebar');

    modal.classList.remove('active');
    if (!cartSidebar.classList.contains('active')) {
        overlay.classList.remove('active');
    }
}

function updateModalPrice() {
    const modal = document.getElementById('reservaModal');
    const basePrice = parseInt(modal.getAttribute('data-price'));
    const persons = document.getElementById('modalPersonas').value;

    let numPersons = parseInt(persons) || 1;
    if (persons === '6+') numPersons = 6;

    const total = basePrice * numPersons;
    document.getElementById('modalPrecio').textContent = `S/${total}`;
}

// ============================================
// 11. FORMULARIOS
// ============================================

function initForms() {
    // Reservation form
    const reservaForm = document.getElementById('reservaForm');
    reservaForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const item = {
            name: document.getElementById('modalExperiencia').value,
            date: document.getElementById('modalFecha').value,
            persons: document.getElementById('modalPersonas').value,
            total: parseInt(document.getElementById('modalPrecio').textContent.replace('S/', ''))
        };

        addToCart(item);
        closeModal();

        // Open cart
        document.getElementById('cartSidebar').classList.add('active');
        document.getElementById('overlay').classList.add('active');
    });

    // Contact form
    const contactForm = document.getElementById('contactForm');
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const formData = new FormData(contactForm);
        const data = Object.fromEntries(formData);

        // 📊 ANALYTICS: Tracking de formulario de contacto
        if (window.trackUserInteraction) {
            trackUserInteraction('form', {
                formName: 'contacto',
                formData: {
                    asunto: data.asunto,
                    hasPhone: !!data.telefono,
                    messageLength: data.mensaje?.length || 0
                }
            });
        }

        console.log('Contact form submitted:', data);
        showToast('success', 'Mensaje enviado', 'Nos pondremos en contacto contigo pronto');
        contactForm.reset();
    });

    // Newsletter form
    const newsletterForm = document.getElementById('newsletterForm');
    newsletterForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const email = document.getElementById('newsletterEmail').value;

        // 📊 ANALYTICS: Tracking de suscripción a newsletter
        if (window.trackUserInteraction) {
            trackUserInteraction('form', {
                formName: 'newsletter',
                formData: {
                    emailDomain: email.split('@')[1] || 'unknown'
                }
            });
        }

        console.log('Newsletter subscription:', email);
        showToast('success', 'Suscrito', 'Recibirás nuestras ofertas exclusivas');
        newsletterForm.reset();
    });

    // Cotización button
    const cotizarBtn = document.getElementById('btnCotizar');
    if (cotizarBtn) {
        cotizarBtn.addEventListener('click', () => {
            document.getElementById('contacto').scrollIntoView({ behavior: 'smooth' });
            document.getElementById('asunto').value = 'grupos';
        });
    }
}

// ============================================
// 12. MAPA INTERACTIVO (PLACEHOLDER)
// ============================================

function initMapPlaceholder() {
    // Si Leaflet esta disponible, no crear placeholder (map.js lo manejara)
    if (typeof L !== 'undefined') {
        console.log('Leaflet detectado - mapa sera inicializado por map.js');
        return;
    }

    // Placeholder solo si Leaflet no esta disponible
    var mapContainer = document.getElementById('map');
    if (mapContainer) {
        mapContainer.innerHTML = '<div style="width:100%;height:100%;display:flex;flex-direction:column;justify-content:center;align-items:center;background:#f5f5f5;color:#666;"><i class="fas fa-map-marked-alt" style="font-size:4rem;margin-bottom:1rem;color:#D4A574;"></i><h3>Cargando mapa...</h3></div>';
    }

    // Panel de detalle
    const detailPanel = document.getElementById('placeDetailPanel');
    const closeDetailBtn = document.getElementById('closeDetail');
    const detailImage = document.getElementById('detailImage');
    const detailTitle = document.getElementById('detailTitle');
    const detailDesc = document.getElementById('detailDesc');
    const detailHorario = document.getElementById('detailHorario');
    const detailPrecio = document.getElementById('detailPrecio');
    const detailCoords = document.getElementById('detailCoords');
    const btnComoLlegar = document.getElementById('btnComoLlegar');

    let currentPlaceCoords = { lat: 0, lng: 0 };

    // Función para mostrar detalle del lugar
    function showPlaceDetail(item) {
        const image = item.getAttribute('data-image');
        const title = item.getAttribute('data-title');
        const desc = item.getAttribute('data-desc');
        const horario = item.getAttribute('data-horario');
        const precio = item.getAttribute('data-precio');
        const lat = item.getAttribute('data-lat');
        const lng = item.getAttribute('data-lng');

        // Actualizar contenido del panel
        detailImage.src = image;
        detailImage.alt = title;
        detailTitle.textContent = title;
        detailDesc.textContent = desc;
        detailHorario.textContent = horario;
        detailPrecio.textContent = precio;
        detailCoords.textContent = `${lat}, ${lng}`;

        // Guardar coordenadas para "Cómo llegar"
        currentPlaceCoords = { lat: parseFloat(lat), lng: parseFloat(lng) };

        // Mostrar panel
        detailPanel.classList.add('active');

        // 📊 ANALYTICS: Tracking de lugar visto en detalle
        if (window.trackUserInteraction) {
            trackUserInteraction('map', {
                action: 'place_detail_view',
                location: title,
                coordinates: `${lat}, ${lng}`
            });
        }
    }

    // Cerrar panel de detalle
    closeDetailBtn?.addEventListener('click', () => {
        detailPanel.classList.remove('active');
    });

    // Botón "Cómo llegar" - abre Google Maps
    btnComoLlegar?.addEventListener('click', () => {
        const url = `https://www.google.com/maps/dir/?api=1&destination=${currentPlaceCoords.lat},${currentPlaceCoords.lng}`;
        window.open(url, '_blank');

        // 📊 ANALYTICS: Tracking de clic en "Cómo llegar"
        if (window.trackUserInteraction) {
            trackUserInteraction('map', {
                action: 'get_directions',
                location: detailTitle.textContent
            });
        }
    });

    // Place items interaction
    const placeItems = document.querySelectorAll('.place-item');
    placeItems.forEach(item => {
        item.addEventListener('click', () => {
            placeItems.forEach(i => i.classList.remove('active'));
            item.classList.add('active');

            // Mostrar panel de detalle con la información del lugar
            showPlaceDetail(item);
        });
    });

    // Map filters
    const mapFilters = document.querySelectorAll('.map-filter');
    mapFilters.forEach(filter => {
        filter.addEventListener('click', () => {
            mapFilters.forEach(f => f.classList.remove('active'));
            filter.classList.add('active');

            const filterType = filter.getAttribute('data-filter');

            // Cerrar panel de detalle al cambiar filtro
            detailPanel.classList.remove('active');

            placeItems.forEach(item => {
                const type = item.getAttribute('data-type');
                if (filterType === 'all' || type === filterType) {
                    item.style.display = 'flex';
                } else {
                    item.style.display = 'none';
                }
            });

            // 📊 ANALYTICS: Tracking de filtro de mapa
            if (window.trackUserInteraction) {
                trackUserInteraction('map', {
                    action: 'filter_applied',
                    filterType: filterType
                });
            }
        });
    });

    // Búsqueda en el mapa
    const mapaSearch = document.getElementById('mapaSearch');
    mapaSearch?.addEventListener('input', (e) => {
        const searchTerm = e.target.value.toLowerCase();

        placeItems.forEach(item => {
            const title = item.getAttribute('data-title').toLowerCase();
            const desc = item.getAttribute('data-desc').toLowerCase();

            if (title.includes(searchTerm) || desc.includes(searchTerm)) {
                item.style.display = 'flex';
            } else {
                item.style.display = 'none';
            }
        });

        // Resetear filtros activos
        if (searchTerm) {
            mapFilters.forEach(f => f.classList.remove('active'));
        }
    });

    // Map controls
    document.getElementById('btnZoomIn')?.addEventListener('click', () => {
        // 📊 ANALYTICS: Tracking de zoom en mapa
        if (window.trackUserInteraction) {
            trackUserInteraction('map', { action: 'zoom_in' });
        }
        showToast('info', 'Zoom', 'Acercando mapa...');
    });

    document.getElementById('btnZoomOut')?.addEventListener('click', () => {
        // 📊 ANALYTICS: Tracking de zoom en mapa
        if (window.trackUserInteraction) {
            trackUserInteraction('map', { action: 'zoom_out' });
        }
        showToast('info', 'Zoom', 'Alejando mapa...');
    });

    document.getElementById('btnMyLocation')?.addEventListener('click', () => {
        // 📊 ANALYTICS: Tracking de solicitud de ubicación
        if (window.trackUserInteraction) {
            trackUserInteraction('map', { action: 'my_location_requested' });
        }

        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((position) => {
                // 📊 ANALYTICS: Tracking de ubicación obtenida
                if (window.trackUserInteraction) {
                    trackUserInteraction('map', {
                        action: 'my_location_success',
                        coordinates: `${position.coords.latitude.toFixed(4)}, ${position.coords.longitude.toFixed(4)}`
                    });
                }
                showToast('success', 'Ubicación', `Tu ubicación: ${position.coords.latitude.toFixed(4)}, ${position.coords.longitude.toFixed(4)}`);
            }, () => {
                showToast('error', 'Error', 'No se pudo obtener tu ubicación');
            });
        } else {
            showToast('error', 'Error', 'Geolocalización no soportada');
        }
    });

    document.getElementById('btnFullscreen')?.addEventListener('click', () => {
        // 📊 ANALYTICS: Tracking de pantalla completa
        if (window.trackUserInteraction) {
            trackUserInteraction('map', { action: 'fullscreen' });
        }
        const mapFrame = document.querySelector('.mapa-frame');
        if (mapFrame.requestFullscreen) {
            mapFrame.requestFullscreen();
        }
    });
}

// Real Google Maps initialization (when API key is added)
function initMap() {
    // This function is called by Google Maps API
    const catacaos = { lat: -5.1945, lng: -80.6286 };

    const map = new google.maps.Map(document.getElementById('map'), {
        zoom: 14,
        center: catacaos,
        styles: [
            {
                featureType: 'poi',
                elementType: 'labels',
                stylers: [{ visibility: 'off' }]
            }
        ]
    });

    // Add markers for places
    const places = [
        { lat: -5.1945, lng: -80.6286, title: 'Calle Comercio', icon: 'gem' },
        { lat: -5.1960, lng: -80.6275, title: 'Iglesia San Juan Bautista', icon: 'church' },
        { lat: -5.1800, lng: -80.6100, title: 'Narihualá', icon: 'landmark' },
        { lat: -5.1945, lng: -80.6320, title: 'El Cantarito', icon: 'utensils' },
    ];

    places.forEach(place => {
        new google.maps.Marker({
            position: { lat: place.lat, lng: place.lng },
            map: map,
            title: place.title
        });
    });
}

// ============================================
// 13. EFECTOS DE SCROLL
// ============================================

function initScrollEffects() {
    // Parallax effect for hero
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const heroContent = document.querySelector('.hero-content');

        if (heroContent && scrolled < window.innerHeight) {
            heroContent.style.transform = `translateY(${scrolled * 0.3}px)`;
            heroContent.style.opacity = 1 - (scrolled / window.innerHeight);
        }
    });

    // Reveal animations
    const revealElements = document.querySelectorAll('[data-aos]');

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('aos-animate');
            }
        });
    }, { threshold: 0.1 });

    revealElements.forEach(el => revealObserver.observe(el));
}

// ============================================
// 14. TOAST NOTIFICATIONS
// ============================================

function showToast(type, title, message) {
    const container = document.getElementById('toastContainer');

    const icons = {
        success: 'fa-check-circle',
        error: 'fa-exclamation-circle',
        info: 'fa-info-circle'
    };

    const toast = document.createElement('div');
    toast.classList.add('toast', type);
    toast.innerHTML = `
        <i class="fas ${icons[type]}"></i>
        <div class="toast-content">
            <h4>${title}</h4>
            <p>${message}</p>
        </div>
        <button class="toast-close"><i class="fas fa-times"></i></button>
    `;

    container.appendChild(toast);

    // Close button
    toast.querySelector('.toast-close').addEventListener('click', () => {
        toast.remove();
    });

    // Auto remove
    setTimeout(() => {
        toast.style.animation = 'slideInRight 0.3s ease reverse';
        setTimeout(() => toast.remove(), 300);
    }, 4000);
}

// ============================================
// 15. UTILIDADES
// ============================================

// Debounce function
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Throttle function
function throttle(func, limit) {
    let inThrottle;
    return function(...args) {
        if (!inThrottle) {
            func.apply(this, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// Format currency
function formatCurrency(amount) {
    return new Intl.NumberFormat('es-PE', {
        style: 'currency',
        currency: 'PEN'
    }).format(amount);
}

// Date formatter
function formatDate(date) {
    return new Intl.DateTimeFormat('es-PE', {
        day: '2-digit',
        month: 'long',
        year: 'numeric'
    }).format(new Date(date));
}

// ============================================
// 16. LANGUAGE SWITCHER (Placeholder)
// ============================================

document.getElementById('btnLanguage')?.addEventListener('click', () => {
    const currentLang = document.getElementById('btnLanguage').querySelector('span').textContent;
    const newLang = currentLang === 'ES' ? 'EN' : 'ES';
    document.getElementById('btnLanguage').querySelector('span').textContent = newLang;
    showToast('info', 'Idioma', `Idioma cambiado a ${newLang === 'ES' ? 'Español' : 'English'}`);
});

// ============================================
// 17. USER AUTHENTICATION (Placeholder)
// ============================================

document.getElementById('btnUser')?.addEventListener('click', () => {
    showToast('info', 'Cuenta', 'Función de inicio de sesión próximamente');
});

// ============================================
// EXPORT FOR GLOBAL ACCESS
// ============================================

window.removeFromCart = removeFromCart;
window.initMap = initMap;

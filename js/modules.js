/**
 * CIRCUITO TURISTICO PIURA - CATACAOS
 * Modulos Adicionales - Quick View, Destinos, etc.
 */

// ============================================
// DATOS DE EXPERIENCIAS
// ============================================

const experienciasData = {
    '1': {
        name: 'Circuito Artesanal Completo',
        category: 'Artesania',
        categoryIcon: 'fa-gem',
        desc: 'Recorre los talleres mas emblematicos de Catacaos. Visitaras a maestros artesanos de filigrana en plata, tejedores de paja toquilla y ceramistas que mantienen vivas las tecnicas ancestrales. Incluye demostracion en vivo y tiempo para compras.',
        duration: '6 horas',
        maxPeople: 'Max. 12',
        languages: 'ES/EN',
        rating: 4.8,
        reviews: 256,
        price: 120,
        image: 'https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=600',
        badges: ['Mas vendido']
    },
    '2': {
        name: 'Tour Gastronomico Piurano',
        category: 'Gastronomia',
        categoryIcon: 'fa-utensils',
        desc: 'Un recorrido por los sabores autenticos de Piura. Visitaras 5 paradas culinarias donde probaras ceviche de mero, seco de chabelo, malarrabia, chifles artesanales y la tradicional chicha de jora.',
        duration: '4 horas',
        maxPeople: 'Max. 10',
        languages: 'ES/EN',
        rating: 4.9,
        reviews: 189,
        price: 95,
        image: 'assets/images/Tour gastronómico.jpg',
        badges: []
    },
    '3': {
        name: 'Semana Santa en Catacaos',
        category: 'Cultura',
        categoryIcon: 'fa-church',
        desc: 'Vive la festividad religiosa mas importante del norte peruano. Experimenta las procesiones tradicionales, los siete potajes del Jueves Santo, las alfombras de flores y la devocion de todo un pueblo.',
        duration: '3 dias',
        maxPeople: 'Max. 20',
        languages: 'ES',
        rating: 5.0,
        reviews: 98,
        price: 450,
        image: 'assets/images/Semana santa Catacaos.jpg',
        badges: ['Estacional']
    },
    '4': {
        name: 'Catacaos de Noche',
        category: 'Nocturno',
        categoryIcon: 'fa-moon',
        desc: 'Descubre el lado nocturno de Catacaos. Visita las chicherias tradicionales donde la chicha de jora fluye, disfruta de penas criollas con musica en vivo y saborea los mejores platos nocturnos.',
        duration: '4 horas',
        maxPeople: 'Max. 15',
        languages: 'ES',
        rating: 4.5,
        reviews: 67,
        price: 85,
        image: 'assets/images/Catacaos de noche.jpg',
        badges: []
    },
    '5': {
        name: 'Narihuala Ancestral',
        category: 'Arqueologia',
        categoryIcon: 'fa-landmark',
        desc: 'Explora el legado de la cultura Tallan en el complejo arqueologico de Narihuala. Guias especializados en historia preincaica te llevaran a traves de las piramides de adobe y el museo de sitio.',
        duration: '3 horas',
        maxPeople: 'Max. 15',
        languages: 'ES/EN',
        rating: 4.7,
        reviews: 124,
        price: 75,
        image: 'assets/images/Narihuala.jpg',
        badges: []
    },
    '6': {
        name: 'Catacaos + Colan',
        category: 'Playa + Cultura',
        categoryIcon: 'fa-umbrella-beach',
        desc: 'Lo mejor de dos mundos en un solo dia. Por la manana, recorre los talleres artesanales y disfruta de la gastronomia local. Por la tarde, relajate en las hermosas playas de Colan.',
        duration: 'Full day',
        maxPeople: 'Max. 12',
        languages: 'ES/EN',
        rating: 4.9,
        reviews: 45,
        price: 180,
        image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=600',
        badges: ['Nuevo']
    }
};

// ============================================
// DATOS DE DESTINOS
// ============================================

const destinosData = {
    'calle-comercio': {
        name: 'Calle Comercio',
        location: 'Catacaos, Piura',
        image: 'assets/images/Calle el comercio.jpg',
        desc: 'El corazon artesanal de Catacaos y el lugar mas emblematico para conocer la artesania piurana. A lo largo de esta calle encontraras talleres de filigrana en plata, tiendas de sombreros de paja toquilla, ceramicas tradicionales, bordados y tejidos.',
        highlights: [
            'Filigrana en plata - Patrimonio Cultural',
            'Sombreros de paja toquilla',
            'Ceramicas y artesanias tradicionales',
            'Restaurantes de comida tipica',
            'Ambiente tradicional y colorido'
        ]
    },
    'iglesia': {
        name: 'Iglesia San Juan Bautista',
        location: 'Catacaos',
        image: 'assets/images/Iglesia Catacaos.jpg',
        desc: 'Joya arquitectonica colonial construida en el siglo XVII. Esta iglesia es famosa por sus impresionantes murales en el cielo raso que representan escenas biblicas, y su altar mayor banado en pan de oro.',
        highlights: [
            'Arquitectura colonial del siglo XVII',
            'Murales historicos en el cielo raso',
            'Altar banado en pan de oro',
            'Centro de Semana Santa',
            'Entrada libre'
        ]
    },
    'narihuala': {
        name: 'Complejo Arqueologico Narihuala',
        location: 'Narihuala, Catacaos',
        image: 'assets/images/Narihuala.jpg',
        desc: 'Vestigios de la cultura Tallan, civilizacion preincaica que habito el norte peruano. El complejo incluye piramides de adobe, un museo de sitio con piezas originales y un area de interpretacion cultural.',
        highlights: [
            'Piramides de adobe preincaicas',
            'Museo de sitio con piezas originales',
            'Cultura Tallan (200 a.C. - 1400 d.C.)',
            'Guias especializados',
            'Entrada: S/5 adultos - S/2 estudiantes'
        ]
    },
    'plaza': {
        name: 'Plaza de Armas de Piura',
        location: 'Piura Centro',
        image: 'assets/images/Piura.jpg',
        desc: 'El corazon de la ciudad de Piura, rodeada de edificios coloniales e historicos. Aqui se encuentra la Catedral de Piura, la Municipalidad y diversos locales comerciales.',
        highlights: [
            'Catedral de Piura',
            'Arquitectura colonial',
            'Centro historico',
            'Restaurantes y cafes',
            'Vida urbana piurana'
        ]
    },
    'playas': {
        name: 'Playas del Norte',
        location: 'Colan, Paita',
        image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800',
        desc: 'Las mejores playas del norte peruano estan a solo una hora de Catacaos. Colan destaca por su iglesia colonial frente al mar, mientras que mas al norte encontraras Mancora, Vichayito y Los Organos.',
        highlights: [
            'Playa Colan con iglesia colonial',
            'Mancora - Capital del surf',
            'Vichayito - Playa exclusiva',
            'Deportes acuaticos',
            'Gastronomia marina'
        ]
    }
};

// ============================================
// QUICK VIEW MODAL
// ============================================

function initQuickView() {
    const modal = document.getElementById('quickViewModal');
    const closeBtn = document.getElementById('qvClose');
    const reservarBtn = document.getElementById('qvReservar');
    const wishlistBtn = document.getElementById('qvWishlist');

    // Quick view buttons
    document.querySelectorAll('.btn-quick-view').forEach(function(btn) {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            var id = btn.getAttribute('data-id');
            openQuickView(id);
        });
    });

    // Close modal
    if (closeBtn) {
        closeBtn.addEventListener('click', closeQuickView);
    }

    if (modal) {
        modal.addEventListener('click', function(e) {
            if (e.target === modal) closeQuickView();
        });
    }

    // Reservar from quick view
    if (reservarBtn) {
        reservarBtn.addEventListener('click', function() {
            var name = document.getElementById('qvName').textContent;
            var price = document.getElementById('qvPrice').textContent.replace('S/', '');
            closeQuickView();
            openReservaModal(null, name, price);
        });
    }

    // Wishlist toggle
    if (wishlistBtn) {
        wishlistBtn.addEventListener('click', function() {
            wishlistBtn.classList.toggle('active');
            var icon = wishlistBtn.querySelector('i');
            if (wishlistBtn.classList.contains('active')) {
                icon.classList.remove('far');
                icon.classList.add('fas');
                showToast('success', 'Guardado', 'Anadido a favoritos');
            } else {
                icon.classList.remove('fas');
                icon.classList.add('far');
                showToast('info', 'Eliminado', 'Removido de favoritos');
            }
        });
    }
}

function openQuickView(id) {
    var data = experienciasData[id];
    if (!data) return;

    var modal = document.getElementById('quickViewModal');
    var overlay = document.getElementById('overlay');

    document.getElementById('qvImage').src = data.image;
    document.getElementById('qvName').textContent = data.name;
    document.getElementById('qvCategory').innerHTML = '<span><i class="fas ' + data.categoryIcon + '"></i> ' + data.category + '</span>';
    document.getElementById('qvDesc').textContent = data.desc;

    document.getElementById('qvDetails').innerHTML =
        '<span><i class="fas fa-clock"></i> ' + data.duration + '</span>' +
        '<span><i class="fas fa-users"></i> ' + data.maxPeople + '</span>' +
        '<span><i class="fas fa-language"></i> ' + data.languages + '</span>';

    // Rating stars
    var starsHtml = '';
    for (var i = 0; i < Math.floor(data.rating); i++) {
        starsHtml += '<i class="fas fa-star"></i>';
    }
    if (data.rating % 1) {
        starsHtml += '<i class="fas fa-star-half-alt"></i>';
    }
    document.getElementById('qvRating').innerHTML = '<div class="stars">' + starsHtml + '</div><span>' + data.rating + ' (' + data.reviews + ' resenas)</span>';

    document.getElementById('qvPrice').textContent = 'S/' + data.price;

    // Badges
    var badgesHtml = '';
    data.badges.forEach(function(badge) {
        badgesHtml += '<span class="badge-bestseller"><i class="fas fa-fire"></i> ' + badge + '</span>';
    });
    document.getElementById('qvBadges').innerHTML = badgesHtml;

    modal.classList.add('active');
    overlay.classList.add('active');
}

function closeQuickView() {
    var modal = document.getElementById('quickViewModal');
    var overlay = document.getElementById('overlay');
    var cartSidebar = document.getElementById('cartSidebar');

    modal.classList.remove('active');
    if (!cartSidebar.classList.contains('active')) {
        overlay.classList.remove('active');
    }
}

// ============================================
// DESTINO MODAL
// ============================================

function initDestinoModal() {
    var modal = document.getElementById('destinoModal');
    var closeBtn = document.getElementById('destClose');
    var explorarBtn = document.getElementById('destExplorar');
    var toursBtn = document.getElementById('destTours');

    // Destino buttons
    document.querySelectorAll('.btn-destino').forEach(function(btn) {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            var tour = btn.getAttribute('data-tour');
            openDestinoModal(tour);
        });
    });

    // Close
    if (closeBtn) {
        closeBtn.addEventListener('click', closeDestinoModal);
    }

    if (modal) {
        modal.addEventListener('click', function(e) {
            if (e.target === modal) closeDestinoModal();
        });
    }

    // Ver en mapa
    if (explorarBtn) {
        explorarBtn.addEventListener('click', function() {
            closeDestinoModal();
            document.getElementById('mapa').scrollIntoView({ behavior: 'smooth' });
        });
    }

    // Tours relacionados
    if (toursBtn) {
        toursBtn.addEventListener('click', function() {
            closeDestinoModal();
            document.getElementById('experiencias').scrollIntoView({ behavior: 'smooth' });
        });
    }
}

function openDestinoModal(tourId) {
    var data = destinosData[tourId];
    if (!data) return;

    var modal = document.getElementById('destinoModal');
    var overlay = document.getElementById('overlay');

    document.getElementById('destImage').src = data.image;
    document.getElementById('destName').textContent = data.name;
    document.getElementById('destLocation').innerHTML = '<i class="fas fa-map-marker-alt"></i> ' + data.location;
    document.getElementById('destDesc').textContent = data.desc;

    var highlightsHtml = '<h4><i class="fas fa-star"></i> Destacados</h4><ul>';
    data.highlights.forEach(function(h) {
        highlightsHtml += '<li><i class="fas fa-check"></i> ' + h + '</li>';
    });
    highlightsHtml += '</ul>';
    document.getElementById('destHighlights').innerHTML = highlightsHtml;

    modal.classList.add('active');
    overlay.classList.add('active');
}

function closeDestinoModal() {
    var modal = document.getElementById('destinoModal');
    var overlay = document.getElementById('overlay');
    var cartSidebar = document.getElementById('cartSidebar');

    modal.classList.remove('active');
    if (!cartSidebar.classList.contains('active')) {
        overlay.classList.remove('active');
    }
}

// ============================================
// VER TODAS LAS EXPERIENCIAS
// ============================================

function initVerMas() {
    var btnVerMas = document.getElementById('btnVerMas');

    if (btnVerMas) {
        btnVerMas.addEventListener('click', function() {
            showToast('info', 'Experiencias', 'Mostrando todas las experiencias disponibles');

            // Mostrar todas las cards
            document.querySelectorAll('.exp-card').forEach(function(card) {
                card.style.display = 'block';
                card.style.animation = 'fadeIn 0.5s ease';
            });

            // Resetear filtros
            document.querySelectorAll('.filter-btn').forEach(function(btn) {
                btn.classList.remove('active');
            });
            var allBtn = document.querySelector('.filter-btn[data-filter="all"]');
            if (allBtn) allBtn.classList.add('active');

            // Scroll a experiencias
            document.getElementById('experiencias').scrollIntoView({ behavior: 'smooth' });
        });
    }
}

// ============================================
// PAQUETES ESTACIONALES
// ============================================

function initPaquetesEstacionales() {
    document.querySelectorAll('.btn-seasonal').forEach(function(btn) {
        btn.addEventListener('click', function() {
            var card = btn.closest('.seasonal-card');
            var title = 'Paquete Estacional';
            if (card) {
                var h4 = card.querySelector('h4');
                if (h4) title = h4.textContent;
            }

            showToast('info', title, 'Contacta con nosotros para mas informacion');

            // Scroll a contacto
            document.getElementById('contacto').scrollIntoView({ behavior: 'smooth' });

            setTimeout(function() {
                document.getElementById('asunto').value = 'paquetes';
                document.getElementById('mensaje').value = 'Hola, me interesa obtener mas informacion sobre el paquete "' + title + '". Por favor contactenme.';
                document.getElementById('mensaje').focus();
            }, 800);
        });
    });
}

// ============================================
// INICIALIZAR MODULOS
// ============================================

document.addEventListener('DOMContentLoaded', function() {
    setTimeout(function() {
        initQuickView();
        initDestinoModal();
        initVerMas();
        initPaquetesEstacionales();
        console.log('Modulos adicionales inicializados correctamente');
    }, 200);
});

// Export functions for global access
window.openQuickView = openQuickView;
window.closeQuickView = closeQuickView;
window.openDestinoModal = openDestinoModal;
window.closeDestinoModal = closeDestinoModal;

// ============================================
// CHECKOUT SYSTEM
// ============================================

// Numero de WhatsApp del negocio (cambiar por el real)
var WHATSAPP_NUMBER = '51987654321';

function initCheckout() {
    var checkoutModal = document.getElementById('checkoutModal');
    var checkoutClose = document.getElementById('checkoutClose');
    var btnBackToCart = document.getElementById('btnBackToCart');
    var checkoutForm = document.getElementById('checkoutForm');
    var btnCheckout = document.getElementById('btnCheckout');

    // Abrir checkout desde carrito
    if (btnCheckout) {
        btnCheckout.addEventListener('click', function() {
            if (typeof cart !== 'undefined' && cart.length > 0) {
                openCheckoutModal();
            } else {
                showToast('info', 'Carrito vacio', 'Agrega experiencias antes de continuar');
            }
        });
    }

    // Cerrar checkout
    if (checkoutClose) {
        checkoutClose.addEventListener('click', closeCheckoutModal);
    }

    if (checkoutModal) {
        checkoutModal.addEventListener('click', function(e) {
            if (e.target === checkoutModal) closeCheckoutModal();
        });
    }

    // Volver al carrito
    if (btnBackToCart) {
        btnBackToCart.addEventListener('click', function() {
            closeCheckoutModal();
            document.getElementById('cartSidebar').classList.add('active');
            document.getElementById('overlay').classList.add('active');
        });
    }

    // Enviar formulario
    if (checkoutForm) {
        checkoutForm.addEventListener('submit', function(e) {
            e.preventDefault();
            processCheckout();
        });
    }
}

function openCheckoutModal() {
    var modal = document.getElementById('checkoutModal');
    var overlay = document.getElementById('overlay');
    var cartSidebar = document.getElementById('cartSidebar');

    // Cerrar carrito
    cartSidebar.classList.remove('active');

    // Cargar items del carrito en el checkout
    loadCheckoutItems();

    // Abrir modal
    modal.classList.add('active');
    overlay.classList.add('active');
}

function closeCheckoutModal() {
    var modal = document.getElementById('checkoutModal');
    var overlay = document.getElementById('overlay');

    modal.classList.remove('active');
    overlay.classList.remove('active');
}

function loadCheckoutItems() {
    var checkoutItems = document.getElementById('checkoutItems');
    var checkoutTotal = document.getElementById('checkoutTotal');

    if (typeof cart === 'undefined' || cart.length === 0) {
        checkoutItems.innerHTML = '<p>No hay items en el carrito</p>';
        checkoutTotal.textContent = 'S/0';
        return;
    }

    var html = '';
    var total = 0;

    cart.forEach(function(item) {
        html += '<div class="checkout-item">';
        html += '<div class="checkout-item-info">';
        html += '<strong>' + item.name + '</strong>';
        html += '<span>' + item.date + ' - ' + item.persons + ' persona(s)</span>';
        html += '</div>';
        html += '<div class="checkout-item-price">S/' + item.total + '</div>';
        html += '</div>';
        total += item.total;
    });

    checkoutItems.innerHTML = html;
    checkoutTotal.textContent = 'S/' + total;
}

function processCheckout() {
    var nombre = document.getElementById('checkoutNombre').value;
    var email = document.getElementById('checkoutEmail').value;
    var telefono = document.getElementById('checkoutTelefono').value;
    var notas = document.getElementById('checkoutNotas').value;
    var metodoPago = document.querySelector('input[name="metodoPago"]:checked').value;

    if (!nombre || !email || !telefono) {
        showToast('error', 'Error', 'Por favor completa todos los campos requeridos');
        return;
    }

    // Construir mensaje de WhatsApp
    var mensaje = '🌴 *NUEVA RESERVA - CIRCUITO TURISTICO PIURA*\n\n';
    mensaje += '👤 *Cliente:* ' + nombre + '\n';
    mensaje += '📧 *Email:* ' + email + '\n';
    mensaje += '📱 *Telefono:* ' + telefono + '\n\n';
    mensaje += '🎫 *EXPERIENCIAS RESERVADAS:*\n';

    var total = 0;
    cart.forEach(function(item, index) {
        mensaje += (index + 1) + '. ' + item.name + '\n';
        mensaje += '   📅 Fecha: ' + item.date + '\n';
        mensaje += '   👥 Personas: ' + item.persons + '\n';
        mensaje += '   💰 Precio: S/' + item.total + '\n\n';
        total += item.total;
    });

    mensaje += '💳 *Metodo de pago:* ' + metodoPago.toUpperCase() + '\n';
    mensaje += '💵 *TOTAL: S/' + total + '*\n\n';

    if (notas) {
        mensaje += '📝 *Notas:* ' + notas + '\n\n';
    }

    mensaje += '---\n';
    mensaje += '_Reserva enviada desde la web_';

    // Codificar mensaje para URL
    var mensajeEncoded = encodeURIComponent(mensaje);
    var whatsappUrl = 'https://wa.me/' + WHATSAPP_NUMBER + '?text=' + mensajeEncoded;

    // Tracking analytics
    if (window.trackUserInteraction) {
        trackUserInteraction('checkout', {
            items: cart.length,
            total: total,
            paymentMethod: metodoPago
        });
    }

    // Abrir WhatsApp
    window.open(whatsappUrl, '_blank');

    // Mostrar confirmacion
    showToast('success', 'Reserva enviada', 'Completa tu reserva en WhatsApp');

    // Limpiar carrito
    cart = [];
    updateCart();

    // Cerrar modal
    closeCheckoutModal();

    // Resetear formulario
    document.getElementById('checkoutForm').reset();
}

// Inicializar checkout cuando el DOM este listo
document.addEventListener('DOMContentLoaded', function() {
    setTimeout(function() {
        initCheckout();
        console.log('Sistema de checkout inicializado');
    }, 300);
});

// Exportar funciones
window.openCheckoutModal = openCheckoutModal;
window.closeCheckoutModal = closeCheckoutModal;

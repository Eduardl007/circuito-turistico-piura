/**
 * SISTEMA DE ANALYTICS - CIRCUITO TURÍSTICO PIURA-CATACAOS
 * Integración con Google Sheets para tracking de interacciones
 *
 * Este módulo captura todas las interacciones de usuarios y las envía
 * a Google Sheets para análisis y medición de KPIs.
 */

// ============================================
// CONFIGURACIÓN - REEMPLAZAR CON TUS DATOS
// ============================================

const ANALYTICS_CONFIG = {
    // URL del Web App de Google Apps Script (se genera después de publicar)
    GOOGLE_SCRIPT_URL: 'TU_URL_DE_GOOGLE_APPS_SCRIPT_AQUI',

    // Habilitar/deshabilitar tracking
    ENABLED: true,

    // Mostrar logs en consola (para debugging)
    DEBUG: true,

    // Nombre del proyecto
    PROJECT_NAME: 'Circuito Turístico Piura-Catacaos'
};

// ============================================
// CLASE PRINCIPAL DE ANALYTICS
// ============================================

class CircuitoAnalytics {
    constructor() {
        this.sessionId = this.generateSessionId();
        this.userId = this.getUserId();
        this.sessionStart = new Date();
        this.pageViews = [];
        this.events = [];

        // Inicializar tracking automático
        this.initAutoTracking();

        if (ANALYTICS_CONFIG.DEBUG) {
            console.log('📊 Analytics inicializado:', {
                sessionId: this.sessionId,
                userId: this.userId
            });
        }
    }

    // Generar ID único de sesión
    generateSessionId() {
        return 'session_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
    }

    // Obtener o crear ID de usuario persistente
    getUserId() {
        let userId = localStorage.getItem('circuito_user_id');
        if (!userId) {
            userId = 'user_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
            localStorage.setItem('circuito_user_id', userId);
        }
        return userId;
    }

    // Obtener información del dispositivo
    getDeviceInfo() {
        const ua = navigator.userAgent;
        let device = 'Desktop';

        if (/Mobile|Android|iPhone/i.test(ua)) {
            device = 'Mobile';
        } else if (/iPad|Tablet/i.test(ua)) {
            device = 'Tablet';
        }

        return {
            device: device,
            browser: this.getBrowser(),
            screenWidth: window.innerWidth,
            screenHeight: window.innerHeight,
            language: navigator.language,
            platform: navigator.platform
        };
    }

    getBrowser() {
        const ua = navigator.userAgent;
        if (ua.includes('Chrome')) return 'Chrome';
        if (ua.includes('Firefox')) return 'Firefox';
        if (ua.includes('Safari')) return 'Safari';
        if (ua.includes('Edge')) return 'Edge';
        return 'Otro';
    }

    // Obtener fuente de tráfico
    getTrafficSource() {
        const referrer = document.referrer;
        const urlParams = new URLSearchParams(window.location.search);

        return {
            referrer: referrer || 'Directo',
            utm_source: urlParams.get('utm_source') || '',
            utm_medium: urlParams.get('utm_medium') || '',
            utm_campaign: urlParams.get('utm_campaign') || ''
        };
    }

    // ============================================
    // MÉTODOS DE TRACKING
    // ============================================

    // Tracking de vistas de página/sección
    trackPageView(section) {
        const data = {
            type: 'PAGE_VIEW',
            timestamp: new Date().toISOString(),
            sessionId: this.sessionId,
            userId: this.userId,
            section: section,
            url: window.location.href,
            ...this.getDeviceInfo(),
            ...this.getTrafficSource()
        };

        this.sendToGoogle(data);
    }

    // Tracking de eventos generales
    trackEvent(category, action, label = '', value = 0) {
        const data = {
            type: 'EVENT',
            timestamp: new Date().toISOString(),
            sessionId: this.sessionId,
            userId: this.userId,
            category: category,
            action: action,
            label: label,
            value: value,
            ...this.getDeviceInfo()
        };

        this.sendToGoogle(data);
    }

    // Tracking de búsquedas
    trackSearch(searchQuery, filters = {}) {
        const data = {
            type: 'SEARCH',
            timestamp: new Date().toISOString(),
            sessionId: this.sessionId,
            userId: this.userId,
            searchQuery: searchQuery,
            filters: JSON.stringify(filters),
            ...this.getDeviceInfo()
        };

        this.sendToGoogle(data);
    }

    // Tracking de productos/experiencias vistas
    trackProductView(productId, productName, category, price) {
        const data = {
            type: 'PRODUCT_VIEW',
            timestamp: new Date().toISOString(),
            sessionId: this.sessionId,
            userId: this.userId,
            productId: productId,
            productName: productName,
            category: category,
            price: price,
            ...this.getDeviceInfo()
        };

        this.sendToGoogle(data);
    }

    // Tracking de agregar al carrito
    trackAddToCart(productId, productName, price, quantity, date) {
        const data = {
            type: 'ADD_TO_CART',
            timestamp: new Date().toISOString(),
            sessionId: this.sessionId,
            userId: this.userId,
            productId: productId,
            productName: productName,
            price: price,
            quantity: quantity,
            reservationDate: date,
            totalValue: price * quantity,
            ...this.getDeviceInfo()
        };

        this.sendToGoogle(data);
    }

    // Tracking de inicio de checkout
    trackCheckoutStart(cartItems, totalValue) {
        const data = {
            type: 'CHECKOUT_START',
            timestamp: new Date().toISOString(),
            sessionId: this.sessionId,
            userId: this.userId,
            cartItems: JSON.stringify(cartItems),
            totalValue: totalValue,
            itemCount: cartItems.length,
            ...this.getDeviceInfo()
        };

        this.sendToGoogle(data);
    }

    // Tracking de formularios enviados
    trackFormSubmit(formName, formData) {
        const data = {
            type: 'FORM_SUBMIT',
            timestamp: new Date().toISOString(),
            sessionId: this.sessionId,
            userId: this.userId,
            formName: formName,
            formData: JSON.stringify(formData),
            ...this.getDeviceInfo()
        };

        this.sendToGoogle(data);
    }

    // Tracking de interacciones con chatbot
    trackChatbotInteraction(userMessage, botResponse, intent = '') {
        const data = {
            type: 'CHATBOT',
            timestamp: new Date().toISOString(),
            sessionId: this.sessionId,
            userId: this.userId,
            userMessage: userMessage,
            botResponse: botResponse.substring(0, 500), // Limitar longitud
            intent: intent,
            ...this.getDeviceInfo()
        };

        this.sendToGoogle(data);
    }

    // Tracking de clics en elementos importantes
    trackClick(elementType, elementId, elementText = '') {
        const data = {
            type: 'CLICK',
            timestamp: new Date().toISOString(),
            sessionId: this.sessionId,
            userId: this.userId,
            elementType: elementType,
            elementId: elementId,
            elementText: elementText,
            currentSection: this.getCurrentSection(),
            ...this.getDeviceInfo()
        };

        this.sendToGoogle(data);
    }

    // Tracking de scroll depth
    trackScrollDepth(percentage) {
        const data = {
            type: 'SCROLL',
            timestamp: new Date().toISOString(),
            sessionId: this.sessionId,
            userId: this.userId,
            scrollPercentage: percentage,
            ...this.getDeviceInfo()
        };

        this.sendToGoogle(data);
    }

    // Tracking de tiempo en página
    trackTimeOnPage() {
        const timeSpent = Math.round((new Date() - this.sessionStart) / 1000);
        const data = {
            type: 'SESSION_END',
            timestamp: new Date().toISOString(),
            sessionId: this.sessionId,
            userId: this.userId,
            timeOnPageSeconds: timeSpent,
            sectionsViewed: JSON.stringify(this.pageViews),
            ...this.getDeviceInfo()
        };

        this.sendToGoogle(data);
    }

    // Tracking de favoritos/wishlist
    trackWishlist(action, productId, productName) {
        const data = {
            type: 'WISHLIST',
            timestamp: new Date().toISOString(),
            sessionId: this.sessionId,
            userId: this.userId,
            action: action, // 'add' o 'remove'
            productId: productId,
            productName: productName,
            ...this.getDeviceInfo()
        };

        this.sendToGoogle(data);
    }

    // Tracking de filtros aplicados
    trackFilterApplied(filterType, filterValue) {
        const data = {
            type: 'FILTER',
            timestamp: new Date().toISOString(),
            sessionId: this.sessionId,
            userId: this.userId,
            filterType: filterType,
            filterValue: filterValue,
            ...this.getDeviceInfo()
        };

        this.sendToGoogle(data);
    }

    // Tracking de reservas de restaurantes
    trackRestaurantReservation(restaurantName) {
        const data = {
            type: 'RESTAURANT_RESERVATION',
            timestamp: new Date().toISOString(),
            sessionId: this.sessionId,
            userId: this.userId,
            restaurantName: restaurantName,
            ...this.getDeviceInfo()
        };

        this.sendToGoogle(data);
    }

    // Tracking de interacciones con el mapa
    trackMapInteraction(action, locationName = '', coordinates = '') {
        const data = {
            type: 'MAP_INTERACTION',
            timestamp: new Date().toISOString(),
            sessionId: this.sessionId,
            userId: this.userId,
            action: action, // 'zoom', 'location_click', 'filter', 'my_location'
            locationName: locationName,
            coordinates: coordinates,
            ...this.getDeviceInfo()
        };

        this.sendToGoogle(data);
    }

    // ============================================
    // UTILIDADES
    // ============================================

    getCurrentSection() {
        const sections = document.querySelectorAll('section[id]');
        let current = 'hero';

        sections.forEach(section => {
            const sectionTop = section.offsetTop - 200;
            if (window.scrollY >= sectionTop) {
                current = section.getAttribute('id');
            }
        });

        return current;
    }

    // Enviar datos a Google Sheets
    sendToGoogle(data) {
        if (!ANALYTICS_CONFIG.ENABLED) return;

        // Agregar metadata común
        data.projectName = ANALYTICS_CONFIG.PROJECT_NAME;

        if (ANALYTICS_CONFIG.DEBUG) {
            console.log('📊 Tracking:', data);
        }

        // Verificar si la URL está configurada
        if (ANALYTICS_CONFIG.GOOGLE_SCRIPT_URL === 'TU_URL_DE_GOOGLE_APPS_SCRIPT_AQUI') {
            if (ANALYTICS_CONFIG.DEBUG) {
                console.log('⚠️ URL de Google Apps Script no configurada. Datos guardados localmente.');
            }
            this.saveLocally(data);
            return;
        }

        // Enviar usando fetch con modo no-cors (para evitar problemas CORS)
        fetch(ANALYTICS_CONFIG.GOOGLE_SCRIPT_URL, {
            method: 'POST',
            mode: 'no-cors',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        }).catch(error => {
            if (ANALYTICS_CONFIG.DEBUG) {
                console.error('Error enviando analytics:', error);
            }
            // Guardar localmente si falla
            this.saveLocally(data);
        });
    }

    // Guardar datos localmente como respaldo
    saveLocally(data) {
        let localData = JSON.parse(localStorage.getItem('circuito_analytics') || '[]');
        localData.push(data);

        // Limitar a últimos 100 eventos
        if (localData.length > 100) {
            localData = localData.slice(-100);
        }

        localStorage.setItem('circuito_analytics', JSON.stringify(localData));
    }

    // Obtener datos guardados localmente
    getLocalData() {
        return JSON.parse(localStorage.getItem('circuito_analytics') || '[]');
    }

    // Exportar datos locales (para debugging)
    exportLocalData() {
        const data = this.getLocalData();
        const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `analytics_${new Date().toISOString().split('T')[0]}.json`;
        a.click();
    }

    // ============================================
    // AUTO-TRACKING
    // ============================================

    initAutoTracking() {
        // Track página inicial
        this.trackPageView('inicio');

        // Track scroll depth
        let maxScroll = 0;
        const scrollThresholds = [25, 50, 75, 100];
        const trackedThresholds = new Set();

        window.addEventListener('scroll', () => {
            const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
            const scrollPercentage = Math.round((window.scrollY / scrollHeight) * 100);

            scrollThresholds.forEach(threshold => {
                if (scrollPercentage >= threshold && !trackedThresholds.has(threshold)) {
                    trackedThresholds.add(threshold);
                    this.trackScrollDepth(threshold);
                }
            });
        });

        // Track secciones vistas
        const sections = document.querySelectorAll('section[id]');
        const sectionObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const sectionId = entry.target.getAttribute('id');
                    if (!this.pageViews.includes(sectionId)) {
                        this.pageViews.push(sectionId);
                        this.trackPageView(sectionId);
                    }
                }
            });
        }, { threshold: 0.3 });

        sections.forEach(section => sectionObserver.observe(section));

        // Track tiempo en página al salir
        window.addEventListener('beforeunload', () => {
            this.trackTimeOnPage();
        });

        // Track visibilidad de página
        document.addEventListener('visibilitychange', () => {
            if (document.visibilityState === 'hidden') {
                this.trackEvent('Engagement', 'Page Hidden');
            } else {
                this.trackEvent('Engagement', 'Page Visible');
            }
        });
    }
}

// ============================================
// INICIALIZAR ANALYTICS GLOBAL
// ============================================

const analytics = new CircuitoAnalytics();

// Exponer globalmente
window.circuitoAnalytics = analytics;

// ============================================
// INTEGRACIÓN CON FUNCIONES EXISTENTES
// ============================================

// Función helper para integrar con el app.js existente
function trackUserInteraction(type, data) {
    switch(type) {
        case 'search':
            analytics.trackSearch(data.query, data.filters);
            break;
        case 'product_view':
            analytics.trackProductView(data.id, data.name, data.category, data.price);
            break;
        case 'add_to_cart':
            analytics.trackAddToCart(data.id, data.name, data.price, data.quantity, data.date);
            break;
        case 'checkout':
            analytics.trackCheckoutStart(data.items, data.total);
            break;
        case 'form':
            analytics.trackFormSubmit(data.formName, data.formData);
            break;
        case 'chatbot':
            analytics.trackChatbotInteraction(data.userMessage, data.botResponse, data.intent);
            break;
        case 'click':
            analytics.trackClick(data.elementType, data.elementId, data.text);
            break;
        case 'wishlist':
            analytics.trackWishlist(data.action, data.productId, data.productName);
            break;
        case 'filter':
            analytics.trackFilterApplied(data.filterType, data.filterValue);
            break;
        case 'restaurant':
            analytics.trackRestaurantReservation(data.name);
            break;
        case 'map':
            analytics.trackMapInteraction(data.action, data.location, data.coordinates);
            break;
        default:
            analytics.trackEvent(type, data.action || '', data.label || '', data.value || 0);
    }
}

// Exponer helper globalmente
window.trackUserInteraction = trackUserInteraction;

console.log('✅ Sistema de Analytics cargado correctamente');

/**
 * CIRCUITO TURISTICO PIURA - CATACAOS
 * Mapa Interactivo con Leaflet
 */

// Variables globales
let map = null;
let markers = [];
let markersLayer = null;
let userMarker = null;

// Iconos personalizados para cada tipo
const markerIcons = {
    artesania: L.divIcon({
        className: 'custom-marker artesania',
        html: '<div class="marker-pin"><i class="fas fa-gem"></i></div>',
        iconSize: [40, 48],
        iconAnchor: [20, 48],
        popupAnchor: [0, -48]
    }),
    gastronomia: L.divIcon({
        className: 'custom-marker gastronomia',
        html: '<div class="marker-pin"><i class="fas fa-utensils"></i></div>',
        iconSize: [40, 48],
        iconAnchor: [20, 48],
        popupAnchor: [0, -48]
    }),
    cultura: L.divIcon({
        className: 'custom-marker cultura',
        html: '<div class="marker-pin"><i class="fas fa-landmark"></i></div>',
        iconSize: [40, 48],
        iconAnchor: [20, 48],
        popupAnchor: [0, -48]
    }),
    hospedaje: L.divIcon({
        className: 'custom-marker hospedaje',
        html: '<div class="marker-pin"><i class="fas fa-bed"></i></div>',
        iconSize: [40, 48],
        iconAnchor: [20, 48],
        popupAnchor: [0, -48]
    }),
    user: L.divIcon({
        className: 'custom-marker user-location',
        html: '<div class="marker-pin user"><i class="fas fa-user"></i></div>',
        iconSize: [40, 48],
        iconAnchor: [20, 48]
    })
};

// Lugares del circuito turistico
const lugares = [
    {
        id: 1,
        name: 'Calle Comercio',
        type: 'artesania',
        lat: -5.1945,
        lng: -80.6286,
        image: 'assets/images/Calle el comercio.jpg',
        desc: 'El corazon artesanal de Catacaos. Aqui encontraras filigrana en plata, tejidos de paja toquilla, ceramicas y artesanias tradicionales.',
        horario: 'Lunes a Domingo: 8:00 AM - 6:00 PM',
        precio: 'Entrada libre'
    },
    {
        id: 2,
        name: 'Iglesia San Juan Bautista',
        type: 'cultura',
        lat: -5.1960,
        lng: -80.6275,
        image: 'assets/images/Iglesia Catacaos.jpg',
        desc: 'Joya arquitectonica colonial del siglo XVII. Destaca por sus murales en el cielo raso y su altar banado en pan de oro.',
        horario: 'Lunes a Sabado: 7:00 AM - 12:00 PM y 4:00 PM - 7:00 PM',
        precio: 'Entrada libre'
    },
    {
        id: 3,
        name: 'Complejo Arqueologico Narihuala',
        type: 'cultura',
        lat: -5.1800,
        lng: -80.6100,
        image: 'assets/images/Narihuala.jpg',
        desc: 'Vestigios de la cultura Tallan, civilizacion preincaica del norte peruano. Incluye piramides de adobe y museo de sitio.',
        horario: 'Martes a Domingo: 9:00 AM - 5:00 PM',
        precio: 'S/5.00 adultos - S/2.00 estudiantes'
    },
    {
        id: 4,
        name: 'El Cantarito',
        type: 'gastronomia',
        lat: -5.1945,
        lng: -80.6320,
        image: 'assets/images/Gastronomia.jpg',
        desc: 'Restaurante tradicional piurano famoso por su seco de chabelo, ceviche de mero y chicha de jora.',
        horario: 'Lunes a Domingo: 11:00 AM - 5:00 PM',
        precio: 'Platos desde S/25.00'
    },
    {
        id: 5,
        name: 'Taller Filigrana Yarleque',
        type: 'artesania',
        lat: -5.1978,
        lng: -80.6284,
        image: 'assets/images/Experiencia artesanal.jpg',
        desc: 'Taller del maestro artesano reconocido como Patrimonio Cultural. Ofrece demostraciones y talleres de filigrana.',
        horario: 'Lunes a Sabado: 9:00 AM - 6:00 PM',
        precio: 'Demostracion: S/10.00 - Taller: S/200.00'
    },
    {
        id: 6,
        name: 'Hospedaje Casa del Artesano',
        type: 'hospedaje',
        lat: -5.1940,
        lng: -80.6250,
        image: 'assets/images/Plaza Catacaos.jpg',
        desc: 'Turismo vivencial. Alojamiento en casa de familia artesana con desayuno tipico incluido.',
        horario: 'Check-in: 2:00 PM - Check-out: 12:00 PM',
        precio: 'Desde S/80.00 por noche'
    },
    {
        id: 7,
        name: 'Plaza de Armas de Catacaos',
        type: 'cultura',
        lat: -5.1952,
        lng: -80.6278,
        image: 'assets/images/Plaza Catacaos.jpg',
        desc: 'Centro historico de Catacaos. Punto de encuentro y sede de festividades tradicionales.',
        horario: 'Abierto 24 horas',
        precio: 'Entrada libre'
    },
    {
        id: 8,
        name: 'Chicheria La Patrona',
        type: 'gastronomia',
        lat: -5.1935,
        lng: -80.6295,
        image: 'assets/images/Chicha de jora.jpg',
        desc: 'Chicheria tradicional donde se prepara chicha de jora artesanal. Experiencia autentica del norte peruano.',
        horario: 'Martes a Domingo: 10:00 AM - 6:00 PM',
        precio: 'Vaso de chicha: S/3.00'
    }
];

// Inicializar mapa
function initLeafletMap() {
    // Verificar si Leaflet esta disponible
    if (typeof L === 'undefined') {
        console.error('Leaflet no esta cargado');
        return;
    }

    // Centro del mapa: Catacaos
    const catacaos = [-5.1945, -80.6286];

    // Crear mapa
    map = L.map('map', {
        center: catacaos,
        zoom: 15,
        zoomControl: false,
        scrollWheelZoom: true
    });

    // Agregar capa de tiles (OpenStreetMap)
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
        maxZoom: 19
    }).addTo(map);

    // Crear capa de marcadores
    markersLayer = L.layerGroup().addTo(map);

    // Agregar marcadores
    addMarkers();

    // Configurar controles personalizados
    setupMapControls();

    // Configurar filtros
    setupMapFilters();

    // Configurar busqueda
    setupMapSearch();

    // Conectar items de la sidebar con el mapa
    setupSidebarInteraction();

    console.log('Mapa Leaflet inicializado correctamente');
}

// Agregar marcadores al mapa
function addMarkers(filterType) {
    // Limpiar marcadores existentes
    markersLayer.clearLayers();
    markers = [];

    lugares.forEach(function(lugar) {
        // Aplicar filtro si existe
        if (filterType && filterType !== 'all' && lugar.type !== filterType) {
            return;
        }

        var icon = markerIcons[lugar.type] || markerIcons.cultura;

        var marker = L.marker([lugar.lat, lugar.lng], { icon: icon })
            .addTo(markersLayer);

        // Popup del marcador
        var popupContent = '<div class="map-popup">' +
            '<strong>' + lugar.name + '</strong>' +
            '<p>' + lugar.desc.substring(0, 80) + '...</p>' +
            '<button onclick="showPlaceDetail(' + lugar.id + ')" class="popup-btn">Ver detalles</button>' +
            '</div>';

        marker.bindPopup(popupContent);

        // Click en marcador
        marker.on('click', function() {
            showPlaceDetail(lugar.id);
            highlightSidebarItem(lugar.id);
        });

        marker.lugarId = lugar.id;
        markers.push(marker);
    });
}

// Mostrar detalle del lugar
function showPlaceDetail(lugarId) {
    var lugar = lugares.find(function(l) { return l.id === lugarId; });
    if (!lugar) return;

    var panel = document.getElementById('placeDetailPanel');

    document.getElementById('detailImage').src = lugar.image;
    document.getElementById('detailTitle').textContent = lugar.name;
    document.getElementById('detailDesc').textContent = lugar.desc;
    document.getElementById('detailHorario').textContent = lugar.horario;
    document.getElementById('detailPrecio').textContent = lugar.precio;
    document.getElementById('detailCoords').textContent = lugar.lat.toFixed(4) + ', ' + lugar.lng.toFixed(4);

    panel.classList.add('active');

    // Centrar mapa en el lugar
    map.setView([lugar.lat, lugar.lng], 17, { animate: true });

    // Guardar coordenadas para "Como llegar"
    panel.dataset.lat = lugar.lat;
    panel.dataset.lng = lugar.lng;
    panel.dataset.name = lugar.name;

    // Tracking analytics
    if (window.trackUserInteraction) {
        trackUserInteraction('map', {
            action: 'place_detail_view',
            location: lugar.name
        });
    }
}

// Resaltar item en sidebar
function highlightSidebarItem(lugarId) {
    document.querySelectorAll('.place-item').forEach(function(item, index) {
        item.classList.remove('active');
        if (index + 1 === lugarId) {
            item.classList.add('active');
            item.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }
    });
}

// Configurar controles del mapa
function setupMapControls() {
    // Zoom In
    document.getElementById('btnZoomIn').addEventListener('click', function() {
        map.zoomIn();
    });

    // Zoom Out
    document.getElementById('btnZoomOut').addEventListener('click', function() {
        map.zoomOut();
    });

    // Mi ubicacion
    document.getElementById('btnMyLocation').addEventListener('click', function() {
        if (navigator.geolocation) {
            showToast('info', 'Ubicacion', 'Obteniendo tu ubicacion...');

            navigator.geolocation.getCurrentPosition(function(position) {
                var lat = position.coords.latitude;
                var lng = position.coords.longitude;

                // Remover marcador anterior
                if (userMarker) {
                    map.removeLayer(userMarker);
                }

                // Agregar marcador de usuario
                userMarker = L.marker([lat, lng], { icon: markerIcons.user })
                    .addTo(map)
                    .bindPopup('<strong>Tu ubicacion</strong>')
                    .openPopup();

                // Centrar mapa
                map.setView([lat, lng], 15, { animate: true });

                showToast('success', 'Ubicacion', 'Ubicacion encontrada');
            }, function(error) {
                showToast('error', 'Error', 'No se pudo obtener tu ubicacion');
            });
        } else {
            showToast('error', 'Error', 'Geolocalizacion no soportada');
        }
    });

    // Pantalla completa
    document.getElementById('btnFullscreen').addEventListener('click', function() {
        var mapFrame = document.querySelector('.mapa-frame');

        if (!document.fullscreenElement) {
            if (mapFrame.requestFullscreen) {
                mapFrame.requestFullscreen();
            } else if (mapFrame.webkitRequestFullscreen) {
                mapFrame.webkitRequestFullscreen();
            }
        } else {
            if (document.exitFullscreen) {
                document.exitFullscreen();
            }
        }
    });

    // Cerrar panel de detalle
    document.getElementById('closeDetail').addEventListener('click', function() {
        document.getElementById('placeDetailPanel').classList.remove('active');
    });

    // Como llegar
    document.getElementById('btnComoLlegar').addEventListener('click', function() {
        var panel = document.getElementById('placeDetailPanel');
        var lat = panel.dataset.lat;
        var lng = panel.dataset.lng;
        var name = panel.dataset.name;

        var url = 'https://www.google.com/maps/dir/?api=1&destination=' + lat + ',' + lng + '&destination_place_id=' + encodeURIComponent(name);
        window.open(url, '_blank');

        showToast('info', 'Navegacion', 'Abriendo Google Maps...');
    });
}

// Configurar filtros del mapa
function setupMapFilters() {
    document.querySelectorAll('.map-filter').forEach(function(btn) {
        btn.addEventListener('click', function() {
            // Actualizar estado activo
            document.querySelectorAll('.map-filter').forEach(function(b) {
                b.classList.remove('active');
            });
            btn.classList.add('active');

            var filterType = btn.getAttribute('data-filter');

            // Cerrar panel de detalle
            document.getElementById('placeDetailPanel').classList.remove('active');

            // Filtrar marcadores
            addMarkers(filterType);

            // Filtrar items de sidebar
            document.querySelectorAll('.place-item').forEach(function(item) {
                var itemType = item.getAttribute('data-type');
                if (filterType === 'all' || itemType === filterType) {
                    item.style.display = 'flex';
                } else {
                    item.style.display = 'none';
                }
            });

            // Ajustar vista del mapa a los marcadores visibles
            if (markers.length > 0) {
                var group = new L.featureGroup(markers);
                map.fitBounds(group.getBounds().pad(0.1));
            }
        });
    });
}

// Configurar busqueda del mapa
function setupMapSearch() {
    var searchInput = document.getElementById('mapaSearch');

    searchInput.addEventListener('input', function(e) {
        var searchTerm = e.target.value.toLowerCase();

        // Filtrar items de sidebar
        document.querySelectorAll('.place-item').forEach(function(item) {
            var title = item.getAttribute('data-title').toLowerCase();
            var desc = item.getAttribute('data-desc').toLowerCase();

            if (title.includes(searchTerm) || desc.includes(searchTerm)) {
                item.style.display = 'flex';
            } else {
                item.style.display = 'none';
            }
        });

        // Filtrar marcadores en el mapa
        if (searchTerm.length > 0) {
            markersLayer.clearLayers();
            markers = [];

            lugares.forEach(function(lugar) {
                if (lugar.name.toLowerCase().includes(searchTerm) ||
                    lugar.desc.toLowerCase().includes(searchTerm)) {

                    var icon = markerIcons[lugar.type];
                    var marker = L.marker([lugar.lat, lugar.lng], { icon: icon })
                        .addTo(markersLayer);
                    marker.lugarId = lugar.id;
                    markers.push(marker);
                }
            });

            // Resetear filtros
            document.querySelectorAll('.map-filter').forEach(function(b) {
                b.classList.remove('active');
            });
        } else {
            // Restaurar todos los marcadores
            addMarkers();
            document.querySelector('.map-filter[data-filter="all"]').classList.add('active');
        }
    });
}

// Configurar interaccion con sidebar
function setupSidebarInteraction() {
    document.querySelectorAll('.place-item').forEach(function(item, index) {
        item.addEventListener('click', function() {
            var lat = parseFloat(item.getAttribute('data-lat'));
            var lng = parseFloat(item.getAttribute('data-lng'));
            var lugarId = index + 1;

            // Mostrar detalle
            showPlaceDetail(lugarId);

            // Resaltar item
            document.querySelectorAll('.place-item').forEach(function(i) {
                i.classList.remove('active');
            });
            item.classList.add('active');

            // Abrir popup del marcador correspondiente
            markers.forEach(function(marker) {
                if (marker.lugarId === lugarId) {
                    marker.openPopup();
                }
            });
        });
    });
}

// Inicializar cuando el DOM este listo
document.addEventListener('DOMContentLoaded', function() {
    // Esperar a que Leaflet este cargado
    if (typeof L !== 'undefined') {
        initLeafletMap();
    } else {
        // Intentar de nuevo despues de un delay
        setTimeout(function() {
            if (typeof L !== 'undefined') {
                initLeafletMap();
            } else {
                console.error('Leaflet no se pudo cargar');
            }
        }, 1000);
    }
});

// Exportar funciones
window.showPlaceDetail = showPlaceDetail;
window.initLeafletMap = initLeafletMap;

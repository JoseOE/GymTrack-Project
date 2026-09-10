document.addEventListener("DOMContentLoaded", () => {
    
    // 1. Inicializar el mapa de Leaflet (OpenStreetMap)
    initMap();

    // 2. Animar elementos al hacer scroll
    initScrollAnimations();

    // 3. Obtener el catálogo de servicios de MongoDB (Backend Java)
    fetchServices();
});

function initMap() {
    // Coordenadas del destino (GymTrack)
    const destLat = 20.206231;
    const destLng = -99.222102;
    
    const map = L.map('map').setView([destLat, destLng], 14);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    // Marcador del destino (GymTrack)
    const gymMarker = L.marker([destLat, destLng]).addTo(map)
        .bindPopup('<b>GymTrack</b><br>Sucursal Principal.')
        .openPopup();

    // Intentar obtener la ubicación actual del usuario para trazar la ruta
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            function(position) {
                const userLat = position.coords.latitude;
                const userLng = position.coords.longitude;

                // Marcador de la ubicación del usuario
                const userIcon = L.divIcon({
                    html: '<i class="bx bxs-user-circle" style="font-size:28px;color:#1a73e8;"></i>',
                    iconSize: [28, 28],
                    className: 'user-marker'
                });
                L.marker([userLat, userLng], { icon: userIcon }).addTo(map)
                    .bindPopup('<b>Tu ubicación</b>');

                // Trazar la ruta desde el usuario hasta GymTrack
                L.Routing.control({
                    waypoints: [
                        L.latLng(userLat, userLng),
                        L.latLng(destLat, destLng)
                    ],
                    routeWhileDragging: false,
                    addWaypoints: false,
                    lineOptions: {
                        styles: [{ color: '#ff5722', weight: 5, opacity: 0.8 }]
                    },
                    createMarker: function() { return null; }, // No duplicar marcadores
                    show: true,
                    collapsible: true,
                    language: 'es'
                }).addTo(map);

                // Ajustar vista para mostrar ambos puntos
                const bounds = L.latLngBounds([
                    [userLat, userLng],
                    [destLat, destLng]
                ]);
                map.fitBounds(bounds, { padding: [50, 50] });
            },
            function(error) {
                // Si el usuario no permite geolocalización, mostrar ruta desde un punto de ejemplo
                console.warn("Geolocalización no disponible:", error.message);

                // Punto de ejemplo (centro de Mixquiahuala)
                const fallbackLat = 20.2300;
                const fallbackLng = -99.2139;

                L.marker([fallbackLat, fallbackLng]).addTo(map)
                    .bindPopup('<b>Punto de partida</b><br>(ubicación de ejemplo)');

                L.Routing.control({
                    waypoints: [
                        L.latLng(fallbackLat, fallbackLng),
                        L.latLng(destLat, destLng)
                    ],
                    routeWhileDragging: false,
                    addWaypoints: false,
                    lineOptions: {
                        styles: [{ color: '#ff5722', weight: 5, opacity: 0.8 }]
                    },
                    createMarker: function() { return null; },
                    show: true,
                    collapsible: true,
                    language: 'es'
                }).addTo(map);

                map.fitBounds([
                    [fallbackLat, fallbackLng],
                    [destLat, destLng]
                ], { padding: [50, 50] });
            },
            { enableHighAccuracy: true, timeout: 10000 }
        );
    }
}

function initScrollAnimations() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.1 });

    const animatedElements = document.querySelectorAll('.scroll-animate');
    animatedElements.forEach(el => observer.observe(el));
}

function fetchServices() {
    const container = document.getElementById('services-container');

    // Llamada a nuestra API REST en Java Spring Boot
    fetch('/api/servicios')
        .then(response => {
            if (!response.ok) {
                throw new Error("Error en la conexión a la base de datos.");
            }
            return response.json();
        })
        .then(data => {
            container.innerHTML = ''; // Limpiar loader

            if (data.length === 0) {
                container.innerHTML = '<p class="text-muted">No hay servicios registrados en la base de datos.</p>';
                return;
            }

            // Inyectar tarjetas HTML por cada servicio encontrado en MongoDB
            data.forEach(service => {
                const iconClass = service.icono ? service.icono : 'bx-layer';
                
                // Lógica de visualización de precios para modelo B2B SaaS
                let precioDisplay = '';
                if (service.precio === 0) {
                    precioDisplay = `<span class="text-success fs-5">Incluido en tu plan</span>`;
                } else {
                    precioDisplay = `$${service.precio.toLocaleString('es-MX')} MXN`;
                }

                const categoria = service.categoria ? service.categoria.toUpperCase() : '';
                const destacado = service.destacado ? '<span class="badge bg-warning text-dark position-absolute top-0 end-0 m-2">⭐ Destacado</span>' : '';
                
                // Cambiar el texto del botón dependiendo del tipo de módulo
                const btnText = (categoria === 'HARDWARE') ? 'Cotizar equipo' : 'Ver Detalles';

                const cardHTML = `
                    <div class="col-md-6 col-lg-3">
                        <div class="card h-100 shadow-sm service-card text-center p-3 position-relative">
                            ${destacado}
                            <div class="card-body">
                                <i class='bx ${iconClass} service-icon mb-3'></i>
                                <span class="badge bg-secondary mb-2">${categoria}</span>
                                <h5 class="card-title fw-bold">${service.nombre}</h5>
                                <p class="card-text text-muted small">${service.descripcion}</p>
                                <h4 class="text-primary mt-3 fw-bold">${precioDisplay}</h4>
                                ${service.duracion ? '<small class="text-muted"><i class="bx bx-time-five"></i> ' + service.duracion + '</small>' : ''}
                            </div>
                            <div class="card-footer bg-white border-0 pb-3">
                                <button class="btn btn-outline-primary btn-sm rounded-pill w-100">${btnText}</button>
                            </div>
                        </div>
                    </div>
                `;
                container.innerHTML += cardHTML;
            });
        })
        .catch(error => {
            console.error("Error:", error);
            container.innerHTML = `
                <div class="alert alert-danger" role="alert">
                    No se pudo conectar a MongoDB. ¿Configuraste correctamente tu cadena de conexión en <b>application.properties</b>?
                </div>
            `;
        });
}

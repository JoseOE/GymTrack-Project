document.addEventListener("DOMContentLoaded", () => {
    initNavbarScroll();
    initMap();
    initScrollAnimations();
    fetchServices();
});

/* ═══════════════════════════════════════
   NAVBAR GLASSMORPHISM AL SCROLL
═══════════════════════════════════════ */
function initNavbarScroll() {
    const nav = document.getElementById('main-navbar');
    window.addEventListener('scroll', () => {
        nav.classList.toggle('scrolled', window.scrollY > 60);
    });
}

/* ═══════════════════════════════════════
   MAPA LEAFLET + RUTA
═══════════════════════════════════════ */
function initMap() {
    const destLat = 20.206231;
    const destLng = -99.222102;
    const map = L.map('map').setView([destLat, destLng], 14);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(map);

    L.marker([destLat, destLng]).addTo(map)
        .bindPopup('<b>GymTrack</b><br>Oficinas Centrales.')
        .openPopup();

    if (!navigator.geolocation) return;

    navigator.geolocation.getCurrentPosition(
        pos => {
            const uLat = pos.coords.latitude, uLng = pos.coords.longitude;

            L.marker([uLat, uLng], {
                icon: L.divIcon({
                    html: '<i class="bx bxs-user-circle" style="font-size:28px;color:#1a73e8"></i>',
                    iconSize: [28, 28], className: 'user-marker'
                })
            }).addTo(map).bindPopup('<b>Tu ubicación</b>');

            addRoute(map, uLat, uLng, destLat, destLng);
            map.fitBounds([[uLat, uLng],[destLat, destLng]], { padding: [50, 50] });
        },
        () => {
            const fLat = 20.2300, fLng = -99.2139;
            L.marker([fLat, fLng]).addTo(map).bindPopup('<b>Punto de partida</b><br>(ejemplo)');
            addRoute(map, fLat, fLng, destLat, destLng);
            map.fitBounds([[fLat, fLng],[destLat, destLng]], { padding: [50, 50] });
        },
        { enableHighAccuracy: true, timeout: 10000 }
    );
}

function addRoute(map, fromLat, fromLng, toLat, toLng) {
    L.Routing.control({
        waypoints: [L.latLng(fromLat, fromLng), L.latLng(toLat, toLng)],
        routeWhileDragging: false,
        addWaypoints: false,
        lineOptions: { styles: [{ color: '#ff5722', weight: 5, opacity: 0.8 }] },
        createMarker: () => null,
        show: true, collapsible: true, language: 'es'
    }).addTo(map);
}

/* ═══════════════════════════════════════
   ANIMACIONES SCROLL (IntersectionObserver)
═══════════════════════════════════════ */
function initScrollAnimations() {
    const obs = new IntersectionObserver(entries => {
        entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
    }, { threshold: 0.1 });

    document.querySelectorAll('.scroll-animate, .card-animate').forEach(el => obs.observe(el));
}

/* ═══════════════════════════════════════
   CATÁLOGO DINÁMICO (fetch → MongoDB)
═══════════════════════════════════════ */
function fetchServices() {
    const container = document.getElementById('services-container');

    fetch('/api/servicios')
        .then(r => { if (!r.ok) throw new Error('DB error'); return r.json(); })
        .then(data => {
            container.innerHTML = '';
            if (!data.length) {
                container.innerHTML = '<p class="text-body-secondary text-center">No hay servicios registrados.</p>';
                return;
            }

            data.forEach((s, i) => {
                const icon    = s.icono || 'bx-layer';
                const img     = s.imagen || 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=600&auto=format&fit=crop';
                const cat     = (s.categoria || '').toUpperCase();
                const star    = s.destacado ? '<span class="badge bg-warning text-dark position-absolute top-0 end-0 m-2 shadow-sm" style="z-index:2">⭐ Destacado</span>' : '';
                const btn     = cat === 'HARDWARE' ? 'Cotizar equipo' : 'Ver Detalles';
                const precio  = s.precio === 0
                    ? '<span class="text-success"><i class="bx bx-check-circle"></i> Incluido en plan</span>'
                    : `$${s.precio.toLocaleString('es-MX')} <small class="text-body-secondary fw-normal">MXN</small>`;

                container.innerHTML += `
                <div class="col-md-6 col-lg-3 card-animate stagger-${i + 1}">
                    <div class="card h-100 border-0 shadow rounded-4 text-center position-relative bg-white service-card">
                        ${star}
                        <div class="overflow-hidden rounded-top-4">
                            <img src="${img}" class="card-img-top w-100" alt="${s.nombre}">
                        </div>
                        <div class="card-body p-4 position-relative pt-5">
                            <div class="position-absolute top-0 start-50 translate-middle">
                                <i class="bx ${icon} service-icon"></i>
                            </div>
                            <span class="badge bg-body-tertiary text-body-secondary border mb-2">${cat}</span>
                            <h5 class="card-title fw-bold mb-2">${s.nombre}</h5>
                            <p class="card-text text-body-secondary small">${s.descripcion}</p>
                            <h5 class="text-primary fw-bold mt-3 mb-1">${precio}</h5>
                            ${s.duracion ? '<small class="text-body-secondary"><i class="bx bx-time-five"></i> ' + s.duracion + '</small>' : ''}
                        </div>
                        <div class="card-footer bg-white border-0 pb-4 pt-0 px-4">
                            <button class="btn btn-outline-primary btn-sm rounded-pill w-100 fw-semibold">${btn}</button>
                        </div>
                    </div>
                </div>`;
            });

            // Observar tarjetas dinámicas
            const obs = new IntersectionObserver(entries => {
                entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
            }, { threshold: 0.1 });
            container.querySelectorAll('.card-animate').forEach(el => obs.observe(el));
        })
        .catch(() => {
            container.innerHTML = `
                <div class="alert alert-danger shadow-sm d-flex align-items-center gap-2" role="alert">
                    <i class="bx bx-error-circle fs-4"></i> No se pudo conectar a MongoDB. Revisa la consola o configuración.
                </div>`;
        });
}

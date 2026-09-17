document.addEventListener("DOMContentLoaded", () => {
    initNavbarScroll();
    initScrollAnimations();
    initCounters();
    initServiceModal();
    fetchServices();
    initMap();
    initEditorialInteractions();
});

/* ═══════════════════════════════════════
   CONTADOR ANIMADO (sección de métricas)
═══════════════════════════════════════ */
function initCounters() {
    const counters = document.querySelectorAll('[data-count-target]');
    if (!counters.length) return;

    const obs = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (!entry.isIntersecting) return;
            obs.unobserve(entry.target);
            animateCounter(entry.target);
        });
    }, { threshold: 0.4 });

    counters.forEach(el => obs.observe(el));
}

function animateCounter(el) {
    const target = el.dataset.countTarget;
    const match = target.match(/^(\d+)(.*)$/);
    if (!match) return;

    const end = parseInt(match[1], 10);
    const suffix = match[2];
    const duration = 1200;
    const start = performance.now();

    function tick(now) {
        const progress = Math.min((now - start) / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        el.textContent = Math.round(eased * end) + suffix;
        if (progress < 1) requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
}

/* ═══════════════════════════════════════
   OBSERVADOR REUTILIZABLE (fade-in al hacer scroll)
═══════════════════════════════════════ */
function createRevealObserver() {
    return new IntersectionObserver(entries => {
        entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
    }, { threshold: 0.1, rootMargin: '0px 0px -80px 0px' });
}

/* ═══════════════════════════════════════
   NAVBAR GLASSMORPHISM AL SCROLL
═══════════════════════════════════════ */
function initNavbarScroll() {
    const nav = document.getElementById('main-navbar');
    if (!nav) return;
    nav.classList.toggle('scrolled', window.scrollY > 60);
    window.addEventListener('scroll', () => {
        nav.classList.toggle('scrolled', window.scrollY > 60);
    }, { passive: true });
}

/* ═══════════════════════════════════════
   MAPA LEAFLET + RUTA
═══════════════════════════════════════ */
function initMap() {
    const mapElement = document.getElementById('map');
    if (!mapElement) return;
    if (typeof L === 'undefined') {
        mapElement.innerHTML = '<p class="p-4">El mapa no está disponible. <a href="https://www.openstreetmap.org/?mlat=20.206231&mlon=-99.222102#map=16/20.206231/-99.222102" target="_blank" rel="noopener noreferrer">Abrir ubicación</a></p>';
        return;
    }
    const destLat = 20.206231;
    const destLng = -99.222102;
    const map = L.map('map').setView([destLat, destLng], 14);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(map);

    L.marker([destLat, destLng]).addTo(map)
        .bindPopup('<b>GymTrack</b><br>Oficinas Centrales.')
        .openPopup();

    const routeButton = document.getElementById('show-route');
    const routeStatus = document.getElementById('route-status');
    if (!routeButton) return;
    routeButton.addEventListener('click', () => {
    if (!navigator.geolocation) {
        routeStatus.textContent = 'Tu navegador no permite consultar la ubicación.';
        return;
    }
    routeButton.disabled = true;
    routeStatus.textContent = 'Buscando tu ubicación…';
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
            routeStatus.textContent = 'Tu ubicación aparece en el mapa.';
            routeButton.disabled = false;
        },
        () => {
            routeStatus.textContent = 'No pudimos obtener tu ubicación. Puedes volver a intentarlo o consultar el mapa.';
            routeButton.disabled = false;
        },
        { enableHighAccuracy: true, timeout: 10000 }
    );
    });
}

function addRoute(map, fromLat, fromLng, toLat, toLng) {
    if (!L.Routing) return;
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
    const obs = createRevealObserver();
    document.querySelectorAll('.scroll-animate, .card-animate').forEach(el => obs.observe(el));
}

/* ═══════════════════════════════════════
   CATÁLOGO DINÁMICO (fetch → MongoDB)
═══════════════════════════════════════ */
let currentServices = [];

function fetchServices() {
    const container = document.getElementById('services-container');
    if (!container) return;
    container.setAttribute('aria-busy', 'true');
    container.innerHTML = '<div class="catalog-state"><span class="spinner-border" role="status"><span class="visually-hidden">Cargando soluciones</span></span><p>Estamos preparando las soluciones…</p></div>';

    fetch('/api/servicios', { signal: AbortSignal.timeout(12000) })
        .then(r => { if (!r.ok) throw new Error('DB error'); return r.json(); })
        .then(data => {
            currentServices = data;
            container.innerHTML = '';
            if (!data.length) {
                container.innerHTML = '<div class="catalog-state"><i class="bx bx-layer" aria-hidden="true"></i><div><h3>Estamos preparando el catálogo</h3><p>Cuéntanos qué necesita tu gimnasio y te orientamos.</p></div><a class="text-link dark-link" href="https://wa.me/527721013839" target="_blank" rel="noopener noreferrer">Consultar al equipo <i class="bx bx-right-arrow-alt" aria-hidden="true"></i></a></div>';
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
                        <div class="overflow-hidden rounded-top-4 card-img-top-wrap">
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
                            <button type="button" class="btn btn-outline-primary btn-sm rounded-pill w-100 fw-semibold" data-bs-toggle="modal" data-bs-target="#serviceModal" data-index="${i}">${btn}</button>
                        </div>
                    </div>
                </div>`;
            });

            // Observar tarjetas dinámicas
            const obs = createRevealObserver();
            container.querySelectorAll('.card-animate').forEach(el => obs.observe(el));
        })
        .catch(() => {
            container.innerHTML = `
                <div class="catalog-state" role="status">
                    <i class="bx bx-wifi-off" aria-hidden="true"></i><div><h3>El catálogo no está disponible por ahora</h3><p>Puedes volver a intentarlo o escribirnos para conocer las soluciones.</p></div>
                    <button type="button" id="retry-services">Reintentar</button><a class="text-link dark-link" href="https://wa.me/527721013839" target="_blank" rel="noopener noreferrer">Consultar al equipo <i class="bx bx-right-arrow-alt" aria-hidden="true"></i></a>
                </div>`;
            document.getElementById('retry-services').addEventListener('click', fetchServices);
        })
        .finally(() => container.setAttribute('aria-busy', 'false'));
}

function initEditorialInteractions() {
    const details = document.querySelectorAll('.feature-accordion details');
    details.forEach(item => item.addEventListener('toggle', () => {
        if (item.open) details.forEach(other => { if (other !== item) other.open = false; });
    }));
    const menu = document.getElementById('navbarNav');
    if (!menu || typeof bootstrap === 'undefined') return;
    menu.querySelectorAll('a[href^="#"]').forEach(link => link.addEventListener('click', () => {
        if (menu.classList.contains('show')) bootstrap.Collapse.getOrCreateInstance(menu).hide();
    }));
}

/* ═══════════════════════════════════════
   MODAL DE DETALLE + COTIZADOR CON
   DESCUENTO POR VOLUMEN (máx. 30%)
═══════════════════════════════════════ */
let currentUnitPrice = 0;

function getVolumeDiscount(qty) {
    if (qty >= 20) return 0.30;
    if (qty >= 10) return 0.20;
    if (qty >= 5)  return 0.10;
    return 0;
}

function formatMXN(value) {
    return '$' + Math.round(value).toLocaleString('es-MX') + ' MXN';
}

function initServiceModal() {
    const modalEl = document.getElementById('serviceModal');
    if (!modalEl) return;

    const qtyInput = document.getElementById('sm-qty');

    modalEl.addEventListener('show.bs.modal', (event) => {
        const index = event.relatedTarget ? event.relatedTarget.dataset.index : undefined;
        const service = currentServices[index];
        if (service) populateServiceModal(service);
    });

    document.getElementById('sm-qty-minus').addEventListener('click', () => {
        qtyInput.value = Math.max(1, (parseInt(qtyInput.value, 10) || 1) - 1);
        updateQuote();
    });
    document.getElementById('sm-qty-plus').addEventListener('click', () => {
        qtyInput.value = (parseInt(qtyInput.value, 10) || 1) + 1;
        updateQuote();
    });
    qtyInput.addEventListener('input', () => {
        if (!qtyInput.value || qtyInput.value < 1) qtyInput.value = 1;
        updateQuote();
    });
}

function updateQuote() {
    const qty = Math.max(1, parseInt(document.getElementById('sm-qty').value, 10) || 1);
    const subtotal = currentUnitPrice * qty;
    const discountPct = getVolumeDiscount(qty);
    const discountAmount = subtotal * discountPct;
    const total = subtotal - discountAmount;

    document.getElementById('sm-unit-price').textContent = formatMXN(currentUnitPrice);
    document.getElementById('sm-subtotal').textContent = formatMXN(subtotal);
    document.getElementById('sm-discount-pct').textContent = Math.round(discountPct * 100) + '%';
    document.getElementById('sm-discount-amount').textContent = '-' + formatMXN(discountAmount);
    document.getElementById('sm-discount-row').classList.toggle('d-none', discountPct === 0);
    document.getElementById('sm-total').textContent = formatMXN(total);
}

function populateServiceModal(s) {
    const cat = (s.categoria || '').toUpperCase();
    const isQuotable = cat === 'HARDWARE' && s.precio > 0;

    document.getElementById('sm-img').src = s.imagen || 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=600&auto=format&fit=crop';
    document.getElementById('sm-img').alt = s.nombre;
    document.getElementById('sm-cat').textContent = cat;
    document.getElementById('sm-icon').className = 'bx ' + (s.icono || 'bx-layer');
    document.getElementById('sm-title').textContent = s.nombre;
    document.getElementById('sm-desc').textContent = s.descripcion;
    document.getElementById('sm-star').innerHTML = s.destacado
        ? '<span class="badge bg-warning text-dark shadow-sm">⭐ Destacado</span>' : '';

    const duracionWrap = document.getElementById('sm-duracion');
    if (s.duracion) {
        duracionWrap.classList.remove('d-none');
        duracionWrap.querySelector('span').textContent = s.duracion;
    } else {
        duracionWrap.classList.add('d-none');
    }

    document.getElementById('sm-simple-price').classList.toggle('d-none', isQuotable);
    document.getElementById('sm-quote').classList.toggle('d-none', !isQuotable);

    if (isQuotable) {
        currentUnitPrice = s.precio;
        document.getElementById('sm-qty').value = 1;
        updateQuote();
    } else {
        document.getElementById('sm-simple-price-text').innerHTML = s.precio === 0
            ? '<span class="text-success"><i class="bx bx-check-circle"></i> Incluido en plan</span>'
            : formatMXN(s.precio);
    }

    const waMsg = encodeURIComponent(`Hola, me interesa cotizar: ${s.nombre}`);
    document.getElementById('sm-whatsapp-btn').href = `https://wa.me/527721013839?text=${waMsg}`;
}

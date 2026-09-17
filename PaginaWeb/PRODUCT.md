# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Primary user: the owner/administrator of a local or mid-size gym, evaluating or already running GymTrack as their gym-management SaaS. They arrive to understand what GymTrack does, decide whether to contract it, and (once a customer) log in to their admin account. GymTrack is B2B2C: this web platform serves the B2B side (gym owners as the direct customer); their gym's end members use the separate GymTrack mobile app (AppMovil, out of scope for this PRODUCT.md).

## Product Purpose

GymTrack Web is the marketing and administrative entry point for GymTrack's SaaS: it explains the product to prospective gym owners, converts them into leads/signups, and hosts the account login/registration for gym owners to manage their gym. Success is a prospective gym owner understanding the value proposition, reaching out (WhatsApp/email) or registering, and returning to log in to administer their account.

## Positioning

GymTrack's differentiated mechanism (per the project's own framing, see README.md) is centralizing three things gyms normally run separately: membership/payment administration, physical access control via RFID/IoT hardware, and training-routine distribution tailored to each gym's real equipment — all under one multi-tenant SaaS platform. This web platform is where that pitch is made and where the administrative relationship starts.

## Operating Context

- Self-serve acquisition model: any interested gym can sign up, there is no single named pilot client — the platform is built to onboard gyms generally, not one specific gym.
- Real, working contact channels already live on the site: WhatsApp +52 772 101 3839, and email josemariaortizescamilla@gmail.com. These are functioning channels, not placeholders — preserve them.
- Spanish (es-MX) is the site's working language throughout.
- Academic context: GymTrack originates as an ITSOEH (Ing. en TICs) capstone project spanning multiple courses (see README.md), but the product intent and the contact channels above are real and live, not fictional coursework props.

## Capabilities and Constraints

**Current build (today's truth):**
- Marketing/landing site (`index.html`): hero, about, services/solutions section, location, contact CTA.
- Standalone `contacto.html`, `login.html`, `registro.html`, `bienvenido.html` (post-login landing) pages.
- Backend: Java Spring Boot (`PaginaWeb`), REST endpoints under `/api/users` for `register` and `login` (SHA-256 password hashing, no Spring Security), backed by MongoDB Atlas (not Supabase/Postgres).
- `User` model is minimal today: name, email, password — no gym/tenant association, roles, or membership data yet.
- A `GymService`/`servicios` collection exists for listing services shown on the marketing site (name, description, price, icon, image, category, featured/active flags) — this is marketing content, not gym-tenant business data.
- Frontend stack actually in use: static HTML + Bootstrap 5 + BoxIcons + Google Fonts (Poppins), vanilla JS (`js/main.js`) — **not** the React/Next stack the README describes.

**Vision / roadmap (not yet built — do not treat as present capability):**
- Multi-tenant gym management (multiple gyms, each with isolated data via RLS-style isolation).
- Membership/payment tracking, RFID credential assignment, routine builder, access-history dashboard for gym admins.
- Supabase/PostgreSQL backend, RFID/ESP32/MQTT IoT access-control device.
- These are documented in README.md as the product's eventual full scope and may inform positioning/marketing copy, but must not be implemented or implied as working today without the user confirming that work has actually started.

**Known constraint to flag:** `application.properties` currently commits a live MongoDB Atlas connection string with a real username/password in plaintext. This is a credential exposure, independent of design work — worth the user's attention separately.

## Brand Commitments

- Name: **GymTrack**, styled with the "Track" portion in the brand primary color, paired with a dumbbell icon (`bx-dumbbell`).
- Tagline (from README): "Administra. Identifica. Accede. Entrena. Analiza. Mejora."
- Existing visual identity (Bootstrap primary blue, Poppins typeface, BoxIcons iconset, rounded-pill buttons) is already implemented across all current pages — treated as the incumbent look for scoped refinement work, not a locked brand system to be assumed binding for a redesign.

## Evidence on Hand

- Real, working contact channels: WhatsApp `+52 772 101 3839`, email `josemariaortizescamilla@gmail.com` (both live on `contacto.html` and referenced from `index.html`).
- No named pilot gym client exists — the platform targets any interested gym generally; do not invent a specific pilot gym, its name, or its location.
- No confirmed real pricing/subscription tiers exist yet for the GymTrack SaaS offering itself. (The `servicios`/`GymService` items with prices seen in code are services content, not confirmed SaaS pricing plans.)
- No testimonials, case studies, or press exist — do not fabricate them.

## Product Principles

1. Say what GymTrack actually does today (marketing + basic auth) truthfully, while the pitch can still describe the fuller committed roadmap (multi-tenant management, RFID access, routines) as the product's direction — never blur the two into a false claim of present capability.
2. This site's job is conversion and administration entry for gym owners (B2B); it is not the end-member experience, which lives in the separate mobile app.
3. Preserve the real contact channels (WhatsApp, email) exactly — they are live business infrastructure, not filler.
4. Any pricing, client names, or testimonials added to the site must come from the user, never be invented.
5. Spanish (es-MX) throughout; keep copy and tone consistent with the existing site's voice.

## Accessibility & Inclusion

No product-specific accessibility requirement has been established beyond standard web accessibility practice.

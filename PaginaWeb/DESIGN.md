# GymTrack — deportiva y atrevida

The user chose a sporting, bold redesign. Preserve the GymTrack dumbbell mark and orange Track lettering. The visual direction is an athletic editorial identity: expressive condensed headlines, monochrome gym photography, warm paper, charcoal and decisive orange.

## System

- Barlow Condensed 600/700/800 for expressive marketing headlines (maximum 96px).
- DM Sans 400–700 for body copy and controls; Manrope 600–800 for identity and compact interface headings. Fonts are self-hosted in `src/main/resources/static/fonts`.
- Ink #20221f; paper #f4f2eb; accent #f45124; accessible orange text #b73511; muted text #62645d.
- Broad asymmetric editorial layouts, restrained 4–12px corners, section spacing 62–100px, deliberate ruled separations. Avoid decorative glow, glass and repeated floating cards.
- Three-scene editorial hero slider: clipped type, photographic reveal and a bounded image settling transition. Labeled selectors, progress, arrows, pause/resume, keyboard navigation and touch swipe. Autoplay every seven seconds pauses on hover, keyboard focus, hidden tabs and offscreen; manual navigation pauses until resumed. Reduced motion disables autoplay and spatial animation.
- One-time, varied scroll entrances introduce the mission, ecosystem photography and contact typography. Hover feedback stays short; no perpetual decorative loops. Content remains visible without scripts.
- Mobile stacks the hero and keeps all meaningful copy and actions; menus collapse, accordions use native keyboard-accessible details/summary.

## Product boundaries

Marketing describes memberships, RFID and mobile routines as the ecosystem under development. No invented statistics, customer counts, rankings or testimonials. Keep the real WhatsApp and email in PRODUCT.md. Preserve existing registration, login, dashboard preview and service quotation behavior.

## Surfaces

Landing: Persuade, photographic opening followed by mission, explorable ecosystem, live catalog, contact and location.
Login/registration/dashboard: Operate, same visual identity with quieter motion and denser typography.

## Validation

Review desktop and mobile together, then fix findings in one batch. Preview served locally from source; API-dependent behavior requires the Spring Boot service and MongoDB connection.

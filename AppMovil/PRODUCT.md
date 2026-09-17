# Product

<!-- impeccable:product-schema 1 -->

## Platform

adaptive

## Stack

Expo SDK 57 (React Native 0.86.3, React 19.2.3), Expo Router (file-based, typed routes), TypeScript. No UI kit or styling library installed (plain `StyleSheet.create`); no NativeWind/Tailwind. Icons via `@expo/vector-icons` (Ionicons). This is an existing scaffold, not a greenfield choice — the stack was set before this session.

## Users

Primary user: a gym member (the end customer of a gym that has contracted GymTrack), using the app day-to-day to check their membership, see the routine their gym assigned them, and log workouts. This is the B2C side of GymTrack's B2B2C model — distinct from [PaginaWeb](../PaginaWeb/PRODUCT.md), which serves the gym owner/admin (B2B). Physical gym access itself happens via a separate RFID credential, not through this app.

## Product Purpose

The mobile app is the member-facing half of GymTrack: check membership status and expiry, view the training routine the gym's trainer built (tailored to that gym's real equipment), log sets/reps/weight during a workout, and review training history and progress over time. Success is a member opening the app before/after a session to know what to do and to see their progress, instead of relying on paper or a generic fitness app that ignores their specific gym's equipment.

## Positioning

Unlike a generic fitness-tracking app, routines here come from the member's own gym/trainer and are scoped to that gym's actual equipment (set up on the web admin side) — the app is the delivery surface for that, not a standalone workout planner.

## Operating Context

- Companion app to PaginaWeb: a member's account, membership status, and routines are meant to originate from the gym owner's actions on the web platform. Nothing about a member's own gym, plan, or trainer-assigned content should be invented by the app itself.
- Spanish (es-MX), matching PaginaWeb.
- No backend wiring exists yet for this app (see Capabilities below) — screens work on local/mock data today.

## Capabilities and Constraints

**Current build (today's truth):** Expo Router shell with a `(auth)` login screen and a `(tabs)` group (Inicio, Rutinas, Entrenar, Progreso). No network layer, no auth library, no state management — all screen content is hardcoded/mock. The login screen's submit is a client-side navigation only, not a real credential check (`PaginaWeb`'s `/api/users/login` is not called from here). No brand styling applied yet (default Expo template blue `#2f95dc`, no Poppins, generic app.json name/icon/splash).

**Vision / roadmap (not yet built):** Real auth against a backend (today's `/api/users` endpoints are minimal — name/email/password only, no membership/gym/routine data model yet, so a real integration needs backend work first, not just app work). Membership/payment status pulled live. Routines authored by the gym and synced down. Workout logging persisted with real history/progress. Physical access stays on the separate RFID/IoT path, not this app.

## Brand Commitments

Inherits GymTrack's identity from [PaginaWeb](../PaginaWeb/PRODUCT.md): name **GymTrack**, primary brand color **#ff5722** (orange) with a darker `#d84315` and lighter `#ff8a65` variant, Poppins typeface, a dumbbell mark, rounded-pill buttons, restrained-with-one-accent color use. This app adapts that identity to native idiom (per-OS conventions) rather than copying the web page's DOM/CSS structure.

## Evidence on Hand

Same real, live contact channels as PaginaWeb (WhatsApp `+52 772 101 3839`, email `josemariaortizescamilla@gmail.com`) apply to the ecosystem as a whole, though this app's screens don't currently surface them. No named pilot gym, no confirmed pricing, no testimonials — do not invent any.

## Product Principles

1. Preview honestly: where a screen shows what a finished feature will look like before the backend exists to power it, label it (e.g. "Vista previa", "Ejemplo") the same way PaginaWeb's dashboard does — never let mock data read as live data.
2. One brand, two platforms: colors, type, and voice match PaginaWeb; layout, navigation, and touch conventions follow each OS's native idiom (adaptive platform).
3. This app is the member's tool, not the owner's — membership, routines, and gym identity are things a member *receives*, never configures here.
4. Spanish (es-MX) throughout, consistent tone with PaginaWeb.

## Accessibility & Inclusion

No product-specific requirement established beyond standard iOS/Android accessibility practice (Dynamic Type / font scaling, VoiceOver/TalkBack labels, minimum touch target size).

# Propuesta de Proyecto: GymTrack

## Descripción General

**GymTrack** es un ecosistema tecnológico **B2B2C** diseñado para modernizar la administración y la experiencia de usuario en gimnasios locales y medianos.

El sistema integra una **plataforma web administrativa**, una **aplicación móvil**, servicios backend y un **módulo físico IoT basado en tecnología RFID** para automatizar el control de acceso al gimnasio.

La **página web** será la herramienta principal para los dueños de los gimnasios, permitiéndoles contratar el servicio de GymTrack (modelo SaaS), gestionar a sus usuarios, registrar pagos, administrar membresías y diseñar rutinas de entrenamiento. Por su parte, los usuarios finales utilizarán la **aplicación móvil** para consultar el estado de su membresía, visualizar las rutinas asignadas y registrar su progreso, accediendo físicamente al gimnasio mediante una credencial RFID.

El sistema busca centralizar los principales procesos del gimnasio en un único ecosistema tecnológico, conectando la administración web, el control de acceso IoT y la experiencia deportiva móvil del usuario.

---

# Problemática

Actualmente, muchos gimnasios medianos y locales presentan una desconexión entre sus procesos administrativos, el control de acceso y la gestión de los entrenamientos.

Los administradores pueden depender de procesos manuales o sistemas independientes para:

* Registrar clientes.
* Controlar y cobrar membresías.
* Verificar pagos en tiempo real.
* Controlar el acceso físico.
* Distribuir rutinas basadas en su equipamiento real.

Esta situación puede generar problemas como:

* Permitir el acceso a usuarios con membresías vencidas, generando pérdidas económicas.
* Dificultad para gestionar e identificar rápidamente a los usuarios.
* Uso de tarjetas físicas sin validación automatizada en la nube.
* Registros manuales de acceso (papel o Excel).
* Falta de integración entre la membresía y el control de acceso.
* Uso de aplicaciones genéricas que no consideran el equipamiento disponible en el gimnasio específico.

Por su parte, los usuarios pueden experimentar una experiencia fragmentada al depender de diferentes medios para acceder al gimnasio, consultar sus rutinas y registrar su progreso.

GymTrack busca solucionar esta problemática mediante la integración de estos procesos en una sola plataforma en la nube.

---

# Objetivo General

Desarrollar e implementar un **ecosistema tecnológico integral denominado GymTrack**, que combine una plataforma web administrativa, una aplicación móvil, servicios backend y un dispositivo IoT basado en tecnología RFID para centralizar la gestión de membresías, automatizar el control de acceso físico mediante validación en tiempo real y permitir la distribución de rutinas de entrenamiento personalizadas, mejorando la administración del gimnasio y la experiencia del usuario final.

---

# Objetivos Específicos

1. Diseñar y desarrollar una **plataforma web administrativa** para que los dueños de los gimnasios puedan contratar el servicio (SaaS), registrar su sucursal, dar de alta usuarios, gestionar membresías y crear rutinas.

2. Diseñar y desarrollar una **aplicación móvil** para que los usuarios finales consulten su progreso, rutinas y estado de cuenta.

3. Implementar una base de datos y servicios backend (Supabase) que permitan centralizar y gestionar de forma segura la información de múltiples gimnasios bajo una arquitectura multi-tenant.

4. Desarrollar un sistema de control de acceso IoT mediante ESP32 y tecnología RFID, capaz de validar en tiempo real el estado de la membresía de los usuarios.

5. Evaluar el funcionamiento e impacto de GymTrack mediante una implementación piloto, utilizando indicadores relacionados con la automatización, reducción de morosidad y experiencia de los usuarios.

---

# 🧩 Componentes Principales

GymTrack estará compuesto por cuatro componentes tecnológicos principales:

```plaintext
                         GYMTRACK
                            │
      ┌─────────────┬───────┴────────┬─────────────┐
      │             │                │             │
      ▼             ▼                ▼             ▼
  Plataforma    Aplicación        Backend         IoT
     Web          Móvil       + Base de Datos  Control de
 (Gimnasios)    (Usuarios)                     Acceso RFID
      │             │                │             │
      └─────────────┴───────┬────────┴─────────────┘
                            │
                            ▼
                         Gimnasio
```

💻 1. Plataforma Web (Administración)
La plataforma web es el núcleo de administración comercial y operativa del proyecto. Aquí es donde los dueños de gimnasios interactúan con el ecosistema.

El dueño o Administrador podrá:

* Contratar el servicio GymTrack (Suscripción SaaS).
* Configurar la información de su gimnasio (equipamiento disponible).
* Agregar y registrar nuevos usuarios/clientes.
* Gestionar planes y membresías.
* Registrar pagos de mensualidades.
* Consultar estados de cuenta y usuarios morosos.
* Asignar credenciales RFID a los usuarios.
* Crear y administrar ejercicios y rutinas exclusivas de su gimnasio.
* Consultar el historial de accesos registrados por el dispositivo IoT.

📱 2. Aplicación Móvil
La aplicación móvil será desarrollada utilizando React Native, Expo y TypeScript. Estará enfocada principalmente en el cliente final.

El Usuario podrá:

* Iniciar sesión.
* Consultar su perfil.
* Consultar el estado de su membresía y la fecha de vencimiento.
* Consultar las rutinas creadas por su gimnasio (adaptadas al equipo real).
* Registrar entrenamientos (series, repeticiones, peso).
* Consultar récords personales y progreso a lo largo del tiempo.
* Consultar su historial de entrenamientos.
* Su acceso físico a las instalaciones se realizará mediante una credencial RFID física.

🔑 3. Sistema de identificación RFID
El sistema utilizará tecnología RFID (Radio Frequency Identification) para identificar a los usuarios en la entrada.

La credencial podrá tomar diferentes formas:

* Tarjeta RFID.
* Llavero RFID.
* Pulsera RFID.
* Otro dispositivo compatible.

El usuario únicamente deberá acercar su credencial al lector instalado en la entrada.

```plaintext
Usuario
   │
   ▼
Tarjeta / Llavero / Pulsera RFID
   │
   ▼
Lector RFID
   │
   ▼
ESP32
   │
   ▼
Backend (Validación de membresía)
```

🚪 4. Control de acceso IoT
El módulo IoT estará instalado físicamente en la entrada del gimnasio, conectado a un torniquete o puerta.

Su función será:

* Detectar una credencial RFID.
* Obtener el identificador asociado.
* Enviar la solicitud de validación segura.
* Consultar el backend (Supabase) para verificar el estado de pago.
* Autorizar o rechazar el acceso.
* Accionar el mecanismo de apertura (relé) cuando la membresía esté activa.
* Registrar el acceso en la base de datos.

El flujo será:

```plaintext
               Usuario
                  │
                  ▼
            Acerca RFID
                  │
                  ▼
             Lector RFID
                  │
                  ▼
                ESP32
                  │
                  ▼
           Solicitud segura
                  │
                  ▼
         Backend / Supabase
                  │
                  ▼
          ¿Membresía activa?
            │            │
          Sí           No
            │            │
            ▼            ▼
      Abrir acceso   Denegar acceso
            │            │
            └─────┬─────┘
                  ▼
            Registrar evento
```

🗄️ 5. Backend y Base de Datos
GymTrack utilizará Supabase como plataforma backend en la nube y PostgreSQL como sistema gestor de base de datos.

La base de datos centralizada permitirá que tanto la plataforma web como la app móvil y el dispositivo IoT consuman y actualicen la misma información en tiempo real.

Una estructura conceptual sería:

```plaintext
Gimnasio
   │
   ├── Administradores (Web)
   │
   ├── Usuarios (App Móvil)
   │     │
   │     ├── Membresía
   │     ├── Credencial RFID
   │     ├── Rutinas
   │     └── Entrenamientos
   │
   ├── Ejercicios
   │
   └── Registros de acceso
```

🔐 Seguridad (Aislamiento de Datos)
Dado que la plataforma web permitirá a múltiples gimnasios contratar el servicio, la información deberá mantenerse estrictamente aislada.

Para ello se utilizará Row Level Security (RLS) en PostgreSQL mediante Supabase.

```plaintext
                    Supabase + RLS
                         │
           ┌─────────────┼─────────────┐
           │             │             │
           ▼             ▼             ▼
       Gimnasio A    Gimnasio B    Gimnasio C
           │             │             │
        Usuarios      Usuarios      Usuarios
           │             │             │
           ▼             ▼             ▼
         Datos         Datos         Datos
```

Cada administrador de gimnasio, desde su panel web, tendrá acceso únicamente a la información de sus propios clientes.

🌐 Comunicación IoT
La comunicación entre el dispositivo IoT y los servicios backend utilizará protocolos ligeros orientados a IoT.

Se contempla el uso de:

```plaintext
ESP32
  │
  ▼
Wi-Fi
  │
  ▼
MQTT
  │
  ▼
TLS (Cifrado)
  │
  ▼
Backend (Supabase)
```

MQTT permitirá establecer una comunicación eficiente entre el dispositivo y los servicios del sistema, mientras que TLS proporcionará cifrado durante la transmisión.

🎓 Aplicación académica por materia
GymTrack es un proyecto multidisciplinario que permitirá integrar los conocimientos de diferentes asignaturas de la carrera de Ing. en TICs.

💼 Negocios Electrónicos
Aplicación en GymTrack
GymTrack operará bajo un modelo SaaS (Software as a Service) con un esquema B2B2C. La plataforma web es el canal principal de este negocio.

```plaintext
                 GymTrack (SaaS)
                    │
                    ▼
          Página Web (Contratación B2B)
                    │
                    ▼
                 Gimnasio
                    │
             ┌──────┴──────┐
             │             │
             ▼             ▼
      Administrador      App Móvil
             │             │
             └──────┬──────┘
                    ▼
            Cliente Final (B2C)
```

Aplicación de la materia
Se analizarán:

* Venta de suscripciones web a dueños de gimnasios.
* Implementación de hardware como cobro adicional.
* Reducción de la morosidad a través de la automatización.
* Propuesta de valor B2B y B2C.
* Canales de adquisición digitales.

📱 Desarrollo de Aplicaciones Móviles
Desarrollo de la aplicación nativa (React Native + Expo) enfocada en el usuario final (B2C) para la visualización de rutinas, historial y métricas de progreso.

🌐 Internet de las Cosas (IoT)
Desarrollo del nodo sensor/actuador (ESP32 + Lector RFID + Relé) instalado físicamente en los gimnasios para validar en tiempo real los pagos registrados en la web y controlar el torniquete de acceso.

🌐 Administración y Seguridad de Redes
Implementación de la arquitectura cliente-servidor (Web, App, IoT) hacia la nube (Supabase). Diseño de políticas de Row Level Security (RLS) para arquitectura Multi-tenant, y configuración de protocolos MQTT con cifrado TLS para el acceso físico.

🔬 Taller de Investigación II
Investigación aplicada para medir el impacto comercial y operativo: "¿Cómo la implementación del ecosistema GymTrack reduce la morosidad, mejora el control de accesos y aumenta la retención de clientes en comparación con procesos manuales?".

🛠️ Stack tecnológico

Plataforma Web (SaaS)
* Tecnología: React / Next
* Uso: Framework web para el dashboard
* Tecnología: Tailwind CSS
* Uso: Estilos e interfaces

Aplicación Móvil
* Tecnología: React Native
* Uso: Desarrollo multiplataforma
* Tecnología: Expo
* Uso: Framework de desarrollo
* Tecnología: TypeScript
* Uso: Tipado estático

Backend y Seguridad
* Tecnología: Supabase
* Uso: Backend en la nube (BaaS)
* Tecnología: PostgreSQL
* Uso: Base de datos Multi-tenant
* Tecnología: RLS
* Uso: Seguridad y aislamiento (B2B)

IoT
* Tecnología: ESP32
* Uso: Microcontrolador
* Tecnología: RFID
* Uso: Identificación física
* Tecnología: MQTT + TLS
* Uso: Comunicación remota segura

🗺️ Roadmap

Fase 1 — Planeación
- [x] Definir problemática.
- [x] Definir objetivo general.
- [x] Definir modelo B2B2C (SaaS).
- [x] Diseñar arquitectura multidisciplinaria.

Fase 2 — Plataforma Web & Backend (Negocios Electrónicos)
- [ ] Configurar Supabase y PostgreSQL.
- [ ] Crear esquema de BD y políticas RLS para múltiples gimnasios.
- [ ] Desarrollar página web administrativa.
- [ ] Implementar gestión de usuarios, membresías y pagos desde la web.

Fase 3 — Aplicación Móvil (Usuarios)
- [x] Crear proyecto Expo.
- [ ] Diseñar interfaz de usuario final.
- [ ] Visualización de rutinas y estado de cuenta.
- [ ] Historial y récords personales.

Fase 4 — IoT (Control de Acceso)
- [ ] Configurar ESP32 y Lector RFID.
- [ ] Implementar comunicación MQTT segura con Supabase.
- [ ] Validar membresías y accionar relés de apertura.

Fase 5 — Integración e Investigación
- [ ] Pruebas del ecosistema completo (Web -> DB -> IoT -> App).
- [ ] Instalación piloto en un gimnasio real.
- [ ] Evaluación de impacto (reducción de morosidad).

📊 Indicadores de impacto
* Tiempo de validación: Medir rapidez del acceso
* Accesos automatizados: Medir funcionamiento del sistema
* Membresías vencidas detectadas: Evaluar control administrativo
* Accesos rechazados: Evaluar validación
* Procesos manuales reducidos: Medir automatización
* Uso de rutinas digitales: Medir adopción
* Uso de la aplicación: Medir participación
* Satisfacción del usuario: Evaluar experiencia
* Retención de clientes: Evaluar impacto comercial

📌 Estado del proyecto
Estado: 🚧 En desarrollo

GymTrack se encuentra actualmente en la etapa de planeación, definición de arquitectura y configuración del entorno de desarrollo.

El proyecto integra diferentes áreas:

```plaintext
        Desarrollo de Apps
                │
                ▼
          Aplicación móvil
                │
                │
Negocios ─── GymTrack ─── IoT
                │
                │
                ▼
         Backend + BD (Web)
                │
                ▼
        Redes y Seguridad
                │
                ▼
          Investigación
```

📚 Recursos
* Expo
* React Native
* TypeScript
* Supabase
* PostgreSQL
* MQTT
* ESP32

👥 Proyecto académico
* Proyecto: GymTrack
* Modelo de negocio: B2B2C (SaaS)
* Tipo: Ecosistema tecnológico para gimnasios locales
* Plataforma Administrativa: Aplicación Web (React)
* Aplicación Usuarios: React Native + Expo
* Backend: Supabase + PostgreSQL
* Control de acceso: RFID + ESP32
* Comunicación IoT: MQTT + TLS

Áreas académicas involucradas:
* Desarrollo de Aplicaciones Móviles
* Negocios Electrónicos
* Internet de las Cosas
* Administración y Seguridad de Redes
* Taller de Investigación II

🏋️ GymTrack
Administra. Identifica. Accede. Entrena. Analiza. Mejora.

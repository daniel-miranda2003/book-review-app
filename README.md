# Daniel's Library - Aplicacion de Resenas de Libros

Daniel's Library es una aplicacion fullstack para gestionar lecturas personales, escribir resenas y compartir opiniones literarias. Incorpora una metrica de impacto emocional a traves del campo Mood.

## Despliegue en Vivo

- URL: https://book-review-app-production-74bf.up.railway.app/

## Tecnologias

- Framework: Next.js 16.2 (App Router)
- Lenguaje: TypeScript
- Estilos: Tailwind CSS v4
- Base de Datos: PostgreSQL (Railway) con Prisma ORM
- Autenticacion: JWT con HttpOnly cookies (jose)
- Seguridad: Hashing de contrasenas con bcryptjs
- Validacion: Esquemas estrictos con Zod
- Despliegue: Railway (free-tier)
- Versionamiento: GitHub (repositorio publico)

## El Campo Mood

A diferencia de las estrellas convencionales, el campo Mood permite al lector especificar el impacto emocional de la obra (Inspirador, Melancolico, Nostalgico, Emocionante, Reflexivo, Sorprendente). Esto ofrece un contexto mas profundo para otros lectores, ya que una misma calificacion numerica puede representar experiencias de lectura muy diferentes.

## Rutas de la Aplicacion

- /signup: Registro de usuario
- /login: Inicio de sesion
- /reviews: Listado de resenas (requiere autenticacion)
- /add-review: Crear nueva resena (requiere autenticacion)

## Endpoints de la API

- POST /api/signup: Registrar un nuevo usuario
- POST /api/login: Autenticar usuario y generar JWT
- GET /api/reviews: Obtener todas las resenas (requiere autenticacion)
- POST /api/reviews: Crear nueva resena (requiere autenticacion)
- DELETE /api/reviews/:id: Eliminar resena (requiere autenticacion y ser el autor)

## Configuracion Local

1. Clonar e instalar:

   ```bash
   git clone https://github.com/daniel-miranda2003/book-review-app.git
   cd book-review-app
   npm install
   ```

2. Configurar entorno:
   - Crear un archivo .env basado en .env.example.
   - Configurar una base de datos PostgreSQL y asignar la URL en DATABASE_URL.
   - Generar un SESSION_SECRET de al menos 32 caracteres.

3. Configurar Prisma:

   ```bash
   npx prisma db push
   ```

4. Ejecutar:
   ```bash
   npm run dev
   ```

## Configuracion en Produccion (Railway)

1. Crear un proyecto en Railway y conectar el repositorio de GitHub.
2. Agregar el plugin de PostgreSQL desde el panel de Railway.
3. Configurar las variables de entorno: DATABASE_URL y SESSION_SECRET.
4. Railway detecta automaticamente el proyecto de Next.js y ejecuta el build.

## Decisiones Tecnicas

- Adaptadores de Prisma: Para asegurar la compatibilidad con el recolector de paginas estaticas de Next.js 16, el cliente de Prisma se inicializa utilizando un adaptador del driver pg.
- Proteccion de Rutas: Se utiliza proxy.ts para la proteccion de sesiones en las rutas privadas /reviews y /add-review, siguiendo la nueva convencion de Next.js 16.2.1.
- Modales de Confirmacion: Se implementaron modales con React Portals para las acciones criticas (eliminar resena, cerrar sesion), evitando los dialogs nativos del navegador.

## Bugs Conocidos y Trade-offs

- El campo rating no tiene validacion CHECK a nivel de base de datos con Prisma; la validacion se realiza en el lado del cliente y la API.
- La sesion JWT tiene una duracion fija de 7 dias sin mecanismo de renovacion automatica.
- El modo oscuro depende del sistema operativo del usuario como configuracion inicial.

# Daniel's Library - Reseñas de Libros Personalizadas

Daniel's Library es una aplicación para gestionar lecturas personales, escribir reseñas y compartir opiniones literarias. Incorpora una métrica de impacto emocional a través del campo Mood.

## Despliegue en Vivo
- **URL**: [URL de Railway se añadirá tras el despliegue]

## Tecnologías
- **Framework**: Next.js 16.2 (App Router)
- **Base de Datos**: PostgreSQL (Prisma ORM)
- **Autenticación**: JWT con HttpOnly cookies (jose)
- **Seguridad**: Hashing de contraseñas con bcryptjs
- **Validación**: Esquemas estrictos con Zod
- **Diseño**: Tailwind CSS v4 (Tipografías: Playfair Display y Lora)

## El Campo Mood
A diferencia de las estrellas convencionales, el campo Mood permite al lector especificar el impacto emocional de la obra (ej. Inspirado, Melancólico, Nostálgico, Entusiasmado). Esto ofrece un contexto más profundo para otros lectores.

## Configuración Local

1. **Clonar e Instalar:**
   ```bash
   git clone <repo-url>
   cd book-review-app
   npm install
   ```

2. **Base de Datos y Entorno:**
   - Crear un archivo .env basado en .env.example.
   - Configurar una base de datos PostgreSQL y asignar la URL en DATABASE_URL.
   - Generar un JWT_SECRET de 32 caracteres.

3. **Configuración de Prisma:**
   ```bash
   npx prisma db push
   ```

4. **Ejecutar:**
   ```bash
   npm run dev
   ```

## Decisiones Técnicas y Notas
- **Adaptadores de Prisma**: Para asegurar la compatibilidad con el recolector de páginas estáticas de Next.js 16, el cliente de Prisma se inicializa utilizando un adaptador del driver pg.
- **Middleware**: Se utiliza middleware.ts para la protección de rutas privadas (/reviews). Se priorizó la seguridad y simplicidad del enrutamiento.

## Tiempo Estimado de Desarrollo
- Total aproximado: 8 horas.

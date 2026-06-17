# Portal Estudiantil — Unidad Educativa Los Andes

Proyecto pequeño en **PHP + PostgreSQL** con login y un panel que lista
estudiantes. Pensado para desplegarse en **Vercel** (frontend + backend PHP)
con la base de datos en **Neon**.

## Estructura del proyecto

```
ue-los-andes/
├── api/
│   ├── index.php       -> Página de login (ruta limpia: /)
│   ├── login.php       -> Procesa el formulario de login (ruta: /login)
│   ├── dashboard.php   -> Panel protegido con la tabla de estudiantes (/dashboard)
│   ├── logout.php      -> Cierra sesión (/logout)
│   ├── db.php          -> Conexión PDO a PostgreSQL (lee DATABASE_URL)
│   ├── auth.php        -> Login mediante cookie firmada (HMAC)
│   └── layout.php      -> Header/footer y estilos del portal
├── database/
│   └── schema.sql       -> Crea las 2 tablas + inserta datos de prueba
├── vercel.json           -> Configuración de despliegue (runtime PHP + rutas)
├── composer.json          -> Fija la versión de PHP (^8.1)
├── .env.example
└── .gitignore
```

Solo hay **2 tablas**:

- `usuarios`: cuentas de acceso al portal (login).
- `estudiantes`: registro de alumnos del colegio.

## 1. Crear la base de datos en Neon

1. Entra a [neon.tech](https://neon.tech) (o usa la integración directamente
   desde el Marketplace de Vercel, ver paso 3) y crea un proyecto, por
   ejemplo `ue-los-andes`.
2. Abre el **SQL Editor** de Neon y pega el contenido completo de
   `database/schema.sql`. Ejecútalo: esto crea las tablas `usuarios` y
   `estudiantes` y deja registrados los datos de prueba.
3. En el dashboard de Neon, click en **Connect** y copia la cadena de
   conexión (la "pooled connection", algo como):
   ```
   postgresql://usuario:password@ep-xxxxx-pooler.region.aws.neon.tech/neondb?sslmode=require
   ```

## 2. Subir el proyecto a un repositorio

```bash
cd ue-los-andes
git init
git add .
git commit -m "Portal Unidad Educativa Los Andes"
git branch -M main
git remote add origin TU_REPO_EN_GITHUB
git push -u origin main
```

## 3. Desplegar en Vercel

1. En [vercel.com](https://vercel.com) → **Add New Project** → importa el
   repositorio.
2. Antes de desplegar (o justo después), ve a
   **Settings → Environment Variables** y agrega:
   - `DATABASE_URL` = la cadena de conexión que copiaste de Neon.
   - `APP_SECRET` = una clave larga y aleatoria (para firmar la cookie de
     login). Ejemplo: genera una con `openssl rand -hex 32`.

   *Alternativa más simple:* en el mismo proyecto de Vercel, ve a
   **Storage → Connect Database → Neon** e instala la integración oficial.
   Ella crea automáticamente la base, te deja correr el `schema.sql` desde
   la consola de Neon enlazada, y **ya inyecta `DATABASE_URL` sola**, sin
   que tengas que copiarla a mano.
3. Vercel detecta el archivo `vercel.json` en la raíz y usa el runtime
   comunitario `vercel-php@0.9.0` para ejecutar los archivos `.php` dentro
   de `api/` como funciones serverless. No necesitas configurar nada más.
4. Click en **Deploy**. Cuando termine, abre la URL que te da Vercel: verás
   la pantalla de login del colegio.

## 4. Accesos de prueba

| Usuario   | Contraseña       | Rol            |
|-----------|------------------|----------------|
| `admin`   | `admin123`       | administrador  |
| `mquispe` | `secretaria2026` | secretaria     |

Las contraseñas se guardan en la base como hash **bcrypt** (nunca en texto
plano); las de la tabla de arriba son solo para que tú inicies sesión en la
demo.

## Notas técnicas importantes

- **Por qué no se usan sesiones nativas de PHP (`session_start()`):** en un
  entorno serverless como Vercel, cada request puede ejecutarse en un
  contenedor distinto y los archivos de sesión no se comparten de forma
  confiable entre invocaciones. Por eso el login funciona con una **cookie
  firmada (HMAC-SHA256)**: el servidor no "recuerda" nada, solo verifica que
  la firma de la cookie sea válida y no haya expirado (4 horas). Esto es más
  robusto para este tipo de despliegue.
- **Rutas limpias:** `vercel.json` mapea `/`, `/login`, `/dashboard` y
  `/logout` a los archivos PHP correspondientes en `api/`, así no se ve
  `.php` ni `/api/` en la URL.
- **Seguridad básica incluida:** contraseñas con `password_hash`/
  `password_verify`, consultas con PDO usando parámetros preparados (sin
  concatenar SQL), cookie `HttpOnly` + `Secure` + `SameSite=Lax`.
- Para agregar más estudiantes solo necesitas hacer `INSERT INTO
  estudiantes (...) VALUES (...)` desde el SQL Editor de Neon; el panel los
  mostrará automáticamente.

## Probarlo en tu computadora (opcional, antes de subirlo)

Si tienes PHP 8.1+ con la extensión `pdo_pgsql` instalada:

```bash
export DATABASE_URL="postgresql://usuario:password@host/db?sslmode=require"
export APP_SECRET="cualquier-clave-para-pruebas"
php -S localhost:8000 -t .
# abre http://localhost:8000/api/index.php
```

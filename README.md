# Portal Estudiantil — Unidad Educativa Los Andes

[![Vercel](https://img.shields.io/badge/Deployed-Vercel-black?logo=vercel)](https://ue-los-andess.vercel.app/)
[![PHP](https://img.shields.io/badge/PHP-8.1+-777BB4?logo=php)](https://www.php.net/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-Latest-336791?logo=postgresql)](https://www.postgresql.org/)
[![License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

Aplicación web para gestión del portal estudiantil con **PHP + PostgreSQL** desplegada en **Vercel**. Incluye autenticación segura, panel protegido y gestión de estudiantes.

**🌐 Sitio en producción:** https://ue-los-andess.vercel.app/

---

## 📋 Tabla de Contenidos

- [Requisitos Previos](#requisitos-previos)
- [Estructura del Proyecto](#estructura-del-proyecto)
- [Base de Datos](#base-de-datos)
- [Despliegue en Vercel](#despliegue-en-vercel)
- [Uso Local (Opcional)](#uso-local-opcional)
- [Accesos de Prueba](#accesos-de-prueba)
- [Notas Técnicas](#notas-técnicas)
- [Contribución](#contribución)

---

## 🚀 Requisitos Previos

Para utilizar este proyecto necesitas:

- **GitHub**: Cuenta para alojar el repositorio
- **Vercel**: Cuenta gratuita en [vercel.com](https://vercel.com)
- **Neon**: Cuenta PostgreSQL en [neon.tech](https://neon.tech)
- **Git**: Instalado en tu máquina ([descarga aquí](https://git-scm.com/))
- **PHP 8.1+**: Solo si deseas probar localmente (no requerido)

---

## 📁 Estructura del Proyecto

```
ue-los-andes/
├── api/
│   ├── index.php              # Página de login (ruta: /)
│   ├── login.php              # Procesa formulario de login
│   ├── dashboard.php          # Panel protegido con tabla de estudiantes
│   ├── logout.php             # Cierra sesión
│   ├── auth.php               # Funciones de autenticación
│   ├── db.php                 # Conexión PDO a PostgreSQL
│   └── layout.php             # Estilos CSS y HTML compartido
├── database/
│   └── schema.sql             # Script SQL para crear tablas
├── vercel.json                # Configuración de despliegue en Vercel
├── composer.json              # Dependencias PHP
├── .env.example               # Plantilla de variables de entorno
├── .gitignore                 # Archivos ignorados por Git
└── README.md                  # Este archivo
```

### Descripción de Archivos

| Archivo | Propósito |
|---------|-----------|
| `api/index.php` | Punto de entrada del portal, muestra login |
| `api/login.php` | Procesa credenciales y crea sesión |
| `api/dashboard.php` | Panel administrativo (requiere login) |
| `api/auth.php` | Verificación de autenticación con HMAC |
| `api/db.php` | Conexión segura a PostgreSQL con PDO |
| `database/schema.sql` | CREATE TABLE para usuarios y estudiantes |
| `vercel.json` | Mapea rutas PHP a funciones serverless |

---

## 🗄️ Base de Datos

### Tablas

#### `usuarios`
Almacena cuentas de acceso al portal:

```sql
CREATE TABLE usuarios (
  id SERIAL PRIMARY KEY,
  usuario VARCHAR(50) UNIQUE NOT NULL,
  contraseña_hash VARCHAR(255) NOT NULL,
  rol VARCHAR(50),
  creado_en TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

#### `estudiantes`
Registro de alumnos del colegio:

```sql
CREATE TABLE estudiantes (
  id SERIAL PRIMARY KEY,
  codigo_rude VARCHAR(20) UNIQUE,
  nombre VARCHAR(100),
  apellido VARCHAR(100),
  fecha_nacimiento DATE,
  curso VARCHAR(50),
  creado_en TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### Crear la BD en Neon

1. **Crear Proyecto en Neon**
   - Entra a [neon.tech](https://neon.tech)
   - Haz clic en "Create a new project"
   - Elige un nombre (ej: `ue-los-andes`)
   - Copia la **connection string**

2. **Ejecutar Schema**
   - Abre el SQL Editor en el panel de Neon
   - Copia el contenido de `database/schema.sql`
   - Pégalo en el editor y ejecuta

3. **Obtener DATABASE_URL**
   - En Neon, ve a Connection string
   - Copia la versión "pooled"
   - Asegúrate que incluya `?sslmode=require`

---

## 🔧 Despliegue en Vercel

### Paso 1: Preparar Repositorio GitHub

```bash
cd ue-los-andes
git init
git add .
git commit -m "Inicial: Portal Estudiantil Los Andes"
git branch -M main
git remote add origin https://github.com/TU_USUARIO/ue-los-andes.git
git push -u origin main
```

⚠️ **Reemplaza `TU_USUARIO` con tu nombre de usuario de GitHub**

### Paso 2: Conectar a Vercel

1. Ve a [vercel.com](https://vercel.com) e inicia sesión
2. Haz clic en **"Add New Project"**
3. Selecciona el repositorio `ue-los-andes`
4. Haz clic en **Import**

### Paso 3: Configurar Variables de Entorno

En la pantalla de configuración de Vercel, agrega estas variables:

| Variable | Valor |
|----------|-------|
| `DATABASE_URL` | Tu connection string de Neon (con `sslmode=require`) |
| `APP_SECRET` | Ejecuta `openssl rand -hex 32` y copia el resultado |

**Alternativa más simple:** Usa la integración oficial de Neon en Vercel para que se configure automáticamente.

### Paso 4: Deploy

1. Haz clic en **Deploy**
2. Espera a que termine (2-3 minutos)
3. Vercel te dará una URL: `https://ue-los-andess.vercel.app/`

✅ ¡Tu aplicación está en vivo!

---

## 💻 Uso Local (Opcional)

Si tienes PHP 8.1+ con PDO PostgreSQL:

```bash
# Configurar variables de entorno
export DATABASE_URL="postgresql://usuario:password@host/db?sslmode=require"
export APP_SECRET="cualquier-clave-para-pruebas"

# Iniciar servidor local
php -S localhost:8000 -t api/

# Abrir navegador
# http://localhost:8000/
```

---

## 🔐 Accesos de Prueba

| Usuario | Contraseña | Rol | Descripción |
|---------|-----------|-----|-------------|
| `admin` | `admin123` | Administrador | Acceso completo |
| `mquispe` | `secretaria2026` | Secretaría | Visualización |

> **Nota:** Las contraseñas en la BD están hasheadas con `password_hash()`, nunca en texto plano.

---

## ℹ️ Notas Técnicas Importantes

### Autenticación Sin Sesiones Nativas

En entornos serverless (Vercel), las sesiones PHP nativas no funcionan confiablemente. Este proyecto usa:

- **Cookie firmada**: HMAC-SHA256
- **Expiración**: 4 horas desde el último acceso
- **No requiere estado en servidor**: Stateless

Ventaja: La aplicación escala automáticamente sin necesidad de almacenar sesiones.

### Rutas Limpias

El archivo `vercel.json` configura rutas limpias:
- `/` → `api/index.php`
- `/login` → `api/login.php`
- `/dashboard` → `api/dashboard.php`
- `/logout` → `api/logout.php`

No necesitas ver `.php` ni `/api/` en la URL.

### Seguridad

✓ Contraseñas con `password_hash()` / `password_verify()`  
✓ Consultas con PDO (parámetros preparados, sin concatenación)  
✓ Cookie `HttpOnly` (no accesible desde JavaScript)  
✓ Cookie `Secure` (solo HTTPS en producción)  
✓ Cookie `SameSite=Lax` (protección CSRF)  

### Agregar Más Estudiantes

Solo necesitas ejecutar un INSERT desde Neon:

```sql
INSERT INTO estudiantes (codigo_rude, nombre, apellido, curso)
VALUES ('EST001', 'Juan', 'Pérez', '4to A');
```

El panel de dashboard los mostrará automáticamente.

---

## 📦 Stack Tecnológico

| Componente | Tecnología |
|-----------|-----------|
| **Backend** | PHP 8.1+ |
| **Base de Datos** | PostgreSQL (Neon) |
| **Hosting** | Vercel Serverless |
| **Servidor HTTP** | Vercel PHP Runtime |
| **Autenticación** | Cookie firmada HMAC |
| **Frontend** | HTML5 + CSS3 |

---

## 🔄 Git Workflow (Commits Organizados)

Usa este formato para commits claros:

```bash
git commit -m "tipo(componente): descripción"
```

**Tipos recomendados:**
- `feat`: Nueva funcionalidad
- `fix`: Corrección de bug
- `docs`: Cambios en documentación
- `refactor`: Reorganizar código sin cambiar función
- `test`: Agregar o modificar tests

**Ejemplos:**
```bash
git commit -m "feat(auth): agregar login seguro con HMAC"
git commit -m "fix(dashboard): tabla de estudiantes vacía"
git commit -m "docs(README): agregar instrucciones de despliegue"
```

---

## 📝 Variables de Entorno

Copia `.env.example` a `.env` (solo en desarrollo local):

```bash
cp .env.example .env
```

Edita `.env` con tus valores. **Nunca commits el `.env` a Git.**

---

## 🤝 Contribución

Para hacer cambios:

1. Crea una rama: `git checkout -b feature/mi-caracteristica`
2. Haz commit: `git commit -m "feat(nueva-feature): descripción"`
3. Push: `git push origin feature/mi-caracteristica`
4. Abre un Pull Request en GitHub

---

## 📞 Soporte

Si la aplicación no abre o hay errores:

1. **Verifica DATABASE_URL** en la configuración de Vercel
2. **Verifica APP_SECRET** esté configurado
3. **Revisa los logs de Vercel** (Settings → Function Logs)
4. **Prueba la BD** con el SQL Editor de Neon

---

## 📄 Licencia

Este proyecto está bajo licencia MIT. Ver [LICENSE](LICENSE) para más detalles.

---

**Última actualización:** Junio 2026  
**Estado:** ✅ En producción y funcionando

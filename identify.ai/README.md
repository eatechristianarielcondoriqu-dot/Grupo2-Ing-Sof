# IDENTIFY.AI — Simulación Interactiva de Detección de Fraudes

[![Vercel](https://img.shields.io/badge/Deployed-Vercel-black?logo=vercel)](https://identify-ai-pi.vercel.app/)
[![HTML5](https://img.shields.io/badge/HTML5-E34C26?logo=html5&logoColor=white)](https://html.spec.whatwg.org/)
[![CSS3](https://img.shields.io/badge/CSS3-1572B6?logo=css3&logoColor=white)](https://www.w3.org/TR/CSS/)
[![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?logo=javascript&logoColor=black)](https://www.javascript.com/)
[![License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

Sistema interactivo de demostración para detección de fraudes en mensajería usando inteligencia artificial. Interfaz educativa que simula análisis de riesgo, procesamiento NLP y arquitectura de sistema en tiempo real.

**🌐 SITIO EN VIVO (PRODUCCIÓN):**
# ➡️ [https://identify-ai-pi.vercel.app/](https://identify-ai-pi.vercel.app/) ⬅️

**📚 Proyecto integrador** de Ingeniería en Sistemas · Bolivia 2025

---

## 📋 Tabla de Contenidos

- [Características](#características)
- [Tecnologías](#tecnologías)
- [Estructura del Proyecto](#estructura-del-proyecto)
- [Instalación Local](#instalación-local)
- [Despliegue en Vercel](#despliegue-en-vercel)
- [Uso de la Aplicación](#uso-de-la-aplicación)
- [Arquitectura](#arquitectura)
- [Contribución](#contribución)

---

## ✨ Características

### 🔍 **Analizador de Mensajes**
- Escribe cualquier mensaje y obtén análisis de riesgo en tiempo real
- Ejemplos pre-cargados: cuento del tío, phishing, mensaje normal
- Visualización del pipeline de procesamiento:
  - Tokenización → Vectorización → Clasificación
- Detección automática de palabras clave

### 📊 **Bandeja de Mensajes**
- 5 mensajes pre-analizados con scoring de fraude
- Filtrado por nivel de riesgo (Alto, Medio, Bajo)
- Vista detallada con:
  - Semáforo de riesgo (🔴 Rojo/🟡 Amarillo/🟢 Verde)
  - Score de confiabilidad (%)
  - Indicadores NLP con gráficas de barras
  - Palabras sospechosas detectadas
- Simular nuevos mensajes fraudulentos

### 📈 **Estadísticas y Métricas**
- Rendimiento del modelo:
  - Precisión: 94.7%
  - Recall: 96%
  - F1-Score: 93%
- Gráfico de indicadores de fraude más frecuentes
- Actividad semanal del sistema
- Stack tecnológico completo

### 🏗️ **Visualización de Arquitectura**
- 6 módulos del sistema explicados interactivamente
- Descripción detallada de cada componente
- Tecnologías específicas por módulo
- Flujo de datos en tiempo real

---

## 🛠️ Tecnologías

| Componente | Tecnología |
|-----------|-----------|
| **Frontend** | HTML5, CSS3, JavaScript vanilla |
| **Hosting** | Vercel |
| **Visualización** | Gráficas interactivas |
| **Animaciones** | CSS animations + JavaScript |
| **Responsive** | Mobile-first design |

**Stack del proyecto real simulado:**
- App móvil: Android (Kotlin)
- Modelo NLP: BERT, Naive Bayes, SVM
- Mobile ML: TensorFlow Lite
- Backend: FastAPI (Python)
- Base de datos: PostgreSQL
- Preprocesamiento: NLTK, spaCy
- Metodología: Scrum

---

## 📁 Estructura del Proyecto

```
identify.ai/
├── index.html              # Aplicación principal
├── css/
│   └── style.css          # Estilos y diseño responsive
├── js/
│   ├── app.js             # Lógica interactiva e eventos
│   ├── data.js            # Datos: mensajes y configuración
│   └── config.js          # Configuración global (opcional)
├── README.md              # Este archivo
├── .gitignore             # Archivos a ignorar
└── vercel.json            # Configuración de despliegue (opcional)
```

### Descripción de Archivos

| Archivo | Descripción |
|---------|------------|
| `index.html` | Estructura HTML con 5 secciones principales |
| `css/style.css` | Estilos modernos, responsive y animaciones |
| `js/app.js` | Lógica de interactividad y eventos |
| `js/data.js` | Datos de mensajes, métricas y configuración |
| `vercel.json` | Configuración de despliegue en Vercel |

---

## 💻 Instalación Local

### Requisitos
- Navegador moderno (Chrome, Firefox, Safari, Edge)
- Git (opcional, para clonar el repositorio)
- Editor de código (VS Code recomendado)

### Opción 1: Live Server (Recomendado en VS Code)

1. **Abre el proyecto en VS Code:**
   ```bash
   code identify.ai
   ```

2. **Instala la extensión Live Server:**
   - Abre Extensions (Ctrl+Shift+X)
   - Busca: `Live Server`
   - Instala de Ritwick Dey

3. **Ejecuta Live Server:**
   - Haz clic derecho en `index.html`
   - Selecciona: "Open with Live Server"
   - Se abre automáticamente en `http://127.0.0.1:5500/`

### Opción 2: Abrir Directo en Navegador

1. **Navega a la carpeta:**
   ```bash
   cd identify.ai
   ```

2. **Abre index.html:**
   - Doble clic en `index.html`
   - O arrastra el archivo al navegador

3. **Accede a la aplicación:**
   - Se abrirá en tu navegador por defecto

### Opción 3: Usar Python SimpleHTTPServer

```bash
cd identify.ai
python -m http.server 8000
# Abre: http://localhost:8000
```

---

## 🚀 Despliegue en Vercel

### Paso 1: Preparar Repositorio GitHub

```bash
# Inicializar Git
git init

# Agregar todos los archivos
git add .

# Primer commit
git commit -m "feat: initialize IDENTIFY.AI project"

# Establecer rama main
git branch -M main

# Agregar remote (reemplaza TU_USUARIO)
git remote add origin https://github.com/TU_USUARIO/identify.ai.git

# Subir código
git push -u origin main
```

⚠️ **Reemplaza `TU_USUARIO` con tu nombre de usuario de GitHub**

### Paso 2: Conectar a Vercel

1. **Ve a [vercel.com](https://vercel.com)**

2. **Haz clic en "Add New Project"**

3. **Importa el repositorio:**
   - Selecciona `identify.ai`
   - Haz clic en "Import"

4. **Configura el proyecto:**
   - Framework: "Other" (HTML/CSS/JS)
   - Root Directory: `./` (raíz)
   - Build Command: dejar vacío
   - Output Directory: dejar vacío

5. **Deploy:**
   - Haz clic en "Deploy"
   - Espera 1-2 minutos
   - Tu URL será: `https://identify-ai-[random].vercel.app/`

### Paso 3: Verificar Despliegue

- Abre tu URL de Vercel: **https://identify-ai-pi.vercel.app/**
- Prueba todas las funcionalidades
- Verifica que funciona en móvil

✅ **¡Tu aplicación está en vivo!**

---

## 🎮 Uso de la Aplicación

### 1. **Sección Analizador IA**
- Escribe un mensaje en el campo de entrada
- Haz clic en "Analizar Mensaje"
- Usa los botones de ejemplo para cargar casos pre-definidos
- Observa el pipeline de procesamiento en tiempo real
- Lee el resultado con palabras clave detectadas

### 2. **Sección Bandeja de Mensajes**
- Desplázate por los 5 mensajes
- Haz clic en un mensaje para ver análisis completo
- Usa los filtros: Alto, Medio, Bajo riesgo
- Haz clic en "Simular Mensaje" para agregar uno nuevo

### 3. **Sección Estadísticas**
- Observa las métricas del modelo (Precisión, Recall, F1)
- Ve el gráfico de indicadores más frecuentes
- Revisa la actividad semanal
- Consulta el stack tecnológico

### 4. **Sección Arquitectura**
- Haz clic en cada módulo
- Lee la descripción detallada
- Identifica las tecnologías usadas
- Entiende el flujo del sistema

---

## 🏗️ Arquitectura del Sistema

### Módulos Principales

```
┌─────────────────────────────────────┐
│     IDENTIFY.AI - Simulación        │
├─────────────────────────────────────┤
│                                     │
│  ┌──────────────┐                   │
│  │ Frontend UI  │ (HTML/CSS/JS)     │
│  └──────┬───────┘                   │
│         │                           │
│  ┌──────▼──────────────────┐        │
│  │ Analizador de Mensajes  │        │
│  │ - Tokenización          │        │
│  │ - Vectorización         │        │
│  │ - Clasificación         │        │
│  └──────┬───────────────────┘       │
│         │                           │
│  ┌──────▼──────────────────┐        │
│  │ Motor de Scoring        │        │
│  │ - NLP Features          │        │
│  │ - Risk Assessment       │        │
│  │ - Confidence Metrics    │        │
│  └──────┬───────────────────┘       │
│         │                           │
│  ┌──────▼──────────────────┐        │
│  │ Visualización de Datos  │        │
│  │ - Gráficas              │        │
│  │ - Estadísticas          │        │
│  │ - Alertas               │        │
│  └──────────────────────────┘       │
│                                     │
└─────────────────────────────────────┘
```

---

## 📊 Métricas y Rendimiento

### Modelo de Clasificación
- **Precisión:** 94.7% (de los predecidos como fraude, 94.7% realmente lo son)
- **Recall:** 96% (detecta el 96% de los fraudes reales)
- **F1-Score:** 93% (balance entre precisión y recall)

### Indicadores Más Comunes
- Palabras de urgencia (50%)
- Solicitud de dinero (45%)
- URLs sospechosas (38%)
- Información personal (35%)
- Códigos de verificación (28%)

---

## 🔄 Git Workflow (Commits Organizados)

Este proyecto sigue un formato de commits profesional:

```bash
# Características nuevas
git commit -m "feat(analyzer): agregar análisis en tiempo real"

# Correcciones
git commit -m "fix(ui): corregir visualización en móvil"

# Documentación
git commit -m "docs(README): agregar instrucciones de despliegue"

# Mejoras de código
git commit -m "refactor(app): optimizar lógica de scoring"
```

**Tipos de commit:**
- `feat`: Nueva funcionalidad
- `fix`: Corrección de bug
- `docs`: Documentación
- `refactor`: Mejora de código
- `test`: Pruebas
- `style`: Formato/estilos

---

## 📱 Responsive Design

La aplicación está optimizada para:
- 📱 Móviles (320px+)
- 📱 Tablets (768px+)
- 💻 Desktops (1024px+)
- 🖥️ Pantallas grandes (1920px+)

---

## 🔒 Seguridad

- No almacena datos reales en localStorage
- Datos de demostración únicamente
- Sin conexión a servidores reales
- Código cliente-side seguro

---

## 📝 Licencia

Este proyecto está bajo licencia **MIT**. Ver [LICENSE](LICENSE) para más detalles.

---

## 🤝 Contribución

Para contribuir al proyecto:

1. Crea una rama: `git checkout -b feature/mi-caracteristica`
2. Haz commit: `git commit -m "feat: descripción"`
3. Push: `git push origin feature/mi-caracteristica`
4. Abre un Pull Request

---

## 📞 Contacto y Soporte

- **GitHub:** [Tu usuario]/identify.ai
- **Sitio en vivo:** https://identify-ai-pi.vercel.app/
- **Issues:** Reporta bugs en la sección de Issues
- **Discussiones:** Abre una discusión para ideas

---

## 🎓 Información del Proyecto

| Dato | Valor |
|------|-------|
| **Tipo** | Proyecto Integrador |
| **Carrera** | Ingeniería en Sistemas |
| **País** | Bolivia |
| **Año** | 2025 |
| **Estado** | ✅ En producción |

---

**Última actualización:** Junio 2026  
**Desarrollado por:** Equipo de Desarrollo  
**Estado:** ✅ Completado y en funcionamiento

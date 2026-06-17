# IDENTIFY AI — Simulación Interactiva

**Proyecto Integrador** — Sistema de detección de fraudes en mensajería con IA  
Bolivia · 2025

---

## Cómo abrir en VS Code

### Opción 1 — Live Server (recomendado)
1. Abre VS Code
2. Arrastra la carpeta `guardamsg` al editor
3. Instala la extensión **Live Server** (ritwickdey.liveserver)
4. Haz clic derecho sobre `index.html` → "Open with Live Server"
5. Se abre en el navegador en `http://127.0.0.1:5500/index.html`

### Opción 2 — Abrir directo
1. Abre la carpeta `IDENTIFY AI` en VS Code
2. Haz doble clic en `index.html`
3. Ábrelo directamente en el navegador

---

## Estructura del proyecto

```
IDENTIFY.AI/
├── index.html          # Aplicación principal
├── css/
│   └── style.css       # Estilos completos
├── js/
│   ├── data.js         # Datos: mensajes, arquitectura, métricas
│   └── app.js          # Lógica interactiva
└── README.md           # Este archivo
```

---

## Funcionalidades interactivas

### Mensajes
- Ver bandeja con 5 mensajes pre-cargados con análisis IA
- Filtrar por nivel de riesgo (alto, medio, bajo)
- Clic en cualquier mensaje → ver análisis completo con:
  - Semáforo de riesgo (rojo/amarillo/verde)
  - Score del modelo (%)
  - Indicadores NLP con barras de porcentaje
  - Palabras clave detectadas
- Botón "Simular mensaje" → agrega un mensaje nuevo de fraude

### Analizador IA
- Escribe cualquier mensaje y analízalo con el motor de scoring
- Carga 3 ejemplos rápidos: cuento del tío, phishing, mensaje normal
- Ve el pipeline de procesamiento animado: Tokenización → Vectorización → Clasificación
- Obtén el resultado con palabras clave detectadas

### Estadísticas
- Métricas del modelo: Precisión 94.7%, Recall 96%, F1 93%
- Gráfico de indicadores de fraude más frecuentes
- Actividad semanal en barras
- Stack tecnológico del proyecto

### Arquitectura
- 6 módulos del sistema explicados interactivamente
- Haz clic en cada módulo para ver su descripción detallada
- Tecnologías específicas de cada componente

---

## Tecnologías del proyecto real

| Componente | Tecnología |
|------------|------------|
| App móvil | Android (Kotlin) |
| Modelo NLP | BERT, Naive Bayes, SVM |
| Móvil ML | TensorFlow Lite |
| Backend | FastAPI (Python) |
| Base de datos | PostgreSQL |
| Preprocesamiento | NLTK, spaCy |
| Metodología | Scrum |

---

Desarrollado como parte del **Proyecto Integrador** de Ingeniería en Sistemas.

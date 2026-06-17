// ============================
// IDENTIFY AI — DATA.JS
// Datos de la simulación
// ============================

const MENSAJES = [
  {
    id: 1,
    from: "+591 78945123",
    fromShort: "Desconocido",
    app: "WhatsApp",
    time: "Hace 5 min",
    preview: "Hola mamá soy tu hijo, tuve un accidente y cambié mi número...",
    texto: "Hola mamá, soy tu hijo. Tuve un accidente y estoy en el hospital, cambié mi número porque me robaron el teléfono. Necesito que me transfieras Bs. 500 urgente al QR de este número. No llames todavía porque estoy en sala de espera. Por favor es urgente.",
    riesgo: "alto",
    score: 96.4,
    desc: "El mensaje presenta múltiples patrones del 'cuento del tío digital', uno de los fraudes más frecuentes en Bolivia. Alta probabilidad de suplantación de identidad.",
    indicators: [
      { name: "Lenguaje de urgencia", pct: 95, tipo: "danger" },
      { name: "Número desconocido", pct: 90, tipo: "danger" },
      { name: "Solicitud de dinero", pct: 100, tipo: "danger" },
      { name: "Cambio de número", pct: 88, tipo: "danger" },
      { name: "Bloqueo de llamada", pct: 75, tipo: "danger" },
    ],
    keywords: [
      { word: "urgente", tipo: "danger" },
      { word: "accidente", tipo: "danger" },
      { word: "transferir", tipo: "danger" },
      { word: "cambié mi número", tipo: "danger" },
      { word: "hospital", tipo: "warn" },
      { word: "no llames", tipo: "danger" },
    ],
    avatarColor: "#EF4444", avatarBg: "rgba(239,68,68,.15)", avatarLetter: "?"
  },
  {
    id: 2,
    from: "Banco Nacional (bot)",
    fromShort: "Banco Nacional",
    app: "Facebook Messenger",
    time: "Hace 23 min",
    preview: "Su cuenta ha sido bloqueada por actividad sospechosa. Verifique...",
    texto: "AVISO URGENTE: Su cuenta bancaria ha sido bloqueada por actividad sospechosa. Para evitar la suspensión definitiva, verifique su identidad en el siguiente enlace: bit.ly/banco-verif-bl2025. Tiene 2 horas para responder.",
    riesgo: "alto",
    score: 91.8,
    desc: "Phishing bancario clásico. El mensaje utiliza urgencia artificial, un enlace acortado sospechoso y suplanta la identidad de una institución financiera.",
    indicators: [
      { name: "Enlace sospechoso", pct: 92, tipo: "danger" },
      { name: "Urgencia artificial", pct: 87, tipo: "danger" },
      { name: "Suplantación bancaria", pct: 84, tipo: "danger" },
      { name: "Límite de tiempo", pct: 80, tipo: "danger" },
      { name: "Canal no oficial", pct: 95, tipo: "danger" },
    ],
    keywords: [
      { word: "URGENTE", tipo: "danger" },
      { word: "bloqueada", tipo: "danger" },
      { word: "bit.ly", tipo: "danger" },
      { word: "2 horas", tipo: "danger" },
      { word: "suspensión", tipo: "warn" },
      { word: "verifique", tipo: "warn" },
    ],
    avatarColor: "#F59E0B", avatarBg: "rgba(245,158,11,.15)", avatarLetter: "B"
  },
  {
    id: 3,
    from: "María García",
    fromShort: "María (contacto)",
    app: "WhatsApp",
    time: "Hace 1 hora",
    preview: "¿Podés prestarme algo hasta el lunes que cobro?",
    texto: "Hola! Oye, estoy un poco corta esta semana con los gastos. ¿Me podés prestar 200 bs hasta el lunes que cobro? Te devuelvo con una cerveza jajaja. Igual sin urgencia si no podés.",
    riesgo: "medio",
    score: 48.2,
    desc: "Mensaje de un contacto conocido con solicitud económica. El modelo detecta riesgo medio. Se recomienda verificar por llamada antes de realizar cualquier transferencia.",
    indicators: [
      { name: "Solicitud de dinero", pct: 65, tipo: "warn" },
      { name: "Contacto guardado", pct: 10, tipo: "ok" },
      { name: "Tono informal", pct: 8, tipo: "ok" },
      { name: "Sin urgencia extrema", pct: 12, tipo: "ok" },
      { name: "Monto razonable", pct: 20, tipo: "warn" },
    ],
    keywords: [
      { word: "prestar", tipo: "warn" },
      { word: "200 bs", tipo: "warn" },
      { word: "lunes", tipo: "ok" },
      { word: "jajaja", tipo: "ok" },
    ],
    avatarColor: "#3B82F6", avatarBg: "rgba(59,130,246,.15)", avatarLetter: "M"
  },
  {
    id: 4,
    from: "Mamá ❤",
    fromShort: "Mamá",
    app: "WhatsApp",
    time: "Hace 2 horas",
    preview: "¿A qué hora llegás hoy para el almuerzo?",
    texto: "Hijito, ¿a qué hora llegás hoy? Hice silpancho. Avísame para esperarte. También tu papá quiere hablar contigo sobre el fin de semana.",
    riesgo: "bajo",
    score: 3.1,
    desc: "Mensaje de comunicación familiar cotidiana. No se detectaron indicadores de fraude. El contenido, el contacto y el contexto son consistentes con comunicación legítima.",
    indicators: [
      { name: "Sin solicitud de dinero", pct: 2, tipo: "ok" },
      { name: "Contacto guardado", pct: 1, tipo: "ok" },
      { name: "Contenido cotidiano", pct: 2, tipo: "ok" },
      { name: "Sin urgencia", pct: 1, tipo: "ok" },
      { name: "Contexto familiar", pct: 2, tipo: "ok" },
    ],
    keywords: [
      { word: "almuerzo", tipo: "ok" },
      { word: "silpancho", tipo: "ok" },
      { word: "papá", tipo: "ok" },
      { word: "fin de semana", tipo: "ok" },
    ],
    avatarColor: "#10B981", avatarBg: "rgba(16,185,129,.15)", avatarLetter: "M"
  },
  {
    id: 5,
    from: "Lucas Torrez",
    fromShort: "Lucas",
    app: "WhatsApp",
    time: "Hace 3 horas",
    preview: "¿Vamos al partido el sábado? Hay entradas a Bs 30",
    texto: "Oe, ¿vamos al partido el sábado? Hay entradas en el estadio a Bs. 30. Avisame para ir juntos. Sale a las 3 pm.",
    riesgo: "bajo",
    score: 4.7,
    desc: "Mensaje de coordinación social entre amigos. Sin patrones de fraude detectados. Comunicación completamente legítima.",
    indicators: [
      { name: "Sin solicitud directa", pct: 5, tipo: "ok" },
      { name: "Contacto conocido", pct: 3, tipo: "ok" },
      { name: "Contexto de actividad", pct: 2, tipo: "ok" },
      { name: "Precio público informado", pct: 4, tipo: "ok" },
    ],
    keywords: [
      { word: "partido", tipo: "ok" },
      { word: "sábado", tipo: "ok" },
      { word: "entradas", tipo: "ok" },
      { word: "estadio", tipo: "ok" },
    ],
    avatarColor: "#7C3AED", avatarBg: "rgba(124,58,237,.15)", avatarLetter: "L"
  }
];

const EJEMPLOS = [
  {
    texto: "Hola soy tu hijo, tuve un accidente y cambié mi número. Necesito que me transfieras Bs 500 urgente al QR de este número. No llames.",
    plat: "WhatsApp", rem: "Número desconocido"
  },
  {
    texto: "ALERTA: Su cuenta ha sido suspendida por actividad inusual. Haga clic en bit.ly/verifica-ahora para restablecer el acceso en menos de 1 hora.",
    plat: "Facebook Messenger", rem: "Institución bancaria"
  },
  {
    texto: "Hola! ¿Cómo estás? Ya llegué a casa sano y salvo. Mañana nos vemos en la oficina a las 9. Gracias por todo!",
    plat: "WhatsApp", rem: "Contacto guardado"
  }
];

const ARQUITECTURA = [
  {
    id: "capture",
    name: "Módulo de captura",
    short: "Captura de notificaciones Android",
    icon: "📡",
    iconBg: "rgba(59,130,246,.15)",
    color: "#3B82F6",
    body: "Este módulo utiliza el servicio NotificationListenerService de Android para capturar los mensajes recibidos en aplicaciones de mensajería como WhatsApp y Facebook Messenger. Debido a que estas apps cifran sus mensajes, el sistema accede únicamente al contenido de la notificación que se muestra al usuario.",
    tech: ["Android Service", "NotificationListenerService", "Kotlin", "Permisos BIND_NOTIFICATION_LISTENER"]
  },
  {
    id: "nlp",
    name: "Módulo NLP",
    short: "Preprocesamiento de texto",
    icon: "🔤",
    iconBg: "rgba(124,58,237,.15)",
    color: "#7C3AED",
    body: "Recibe el texto crudo del mensaje y aplica técnicas de NLP: tokenización (dividir en palabras/tokens), normalización (minúsculas, eliminar caracteres especiales), detección de palabras clave sospechosas y vectorización mediante embeddings para representar el texto como vector numérico comprensible por el modelo.",
    tech: ["NLTK", "spaCy", "Tokenización", "TF-IDF", "Word Embeddings", "Python"]
  },
  {
    id: "model",
    name: "Modelo IA",
    short: "Clasificación BERT / ML",
    icon: "🧠",
    iconBg: "rgba(16,185,129,.15)",
    color: "#10B981",
    body: "El núcleo del sistema. Se evalúan tres modelos: Naive Bayes (rápido, buena línea base), SVM (robusto para texto), y BERT (mayor precisión al entender contexto). El modelo final seleccionado se convierte a TensorFlow Lite para ejecutarse directamente en el dispositivo sin necesidad de internet.",
    tech: ["BERT", "Naive Bayes", "SVM", "Scikit-learn", "TensorFlow", "TF Lite"]
  },
  {
    id: "classify",
    name: "Módulo de clasificación",
    short: "Semáforo de riesgo",
    icon: "🚦",
    iconBg: "rgba(239,68,68,.15)",
    color: "#EF4444",
    body: "Toma la predicción del modelo (valor entre 0 y 1) y la convierte en uno de tres niveles de riesgo: Alto (≥0.75) en rojo, Medio (0.40–0.74) en amarillo, y Bajo (<0.40) en verde. Esta clasificación es la que se muestra al usuario como indicador visual intuitivo.",
    tech: ["Umbral de decisión", "Clasificación multiclase", "Score de confianza"]
  },
  {
    id: "alert",
    name: "Módulo de alertas",
    short: "Notificación al usuario",
    icon: "🔔",
    iconBg: "rgba(245,158,11,.15)",
    color: "#F59E0B",
    body: "Cuando se detecta un mensaje de riesgo alto o medio, el sistema genera una notificación de alerta visible en la pantalla del usuario. La alerta incluye el nivel de riesgo, los indicadores detectados y opciones de acción: reportar el fraude o marcar como seguro para retroalimentar el modelo.",
    tech: ["Android Notifications API", "UI/UX", "Feedback loop", "Base de datos local"]
  },
  {
    id: "backend",
    name: "Backend / API",
    short: "Gestión y almacenamiento",
    icon: "⚙️",
    iconBg: "rgba(59,130,246,.1)",
    color: "#3B82F6",
    body: "API REST construida con FastAPI (Python) que gestiona el almacenamiento de mensajes reportados, actualiza el modelo con nuevos datos etiquetados, expone métricas del sistema y permite sincronización entre el dispositivo y la base de datos central para mejorar continuamente la detección.",
    tech: ["FastAPI", "Python", "PostgreSQL", "REST API", "JWT Auth", "Docker"]
  }
];

const METRICS = [
  { name: "Precisión", val: 94.7, cls: "mb-blue" },
  { name: "Recall", val: 96.0, cls: "mb-green" },
  { name: "F1-Score", val: 93.0, cls: "mb-purple" },
  { name: "Falsos positivos", val: 5.3, cls: "mb-red" },
];

const FREQ = [
  { name: "Solicitud de dinero", pct: 84 },
  { name: "Lenguaje de urgencia", pct: 91 },
  { name: "Número desconocido", pct: 73 },
  { name: "Enlace sospechoso", pct: 61 },
  { name: "Cambio de número", pct: 55 },
  { name: "Límite de tiempo", pct: 48 },
];

const WEEKLY = [
  { day: "Lun", val: 28 },
  { day: "Mar", val: 35 },
  { day: "Mié", val: 22 },
  { day: "Jue", val: 41 },
  { day: "Vie", val: 53 },
  { day: "Sáb", val: 38 },
  { day: "Hoy", val: 47 },
];

const MSGS_EXTRA = [
  {
    id: 99, from: "+591 77123456", fromShort: "Desconocido",
    app: "WhatsApp", time: "Ahora",
    preview: "Ganaste un premio de Bs 5000. Haz clic para reclamar...",
    texto: "¡Felicitaciones! Eres el ganador de nuestro sorteo de Bs 5000. Para reclamar tu premio haz clic en: premio-sorteo.com/claim?id=47821. Tienes 24 horas.",
    riesgo: "alto", score: 98.1,
    desc: "Fraude de sorteo falso. Técnica de ingeniería social con premio ficticio y enlace malicioso.",
    indicators: [
      { name: "Premio falso", pct: 98, tipo: "danger" },
      { name: "Enlace sospechoso", pct: 95, tipo: "danger" },
      { name: "Límite de tiempo", pct: 85, tipo: "danger" },
      { name: "Número desconocido", pct: 92, tipo: "danger" },
    ],
    keywords: [
      { word: "felicitaciones", tipo: "warn" },
      { word: "ganaste", tipo: "danger" },
      { word: "Bs 5000", tipo: "danger" },
      { word: "premio-sorteo.com", tipo: "danger" },
      { word: "24 horas", tipo: "danger" },
    ],
    avatarColor: "#EF4444", avatarBg: "rgba(239,68,68,.15)", avatarLetter: "?"
  }
];

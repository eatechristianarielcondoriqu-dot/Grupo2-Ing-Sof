<?php
/**
 * Página de diagnóstico temporal.
 * Te dice exactamente qué está fallando con la conexión a la base de datos,
 * SIN mostrar tu contraseña. Bórrala (o renómbrala) cuando termines de
 * depurar, ya que revela el host/usuario/nombre de tu base.
 */

header('Content-Type: text/plain; charset=utf-8');

echo "=== DIAGNÓSTICO DE CONEXIÓN - U.E. LOS ANDES ===\n\n";

$databaseUrl = getenv('DATABASE_URL');
$postgresUrl = getenv('POSTGRES_URL');
$appSecret   = getenv('APP_SECRET');

echo "1) Variable DATABASE_URL definida: " . ($databaseUrl ? "SI" : "NO") . "\n";
echo "2) Variable POSTGRES_URL definida: " . ($postgresUrl ? "SI" : "NO") . "\n";
echo "3) Variable APP_SECRET definida:   " . ($appSecret ? "SI" : "NO (usará un valor por defecto, no ideal)") . "\n\n";

$url = $databaseUrl ?: $postgresUrl;

if (!$url) {
    echo "❌ No hay ninguna variable de conexión disponible.\n";
    echo "   -> Ve a Vercel: Project Settings > Environment Variables\n";
    echo "   -> Agrega DATABASE_URL con la cadena de conexión de Neon\n";
    echo "   -> IMPORTANTE: después de agregarla, ve a 'Deployments' y haz\n";
    echo "      'Redeploy' (los cambios de variables no aplican solos).\n";
    exit;
}

$parts = parse_url($url);

$hostDetectado = $parts['host'] ?? '';
$endpointId = $hostDetectado ? (strstr($hostDetectado, '.', true) ?: $hostDetectado) : '(no detectado)';

echo "4) Datos detectados en la cadena de conexión (sin password):\n";
echo "   host:        " . ($hostDetectado ?: '(no detectado)') . "\n";
echo "   port:        " . ($parts['port'] ?? '5432 (por defecto)') . "\n";
echo "   dbname:      " . (isset($parts['path']) ? ltrim($parts['path'], '/') : '(no detectado)') . "\n";
echo "   user:        " . ($parts['user'] ?? '(no detectado)') . "\n";
echo "   tiene password: " . (isset($parts['pass']) ? "SI" : "NO") . "\n";
echo "   endpoint ID detectado para el workaround SNI de Neon: $endpointId\n\n";

echo "5) Intentando conectar...\n";

try {
    require_once __DIR__ . '/db.php';
    $pdo = getDB();
    echo "✅ Conexión exitosa a PostgreSQL/Neon.\n\n";

    $tablas = $pdo->query(
        "SELECT table_name FROM information_schema.tables WHERE table_schema='public'"
    )->fetchAll(PDO::FETCH_COLUMN);

    echo "6) Tablas encontradas: " . (count($tablas) ? implode(', ', $tablas) : '(ninguna)') . "\n";

    if (in_array('usuarios', $tablas)) {
        $n = $pdo->query("SELECT COUNT(*) FROM usuarios")->fetchColumn();
        echo "   -> usuarios tiene $n registro(s)\n";
    } else {
        echo "   ⚠️ No existe la tabla 'usuarios'. Corre database/schema.sql en el SQL Editor de Neon.\n";
    }

    if (in_array('estudiantes', $tablas)) {
        $n = $pdo->query("SELECT COUNT(*) FROM estudiantes")->fetchColumn();
        echo "   -> estudiantes tiene $n registro(s)\n";
    } else {
        echo "   ⚠️ No existe la tabla 'estudiantes'. Corre database/schema.sql en el SQL Editor de Neon.\n";
    }
} catch (Throwable $e) {
    echo "❌ Falló la conexión. Mensaje exacto del driver:\n";
    echo "   " . $e->getMessage() . "\n\n";
    echo "Causas comunes:\n";
    echo "- Si dice 'could not find driver': el runtime no tiene pdo_pgsql (revisa vercel.json).\n";
    echo "- Si dice 'endpoint ID is not specified' o algo de SNI: ya debería estar resuelto en\n";
    echo "  db.php (agrega options=endpoint=...). Si sigue saliendo, verifica que el host\n";
    echo "  empiece con 'ep-' y que subiste la última versión de api/db.php.\n";
    echo "- Si dice 'password authentication failed': la cadena de conexión está mal copiada\n";
    echo "  o el password tiene caracteres especiales sin codificar (@, :, /, %, etc.).\n";
    echo "- Si dice 'could not translate host name' o timeout: el host está mal copiado\n";
    echo "  o la base de Neon está 'suspendida' (en el plan free se reactiva sola en unos segundos,\n";
    echo "  intenta de nuevo).\n";
    echo "- Si dice 'SSL connection is required': confirma que sslmode=require esté presente.\n";
}

<?php
/**
 * Conexión a la base de datos PostgreSQL (Neon).
 * Lee la cadena de conexión desde la variable de entorno DATABASE_URL,
 * que Vercel inyecta automáticamente cuando conectas la integración de Neon.
 */

function getDB(): PDO
{
    static $pdo = null;

    if ($pdo !== null) {
        return $pdo;
    }

    $databaseUrl = getenv('DATABASE_URL') ?: getenv('POSTGRES_URL');

    if (!$databaseUrl) {
        throw new RuntimeException(
            'No se encontró la variable de entorno DATABASE_URL. ' .
            'Configúrala en Vercel (Settings > Environment Variables) con la cadena que te da Neon.'
        );
    }

    $parts = parse_url($databaseUrl);

    $host   = $parts['host'] ?? 'localhost';
    $port   = $parts['port'] ?? 5432;
    $dbname = isset($parts['path']) ? ltrim($parts['path'], '/') : '';
    $user   = $parts['user'] ?? '';
    $pass   = $parts['pass'] ?? '';

    $dsn = "pgsql:host={$host};port={$port};dbname={$dbname};sslmode=require";

    // --- Workaround para Neon: el libpq que trae el runtime de Vercel es
    // demasiado antiguo para soportar SNI (Server Name Indication), así que
    // Neon no sabe a qué "endpoint" (compute) enrutar la conexión.
    // Solución oficial de Neon: enviar el endpoint ID (la primera parte del
    // hostname, antes del primer punto) como parámetro "options".
    // https://neon.tech/sni
    if (str_starts_with($host, 'ep-')) {
        $endpointId = strstr($host, '.', true) ?: $host;
        $dsn .= ";options=endpoint={$endpointId}";
    }

    $pdo = new PDO($dsn, $user, $pass, [
        PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION,
        PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
    ]);

    return $pdo;
}
